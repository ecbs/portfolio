(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  var sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var icon = document.createElement('span');
  icon.className = 'theme-icon';
  btn.appendChild(icon);

  function updateIcon(animate) {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? sunIcon : moonIcon;

    if (!animate) {
      icon.innerHTML = next;
      return;
    }

    // Scale down
    icon.style.transform = 'scale(0) rotate(90deg)';
    icon.style.opacity = '0';

    setTimeout(function () {
      icon.innerHTML = next;
      // Force reflow
      icon.offsetWidth;
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.opacity = '1';
    }, 180);
  }

  btn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcon(true);
  });

  updateIcon(false);

  var nav = document.querySelector('.site-nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
