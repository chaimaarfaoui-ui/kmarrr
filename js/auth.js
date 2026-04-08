// ── AUTH HELPERS ──────────────────────────────────────────────────────────────
const Auth = {
  getToken: () => localStorage.getItem('mt_token'),
  getUser:  () => { try { return JSON.parse(localStorage.getItem('mt_user')); } catch { return null; } },
  isLoggedIn: () => !!Auth.getToken(),
  save(token, user) {
    localStorage.setItem('mt_token', token);
    localStorage.setItem('mt_user', JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem('mt_token');
    localStorage.removeItem('mt_user');
  }
};

function updateNavAuth() {
  const user = Auth.getUser();
  const loginBtn  = document.getElementById('nav-login-btn');
  const userMenu  = document.getElementById('nav-user-menu');
  const userLabel = document.getElementById('nav-user-label');
  if (user) {
    loginBtn.classList.add('hidden');
    userMenu.classList.add('visible');
    if (userLabel) userLabel.textContent = user.firstName;
  } else {
    loginBtn.classList.remove('hidden');
    userMenu.classList.remove('visible');
  }
}

function doLogout() {
  Auth.clear();
  updateNavAuth();
  showToast('Signed out. À bientôt!', 'info');
}

// Pre-fill booking form with user data if logged in
function prefillBookingUser() {
  const user = Auth.getUser();
  if (!user) return;
  const fn = document.getElementById('bk-fname');
  const ln = document.getElementById('bk-lname');
  const em = document.getElementById('bk-email');
  if (fn && !fn.value) fn.value = user.firstName || '';
  if (ln && !ln.value) ln.value = user.lastName || '';
  if (em && !em.value) em.value = user.email || '';
}
