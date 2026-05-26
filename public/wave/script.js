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
    img: "./images/watches-store.png",
    title: "Watches Store",
    desc: "A modern watches store website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://watches-store-wave.vercel.app/",
    translationKey: "project-8",
  },
  {
    img: "./images/handmade.png",
    title: "Handmade Store",
    desc: "A premium e-commerce platform showcasing authentic Egyptian artisan crafts, heritage pieces, and sustainable luxury ceramics.",
    tech: ["HTML", "Tailwind", "Alpine.js", "JavaScript"],
    liveLink: "https://mohamed-waled301.github.io/handmade/",
    translationKey: "project-14",
  },
  {
    img: "./images/tech-store.png",
    title: "Tech Store",
    desc: "A store for selling tech products with a sleek, modern design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript", "Chart.js"],
    liveLink: "https://omartantawy360.github.io/elctro-shop/",
    translationKey: "project-1",
  },
  {
    img: "./images/malaz.png",
    title: "Malaz Caffe",
    desc: "A modern coffee shop website with an elegant design and seamless user experience.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://cafee-pink.vercel.app/",
    translationKey: "project-2",
  },
  {
    img: "./images/academic-enter.png",
    title: "Academic Enterprise",
    desc: "A platform for academic institutions to showcase their programs and research.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://omartantawy360.github.io/Acadimic-center2/",
    translationKey: "project-3",
  },
  {
    img: "./images/travel-agency.png",
    title: "Travel Agency",
    desc: "Mobile-first marketing site for a modern neobank.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://abdotete142-maker.github.io/Salah_khalaf/",
    translationKey: "project-4",
  },
  {
    img: "./images/flagxin.png",
    title: "Flagxin",
    desc: "flags shop website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://abdelrhman005.github.io/Flagxin/",
    translationKey: "project-5",
  },
  {
    img: "./images/aurum-shop.png",
    title: "Aurum Shop",
    desc: "A modern perfume shop website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://abdotete142-maker.github.io/Perfumes/",
    translationKey: "project-6",
  },
  {
    img: "./images/apex.png",
    title: "Apex gym",
    desc: "A modern fitness center website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://gym1-khaki-omega.vercel.app/",
    translationKey: "project-7",
  },
  {
    img: "./images/furni-store.png",
    title: "Furni Store",
    desc: "A modern furniture store website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://lander2007.github.io/Furni/index.html",
    translationKey: "project-9",
  },
  {
    img: "./images/savior-restaurant.png",
    title: "Savior Restaurant",
    desc: "A modern restaurant website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://savior-rosy.vercel.app/",
    translationKey: "project-10",
  },
  {
    img: "./images/udimy-porto.png",
    title: "Portofloi Website",
    desc: "A modern portfolio website with a sleek design and interactive features.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    liveLink: "https://omartantawy360.github.io/udimy-porto/index.html",
    translationKey: "project-11",
  },
  {
    img: "./images/educomp.png",
    title: "EduComp",
    desc: "A comprehensive student competition portal and dashboard for WE School, facilitating registration, team browsing, and leaderboard tracking.",
    tech: ["React", "Node.js", "Tailwind", "JavaScript"],
    liveLink: "https://omartantawy360.github.io/edu-por-3/student",
    translationKey: "project-12",
  },
  {
    img: "./images/maison.png",
    title: "Maison",
    desc: "A premium high-end e-commerce fashion website featuring a minimalist quiet luxury aesthetic and responsive design.",
    tech: ["React", "Tailwind", "JavaScript"],
    liveLink: "https://maison-nine-wheat.vercel.app/",
    translationKey: "project-13",
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
      const key = p.translationKey || `project-${idx}`;
      const title = t[`${key}-title`] || p.title || "";
      const desc = t[`${key}-desc`] || p.desc || "";
      const imagePath = p.img ? p.img.replace(/\\\\/g, "/") : "";
      const hasImage = imagePath !== "";
      const imageHtml = hasImage
        ? `<img src="${imagePath}" alt="${title}" loading="lazy" decoding="async" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" style="image-rendering:optimize-quality;" draggable="false" />`
        : `<div class="absolute inset-0 bg-gradient-to-br from-cyan/15 via-blue/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
           <div class="absolute inset-0 bg-[radial-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
           <div class="relative font-display text-4xl font-black tracking-wider opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none uppercase w-full h-full flex items-center justify-center" style="color:var(--cyan)">
             ${title
               .split(" ")
               .map((w) => w[0])
               .join("")}
           </div>`;
      const techTags = p.tech
        .map(
          (tech) =>
            `<span class="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/10">${tech}</span>`,
        )
        .join("");
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
    visibleCount = projects.length; // Show all projects on first click for premium UX
    const lang = localStorage.getItem("lang") || "ar";
    renderProjects(lang);
  });
}

// Tech Stack (Using premium brand SVG icons)
const tech = [
  {
    name: "HTML5",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>`,
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>`,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#000000"/></svg>`,
    color: "#F7DF1E",
  },
  {
    name: "React",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>`,
    color: "#61DAFB",
  },
  {
    name: "Tailwind CSS",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#38BDF8"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>`,
    color: "#38BDF8",
  },
  {
    name: "Bootstrap",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#7952B3"><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z"/></svg>`,
    color: "#7952B3",
  },
  {
    name: "Node.js",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="#339933"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>`,
    color: "#339933",
  },
  {
    name: "GitHub",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    color: "var(--text-primary)",
  },
];

document.getElementById("tech-grid").innerHTML = tech
  .map(
    (t, i) => `
  <div class="tech-pill reveal group" style="transition-delay:${i * 50}ms">
    <div class="icon group-hover:scale-110 transition-all duration-300" style="color:${t.color || "var(--text-muted)"}">${t.icon}</div>
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
    "project-5-desc": "A flags shop website with a sleek design and interactive features.",
    "project-6-desc": "A modern perfume shop website with a sleek design and interactive features.",
    "project-7-desc":
      "A modern fitness center website with a sleek design and interactive features.",
    "project-8-desc":
      "A modern watches store website with a sleek design and interactive features.",
    "project-9-desc":
      "A modern furniture store website with a sleek design and interactive features.",
    "project-10-desc": "A modern restaurant website with a sleek design and interactive features.",
    "project-11-desc": "A modern portfolio website with a sleek design and interactive features.",
    "project-12-title": "EduComp Portal",
    "project-12-desc":
      "A comprehensive student competition portal and dashboard for WE School, facilitating registration, team browsing, and leaderboard tracking.",
    "project-13-title": "Maison Luxury",
    "project-13-desc":
      "A premium high-end e-commerce fashion website featuring a minimalist quiet luxury aesthetic and responsive design.",
    "project-14-title": "Handmade Store",
    "project-14-desc":
      "A premium e-commerce platform showcasing authentic Egyptian artisan crafts, heritage pieces, and sustainable luxury ceramics.",
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
    "project-5-title": "Flagxin",
    "project-5-desc": "موقع متجر أعلام بتصميم أنيق وميزات تفاعلية.",
    "project-6-title": "Aurum Shop",
    "project-6-desc": "موقع متجر عطور حديث بتصميم أننيق وميزات تفاعلية.",
    "project-7-title": "Apex gym",
    "project-7-desc": "موقع مركز لياقة عصري بتصميم نظيف وواجهة مستخدم سلسة.",
    "project-8-title": "Watches Store",
    "project-8-desc": "موقع متجر ساعات عصري بتصميم أنيق وميزات جذابة.",
    "project-9-title": "Furni Store",
    "project-9-desc": "موقع متجر أثاث حديث بتصميم أننيق وميزات تفاعلية.",
    "project-10-title": "Savior Restaurant",
    "project-10-desc": "موقع مطعم عصري بتصميم جذاب وواجهة مستخدم سلسة.",
    "project-11-title": "Portofloi Website",
    "project-11-desc": "موقع محفظة حديث بتصميم أنيق وميزات تفاعلية.",
    "project-12-title": "بوابة EduComp",
    "project-12-desc":
      "بوابة مسابقات طلابية شاملة ولوحة تحكم لمدرسة WE، تتيح التسجيل وتصفح الفرق ومتابعة لوحة الصدارة.",
    "project-13-title": "ميزون لوكس (Maison)",
    "project-13-desc":
      "موقع تجارة إلكترونية فاخر للأزياء الراقية، يتميز بجمالية هادئة وبسيطة وتصميم متجاوب بالكامل.",
    "project-14-title": "متجر هاند ميد (Handmade)",
    "project-14-desc":
      "منصة تجارة إلكترونية فاخرة تستعرض الحرف اليدوية المصرية الأصيلة، والقطع التراثية، وخزفيات راقية ومستدامة.",
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
    const current = localStorage.getItem("lang") || "ar";
    setLanguage(current === "en" ? "ar" : "en");
  });
  setLanguage(localStorage.getItem("lang") || "ar");
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

const whatsappPhone = "201550888640";

document.getElementById("contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector("textarea");
  const status = document.getElementById("form-status");

  const name = nameInput?.value.trim() || "No name provided";
  const email = emailInput?.value.trim() || "No email provided";
  const message = messageInput?.value.trim() || "No project details provided.";

  const rawText = `New project request from ${name}\nEmail: ${email}\n\nProject details:\n${message}`;
  const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(rawText)}`;

  window.open(url, "_blank");

  if (status) {
    status.classList.remove("hidden");
    setTimeout(() => status.classList.add("hidden"), 4000);
  }
});
