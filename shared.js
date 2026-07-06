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

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function toggleQA(id) {
  const item = document.getElementById(id);
  if (item) item.classList.toggle('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
  });
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
