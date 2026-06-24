/**
 * TV MAN IPTV - Database & Auth Layer
 * Uses localStorage for persistence (replace with real DB in production)
 */

const TVMAN_DB = {
  // ---- Initialization ----
  init() {
    if (!localStorage.getItem('tvman_users')) {
      const admin = {
        id: 'admin_001',
        displayName: 'Administrator',
        username: 'admin',
        password: btoa('admin1234'), // base64 encoded
        role: 'admin',
        status: 'active',
        expiryDate: '2099-12-31',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('tvman_users', JSON.stringify([admin]));
    }
    if (!localStorage.getItem('tvman_playlists')) {
      localStorage.setItem('tvman_playlists', JSON.stringify([]));
    }
    if (!localStorage.getItem('tvman_sessions')) {
      localStorage.setItem('tvman_sessions', JSON.stringify({}));
    }
    if (!localStorage.getItem('tvman_login_dates')) {
      localStorage.setItem('tvman_login_dates', JSON.stringify({}));
    }
  },

  // ---- Users ----
  getUsers() {
    return JSON.parse(localStorage.getItem('tvman_users') || '[]');
  },
  saveUsers(users) {
    localStorage.setItem('tvman_users', JSON.stringify(users));
  },
  getUserByUsername(username) {
    return this.getUsers().find(u => u.username === username);
  },
  addUser(user) {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  },
  updateUser(id, data) {
    const users = this.getUsers().map(u => u.id === id ? { ...u, ...data } : u);
    this.saveUsers(users);
  },
  deleteUser(id) {
    const users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  },

  // ---- Sessions / Tokens ----
  createSession(userId) {
    const token = 'tk_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36);
    const sessions = JSON.parse(localStorage.getItem('tvman_sessions') || '{}');
    sessions[token] = { userId, createdAt: Date.now() };
    localStorage.setItem('tvman_sessions', JSON.stringify(sessions));
    return token;
  },
  validateToken(token) {
    const sessions = JSON.parse(localStorage.getItem('tvman_sessions') || '{}');
    const session = sessions[token];
    if (!session) return null;
    const users = this.getUsers();
    return users.find(u => u.id === session.userId) || null;
  },
  destroySession(token) {
    const sessions = JSON.parse(localStorage.getItem('tvman_sessions') || '{}');
    delete sessions[token];
    localStorage.setItem('tvman_sessions', JSON.stringify(sessions));
  },

  // ---- Playlists ----
  getPlaylists() {
    return JSON.parse(localStorage.getItem('tvman_playlists') || '[]');
  },
  savePlaylists(pl) {
    localStorage.setItem('tvman_playlists', JSON.stringify(pl));
  },
  addPlaylist(playlist) {
    const pl = this.getPlaylists();
    pl.push(playlist);
    this.savePlaylists(pl);
  },
  deletePlaylist(id) {
    const pl = this.getPlaylists().filter(p => p.id !== id);
    this.savePlaylists(pl);
  },

  // ---- Login date tracking (for daily popup) ----
  getLastLoginDate(userId) {
    const dates = JSON.parse(localStorage.getItem('tvman_login_dates') || '{}');
    return dates[userId] || null;
  },
  setLastLoginDate(userId, date) {
    const dates = JSON.parse(localStorage.getItem('tvman_login_dates') || '{}');
    dates[userId] = date;
    localStorage.setItem('tvman_login_dates', JSON.stringify(dates));
  }
};

// ---- Auth Helpers ----
const Auth = {
  login(username, password) {
    TVMAN_DB.init();
    const user = TVMAN_DB.getUserByUsername(username);
    if (!user) return { success: false, message: 'ไม่พบชื่อผู้ใช้' };
    if (atob(user.password) !== password) return { success: false, message: 'รหัสผ่านไม่ถูกต้อง' };
    if (user.status === 'pending') return { success: false, message: 'บัญชีของคุณยังไม่ได้รับการยืนยันจาก Admin' };
    if (user.status === 'disabled') return { success: false, message: 'บัญชีของคุณถูกระงับการใช้งาน' };

    // Check expiry
    const today = new Date(); today.setHours(0,0,0,0);
    const expiry = new Date(user.expiryDate);
    if (expiry < today && user.role !== 'admin') {
      return { success: false, message: 'สมาชิกภาพของคุณหมดอายุแล้ว กรุณาติดต่อแอดมิน' };
    }

    const token = TVMAN_DB.createSession(user.id);
    sessionStorage.setItem('tvman_token', token);
    return { success: true, user, token };
  },
  logout() {
    const token = sessionStorage.getItem('tvman_token');
    if (token) TVMAN_DB.destroySession(token);
    sessionStorage.removeItem('tvman_token');
  },
  currentUser() {
    const token = sessionStorage.getItem('tvman_token');
    if (!token) return null;
    return TVMAN_DB.validateToken(token);
  },
  register(displayName, username, password) {
    TVMAN_DB.init();
    const existing = TVMAN_DB.getUserByUsername(username);
    if (existing) return { success: false, message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' };
    const newUser = {
      id: 'u_' + Date.now().toString(36),
      displayName,
      username,
      password: btoa(password),
      role: 'user',
      status: 'pending',
      expiryDate: '',
      createdAt: new Date().toISOString()
    };
    TVMAN_DB.addUser(newUser);
    return { success: true };
  }
};

// ---- M3U Parser ----
const M3UParser = {
  parse(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const channels = [];
    let current = null;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXTINF:')) {
        const info = lines[i];
        const name = info.includes(',') ? info.split(',').slice(1).join(',').trim() : 'Unknown';
        const groupMatch = info.match(/group-title="([^"]*)"/);
        const logoMatch = info.match(/tvg-logo="([^"]*)"/);
        current = {
          name,
          group: groupMatch ? groupMatch[1] : 'General',
          logo: logoMatch ? logoMatch[1] : '',
          url: ''
        };
      } else if (current && !lines[i].startsWith('#')) {
        current.url = lines[i];
        channels.push(current);
        current = null;
      }
    }
    return channels;
  }
};
