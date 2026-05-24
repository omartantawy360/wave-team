// Wave — interactions & data rendering

// --- CUSTOM CURSOR & GLOW BLOB ---
const cursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".custom-cursor-dot");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Create mouse glow blob background dynamically
const glowBlob = document.createElement("div");
glowBlob.className = "mouse-glow-blob";
document.body.appendChild(glowBlob);

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Show cursor upon first movement
  if (cursor && cursor.style.opacity !== "1") {
    cursor.style.opacity = "1";
  }

  // Update dot position immediately
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }

  // Update glow blob position immediately
  if (glowBlob) {
    glowBlob.style.left = `${mouseX}px`;
    glowBlob.style.top = `${mouseY}px`;
  }
});

// Interpolation for smooth cursor trailing
function animateCursor() {
  const ease = 0.15;
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;

  if (cursor) {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Initialize hover states for cursor using event delegation
function initCursorHoverListeners() {
  document.addEventListener("mouseover", (e) => {
    const hoverable = e.target.closest(
      "a, button, input, textarea, .glass-card, .tech-pill, #menu-toggle, .projects-carousel-btn",
    );
    if (hoverable) {
      cursor?.classList.add("hovered");
    } else {
      cursor?.classList.remove("hovered");
    }
  });

  document.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.opacity = "0";
    if (cursorDot) cursorDot.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (cursor) cursor.style.opacity = "1";
    if (cursorDot) cursorDot.style.opacity = "1";
  });
}

// --- NAVBAR & SCROLL PROGRESS ---
const nav = document.getElementById("navbar");
const scrollProgress = document.getElementById("scroll-progress");

const onScroll = () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  if (scrollProgress) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    scrollProgress.style.width = `${percentage}%`;
  }
};
document.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
mobileMenu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => mobileMenu.classList.add("hidden")));

// Reveal-on-scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// --- DATA RENDERING ---

// Services Data (Using premium SVG icons)
const services = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    title: "Landing Pages",
    desc: "High-converting one-pagers built for launches, campaigns and product reveals.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    title: "Business Websites",
    desc: "Polished marketing sites with CMS-ready content and clear conversion flows.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    title: "Portfolio Websites",
    desc: "Distinctive portfolios for studios, creators and freelancers that stand out.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>`,
    title: "Dashboard UI",
    desc: "Data-dense product interfaces — charts, tables, settings, in any density.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="14" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><rect x="8" y="14" width="8" height="8" rx="1" ry="1"/></svg>`,
    title: "Responsive Design",
    desc: "Mobile-first layouts that scale fluidly from 320px to ultrawide.",
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: "Front-End Development",
    desc: "Hand-crafted HTML, CSS, JavaScript & Tailwind — no template bloat.",
  },
];

function renderServices(lang) {
  const t = translations[lang] || translations.en;
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  grid.innerHTML = services
    .map(
      (s, i) => `
    <div class="glass-card p-8 reveal group" style="transition-delay:${i * 60}ms">
      <div class="text-3xl text-cyan font-display group-hover:scale-110 transition-all duration-300 w-fit">${s.icon}</div>
      <h3 class="mt-5 font-display text-xl font-semibold group-hover:text-cyan transition-colors duration-300">${t[`service-${i + 1}-title`] || s.title}</h3>
      <p class="mt-3 text-sm leading-relaxed">${t[`service-${i + 1}-desc`] || s.desc}</p>
      <div class="mt-6 h-px bg-gradient-to-r from-cyan/40 to-transparent group-hover:from-cyan/80 transition-all duration-500"></div>
      <span class="mt-4 inline-block text-xs uppercase tracking-widest" style="color:var(--text-muted)">0${i + 1}</span>
    </div>
  `,
    )
    .join("");
  grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/*
  PROJECTS
  - Edit this list to update the project cards on the page.
  - Optional fields:
      img: "images/project-image.png"
      title: "Project Title"
      desc: "Short project description."
      tech: ["HTML", "CSS", "JavaScript"]
      liveLink: "https://your-live-demo.com"
  - For best results, use images with a consistent ratio (16:10 or 16:9), high resolution (1200x800+), and matching visual style.
  - Save images optimized for web (WebP / JPEG) and keep them in public/wave/images/.
*/
const projects = [
  {
    img: "./images/tech-store.png",
    title: "Tech Store",
    desc: "A store for selling tech products with a sleek, modern design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript", "Chart.js"],
    liveLink: "https://omartantawy360.github.io/elctro-shop/",
  },
  {
    img: "./images/malaz.png",
    title: "Malaz Caffe",
    desc: "A modern coffee shop website with an elegant design and seamless user experience.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://cafee-pink.vercel.app/",
  },
  {
    img: "./images/academic-enter.png",
    title: "Academic Enterprise",
    desc: "A platform for academic institutions to showcase their programs and research.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://omartantawy360.github.io/Acadimic-center2/",
  },
  {
    img: "./images/travel-agency.png",
    title: "Travel Agency",
    desc: "Mobile-first marketing site for a modern neobank.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://abdotete142-maker.github.io/Salah_khalaf/",
  },
  {
    img: "./images/flagxin.png",
    title: "Flagxin",
    desc: "flags shop website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://abdelrhman005.github.io/Flagxin/",
  },
  {
    img: "./images/aurum-shop.png",
    title: "Aurum Shop",
    desc: "A modern perfume shop website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://abdotete142-maker.github.io/Perfumes/",
  },
  {
    img: "./images/apex.png",
    title: "Apex gym",
    desc: "A modern fitness center website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://gym1-khaki-omega.vercel.app/",
  },
  {
    img: "./images/watches-store.png",
    title: "Watches Store",
    desc: "A modern watches store website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://watches-store-wave.vercel.app/",
  },
  {
    img: "./images/furni-store.png",
    title: "Furni Store",
    desc: "A modern furniture store website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://lander2007.github.io/Furni/index.html",
  },
  {
    img: "./images/savior-restaurant.png",
    title: "Savior Restaurant",
    desc: "A modern restaurant website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://savior-rosy.vercel.app/",
  },
  {
    img: "./images/udimy-porto.png",
    title: "Portofloi Website",
    desc: "A modern portfolio website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://omartantawy360.github.io/udimy-porto/index.html",
  },
];

let visibleCount = 6; // default visible projects
function renderProjects(lang) {
  const t = translations[lang] || translations.en;
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  // Use visibleCount to limit displayed projects
  const visibleProjects = projects.slice(0, visibleCount);
  grid.innerHTML = visibleProjects
    .map((p, i) => {
      const idx = i + 1;
      const title = p.title || t[`project-${idx}-title`] || "";
      const desc = p.desc || t[`project-${idx}-desc`] || "";
      const imagePath = p.img ? p.img.replace(/\\\\/g, "/") : "";
      const hasImage = imagePath !== "";
      const imageHtml = hasImage
        ? `<img src="${imagePath}" alt="${title}" loading="lazy" decoding="async" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" style="image-rendering:optimize-quality;" draggable="false" />`
        : `<div class="absolute inset-0 bg-gradient-to-br from-cyan/15 via-blue/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
           <div class="absolute inset-0 bg-[radial-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
           <div class="relative font-display text-4xl font-black tracking-wider opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none uppercase w-full h-full flex items-center justify-center" style="color:var(--cyan)">
             ${title.split(" ").map((w) => w[0]).join("")}
           </div>`;
      const techTags = p.tech.map((tech) => `<span class="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/10">${tech}</span>`).join("");
      const bottomLink = p.liveLink
        ? `<a href="${p.liveLink}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors flex items-center gap-1.5"><span>${t["project-live"] ? t["project-live"].replace(" ↗", "") : "Launch Project"}</span><svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>`
        : `<span class="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">${title}</span>`;
      return `
        <article class="glass-card project-card reveal group flex flex-col overflow-hidden animate-fade-in-up" style="animation-delay: ${i * 60}ms;">
          <div class="relative h-60 overflow-hidden bg-slate-950/40">
            ${imageHtml}
            <div class="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
              ${p.liveLink ? `<a href="${p.liveLink}" target="_blank" rel="noopener noreferrer" class="p-4 bg-white text-slate-950 hover:bg-primary hover:text-primary-foreground rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-2xl hover:scale-110" aria-label="Visit ${title} live demo"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>` : ``}
            </div>
          </div>
          <div class="p-8 flex flex-col flex-grow text-left">
            <div class="flex flex-wrap gap-2 mb-4">${techTags}</div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">${title}</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-6 font-medium">${desc}</p>
            <div class="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">${bottomLink}<div class="w-8 h-0.5 rounded bg-slate-800 group-hover:bg-primary group-hover:w-12 transition-all duration-300"></div></div>
          </div>
        </article>
      `;
    })
    .join("");
  // Observe reveal elements
  grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  // Show/hide Show More button
  const btn = document.getElementById("projects-show-more");
  if (btn) {
    btn.style.display = visibleCount >= projects.length ? "none" : "block";
  }
}

function initProjectShowMore() {
  const btn = document.getElementById("projects-show-more");
  if (!btn) return;
  btn.addEventListener("click", () => {
    visibleCount += 6; // 2 more rows (3 cols × 2 = 6)
    const lang = localStorage.getItem("lang") || "en";
    renderProjects(lang);
  });
}

// Tech Stack (Using premium brand SVG icons)
const tech = [
  {
    name: "HTML5",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.03 8.002H8.38l.235 2.627h9.683l-.597 6.643-5.741 1.637-5.73-1.63-0.38-4.23h2.61l.19 2.09 3.31.94 3.32-.94.34-3.81H5.43l-.69-7.75h14.1l-.31 3.425z"/></svg>`,
  },
  {
    name: "CSS3",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm5.09 8.002l.35 4h8.3l-.29 3.27-2.95.83-2.96-.83-.19-2.1h-2.6l.37 4.11 5.38 1.53 5.39-1.53.64-7.28H6.59zM19.12 4.002H5.17l.18 2h13.59l-.18-2z"/></svg>`,
  },
  {
    name: "JavaScript",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm21.6 19.3c0-1.4-.8-2.3-2.4-3-1-.4-1.6-.7-1.6-1.2 0-.4.3-.7.9-.7.6 0 1 .3 1.2.9h2.2c-.3-1.8-1.5-3-3.3-3-2.2 0-3.6 1.3-3.6 3.2 0 1.9 1.1 2.8 2.8 3.5 1.1.4 1.8.8 1.8 1.4 0 .5-.5.8-1.2.8-.9 0-1.4-.5-1.7-1.3H12c.2 2 1.6 3.2 3.8 3.2 2.5 0 4-1.2 4-3.4l1.8-.7zm-8.8-3.4H10v5.3c0 .8-.4 1.2-1.1 1.2-.6 0-.9-.3-.9-1.1V15.9H5.4v5.5c0 2.2 1.2 3.3 3.3 3.3 2 0 3.3-1.1 3.3-3.3v-5.8h.8z"/></svg>`,
  },
  {
    name: "Tailwind CSS",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6.5c-2.69 0-4.19 1.35-4.5 4.05 1.2-1.35 2.62-1.8 4.27-1.35 1.03.28 1.77 1.05 2.59 1.91 1.33 1.4 2.88 3.04 5.64 3.04 2.69 0 4.19-1.35 4.5-4.05-1.2 1.35-2.62 1.8-4.27 1.35-.93-.26-1.59-.97-2.39-1.82C16.5 8.1 14.88 6.5 12 6.5zM7.5 12.5c-2.69 0-4.19 1.35-4.5 4.05 1.2-1.35 2.62-1.8 4.27-1.35 1.03.28 1.77 1.05 2.59 1.91 1.33 1.4 2.88 3.04 5.64 3.04 2.69 0 4.19-1.35 4.5-4.05-1.2 1.35-2.62 1.8-4.27 1.35-.93-.26-1.59-.97-2.39-1.82C12 14.1 10.38 12.5 7.5 12.5z"/></svg>`,
  },
  {
    name: "Bootstrap",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M23.2 5.6c-.6-1.4-1.7-2.5-3.1-3.1C18.6 1.8 16.9 1.5 12 1.5S5.4 1.8 3.9 2.5C2.5 3.1 1.4 4.2.8 5.6.1 7.1-.2 8.8-.2 13.7s.3 6.6.9 8.1c.6 1.4 1.7 2.5 3.1 3.1 1.5.7 3.2 1 8.1 1s6.6-.3 8.1-.9c1.4-.6 2.5-1.7 3.1-3.1.7-1.5 1-3.2 1-8.1s-.2-6.6-.9-8.1zm-8.8 11.2h-4.3v-2.3h4.3c1 0 1.7.5 1.7 1.2s-.7 1.1-1.7 1.1zm-.3-4.5h-4v-2.1h4c.9 0 1.5.4 1.5 1.1 0 .6-.6 1-1.5 1zm2.3 4c1-1.1 1.5-2.3 1.5-3.6 0-1.7-1-3-2.6-3.6 1.3-.6 2.1-1.8 2.1-3.3 0-2.4-2-4.1-5-4.1H6v18.7h6.7c3.1 0 5.1-1.7 5.1-4.1 0-1.4-.5-2.6-1.5-3.6v-.4z"/></svg>`,
  },
  {
    name: "GitHub",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
];

document.getElementById("tech-grid").innerHTML = tech
  .map(
    (t, i) => `
  <div class="tech-pill reveal group" style="transition-delay:${i * 50}ms">
    <div class="icon group-hover:text-cyan group-hover:scale-110 transition-all duration-300" style="color:var(--text-muted)">${t.icon}</div>
    <div class="text-sm group-hover:text-cyan transition-colors duration-300" style="color:var(--text-secondary)">${t.name}</div>
  </div>
`,
  )
  .join("");

// Team Data (Configured with optional image parameter, default CSS placeholder)
const team = [
  {
    name: "Omar Tantawy",
    initials: "OT",
    img: "",
    phone: "201061720405",
    linkedin: "https://linkedin.com/in/omar-tantawy-a74a96376",
  },
  {
    name: "Abdelrahman Mamdouh",
    initials: "AM",
    img: "",
    phone: "201000215337",
    linkedin: "https://www.linkedin.com/in/abdelrhman-mamdoh-a80b2b33b",
  },
  {
    name: "Mohamed Waled",
    initials: "MW",
    img: "",
    phone: "201221542589",
    linkedin: "https://www.linkedin.com/in/mohamed-waled-elsamak/",
  },
  {
    name: "Khaled Amr",
    initials: "KA",
    img: "",
    phone: "201102740002",
    linkedin: "https://linkedin.com/in/khᥲᥣᥱd-amr-263334343/",
  },
  {
    name: "Abdelrahman Ahmed",
    initials: "AA",
    img: "",
    phone: "201279109111",
    linkedin: "https://www.linkedin.com/in/abdelrahman-ahmed-78b9a3358/",
  },
  {
    name: "Belal Yousry",
    initials: "BY",
    img: "",
    phone: "201224160430",
    linkedin: "https://www.linkedin.com/in/belal-deyab-853659392",
  },
  {
    name: "Ans Ahmed",
    initials: "AA",
    img: "",
    phone: "201284838592",
    linkedin: "https://www.linkedin.com/in/ans-ahmed-106a33362",
  },
  {
    name: "Yossef Hassan",
    initials: "YH",
    img: "",
    phone: "201554630766",
    linkedin: "https://www.linkedin.com/in/youssef-hassan-abdel-latif-a36a22338",
  },
];

document.getElementById("team-grid").innerHTML = team
  .map((m, i) => {
    const hasImage = m.img && m.img !== "";
    const avatarHtml = hasImage
      ? `<img src="${m.img}" alt="${m.name}" class="w-full h-full object-cover rounded-full" />`
      : `<span class="relative z-10 text-cyan font-semibold group-hover:scale-110 transition-transform duration-500">${m.initials}</span>
       <div class="absolute inset-1 rounded-full border border-dashed group-hover:border-cyan/30 transition-colors duration-500" style="border-color:var(--border-color)"></div>`;

    return `
    <div class="glass-card p-7 text-center reveal group" style="transition-delay:${i * 70}ms">
      <div class="relative mx-auto h-24 w-24 rounded-full grid place-items-center border shadow-[0_0_20px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] group-hover:border-cyan/40 transition-all duration-500" style="background:linear-gradient(135deg,var(--bg-surface),var(--bg-glass));border-color:var(--border-color)">
        ${avatarHtml}
        <span class="absolute inset-0 rounded-full bg-cyan/5 blur-xl -z-10 group-hover:bg-cyan/20 transition-all duration-500"></span>
      </div>
      <h3 class="mt-5 font-semibold group-hover:text-cyan transition-colors duration-300">${m.name}</h3>
      <div class="mt-5 flex justify-center gap-3" style="color:var(--text-muted)">
        <a href="${m.linkedin || "#"}" target="_blank" rel="noopener noreferrer" class="h-8 w-8 grid place-items-center rounded-full border hover:text-cyan hover:border-cyan/40 transition" style="border-color:var(--border-color)" title="LinkedIn">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="${m.phone ? "https://wa.me/" + m.phone : "#"}" target="_blank" rel="noopener noreferrer" class="h-8 w-8 grid place-items-center rounded-full border hover:text-cyan hover:border-cyan/40 transition" style="border-color:var(--border-color)" title="WhatsApp">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.465L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.967 1.452 5.426.002 9.84-4.41 9.843-9.843.002-2.63-1.023-5.101-2.885-6.964C16.653 1.836 14.18 .812 11.55.812c-5.43 0-9.843 4.41-9.846 9.843-.001 1.833.499 3.626 1.448 5.2l-.999 3.648 3.734-.979zm11.187-5.32c-.302-.15-1.786-.881-2.053-.978-.268-.097-.463-.146-.658.147-.196.293-.755.952-.926 1.147-.171.195-.341.219-.643.069-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.783-1.675-2.083-.175-.3-.018-.462.13-.611.135-.133.3-.349.45-.523.151-.174.2-.298.3-.497.102-.199.05-.373-.025-.523-.075-.15-.658-1.586-.902-2.174-.238-.574-.479-.496-.658-.505-.17-.008-.365-.01-.56-.01s-.512.073-.78.366c-.268.293-1.024 1-1.024 2.439 0 1.439 1.048 2.829 1.194 3.024.147.195 2.062 3.149 4.996 4.418.697.302 1.242.483 1.666.618.701.223 1.34.192 1.844.117.563-.083 1.786-.731 2.037-1.439.251-.708.251-1.317.175-1.439-.076-.122-.27-.195-.572-.346z"/></svg>
        </a>
      </div>
    </div>
  `;
  })
  .join("");

// Re-observe team reveal elements
document.querySelectorAll("#team-grid .reveal").forEach((el) => io.observe(el));


// Re-observe newly injected reveal elements
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Initialize cursor hover interactions for newly created DOM elements
initCursorHoverListeners();

// ============================================================
// TRANSLATIONS
// ============================================================
const translations = {
  en: {
    // Nav
    "nav-about": "About",
    "nav-services": "Services",
    "nav-projects": "Projects",
    "nav-stack": "Stack",
    "nav-team": "Team",
    "nav-contact": "Contact",
    "start-project": "Start a project →",
    "toggle-theme": "Toggle Theme",
    "toggle-language": "EN",

    // Hero
    "hero-badge": "Front-end engineering studio",
    "hero-title": 'We build interfaces that <span class="gradient-text">move people.</span>',
    "hero-desc":
      "Wave is a front-end team designing and shipping modern, lightning-fast websites and product UIs for forward-thinking brands. Pixel-perfect, performance‑obsessed, future‑ready.",
    "hero-cta-primary": "Start a project →",
    "hero-cta-secondary": "Contact Us",
    "hero-scroll": "Scroll",
    "hero-stat-1-label": "Projects shipped",
    "hero-stat-2-label": "Client retention",
    "hero-stat-3-label": "Years of craft",

    // About
    "section-about-tag": "01 — About us",
    "section-about-title": "A small team. <br/>A serious craft.",
    "about-body":
      "Wave is a front-end development team focused on building digital experiences that feel as good as they look. We partner with founders, designers and product teams to ship websites and interfaces that load fast, scale gracefully, and feel inevitable.",
    "about-card-1-title": "Modern websites",
    "about-card-1-desc": "Marketing sites that convert and stay maintainable.",
    "about-card-2-title": "Responsive design",
    "about-card-2-desc": "Every breakpoint, every device — considered.",
    "about-card-3-title": "UI / UX",
    "about-card-3-desc": "Interfaces guided by clarity, hierarchy and rhythm.",
    "about-card-4-title": "Performance",
    "about-card-4-desc": "Sub-second loads, no bloat, real Core Web Vitals.",

    // Services
    "section-services-tag": "02 — Services",
    "section-services-title": "What we build.",
    "services-body":
      "From single-page launches to full product surfaces — we handle the front end end to end.",

    // Projects
    "section-projects-tag": "03 — Selected work",
    "section-projects-title": "Recent projects.",
    "projects-body": "A glimpse of interfaces we've designed and shipped recently.",

    // Tech
    "section-tech-tag": "04 — Stack",
    "section-tech-title": "Tools of the craft.",
    "tech-body": "A focused, modern front-end toolkit — no fads, no over-engineering.",

    // Team
    "section-team-tag": "05 — Team",
    "section-team-title": "The people behind Wave.",
    "team-body": "A tight crew of designers and engineers obsessed with the details.",

    // Contact
    "section-contact-tag": "06 — Contact",
    "section-contact-title": "Let's build <br/><span class='gradient-text'>something great.</span>",
    "contact-body": "Tell us about your project. We reply within 24 hours.",
    "form-label-name": "Name",
    "form-placeholder-name": "Your name",
    "form-label-email": "Email",
    "form-placeholder-email": "you@company.com",
    "form-label-project": "Project",
    "form-placeholder-project": "Tell us about the project…",
    "form-submit": "Send message",
    "form-success": "✓ Message sent — we'll be in touch soon.",

    // Footer
    "footer-rights": "© 2026 — All rights reserved",

    // Dynamic content
    "service-1-title": "Landing Pages",
    "service-1-desc":
      "High-converting one-pagers built for launches, campaigns and product reveals.",
    "service-2-title": "Business Websites",
    "service-2-desc": "Polished marketing sites with CMS-ready content and clear conversion flows.",
    "service-3-title": "Portfolio Websites",
    "service-3-desc":
      "Distinctive portfolios for studios, creators and freelancers that stand out.",
    "service-4-title": "Dashboard UI",
    "service-4-desc": "Data-dense product interfaces — charts, tables, settings, in any density.",
    "service-5-title": "Responsive Design",
    "service-5-desc": "Mobile-first layouts that scale fluidly from 320px to ultrawide.",
    "service-6-title": "Front-End Development",
    "service-6-desc": "Hand-crafted HTML, CSS, JavaScript & Tailwind — no template bloat.",

    "project-1-title": "Nimbus Analytics",
    "project-1-desc": "A real-time analytics dashboard with custom data viz components.",
    "project-2-title": "Aurora Commerce",
    "project-2-desc": "Headless e-commerce front end with motion-rich product showcases.",
    "project-3-title": "Helix Studio",
    "project-3-desc": "Editorial portfolio for a creative studio — bold type, smooth scroll.",
    "project-4-title": "Tide Banking",
    "project-4-desc": "Mobile-first marketing site for a modern neobank.",
    "project-live": "Live Demo ↗",
    "project-github": "GitHub",

  },

  ar: {
    // Nav
    "nav-about": "عنّا",
    "nav-services": "خدمات",
    "nav-projects": "مشاريع",
    "nav-stack": "تقنية",
    "nav-team": "فريق",
    "nav-contact": "تواصل",
    "start-project": "ابدأ مشروعك ←",
    "toggle-theme": "تبديل الوضع",
    "toggle-language": "ع",

    // Hero
    "hero-badge": "استوديو تطوير الواجهات الأمامية",
    "hero-title": 'نبني واجهات <span class="gradient-text">تُحرّك الناس.</span>',
    "hero-desc":
      "Wave فريق متخصص في تصميم وتطوير مواقع حديثة وسريعة وواجهات منتجات احترافية للعلامات التجارية الطموحة. دقة بكسل، أداء لا يُضاهى، جاهز للمستقبل.",
    "hero-cta-primary": "ابدأ مشروعك ←",
    "hero-cta-secondary": "تواصل معنا",
    "hero-scroll": "تمرير",
    "hero-stat-1-label": "مشروع مُنجز",
    "hero-stat-2-label": "نسبة رضا العملاء",
    "hero-stat-3-label": "سنوات من الخبرة",

    // About
    "section-about-tag": "01 — عنّا",
    "section-about-title": "فريق صغير. <br/>حرفة جادة.",
    "about-body":
      "Wave فريق تطوير واجهات أمامية متخصص في بناء تجارب رقمية تبدو رائعة بقدر ما تعمل بكفاءة. نتعاون مع المؤسسين والمصممين وفرق المنتجات لتسليم مواقع وواجهات تُحمَّل بسرعة وتتوسع بسلاسة.",
    "about-card-1-title": "مواقع حديثة",
    "about-card-1-desc": "مواقع تسويقية تُحقق التحويل وتبقى سهلة الصيانة.",
    "about-card-2-title": "تصميم متجاوب",
    "about-card-2-desc": "كل نقطة توقف، كل جهاز — مدروس بعناية.",
    "about-card-3-title": "واجهة المستخدم / تجربة المستخدم",
    "about-card-3-desc": "واجهات مبنية على الوضوح والتسلسل الهرمي والإيقاع.",
    "about-card-4-title": "الأداء",
    "about-card-4-desc": "تحميل أقل من ثانية، بلا ثقل، مؤشرات Core Web Vitals حقيقية.",

    // Services
    "section-services-tag": "02 — الخدمات",
    "section-services-title": "ماذا نبني.",
    "services-body":
      "من الصفحات الواحدة إلى أسطح المنتجات الكاملة — نتولى الواجهة الأمامية من الألف إلى الياء.",

    // Projects
    "section-projects-tag": "03 — أعمال مختارة",
    "section-projects-title": "مشاريع حديثة.",
    "projects-body": "لمحة عن الواجهات التي صممناها وأطلقناها مؤخراً.",

    // Tech
    "section-tech-tag": "04 — التقنية",
    "section-tech-title": "أدوات الحرفة.",
    "tech-body": "مجموعة أدوات أمامية حديثة ومركّزة — بلا صيحات عابرة، بلا تعقيد زائد.",

    // Team
    "section-team-tag": "05 — الفريق",
    "section-team-title": "الأشخاص وراء Wave.",
    "team-body": "فريق متماسك من المصممين والمهندسين المهووسين بالتفاصيل.",


    // Contact
    "section-contact-tag": "07 — تواصل",
    "section-contact-title": "لنبنِ <br/><span class='gradient-text'>شيئاً رائعاً.</span>",
    "contact-body": "أخبرنا عن مشروعك. نرد خلال 24 ساعة.",
    "form-label-name": "الاسم",
    "form-placeholder-name": "اسمك",
    "form-label-email": "البريد الإلكتروني",
    "form-placeholder-email": "you@company.com",
    "form-label-project": "المشروع",
    "form-placeholder-project": "أخبرنا عن مشروعك…",
    "form-submit": "إرسال الرسالة",
    "form-success": "✓ تم إرسال رسالتك — سنتواصل معك قريباً.",

    // Footer
    "footer-rights": "© 2026 — جميع الحقوق محفوظة",

    // Dynamic content
    "service-1-title": "صفحات الهبوط",
    "service-1-desc": "صفحات واحدة عالية التحويل مصممة للإطلاقات والحملات وعروض المنتجات.",
    "service-2-title": "مواقع الأعمال",
    "service-2-desc": "مواقع تسويقية متقنة جاهزة لنظام إدارة المحتوى مع مسارات تحويل واضحة.",
    "service-3-title": "مواقع الأعمال الشخصية",
    "service-3-desc": "محافظ مميزة للاستوديوهات والمبدعين والمستقلين تبرز من بين الجميع.",
    "service-4-title": "واجهة لوحة التحكم",
    "service-4-desc": "واجهات منتجات كثيفة البيانات — مخططات، جداول، إعدادات، بأي كثافة.",
    "service-5-title": "التصميم المتجاوب",
    "service-5-desc": "تخطيطات تبدأ من الجوال وتتوسع بسلاسة من 320px إلى الشاشات العريضة.",
    "service-6-title": "تطوير الواجهة الأمامية",
    "service-6-desc": "HTML وCSS وJavaScript وTailwind مكتوبة يدوياً — بلا قوالب جاهزة.",

    "project-1-title": "Nimbus Analytics",
    "project-1-desc": "لوحة تحليلات في الوقت الفعلي مع مكونات تصور بيانات مخصصة.",
    "project-2-title": "Aurora Commerce",
    "project-2-desc": "واجهة أمامية للتجارة الإلكترونية بدون رأس مع عروض منتجات غنية بالحركة.",
    "project-3-title": "Helix Studio",
    "project-3-desc": "محفظة تحريرية لاستوديو إبداعي — خط عريض، تمرير سلس.",
    "project-4-title": "Tide Banking",
    "project-4-desc": "موقع تسويقي يبدأ من الجوال لبنك رقمي حديث.",
    "project-live": "عرض مباشر ↗",
    "project-github": "GitHub",

    "testimonial-1-quote": "أطلق Wave موقعنا التسويقي في ثلاثة أسابيع وتجاوز كل معيار حددناه.",
    "testimonial-1-name": "ميرا تشن",
    "testimonial-1-role": "الرئيس التنفيذي، Northwind",
    "testimonial-2-quote":
      "أكثر فريق واجهة أمامية اهتماماً بالتفاصيل عملنا معه. الواجهة تبدو صحيحة تماماً.",
    "testimonial-2-name": "ديفيد بارك",
    "testimonial-2-role": "رئيس المنتج، Lumen",
    "testimonial-3-quote": "دقة بكسل، سرعة، ومتعة في التعاون. استأجرناهم مرة أخرى في نفس الربع.",
    "testimonial-3-name": "إيلينا روسي",
    "testimonial-3-role": "المؤسسة، Atlas Studio",
  },
};

// ============================================================
// LANGUAGE
// ============================================================
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Static data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Re-render dynamic sections so they use the new language
  renderServices(lang);
  renderProjects(lang);

}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

function initLanguageToggle() {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "en";
    setLanguage(current === "en" ? "ar" : "en");
  });
  setLanguage(localStorage.getItem("lang") || "en");
}

// ============================================================
// THEME
// ============================================================
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function applyTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    const icon = document.getElementById("theme-icon");
    if (icon) {
      icon.innerHTML = isDark
        ? `<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>`
        : `<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>`;
    }
  }

  btn.addEventListener("click", () => {
    const isDark = !document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme(isDark);
  });

  // Default to dark mode
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved === "dark");
}

// Initialize toggles after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle(); // this calls applyTranslations which calls renderServices/Projects/Testimonials
  initThemeToggle();
  initProjectShowMore();
});

document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const status = document.getElementById("form-status");
  if (status) {
    status.classList.remove("hidden");
    e.target.reset();
    setTimeout(() => status.classList.add("hidden"), 4000);
  }
});
