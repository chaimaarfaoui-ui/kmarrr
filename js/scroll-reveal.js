// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
const obs = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
}, { threshold: .08 });
document.querySelectorAll('.rev').forEach(el => obs.observe(el));
