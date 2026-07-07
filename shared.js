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
}, { rootMargin: '-20% 0px -70% 0px' });

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
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  getOverlay().classList.remove('open');
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
    answer.style.maxHeight = (inner ? inner.scrollHeight : answer.scrollHeight) + 'px';
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});

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
    { href: 'juc.html',           label: 'JUC',     cls: 'active-juc'    },
    { href: 'spring.html',        label: 'Spring',  cls: 'active-spring' },
    { href: 'gc-principles.html', label: 'GC 原理', cls: 'active-g1'     },
    { href: 'mysql.html',         label: 'MySQL',   cls: 'active-mysql'  },
    { href: 'redis.html',         label: 'Redis',   cls: 'active-redis'  },
    { href: 'mq.html',            label: 'MQ',      cls: 'active-mq'     },
    { href: 'distributed.html',   label: '分布式',  cls: 'active-dist'   },
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
}, { rootMargin: '-15% 0px -75% 0px' });

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

/* ── Search overlay (Ctrl+K or /) ── */
(function () {
  // Build search index from current page
  function buildIndex() {
    const items = [];
    document.querySelectorAll('.subsection[id], .gc-section[id]').forEach(el => {
      if (el.id === 'overview') return;
      const titleEl = el.querySelector('.sub-title, .section-title');
      const title = titleEl ? titleEl.textContent.replace(/[●○◑▸·•]/g, '').trim() : '';
      const bodyEl = el.querySelector('.sub-body, .section-intro');
      const body = bodyEl ? bodyEl.textContent.trim().slice(0, 120) : '';
      if (title) items.push({ id: el.id, title, ctx: body });
    });
    document.querySelectorAll('.qa-item[id]').forEach(el => {
      const q = el.querySelector('.qa-q-text');
      if (q) items.push({ id: el.id, title: q.textContent.trim(), ctx: 'Q&A' });
    });
    return items;
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.innerHTML = `
    <div id="search-box">
      <input id="search-input" placeholder="搜索本页内容…" autocomplete="off" spellcheck="false">
      <div id="search-results"></div>
      <div id="search-hint">
        <span class="search-kbd"><kbd>↑</kbd><kbd>↓</kbd> 导航</span>
        <span class="search-kbd"><kbd>↵</kbd> 跳转</span>
        <span class="search-kbd"><kbd>Esc</kbd> 关闭</span>
        <span style="margin-left:auto;opacity:.6">Ctrl+K 或 /</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  let index = null, selIdx = 0;

  function open() {
    if (!index) index = buildIndex();
    overlay.classList.add('open');
    input.value = '';
    results.innerHTML = '';
    selIdx = 0;
    setTimeout(() => input.focus(), 30);
  }
  function close() { overlay.classList.remove('open'); }

  function render(q) {
    const q2 = q.trim().toLowerCase();
    const matches = q2.length < 1 ? [] :
      index.filter(it => it.title.toLowerCase().includes(q2) || it.ctx.toLowerCase().includes(q2)).slice(0, 12);
    if (!matches.length) {
      results.innerHTML = q2 ? '<div class="search-empty">无匹配结果</div>' : '';
      return;
    }
    results.innerHTML = matches.map((m, i) => `
      <a class="search-item${i === selIdx ? ' selected' : ''}" href="#${m.id}" data-idx="${i}">
        <div class="search-item-title">${highlight(m.title, q)}</div>
        <div class="search-item-ctx">${highlight(m.ctx, q)}</div>
      </a>`).join('');
    results.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => close());
    });
  }

  input.addEventListener('input', () => { selIdx = 0; render(input.value); });
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.search-item');
    if (e.key === 'ArrowDown')      { selIdx = Math.min(selIdx + 1, items.length - 1); }
    else if (e.key === 'ArrowUp')   { selIdx = Math.max(selIdx - 1, 0); }
    else if (e.key === 'Enter' && items[selIdx]) { items[selIdx].click(); close(); return; }
    else if (e.key === 'Escape')    { close(); return; }
    items.forEach((el, i) => el.classList.toggle('selected', i === selIdx));
    if (items[selIdx]) items[selIdx].scrollIntoView({ block: 'nearest' });
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
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
  btn.innerHTML = '&#9776;';
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
