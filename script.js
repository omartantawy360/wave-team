// Wave — interactions

// Navbar scroll state
const nav = document.getElementById('navbar');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Services
const services = [
  { icon: '◐', title: 'Landing Pages', desc: 'High-converting one-pagers built for launches, campaigns and product reveals.' },
  { icon: '◧', title: 'Business Websites', desc: 'Polished marketing sites with CMS-ready content and clear conversion flows.' },
  { icon: '◇', title: 'Portfolio Websites', desc: 'Distinctive portfolios for studios, creators and freelancers that stand out.' },
  { icon: '▦', title: 'Dashboard UI', desc: 'Data-dense product interfaces — charts, tables, settings, in any density.' },
  { icon: '⌬', title: 'Responsive Design', desc: 'Mobile-first layouts that scale fluidly from 320px to ultrawide.' },
  { icon: '⟨/⟩', title: 'Front-End Development', desc: 'Hand-crafted HTML, CSS, JavaScript & Tailwind — no template bloat.' },
];
document.getElementById('services-grid').innerHTML = services.map((s, i) => `
  <div class="glass-card p-8 reveal" style="transition-delay:${i*60}ms">
    <div class="text-3xl text-cyan font-display">${s.icon}</div>
    <h3 class="mt-5 font-display text-xl font-semibold">${s.title}</h3>
    <p class="mt-3 text-sm text-white/55 leading-relaxed">${s.desc}</p>
    <div class="mt-6 h-px bg-gradient-to-r from-cyan/40 to-transparent"></div>
    <span class="mt-4 inline-block text-xs uppercase tracking-widest text-white/40">0${i+1}</span>
  </div>
`).join('');

// Projects
const projects = [
  { img: 'assets/project-1.jpg', title: 'Nimbus Analytics', desc: 'A real-time analytics dashboard with custom data viz components.', tech: ['HTML','Tailwind','JavaScript','Chart.js'] },
  { img: 'assets/project-2.jpg', title: 'Aurora Commerce', desc: 'Headless e-commerce front end with motion-rich product showcases.', tech: ['HTML','Tailwind','JavaScript'] },
  { img: 'assets/project-3.jpg', title: 'Helix Studio', desc: 'Editorial portfolio for a creative studio — bold type, smooth scroll.', tech: ['HTML','CSS','JavaScript'] },
  { img: 'assets/project-4.jpg', title: 'Tide Banking', desc: 'Mobile-first marketing site for a modern neobank.', tech: ['HTML','Tailwind','Bootstrap'] },
];
document.getElementById('projects-grid').innerHTML = projects.map(p => `
  <article class="glass-card project-card reveal group">
    <div class="aspect-[16/10] overflow-hidden border-b border-white/5">
      <img src="${p.img}" alt="${p.title}" loading="lazy" class="w-full h-full object-cover" />
    </div>
    <div class="p-7">
      <h3 class="font-display text-xl font-semibold">${p.title}</h3>
      <p class="mt-2 text-sm text-white/55 leading-relaxed">${p.desc}</p>
      <div class="mt-5 flex flex-wrap gap-2">
        ${p.tech.map(t => `<span class="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">${t}</span>`).join('')}
      </div>
      <div class="mt-6 flex gap-3">
        <a href="#" class="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-cyan to-blue text-ink font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition">Live Demo ↗</a>
        <a href="#" class="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition">GitHub</a>
      </div>
    </div>
  </article>
`).join('');

// Tech
const tech = [
  { name: 'HTML', icon: '🅷' },
  { name: 'CSS', icon: '🅒' },
  { name: 'JavaScript', icon: '𝐉𝐒' },
  { name: 'Tailwind CSS', icon: '〜' },
  { name: 'Bootstrap', icon: '𝐁' },
  { name: 'GitHub', icon: '⌥' },
];
document.getElementById('tech-grid').innerHTML = tech.map((t, i) => `
  <div class="tech-pill reveal" style="transition-delay:${i*50}ms">
    <div class="icon gradient-text">${t.icon}</div>
    <div class="text-sm text-white/80">${t.name}</div>
  </div>
`).join('');

// Team
const team = [
  { name: 'Sara Hadid', role: 'Lead Designer', initials: 'SH' },
  { name: 'Omar Khalil', role: 'Front-End Engineer', initials: 'OK' },
  { name: 'Lina Farouk', role: 'UI Developer', initials: 'LF' },
  { name: 'Yusuf Adel', role: 'Motion & Interaction', initials: 'YA' },
];
document.getElementById('team-grid').innerHTML = team.map((m, i) => `
  <div class="glass-card p-7 text-center reveal" style="transition-delay:${i*70}ms">
    <div class="relative mx-auto h-24 w-24 rounded-full grid place-items-center bg-gradient-to-br from-cyan/30 to-blue/30 border border-white/10 font-display text-2xl">
      ${m.initials}
      <span class="absolute inset-0 rounded-full bg-cyan/20 blur-2xl -z-10"></span>
    </div>
    <h3 class="mt-5 font-semibold">${m.name}</h3>
    <p class="text-sm text-white/50">${m.role}</p>
    <div class="mt-5 flex justify-center gap-3 text-white/40">
      <a href="#" class="h-8 w-8 grid place-items-center rounded-full border border-white/10 hover:text-cyan hover:border-cyan/40 transition">in</a>
      <a href="#" class="h-8 w-8 grid place-items-center rounded-full border border-white/10 hover:text-cyan hover:border-cyan/40 transition">𝕏</a>
      <a href="#" class="h-8 w-8 grid place-items-center rounded-full border border-white/10 hover:text-cyan hover:border-cyan/40 transition">⌘</a>
    </div>
  </div>
`).join('');

// Testimonials
const testimonials = [
  { quote: 'Wave shipped our marketing site in three weeks and it outperformed every benchmark we set.', name: 'Mira Chen', role: 'CEO, Northwind' },
  { quote: 'The most detail-obsessed front-end team we\'ve worked with. The interface just feels right.', name: 'David Park', role: 'Head of Product, Lumen' },
  { quote: 'Pixel-perfect, fast, and a pleasure to collaborate with. We hired them again the same quarter.', name: 'Elena Rossi', role: 'Founder, Atlas Studio' },
];
document.getElementById('testimonials-grid').innerHTML = testimonials.map((t, i) => `
  <div class="glass-card p-8 reveal" style="transition-delay:${i*70}ms">
    <div class="text-cyan text-3xl font-display leading-none">"</div>
    <p class="mt-3 text-white/80 leading-relaxed text-[15px]">${t.quote}</p>
    <div class="mt-7 pt-5 border-t border-white/5">
      <div class="font-semibold text-sm">${t.name}</div>
      <div class="text-xs text-white/50 mt-0.5">${t.role}</div>
    </div>
  </div>
`).join('');

// Re-observe newly injected reveal elements
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.classList.remove('hidden');
  e.target.reset();
  setTimeout(() => status.classList.add('hidden'), 4000);
});
