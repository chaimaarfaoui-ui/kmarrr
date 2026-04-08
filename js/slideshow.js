// ── SLIDESHOW ─────────────────────────────────────────────────────────────────
let cur = 0;
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
const counter = document.getElementById('heroCounter');
function goToSlide(n) {
  slides[cur].classList.remove('active'); dots[cur].classList.remove('active');
  cur = n;
  slides[cur].classList.add('active'); dots[cur].classList.add('active');
  counter.textContent = (cur+1) + ' / ' + slides.length;
}
setInterval(() => goToSlide((cur+1) % slides.length), 6000);
