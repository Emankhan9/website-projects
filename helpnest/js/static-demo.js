/*
 * HelpNest — static demo layer
 * The original project is PHP + MySQL. This static build was rendered with sample data
 * so the UI can be browsed on GitHub Pages. This script stubs out server calls and
 * form submissions so the pages behave sensibly without a backend.
 */
(function () {
  'use strict';
  var ROOT = window.HN_ROOT || '';
  var PAGE = window.HN_PAGE || '';

  // ── Toast ─────────────────────────────────────────────────────────────
  function toast(msg) {
    var t = document.getElementById('hn-demo-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'hn-demo-toast';
      t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);' +
        'background:#5B4636;color:#fff;padding:12px 20px;border-radius:12px;font:500 14px Poppins,Arial,sans-serif;' +
        'box-shadow:0 10px 30px rgba(0,0,0,.2);z-index:2147483647;opacity:0;transition:all .25s;max-width:calc(100% - 32px);text-align:center;';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(function () { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 2800);
  }
  window.HNDemoToast = toast;
  var DEMO_MSG = 'Static demo — this action needs the PHP backend.';

  // ── fetch() stubs for backend endpoints ───────────────────────────────
  var sent = [];
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  function json(data, ok) {
    return Promise.resolve(new Response(JSON.stringify(data), {
      status: ok === false ? 404 : 200, headers: { 'Content-Type': 'application/json' }
    }));
  }
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (/get_messages/.test(url)) return json((window.HN_CHAT || []).concat(sent));
    if (/send_message/.test(url)) {
      var msg = '';
      try { msg = init && init.body && init.body.get ? init.body.get('message') : ''; } catch (e) {}
      var d = new Date();
      sent.push({ message: msg, is_sent: true, created_at: d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }) });
      return json({ status: 'success' });
    }
    if (/get_csrf_token/.test(url)) return json({ token: 'static-demo-token' });
    if (/get_badge_counts/.test(url)) return json(null, false);
    if (/save-user-location/.test(url)) return json({ status: 'success' });
    if (url === '#' || /\.php(\?|$)/.test(url)) return json({ status: 'error', msg: DEMO_MSG }, false);
    return realFetch ? realFetch(input, init) : Promise.reject(new Error('fetch unavailable'));
  };

  // ── Demo navigation for auth flows ────────────────────────────────────
  function go(p) { window.location.href = ROOT + p; }
  var FLOW = {
    'common/login.html': function (form) {
      var r = form.querySelector('[name="role"]');
      go(r && r.value === 'housekeeper' ? 'housekeeper/dashboard/housekeeper-dashboard.html' : 'user/dashboard/user-dashboard.html');
    },
    'common/register.html': function () { go('common/verify_otp.html'); },
    'common/verify_otp.html': function () { go('common/login.html'); },
    'common/forgot_password.html': function () { go('common/verify_forgot_otp.html'); },
    'common/verify_forgot_otp.html': function () { go('common/reset_password.html'); },
    'common/reset_password.html': function () { go('common/login.html'); },
    'admin/login.html': function () { go('admin/dashboard.html'); },
    'admin/admin_forgot_password.html': function () { go('admin/admin_verify_otp.html'); },
    'admin/admin_verify_otp.html': function () { go('admin/admin_reset_password.html'); },
    'admin/admin_reset_password.html': function () { go('admin/login.html'); }
  };

  function isLocalHtmlGet(form) {
    var a = form.getAttribute('action') || '';
    var m = (form.getAttribute('method') || 'get').toLowerCase();
    return m === 'get' && /\.html(\?|$)/.test(a);
  }

  function handle(form, e) {
    if (isLocalHtmlGet(form)) return false;    // filter forms that just reload a static page
    if (e) e.preventDefault();
    if (FLOW[PAGE] && !form.closest('[data-no-flow]')) {
      toast('Demo mode — continuing without a server…');
      setTimeout(function () { FLOW[PAGE](form); }, 700);
    } else {
      toast(DEMO_MSG);
    }
    return true;
  }

  document.addEventListener('submit', function (e) { handle(e.target, e); }, true);

  var nativeSubmit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () {
    if (!handle(this, null)) nativeSubmit.call(this);
  };

  // ── Floating "demo views" switcher so visitors can reach every role ─
  document.addEventListener('DOMContentLoaded', function () {
    if (window.HN_NO_DEMO_BAR) return;
    var wrap = document.createElement('div');
    wrap.id = 'hn-demo-bar';
    wrap.innerHTML =
      '<button type="button" aria-expanded="false" style="all:unset;cursor:pointer;background:#7C9473;color:#fff;' +
      'font:600 12px Poppins,Arial,sans-serif;padding:9px 14px;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.18);">Demo views</button>' +
      '<div hidden style="position:absolute;right:0;bottom:44px;background:#fff;border-radius:14px;padding:8px;min-width:200px;' +
      'box-shadow:0 12px 32px rgba(0,0,0,.18);font:500 13px Poppins,Arial,sans-serif;">' +
      [['Public site', 'index.html'], ['User dashboard', 'user/dashboard/user-dashboard.html'],
       ['Housekeeper dashboard', 'housekeeper/dashboard/housekeeper-dashboard.html'], ['Admin panel', 'admin/dashboard.html']]
        .map(function (l) { return '<a href="' + ROOT + l[1] + '" style="display:block;padding:9px 12px;border-radius:9px;color:#5B4636;text-decoration:none;">' + l[0] + '</a>'; }).join('') +
      '</div>';
    wrap.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483646;';
    document.body.appendChild(wrap);
    var btn = wrap.querySelector('button'), menu = wrap.querySelector('div');
    btn.addEventListener('click', function () { menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden)); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
  });

  // ── helpers.html: category / search filtering done client-side ────────
  if (PAGE === 'helpers.html') {
    document.addEventListener('DOMContentLoaded', function () {
      var qs = new URLSearchParams(location.search);
      var cat = (qs.get('category') || '').trim();
      var q = (qs.get('search') || '').trim();
      var h1 = document.querySelector('.page-header h1') || document.querySelector('h1');
      var cards = Array.prototype.slice.call(document.querySelectorAll('.helper-card'));
      var needle = (cat || q).toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var catEl = c.querySelector('.helper-category');
        var hay = cat ? (catEl ? catEl.textContent : '') : c.textContent;
        var ok = !needle || hay.toLowerCase().indexOf(needle) !== -1;
        c.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (h1) h1.textContent = cat ? cat + ' Experts' : (q ? 'Search results for: ' + q : 'All Helpers');
      document.title = (cat || q || 'All Helpers') + ' | HelpNest';
      var grid = document.querySelector('.helpers-grid');
      if (grid && !shown) {
        var e = document.createElement('div');
        e.className = 'empty-state';
        e.innerHTML = '<i class="fa-solid fa-user-slash" style="font-size:3rem;margin-bottom:14px;"></i>' +
          '<h3>No helpers found</h3><p>Try a different category or search term</p>' +
          '<a href="explore.html"><i class="fa-solid fa-compass"></i> Back to Explore</a>';
        grid.appendChild(e);
      }
    });
  }
})();
