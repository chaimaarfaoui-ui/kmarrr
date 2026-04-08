// ── MOBILE NAV ────────────────────────────────────────────────────────────────
function toggleMobileNav() {
  const nc = document.getElementById('navCenter');
  if (nc.classList.contains('mobile-open')) {
    nc.classList.remove('mobile-open');
    nc.style.cssText = '';
  } else {
    nc.classList.add('mobile-open');
    nc.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;background:#111;z-index:300;padding:8px 0;height:auto;overflow-y:auto;max-height:calc(100vh - 60px)';
  }
}
