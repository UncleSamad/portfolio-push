// Reveal-on-scroll
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .drive-in');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Road hero scroll-driven "driving down the road" effect
  const roadHero = document.querySelector('.road-hero');
  const roadScene = document.querySelector('.road-scene');
  if (roadHero && roadScene) {
    let ticking = false;
    const updateRoad = () => {
      const rect = roadHero.getBoundingClientRect();
      const scrollable = roadHero.offsetHeight - window.innerHeight;
      let progress = scrollable > 0 ? -rect.top / scrollable : 0;
      progress = Math.min(1, Math.max(0, progress));
      roadScene.style.setProperty('--p', progress);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateRoad);
        ticking = true;
      }
    }, { passive: true });
    updateRoad();
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.cssText += open ? '' : 'position:absolute; top:70px; left:0; right:0; background:var(--cream); flex-direction:column; padding:24px 40px; border-bottom:1px solid var(--line); gap:20px;';
    });
  }

  // Contact form (static demo — no backend)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) note.textContent = "Thanks — this form isn't wired to a backend yet. Email samuelobioradxn@gmail.com directly for now.";
    });
  }
});
