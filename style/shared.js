// Sidebar scroll spy
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active', 'active-g1');
        if (link.getAttribute('href') === '#' + id) {
          const isG1 = ['g1-heap','g1-satb','g1-rset','g1-cset','g1-evacuation','g1-young','g1-flow','interview-g1','q-g1-1','q-g1-2','q-g1-3','q-g1-4','q-g1-5','q-g1-6'].includes(id);
          link.classList.add(isG1 ? 'active-g1' : 'active');
        }
      });
    }
  });
}, { rootMargin: '-10% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

function getOverlay() {
  let el = document.getElementById('sidebar-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sidebar-overlay';
    el.className = 'sidebar-overlay';
    el.addEventListener('click', closeSidebar);
    document.body.appendChild(el);
  }
  return el;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const isOpen = sidebar.classList.toggle('open');
  getOverlay().classList.toggle('open', isOpen);
  const btn = document.getElementById('menuBtn');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  getOverlay().classList.remove('open');
  const btn = document.getElementById('menuBtn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function toggleQA(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const answer = item.querySelector('.qa-answer');
  if (!answer) return;
  const inner = answer.querySelector('.qa-answer-inner');
  if (item.classList.contains('open')) {
    answer.style.maxHeight = '0';
    item.classList.remove('open');
  } else {
    item.classList.add('open');
    item.classList.add('qa-read'); // mark as read (session-level)
    answer.style.maxHeight = (inner ? inner.scrollHeight : answer.scrollHeight) + 'px';
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});

/* ── Menu button: add missing accessibility attributes ── */
(function () {
  var btn = document.getElementById('menuBtn');
  if (!btn) return;
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', '打开菜单');
  btn.setAttribute('aria-expanded', 'false');
})();

/* ── Hero back-link: enlarge tap target on mobile ── */
(function () {
  if (!window.matchMedia('(max-width: 768px)').matches) return;
  document.querySelectorAll('.hero > div > a').forEach(function (a) {
    a.style.padding = '12px 16px';
    a.style.minHeight = '44px';
  });
})();
(function () {
  var startX = 0, startY = 0;
  document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dy) > Math.abs(dx) || Math.abs(dx) < 50) return;
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (startX < 30 && dx > 0 && !sidebar.classList.contains('open')) { toggleSidebar(); }
    else if (sidebar.classList.contains('open') && dx < 0) { closeSidebar(); }
  }, { passive: true });
})();

/* ── Sidebar home link ── */
(function () {
  var pt = document.querySelector('.page-tabs');
  if (!pt || document.querySelector('.sidebar-home')) return;
  var h = document.createElement('a');
  h.href = 'index.html';
  h.className = 'sidebar-home';
  h.innerHTML = '<span style="font-size:14px">&#8962;</span> 返回首页';
  pt.parentNode.insertBefore(h, pt);
})();

/* ── Page tabs (shared list, auto-highlights current page) ── */
(function () {
  var TABS = [
    { href: 'juc.html',           label: 'JUC',       cls: 'active-juc'    },
    { href: 'spring.html',        label: 'Spring',    cls: 'active-spring' },
    { href: 'gc-principles.html', label: 'GC 原理',   cls: 'active-g1'     },
    { href: 'mysql.html',         label: 'MySQL',     cls: 'active-mysql'  },
    { href: 'redis.html',         label: 'Redis',     cls: 'active-redis'  },
    { href: 'mq.html',            label: 'MQ',        cls: 'active-mq'     },
    { href: 'distributed.html',   label: '分布式',    cls: 'active-dist'   },
    { href: 'jvm.html',           label: 'JVM',       cls: 'active-jvm'    },
    { href: 'architecture.html',  label: '微服务&DDD', cls: 'active-arch'   },
  ];
  var container = document.querySelector('.page-tabs');
  if (!container) return;
  var current = window.location.pathname.split('/').pop().replace(/\?.*$/, '');
  container.innerHTML = TABS.map(function (t) {
    var active = t.href === current ? ' ' + t.cls : '';
    return '<a href="' + t.href + '" class="tab' + active + '">' + t.label + '</a>';
  }).join('');
})();

const subObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      subObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.subsection').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  subObserver.observe(el);
});

// Build right TOC
const tocNav = document.getElementById('toc-nav');
if (tocNav) {
  document.querySelectorAll('.gc-section').forEach(sec => {
    if (!sec.id || sec.id === 'overview') return;
    const h = sec.querySelector('.section-title');
    if (!h) return;
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    a.className = 'toc-link';
    a.textContent = h.textContent.trim().replace(/\s+/g, ' ');
    tocNav.appendChild(a);
    sec.querySelectorAll('.subsection[id]').forEach(sub => {
      const sh = sub.querySelector('.sub-title');
      if (!sh) return;
      const sa = document.createElement('a');
      sa.href = '#' + sub.id;
      sa.className = 'toc-link toc-sub';
      sa.textContent = sh.textContent.replace(/[●○◑▸·○●•]/g, '').trim().replace(/\s+/g, ' ');
      tocNav.appendChild(sa);
    });
  });
}

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('toc-active'));
      const a = document.querySelector('.toc-link[href="#' + entry.target.id + '"]');
      if (a) { a.classList.add('toc-active'); a.scrollIntoView({ block: 'nearest' }); }
    }
  });
}, { rootMargin: '-10% 0px -60% 0px' });

document.querySelectorAll('.gc-section[id], .subsection[id]').forEach(s => tocObserver.observe(s));

/* ── 3. Code block copy button + language label ── */
document.querySelectorAll('.arch-box').forEach(box => {
  const pre = box.querySelector('pre');
  if (!pre) return;
  const btn = document.createElement('button');
  btn.className = 'arch-copy-btn';
  btn.textContent = 'COPY';
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      btn.textContent = 'COPIED';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1600);
    }).catch(() => {
      // fallback for non-https / older browsers
      const ta = document.createElement('textarea');
      ta.value = pre.textContent.trim();
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = 'COPIED'; btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1600);
    });
  });
  box.appendChild(btn);

  // Language label
  const isJava = /\b(public|class|void|return|synchronized|new |import )\b/.test(pre.textContent);
  const isShell = /^\s*\$\s|^\s*sudo\s|^\s*apt-get\s|^\s*brew\s|^\s*curl\s/m.test(pre.textContent);
  const lang = pre.className.match(/language-(\w+)/);
  const label = lang ? lang[1].toUpperCase() : (isJava ? 'JAVA' : (isShell ? 'SHELL' : ''));
  if (label) {
    const el = document.createElement('span');
    el.className = 'code-lang-label';
    el.textContent = label;
    box.appendChild(el);
  }
});

/* ── 1. Back to top button ── */
(function () {
  const btn = document.createElement('button');
  btn.id = 'back-top-btn';
  btn.title = '返回顶部';
  btn.innerHTML = '&#8679;'; // ↑
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.7);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── 4. Reading progress bar ── */
(function () {
  const bar = document.createElement('div');
  bar.id = 'read-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ── 5. QA Expand / Collapse All ── */
(function () {
  var lists = document.querySelectorAll('.qa-list');
  lists.forEach(function (list) {
    var items = list.querySelectorAll('.qa-item');
    if (items.length < 3) return;
    var btn = document.createElement('button');
    btn.className = 'qa-toggle-all';
    btn.innerHTML = '<span class="toggle-icon">&#9654;</span> 全部展开';
    btn.addEventListener('click', function () {
      var anyClosed = Array.from(items).some(function (item) { return !item.classList.contains('open'); });
      items.forEach(function (item) {
        var answer = item.querySelector('.qa-answer');
        if (!answer) return;
        var inner = answer.querySelector('.qa-answer-inner');
        if (anyClosed) {
          item.classList.add('open');
          answer.style.maxHeight = (inner ? inner.scrollHeight : answer.scrollHeight) + 'px';
        } else {
          item.classList.remove('open');
          answer.style.maxHeight = '0';
        }
      });
      btn.classList.toggle('expanded', anyClosed);
      btn.innerHTML = anyClosed
        ? '<span class="toggle-icon">&#9654;</span> 全部收起'
        : '<span class="toggle-icon">&#9654;</span> 全部展开';
    });
    list.parentNode.insertBefore(btn, list);
  });
})();

/* ── Dark mode toggle ── */
(function () {
  const DARK_KEY = 'interview-dark';
  const html = document.documentElement;

  // Apply saved preference immediately (before paint)
  const saved = localStorage.getItem(DARK_KEY);
  if (saved === 'dark') html.setAttribute('data-theme', 'dark');

  // Inject toggle button into sidebar-logo
  const logo = document.querySelector('.sidebar-logo');
  if (!logo) return;
  const btn = document.createElement('button');
  btn.id = 'dark-toggle';
  btn.title = '切换深色模式';
  const isDark = () => html.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark() ? '☀' : '☽';
  btn.addEventListener('click', () => {
    const dark = !isDark();
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem(DARK_KEY, dark ? 'dark' : 'light');
    btn.textContent = dark ? '☀' : '☽';
  });
  logo.appendChild(btn);
})();

/* ── Search overlay (Ctrl+K or /) — cross-page when search-data.js is loaded ── */
(function () {
  var PAGE_COLORS = {
    'juc.html':           '#4f46e5',
    'spring.html':        '#0369a1',
    'gc-principles.html': '#16a34a',
    'mysql.html':         '#0e7490',
    'redis.html':         '#dc2626',
    'mq.html':            '#d97706',
    'distributed.html':   '#7c3aed',
    'jvm.html':           '#0d9488',
  };

  var currentPage = window.location.pathname.split('/').pop().replace(/\?.*$/, '') || 'index.html';

  function buildLocalIndex() {
    var items = [];
    document.querySelectorAll('.subsection[id], .gc-section[id]').forEach(function(el) {
      if (el.id === 'overview') return;
      var titleEl = el.querySelector('.sub-title, .section-title');
      var title = titleEl ? titleEl.textContent.replace(/[●○◑▸·•]/g, '').trim() : '';
      var bodyEl = el.querySelector('.sub-body, .section-intro');
      var ctx = bodyEl ? bodyEl.textContent.trim().slice(0, 100) : '';
      if (title) items.push({ page: currentPage, id: el.id, title: title, ctx: ctx });
    });
    document.querySelectorAll('.qa-item[id]').forEach(function(el) {
      var q = el.querySelector('.qa-q-text');
      if (q) items.push({ page: currentPage, id: el.id, title: q.textContent.trim(), ctx: 'Q&A' });
    });
    return items;
  }

  function buildIndex() {
    if (window.SEARCH_INDEX) {
      // Local page items first (fresh from DOM), then remote pages from static index
      var remote = window.SEARCH_INDEX.filter(function(it) { return it.page !== currentPage; });
      return buildLocalIndex().concat(remote);
    }
    return buildLocalIndex();
  }

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function highlight(text, q) {
    if (!q) return esc(text);
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return esc(text).replace(re, '<mark>$1</mark>');
  }

  function badge(item) {
    var label = item.label || (item.page ? item.page.replace('.html','') : '');
    var color = PAGE_COLORS[item.page] || '#6b7280';
    var isLocal = item.page === currentPage;
    var style = 'font-family:var(--fm);font-size:9px;font-weight:700;padding:1px 7px;border-radius:10px;'
      + 'background:' + color + (isLocal ? '28' : '18') + ';color:' + color + ';'
      + 'border:1px solid ' + color + '44;flex-shrink:0;margin-right:8px;white-space:nowrap';
    return '<span style="' + style + '">' + label + '</span>';
  }

  function makeHref(item) {
    return item.page === currentPage ? '#' + item.id : item.page + '#' + item.id;
  }

  var overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML =
    '<div id="search-box">'
    + '<input id="search-input" placeholder="全站搜索…" autocomplete="off" spellcheck="false">'
    + '<div id="search-results"></div>'
    + '<div id="search-hint">'
    + '<span class="search-kbd"><kbd>↑</kbd><kbd>↓</kbd> 导航</span>'
    + '<span class="search-kbd"><kbd>↵</kbd> 跳转</span>'
    + '<span class="search-kbd"><kbd>Esc</kbd> 关闭</span>'
    + '<span style="margin-left:auto;opacity:.6">Ctrl+K 或 /</span>'
    + '</div></div>';
  document.body.appendChild(overlay);
  window.openSearch = open; // exposed for index.html search trigger

  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var index = null, selIdx = 0;

  function open() {
    if (!index) index = buildIndex();
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    selIdx = 0;
    setTimeout(function() { input.focus(); }, 30);
  }
  function close() { overlay.classList.remove('open'); }

  function render(q) {
    var q2 = q.trim().toLowerCase();
    if (q2.length < 1) { results.innerHTML = ''; return; }
    var matches = index.filter(function(it) {
      return it.title.toLowerCase().includes(q2) || it.ctx.toLowerCase().includes(q2);
    }).slice(0, 15);
    if (!matches.length) { results.innerHTML = '<div class="search-empty">无匹配结果</div>'; return; }
    results.innerHTML = matches.map(function(m, i) {
      var ctxHtml = m.ctx === 'Q&A'
        ? '<span style="color:var(--accent);font-size:10px">Q&amp;A</span>'
        : highlight(m.ctx, q);
      return '<a class="search-item' + (i === selIdx ? ' selected' : '') + '" href="' + makeHref(m) + '" data-idx="' + i + '">'
        + '<div class="search-item-title" style="display:flex;align-items:center;gap:0">' + badge(m) + highlight(m.title, q) + '</div>'
        + '<div class="search-item-ctx">' + ctxHtml + '</div>'
        + '</a>';
    }).join('');
    results.querySelectorAll('.search-item').forEach(function(el) {
      el.addEventListener('click', function() { close(); });
    });
  }

  input.addEventListener('input', function() { selIdx = 0; render(input.value); });
  input.addEventListener('keydown', function(e) {
    var items = results.querySelectorAll('.search-item');
    if (e.key === 'ArrowDown')     { selIdx = Math.min(selIdx + 1, items.length - 1); }
    else if (e.key === 'ArrowUp')  { selIdx = Math.max(selIdx - 1, 0); }
    else if (e.key === 'Enter' && items[selIdx]) { items[selIdx].click(); close(); return; }
    else if (e.key === 'Escape')   { close(); return; }
    items.forEach(function(el, i) { el.classList.toggle('selected', i === selIdx); });
    if (items[selIdx]) items[selIdx].scrollIntoView({ block: 'nearest' });
  });

  overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    if (e.key === '/' && !overlay.classList.contains('open') &&
        !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault(); open();
    }
  });
})();

/* ── Syntax highlighting (Prism.js via CDN) ── */
(function () {
  // Detect if any arch-pre looks like Java/shell code
  const pres = document.querySelectorAll('.arch-pre');
  const hasCode = Array.from(pres).some(p =>
    /\b(public|private|class|void|return|synchronized|new |import |@|if \(|for \()\b/.test(p.textContent)
  );
  if (!hasCode) return; // pure ASCII diagrams don't need highlighting

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
  script.onload = () => {
    const autoloader = document.createElement('script');
    autoloader.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js';
    document.head.appendChild(autoloader);
    autoloader.onload = () => {
      pres.forEach(pre => {
        if (!pre.className.includes('language-')) {
          // Auto-detect: Java keywords → language-java, else leave plain
          const isJava = /\b(public|class|void|return|synchronized|new |import )\b/.test(pre.textContent);
          if (isJava) pre.classList.add('language-java');
        }
      });
      if (window.Prism) window.Prism.highlightAll();
    };
  };
  document.head.appendChild(script);
})();

/* ── 6. Floating TOC toggle button (tablet / mobile) ── */
(function () {
  var tocNav = document.getElementById('toc-nav');
  if (!tocNav) return;
  var btn = document.createElement('button');
  btn.id = 'toc-toggle-btn';
  btn.title = '目录';
  btn.innerHTML = '目录';
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('toc-open');
  });
  document.body.appendChild(btn);
  document.addEventListener('click', function (e) {
    if (!document.body.classList.contains('toc-open')) return;
    var panel = document.querySelector('.toc-panel');
    if (panel && !panel.contains(e.target) && e.target !== btn) {
      document.body.classList.remove('toc-open');
    }
  });
})();
