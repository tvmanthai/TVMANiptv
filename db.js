/* ========================================
   TV MAN IPTV - Global Styles
   Design: Deep space dark + electric violet
   Font: Kanit (display) + Inter (body)
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --bg-base:    #07070F;
  --bg-surface: #0F0F1E;
  --bg-card:    #13132A;
  --bg-hover:   #1A1A35;
  --accent:     #6C63FF;
  --accent-glow:#8A84FF;
  --accent2:    #FF6B9D;
  --text-primary:   #F0EFFF;
  --text-secondary: #8B8AAA;
  --text-muted:     #4A4A6A;
  --success: #2DD4BF;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --border:  rgba(108,99,255,0.18);
  --radius:  12px;
  --radius-lg: 20px;
  --shadow-glow: 0 0 24px rgba(108,99,255,0.25);
  --shadow-card: 0 4px 24px rgba(0,0,0,0.5);
  --font-display: 'Kanit', sans-serif;
  --font-body:    'Inter', sans-serif;
  --transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--bg-surface); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 99px; }

/* ---- Utility ---- */
.hidden { display: none !important; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.w-full { width: 100%; }
.text-accent { color: var(--accent); }
.text-muted { color: var(--text-secondary); }
.text-danger { color: var(--danger); }
.text-success { color: var(--success); }
.font-display { font-family: var(--font-display); }
.bold { font-weight: 600; }

/* ---- Buttons ---- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 22px;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  user-select: none;
}
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 16px rgba(108,99,255,0.35);
}
.btn-primary:hover { background: var(--accent-glow); transform: translateY(-1px); box-shadow: 0 6px 24px rgba(108,99,255,0.5); }
.btn-secondary {
  background: var(--bg-hover);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
.btn-secondary:hover { background: var(--bg-card); border-color: var(--accent); }
.btn-danger { background: var(--danger); color: #fff; }
.btn-danger:hover { background: #DC2626; }
.btn-success { background: var(--success); color: #07070F; font-weight: 600; }
.btn-icon {
  padding: 8px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}
.btn-icon:hover { color: var(--accent); border-color: var(--accent); background: rgba(108,99,255,0.1); }
.btn-sm { padding: 6px 14px; font-size: 12px; }
.btn-lg { padding: 14px 32px; font-size: 16px; }
.btn-block { width: 100%; }

/* ---- Form elements ---- */
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.form-input {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 11px 16px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 14px;
  width: 100%;
  transition: var(--transition);
}
.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
  background: var(--bg-card);
}
.form-input::placeholder { color: var(--text-muted); }
.input-wrapper { position: relative; }
.input-wrapper .form-input { padding-right: 44px; }
.input-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 4px;
  transition: var(--transition);
}
.input-toggle:hover { color: var(--accent); }
.form-select {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 11px 16px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  transition: var(--transition);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%238B8AAA' viewBox='0 0 20 20'%3E%3Cpath d='M7 7l3 3 3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
}
.form-select:focus { outline: none; border-color: var(--accent); }

/* ---- Cards ---- */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

/* ---- Badge ---- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.badge-active { background: rgba(45,212,191,0.15); color: var(--success); }
.badge-pending { background: rgba(245,158,11,0.15); color: var(--warning); }
.badge-disabled { background: rgba(239,68,68,0.15); color: var(--danger); }
.badge-admin { background: rgba(108,99,255,0.2); color: var(--accent); }

/* ---- Live dot ---- */
.live-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent2);
  animation: pulse-dot 1.5s infinite;
  display: inline-block;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,157,0.6); }
  50% { box-shadow: 0 0 0 5px rgba(255,107,157,0); }
}

/* ---- Modal overlay ---- */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease;
}
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-glow), var(--shadow-card);
  animation: slideUp 0.25s cubic-bezier(0.4,0,0.2,1);
}
.modal-header {
  padding: 20px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; }
.modal-body { padding: 16px 24px 24px; }
.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  transition: var(--transition);
}
.modal-close:hover { color: var(--text-primary); }

/* ---- Toast ---- */
#toast-container {
  position: fixed;
  bottom: 24px; right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 18px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;
  box-shadow: var(--shadow-card);
  animation: slideInRight 0.3s ease;
}
.toast-success { border-left: 3px solid var(--success); }
.toast-error   { border-left: 3px solid var(--danger); }
.toast-warn    { border-left: 3px solid var(--warning); }

/* ---- Table ---- */
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th {
  padding: 10px 16px;
  text-align: left;
  color: var(--text-secondary);
  font-weight: 500;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.data-table td {
  padding: 11px 16px;
  border-bottom: 1px solid rgba(108,99,255,0.07);
  vertical-align: middle;
}
.data-table tr:hover td { background: rgba(108,99,255,0.05); }
.data-table tr:last-child td { border-bottom: none; }

/* ---- Animations ---- */
@keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

/* ---- Responsive ---- */
@media (max-width: 600px) {
  .modal-box { border-radius: var(--radius); }
  .modal-header, .modal-body { padding-left: 16px; padding-right: 16px; }
  #toast-container { bottom: 12px; right: 12px; left: 12px; }
  .toast { min-width: auto; }
}
