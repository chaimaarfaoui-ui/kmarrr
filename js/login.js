// ── LOGIN ─────────────────────────────────────────────────────────────────────
async function doLogin() {
  clearError('ln-error');
  const email = document.getElementById('ln-email').value.trim();
  const password = document.getElementById('ln-pass').value;
  if (!email || !password) return showError('ln-error', 'Please fill in all fields.');
  const btn = document.getElementById('ln-submit');
  setBtnLoading(btn, true);
  try {
    const data = await api.post('/auth/login', { email, password });
    Auth.save(data.token, data.user);
    updateNavAuth();
    closeModal('loginModal');
    showToast(`Marhba, ${data.user.firstName}! Welcome back. 🎉`);
    document.getElementById('ln-email').value = '';
    document.getElementById('ln-pass').value = '';
  } catch(e) {
    showError('ln-error', e.message);
  } finally {
    setBtnLoading(btn, false);
  }
}
