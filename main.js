// Плавное появление секций при скролле
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .news, .blog-item, .tag').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  io.observe(el);
});

// Кнопка "Показать на карте" — заглушка
document.querySelector('.btn--purple.btn--lg')?.addEventListener('click', () => {
  alert('Здесь будет карта санаториев');
});

// Простая маска для полей даты
document.querySelectorAll('input[placeholder="mm/dd/yyyy"]').forEach((input) => {
  input.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 4) v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
    else if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
  });
});

// ---------- Мобильное меню ----------
(function () {
  const burger  = document.querySelector('.burger');
  const menu    = document.getElementById('mobile-menu');
  const overlay = document.querySelector('.mobile-menu__overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');

  if (!burger || !menu || !overlay) return;

  const open = () => {
    menu.classList.add('is-open');
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  const close = () => {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    setTimeout(() => { overlay.hidden = true; }, 250);
  };

  burger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? close() : open();
  });
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', close);

  // Закрыть по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });

  // Закрыть при клике по любой ссылке внутри меню
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  // Если экран расширили — закрыть меню
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && menu.classList.contains('is-open')) close();
  });
})();