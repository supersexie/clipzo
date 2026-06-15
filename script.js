// ===================== Mobile menu =====================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const iconOpen = document.getElementById('menuIconOpen');
const iconClose = document.getElementById('menuIconClose');

menuBtn?.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden', isHidden);
  iconClose.classList.toggle('hidden', !isHidden);
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// ===================== FAQ accordion =====================
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===================== Pricing toggle =====================
const toggleMonthly = document.getElementById('toggleMonthly');
const toggleAnnual = document.getElementById('toggleAnnual');
const priceNums = document.querySelectorAll('.price-num');
const priceSubs = document.querySelectorAll('.price-sub');
const pricePeriods = document.querySelectorAll('.price-period');

function setPricing(mode) {
  const isAnnual = mode === 'annual';
  toggleMonthly.classList.toggle('active', !isAnnual);
  toggleAnnual.classList.toggle('active', isAnnual);

  priceNums.forEach(el => {
    const value = isAnnual ? el.dataset.annual : el.dataset.monthly;
    el.textContent = '$' + value;
  });
  pricePeriods.forEach(el => { el.textContent = isAnnual ? '/yr' : '/mo'; });
  priceSubs.forEach(el => { el.textContent = isAnnual ? 'Billed annually (save 50%)' : 'Billed monthly'; });
}

toggleMonthly?.addEventListener('click', () => setPricing('monthly'));
toggleAnnual?.addEventListener('click', () => setPricing('annual'));

// ===================== Sticky header shadow =====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    header.classList.add('shadow-lg', 'shadow-black/30');
  } else {
    header.classList.remove('shadow-lg', 'shadow-black/30');
  }
});

// ===================== Scroll reveal =====================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  observer.observe(el);
});
