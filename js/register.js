// ── REGISTER ──────────────────────────────────────────────────────────────────
async function doRegister() {
  clearError('rg-error');
  const firstName = document.getElementById('rg-fname').value.trim();
  const lastName  = document.getElementById('rg-lname').value.trim();
  const email     = document.getElementById('rg-email').value.trim();
  const phone     = document.getElementById('rg-phone').value.trim();
  const country   = document.getElementById('rg-country').value;
  const password  = document.getElementById('rg-pass').value;
  if (!firstName || !lastName || !email || !password) return showError('rg-error', 'Please fill in all required fields.');
  if (password.length < 8) return showError('rg-error', 'Password must be at least 8 characters.');
  const btn = document.getElementById('rg-submit');
  setBtnLoading(btn, true);
  try {
    const data = await api.post('/auth/register', { firstName, lastName, email, password, country, phone });
    Auth.save(data.token, data.user);
    updateNavAuth();
    closeModal('registerModal');
    showToast(`Welcome to MedTunisia, ${data.user.firstName}! Please check your email to verify your account.`);
  } catch(e) {
    showError('rg-error', e.message);
  } finally {
    setBtnLoading(btn, false);
  }
}
