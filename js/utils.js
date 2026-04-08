// ── BUTTON LOADING STATE ──────────────────────────────────────────────────────
function setBtnLoading(btn, loading) {
  if (loading) {
    btn.dataset.orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Please wait…';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.orig || btn.textContent;
  }
}
