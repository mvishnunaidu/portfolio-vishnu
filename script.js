// ============================================================
// Typed role text
// ============================================================
(function typedRole(){
  const el = document.getElementById('typedRole');
  if(!el) return;
  const roles = [
    'Aspiring Machine Learning Engineer',
    'Aspiring GenAI / RAG Systems Builder',
    'Aspiring Full-Stack Python Developer',
    'Aspiring Software Engineer'
  ];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){ el.textContent = roles[0]; return; }
  let r=0,c=0,deleting=false;
  function tick(){
    const word = roles[r];
    if(!deleting){
      c++; el.textContent = word.slice(0,c);
      if(c===word.length){ deleting=true; setTimeout(tick,1400); return; }
    } else {
      c--; el.textContent = word.slice(0,c);
      if(c===0){ deleting=false; r=(r+1)%roles.length; }
    }
    setTimeout(tick, deleting?32:52);
  }
  tick();
})();

// ============================================================
// Theme toggle (persists for the session)
// ============================================================
(function themeToggle(){
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const stored = sessionStorage.getItem('vvn-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(stored){ root.setAttribute('data-theme', stored); }
  else if(prefersDark){ root.setAttribute('data-theme','dark'); }

  btn?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    try{ sessionStorage.setItem('vvn-theme', isDark ? 'light' : 'dark'); }catch(e){}
  });
})();

// ============================================================
// Scroll reveal
// ============================================================
(function scrollReveal(){
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if(!('IntersectionObserver' in window)){ items.forEach(i=>i.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold:.15, rootMargin:'0px 0px -60px 0px' });
  items.forEach((item,idx)=>{
    item.style.transitionDelay = Math.min(idx%3,2)*80 + 'ms';
    io.observe(item);
  });
})();

// ============================================================
// Intro screen
// ============================================================
(function introScreen(){
  window.addEventListener('load', () => {
    const intro = document.getElementById('intro-screen');
    if (intro) {
      setTimeout(() => {
        intro.classList.add('hidden');
        // Let scrollReveal recalculate or just naturally trigger when intro is done
        window.dispatchEvent(new Event('scroll'));
      }, 1100);
    }
  });
})();

// ============================================================
// Contact form -> opens email client with prefilled message
// ============================================================
(function contactForm(){
  const form = document.getElementById('contactForm');
  const note = document.getElementById('cfNote');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#cf-name').value.trim();
    const email = form.querySelector('#cf-email').value.trim();
    const subject = form.querySelector('#cf-subject').value.trim();
    const message = form.querySelector('#cf-message').value.trim();
    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:mvishnunaidu7@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    if(note){ note.textContent = 'Opening your email app to send this…'; }
  });
})();

// ============================================================
// Mobile nav
// ============================================================
(function mobileNav(){
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if(!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    links.style.display = open ? 'flex' : 'none';
    links.style.cssText += `
      position:absolute; top:100%; left:0; right:0;
      flex-direction:column; gap:0; background:var(--surface);
      border-bottom:1px solid var(--border); padding: 8px 0;
    `;
  });
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{ if(window.innerWidth<=900) links.style.display='none'; });
  });
})();

// ============================================================
// Project filtering
// ============================================================
(function projectFilters(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if(!filterBtns.length || !projectCards.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      
      const projGrid = document.querySelector('.project-grid');
      const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
      if(projGrid && projGrid.classList.contains('compact-mobile')) {
        projGrid.classList.remove('compact-mobile');
        if(viewMoreBtn) viewMoreBtn.parentElement.style.display = 'none';
      }
      
      const solarnetCard = document.getElementById('solarnet-card');
      if (solarnetCard) {
        if (filterValue === 'all') {
          solarnetCard.classList.add('featured');
        } else {
          solarnetCard.classList.remove('featured');
        }
      }

      projectCards.forEach(card => {
        if(filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();

// ============================================================
// View More Projects (Mobile)
// ============================================================
(function viewMoreProjects(){
  const btn = document.getElementById('viewMoreProjectsBtn');
  const grid = document.querySelector('.project-grid');
  if(!btn || !grid) return;
  btn.addEventListener('click', () => {
    grid.classList.remove('compact-mobile');
    btn.parentElement.style.display = 'none';
  });
})();

// ============================================================
// Smart Sticky Header
// ============================================================
(function smartHeader(){
  const header = document.getElementById('nav');
  if(!header) return;
  
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      header.style.transform = 'translateY(0)';
      return;
    }
    if (currentScroll > lastScroll && currentScroll > 60) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        header.style.transform = 'translateY(-100%)';
      }
    });
  });
})();

