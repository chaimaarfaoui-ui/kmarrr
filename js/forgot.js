// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
async function doForgot() {
  clearError('fp-error');
  const email = document.getElementById('fp-email').value.trim();
  if (!email) return showError('fp-error', 'Please enter your email.');
  const btn = document.getElementById('fp-submit');
  setBtnLoading(btn, true);
  try {
    await api.post('/auth/forgot-password', { email });
    closeModal('forgotModal');
    showToast('If that email exists, a reset link has been sent.', 'info');
  } catch(e) {
    showError('fp-error', e.message);
  } finally {
    setBtnLoading(btn, false);
  }
}
