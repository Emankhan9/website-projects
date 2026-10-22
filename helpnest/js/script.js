// ===============================
// 🌿 HELPNEST - SCRIPT.JS (FINAL)
// ===============================

// ===============================
// 📱 HAMBURGER — toggles #mainNav
// #mainNav is direct body child = no z-index conflict
// ===============================
function toggleMenu() {
  const nav     = document.getElementById('mainNav');
  const btn     = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  if (!nav || !btn) return;

  const isOpen = nav.classList.toggle('nav-open');
  btn.classList.toggle('open', isOpen);
  document.body.classList.toggle('nav-open', isOpen);
  if (overlay) overlay.classList.toggle('active', isOpen);
}

function closeMenu() {
  const nav     = document.getElementById('mainNav');
  const btn     = document.getElementById('hamburger');
  const overlay = document.getElementById('navOverlay');
  if (nav)     nav.classList.remove('nav-open');
  if (btn)     btn.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.classList.remove('nav-open');
}

document.addEventListener('DOMContentLoaded', function () {

  // Hamburger button click
  const btn = document.getElementById('hamburger');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Overlay click — close sidebar
  const overlay = document.getElementById('navOverlay');
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close when nav link clicked
  document.querySelectorAll('#mainNav a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

});

// ==========================================
// 👤 USER PROFILE DROPDOWN (desktop)
// ==========================================
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.toggle('active');
}

document.addEventListener('click', function (e) {
  const wrapper  = document.querySelector('.user-profile-wrapper');
  const dropdown = document.getElementById('userDropdown');
  if (!wrapper || !dropdown) return;
  if (!wrapper.contains(e.target)) dropdown.classList.remove('active');
});

// ===============================
// 🌄 Hero Background Slideshow
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const images = [
    (window.HN_ROOT||'') + 'assets/first.avif',
    (window.HN_ROOT||'') + 'assets/second.avif',
    (window.HN_ROOT||'') + 'assets/third.avif',
    (window.HN_ROOT||'') + 'assets/4.avif',
  ];
  let current = 0;

  function changeBackground() {
    hero.style.backgroundImage =
      'linear-gradient(135deg, rgba(91,70,54,0.65), rgba(40,28,20,0.60)), url("' + images[current] + '")';
    current = (current + 1) % images.length;
  }
  changeBackground();
  setInterval(changeBackground, 4000);
});

// ===============================
// 🔍 Search
// ===============================
function searchHelpers() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const query = input.value.trim();
  window.location.href = query
    ? (window.HN_ROOT||'') + 'helpers.html?search=' + encodeURIComponent(query)
    : (window.HN_ROOT||'') + 'explore.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    // ✅ Only bind on index.php hero search — NOT on explore.php
    // explore.php has its own inline doSearch() handler
    if (!document.querySelector('.explore-search')) {
      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') searchHelpers();
      });
    }
  }

  const steps = document.querySelectorAll('.how-it-works .step');
  if (steps[0]) steps[0].addEventListener('click', function () { window.location.href = (window.HN_ROOT||'') + 'common/register.html'; });
  if (steps[1]) steps[1].addEventListener('click', function () { window.location.href = (window.HN_ROOT||'') + 'explore.html'; });
  if (steps[2]) steps[2].addEventListener('click', function () { window.location.href = (window.HN_ROOT||'') + 'explore.html'; });
});
// ===============================
// 📊 Animated Stats Counter
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const stats = document.querySelectorAll('.stat strong');
  if (!stats.length) return;

  const minimums  = [50, 100, 4.8];
  const suffixes  = ['+', '+', '★'];
  const isDecimal = [false, false, true];

  stats.forEach(function (stat, index) {
    const realValue    = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
    const displayValue = Math.max(realValue, minimums[index]);
    const steps = 60, increment = displayValue / steps;
    let current = 0;
    const timer = setInterval(function () {
      current += increment;
      if (current >= displayValue) { current = displayValue; clearInterval(timer); }
      stat.textContent = isDecimal[index]
        ? current.toFixed(1) + suffixes[index]
        : Math.floor(current) + suffixes[index];
    }, 2000 / steps);
  });
});

// ===============================
// ✨ Typing Effect
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const line1 = 'Your Home Deserves', line2 = 'The Best Care';
  titleEl.innerHTML = '';
  let html1 = '', html2 = '', i = 0;

  function typeLine1() {
    if (i < line1.length) { html1 += line1.charAt(i++); titleEl.innerHTML = html1 + '<br><em></em>'; setTimeout(typeLine1, 70); }
    else { i = 0; setTimeout(typeLine2, 200); }
  }
  function typeLine2() {
    if (i < line2.length) { html2 += line2.charAt(i++); titleEl.innerHTML = html1 + '<br><em>' + html2 + '<span class="cursor">|</span></em>'; setTimeout(typeLine2, 70); }
    else { titleEl.innerHTML = html1 + '<br><em>' + html2 + '</em>'; }
  }
  typeLine1();
});