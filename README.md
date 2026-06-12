<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>TV MAN IPTV — เข้าสู่ระบบ</title>
  <link rel="stylesheet" href="css/global.css">
  <style>
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-base);
      background-image:
        radial-gradient(ellipse 60% 50% at 20% 30%, rgba(108,99,255,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 80% 70%, rgba(255,107,157,0.08) 0%, transparent 70%);
      padding: 20px;
    }

    .login-wrapper {
      width: 100%;
      max-width: 440px;
    }

    .logo-area {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo-area img {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      object-fit: contain;
      box-shadow: 0 0 32px rgba(108,99,255,0.4);
      background: var(--bg-card);
      padding: 8px;
    }
    .logo-area h1 {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-top: 14px;
      background: linear-gradient(135deg, var(--accent-glow), var(--accent2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .logo-area p {
      color: var(--text-secondary);
      font-size: 13px;
      margin-top: 4px;
    }

    .tab-row {
      display: flex;
      gap: 0;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 4px;
      margin-bottom: 24px;
    }
    .tab-btn {
      flex: 1;
      padding: 9px;
      border: none;
      background: transparent;
      border-radius: 8px;
      color: var(--text-secondary);
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      transition: var(--transition);
    }
    .tab-btn.active {
      background: var(--accent);
      color: #fff;
      font-weight: 600;
      box-shadow: 0 2px 12px rgba(108,99,255,0.4);
    }

    .panel { display: none; flex-direction: column; gap: 16px; }
    .panel.active { display: flex; }

    .alert {
      padding: 12px 16px;
      border-radius: var(--radius);
      font-size: 13px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .alert-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #FCA5A5; }
    .alert-success { background: rgba(45,212,191,0.1); border: 1px solid rgba(45,212,191,0.25); color: #6EE7D6; }

    .divider {
      text-align: center;
      position: relative;
      color: var(--text-muted);
      font-size: 12px;
      margin: 4px 0;
    }
    .divider::before, .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background: var(--border);
    }
    .divider::before { left: 0; }
    .divider::after { right: 0; }

    /* Register success modal */
    .qr-box { text-align: center; padding: 8px 0; }
    .qr-box img { width: 180px; height: 180px; border-radius: 12px; border: 2px solid var(--accent); }
    .qr-box p { color: var(--text-secondary); font-size: 13px; margin-top: 12px; line-height: 1.7; }
  </style>
</head>
<body>
  <div class="login-wrapper">
    <!-- Logo -->
    <div class="logo-area">
      <img src="https://img1.pic.in.th/images/TVMAN.png" alt="TV MAN" onerror="this.style.display='none'">
      <h1>TV MAN IPTV</h1>
      <p>ระบบ Streaming ทีวีออนไลน์</p>
    </div>

    <!-- Card -->
    <div class="card" style="padding: 24px;">
      <!-- Tabs -->
      <div class="tab-row">
        <button class="tab-btn active" onclick="switchTab('login')">เข้าสู่ระบบ</button>
        <button class="tab-btn" onclick="switchTab('register')">สมัครสมาชิก</button>
      </div>

      <!-- Login Panel -->
      <div id="panel-login" class="panel active">
        <div id="login-alert" class="alert alert-error hidden"></div>
        <div class="form-group">
          <label class="form-label">ชื่อผู้ใช้</label>
          <input id="login-username" class="form-input" type="text" placeholder="กรอกชื่อผู้ใช้" autocomplete="username">
        </div>
        <div class="form-group">
          <label class="form-label">รหัสผ่าน</label>
          <div class="input-wrapper">
            <input id="login-password" class="form-input" type="password" placeholder="กรอกรหัสผ่าน" autocomplete="current-password">
            <button class="input-toggle" type="button" onclick="togglePassword('login-password', this)" title="แสดง/ซ่อนรหัสผ่าน">
              👁
            </button>
          </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="doLogin()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          เข้าสู่ระบบ
        </button>
      </div>

      <!-- Register Panel -->
      <div id="panel-register" class="panel">
        <div id="reg-alert" class="alert hidden"></div>
        <div class="form-group">
          <label class="form-label">ชื่อที่แสดงในระบบ</label>
          <input id="reg-display" class="form-input" type="text" placeholder="เช่น สมชาย ใจดี">
        </div>
        <div class="form-group">
          <label class="form-label">ชื่อผู้ใช้ (Username)</label>
          <input id="reg-username" class="form-input" type="text" placeholder="ภาษาอังกฤษ/ตัวเลข">
        </div>
        <div class="form-group">
          <label class="form-label">รหัสผ่าน</label>
          <div class="input-wrapper">
            <input id="reg-password" class="form-input" type="password" placeholder="อย่างน้อย 6 ตัวอักษร">
            <button class="input-toggle" type="button" onclick="togglePassword('reg-password', this)" title="แสดง/ซ่อนรหัสผ่าน">👁</button>
          </div>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="doRegister()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6"/></svg>
          สมัครสมาชิก
        </button>
      </div>
    </div>
  </div>

  <!-- Register Success Modal -->
  <div id="modal-reg-success" class="modal-overlay hidden">
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-title">🎉 สมัครสมาชิกสำเร็จ</span>
      </div>
      <div class="modal-body">
        <div class="qr-box">
          <p style="color:var(--text-primary);font-size:15px;font-weight:600;margin-bottom:12px;">
            คุณได้สมัครเป็นสมาชิกแล้ว<br>กรุณาสแกน QR Code Line เพื่อติดต่อแอดมิน
          </p>
          <img src="https://img1.pic.in.th/images/L_gainfriends_2dbarcodes_GW65ee3d3244b1cfc0.png" alt="QR Code Line Admin">
          <p>หลังจากติดต่อแอดมินแล้ว กรุณารอการยืนยันสิทธิ์<br>ก่อนเข้าใช้งานระบบ</p>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:16px;" onclick="closeRegModal()">รับทราบ</button>
      </div>
    </div>
  </div>

  <!-- Toast container -->
  <div id="toast-container"></div>

  <script src="js/db.js"></script>
  <script>
    TVMAN_DB.init();

    // Redirect if already logged in
    const existingUser = Auth.currentUser();
    if (existingUser) {
      location.href = existingUser.role === 'admin' ? 'admin.html' : 'user.html';
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', (i===0&&tab==='login')||(i===1&&tab==='register')));
      document.getElementById('panel-login').classList.toggle('active', tab === 'login');
      document.getElementById('panel-register').classList.toggle('active', tab === 'register');
      document.getElementById('login-alert').classList.add('hidden');
      document.getElementById('reg-alert').classList.add('hidden');
    }

    function togglePassword(inputId, btn) {
      const input = document.getElementById(inputId);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? '🙈' : '👁';
    }

    function showAlert(id, msg, type='error') {
      const el = document.getElementById(id);
      el.className = `alert alert-${type}`;
      el.textContent = msg;
      el.classList.remove('hidden');
    }

    function doLogin() {
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      if (!username || !password) { showAlert('login-alert','กรุณากรอกข้อมูลให้ครบถ้วน'); return; }
      const result = Auth.login(username, password);
      if (!result.success) { showAlert('login-alert', result.message); return; }
      location.href = result.user.role === 'admin' ? 'admin.html' : 'user.html';
    }

    function doRegister() {
      const display = document.getElementById('reg-display').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;
      if (!display || !username || !password) { showAlert('reg-alert','กรุณากรอกข้อมูลให้ครบถ้วน'); return; }
      if (password.length < 6) { showAlert('reg-alert','รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); return; }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) { showAlert('reg-alert','ชื่อผู้ใช้ใช้ได้เฉพาะ a-z, A-Z, 0-9, _ เท่านั้น'); return; }
      const result = Auth.register(display, username, password);
      if (!result.success) { showAlert('reg-alert', result.message); return; }
      document.getElementById('modal-reg-success').classList.remove('hidden');
    }

    function closeRegModal() {
      document.getElementById('modal-reg-success').classList.add('hidden');
      switchTab('login');
      ['reg-display','reg-username','reg-password'].forEach(id => document.getElementById(id).value='');
    }

    // Enter key support
    document.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (document.getElementById('panel-login').classList.contains('active')) doLogin();
      else doRegister();
    });
  </script>
</body>
</html>
