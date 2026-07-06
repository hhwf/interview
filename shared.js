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
  if (item) item.classList.toggle('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});

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

/* ── 3. Code block copy button ── */
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
