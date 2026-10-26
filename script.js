/* ============================================================
   Sai Pavan — Portfolio Script
   No dependencies, no build step. Sections below:
   1) Content data (edit here to update the site)
   2) Renderers
   3) Nav behaviour (scroll state + mobile menu)
   4) Mouse-reactive background (canvas mesh + cursor glow)
   ============================================================ */

/* ---------- 1. Content data ---------- */
/* Edit these arrays to add or change projects, certifications and
   achievements. Nothing else in the file needs to change. */

const PROJECTS = [
  {
    name: "Premium Music Player",
    icon: "🎧",
    desc: "A local music player built in Flutter, with custom playlists, background playback, lock-screen controls and fully offline local storage — no server, no account required.",
    tech: ["Flutter", "Dart", "Local Storage"],
    // PROJECT DOCUMENT — place the PDF at this path, or change the path below
    doc: "assets/documents/music-player.pdf"
  },
  {
    name: "Footstep Power Generation",
    icon: "⚡",
    desc: "An IoT hardware project that converts footstep pressure into usable electricity, using piezoelectric discs, a rectifier circuit, capacitor storage and an Arduino-driven LED output stage.",
    tech: ["Arduino", "Piezoelectric Sensors", "Embedded C"],
    // PROJECT DOCUMENT — place the PDF at this path, or change the path below
    doc: "assets/documents/footstep-power.pdf"
  },
  {
    name: "Fitness & Gym Application",
    icon: "🏋️",
    desc: "A modern fitness app for tracking workouts, routines and progress, designed with a clean, motivating interface built for daily use.",
    tech: ["Flutter", "Firebase"],
    // PROJECT DOCUMENT — place the PDF at this path, or change the path below
    doc: "assets/documents/gym-app.pdf"
  },
  {
    name: "Meenakshi Flour Mills",
    icon: "🌾",
    desc: "A business website for a flour mill, built with a modern visual design system to present the brand, products and contact details professionally.",
    tech: ["HTML", "CSS", "JavaScript"],
    // PROJECT DOCUMENT — place the PDF at this path, or change the path below
    doc: "assets/documents/meenakshi-flour-mills.pdf"
  },
  {
    name: "Adukundham.com",
    icon: "🎡",
    desc: "A family entertainment hub built as an entrepreneurship project — bringing games, activities and family-friendly content together under one site.",
    tech: ["HTML", "CSS", "JavaScript"],
    // PROJECT DOCUMENT — place the PDF at this path, or change the path below
    doc: "assets/documents/adukundham.pdf"
  }
];

/* Add certifications as you earn them — this list stays empty and tidy until then. */


const CERTIFICATIONS = [
  {
    name: "MATLAB Onramp",
    issuer: "MathWorks Training Services",
    year: "2024",
    pdf: "assets/certificates/matlab-onramp.pdf"
  },
  {
    name: "Python Intermediate",
    issuer: "Sololearn",
    year: "2024",
    pdf: "assets/certificates/python-intermediate.pdf"
  },
  {
    name: "Introduction to Python",
    issuer: "Sololearn",
    year: "2024",
    pdf: "assets/certificates/python-introduction-to-python.pdf"
  },
  {
    name: "Hedera Certified Foundation (HCF)",
    issuer: "The Hashgraph Association",
    year: "2026",
    pdf: "assets/certificates/hedera-certified-foundation-hcf.pdf"
  },
  {
    name: "Hedera Certified Developer Associate (HCDA)",
    issuer: "The Hashgraph Association",
    year: "2026",
    pdf: "assets/certificates/hedera-certified-developer-associate-hcda.pdf"
  }
];





const ACHIEVEMENTS = [
  {
    title: "Co-Leader — Document Team",
    description: "Contributed to team coordination, documentation, and content organization as Co-Leader of the Document Team.",
    year: "2026",
    certificate: "assets/certificates/photon-club-certificate.pdf"
  }
];


/* ---------- 2. Renderers ---------- */

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card">
      <div class="project-card__icon" aria-hidden="true">${p.icon}</div>
      <h3 class="project-card__name">${escapeHTML(p.name)}</h3>
      <p class="project-card__desc">${escapeHTML(p.desc)}</p>
      <div class="project-card__tech">
        ${p.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join("")}
      </div>
      <button type="button" class="project-card__link" data-doc="${encodeURI(p.doc)}">
        More details
      </button>
    </article>
  `).join("");

  // Open the matching project document in a new tab.
  // Change each project's "doc" path above to point at your own PDF.
  grid.querySelectorAll(".project-card__link").forEach(btn => {
    btn.addEventListener("click", () => {
      const docPath = btn.getAttribute("data-doc");
      window.open(docPath, "_blank", "noopener,noreferrer");
    });
  });
}

function renderCertifications() {
  const list = document.getElementById("certList");
  if (!list) return;

  if (CERTIFICATIONS.length === 0) {
    list.innerHTML = `
      <li class="cert-list__empty">
        No certifications added yet — add entries to the CERTIFICATIONS array in script.js.
      </li>`;
    return;
  }

  list.innerHTML = CERTIFICATIONS.map(c => {
    const name = c.name || c.title || "Certificate";
    const pdf = c.pdf || "#";

    return `
      <li class="cert-item">
        <a
          class="cert-item__link"
          href="${escapeHTML(pdf)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${escapeHTML(name)} certificate PDF in a new tab"
        >
          <span class="cert-item__details">
            <span class="cert-item__name">${escapeHTML(name)}</span><br>
            <span class="cert-item__issuer">${escapeHTML(c.issuer || "")}</span>
          </span>
          <span class="cert-item__year">${escapeHTML(c.year || "")}</span>
          <span class="cert-item__action">View PDF <span aria-hidden="true">↗</span></span>
        </a>
      </li>
    `;
  }).join("");
}


function renderAchievements() {
  const grid = document.getElementById("achievementsGrid");
  if (!grid) return;

  grid.innerHTML = ACHIEVEMENTS.map(a => `
    <article class="achievement-card">
      <h3 class="achievement-card__title">
        ${escapeHTML(a.title)}
      </h3>

      <p class="achievement-card__desc">
        ${escapeHTML(a.description || a.desc || "")}
      </p>

      <span class="achievement-card__year">
        ${escapeHTML(a.year)}
      </span>

      ${
        a.certificate
          ? `<a
               class="achievement__certificate"
               href="${escapeHTML(a.certificate)}"
               target="_blank"
               rel="noopener noreferrer"
             >
               View Club Certificate 
             </a>`
          : ""
      }
    </article>
  `).join("");
}


/* Minimal helper to avoid accidentally rendering HTML from data values */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- 3. Nav behaviour ---------- */

function initNav() {
  const navWrap = document.getElementById("navWrap");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  // Glass background only appears once the page has scrolled a little,
  // so the nav is fully transparent over the hero.
  if (navWrap) {
    const onScroll = () => {
      navWrap.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Highlight the nav link for the section currently in view (orange indicator)
  if (menu && "IntersectionObserver" in window) {
    const links = Array.from(menu.querySelectorAll('a[href^="#"]'));
    const byId = new Map();
    links.forEach(a => byId.set(a.getAttribute("href").slice(1), a));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => {
          a.classList.remove("is-active");
          a.removeAttribute("aria-current");
        });
        const active = byId.get(entry.target.id);
        if (active) {
          active.classList.add("is-active");
          active.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" }); // a section counts when it crosses mid-screen

    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    // Clear the highlight when back at the hero
    window.addEventListener("scroll", () => {
      if (window.scrollY < 200) {
        links.forEach(a => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      }
    }, { passive: true });
  }

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 4. Mouse-reactive background ---------- */
/* Two pieces working together:
   - #cursorGlow: a single blurred light that follows the pointer with
     a little smoothing (lerp), so it feels soft rather than snappy.
   - #bgCanvas: a sparse set of particles that drift slowly and connect
     to nearby particles and to the pointer with faint lines.
   On touch devices (no real pointer) both instead follow a slow,
   automatic idle path. Everything respects prefers-reduced-motion and
   pauses when the tab is hidden, to stay light on battery/CPU. */

function initBackground() {
  const canvas = document.getElementById("bgCanvas");
  const glow = document.getElementById("cursorGlow");
  if (!canvas || !glow) return;

  const ctx = canvas.getContext("2d");

  // THEME COLOURS (canvas can't read CSS variables, so edit RGB values here).
  // Defaults: burnt orange #D5360C and warm ivory #E6D5BD.
  const ORANGE = "213, 54, 12";
  const IVORY = "230, 213, 189";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  let width = 0, height = 0, dpr = 1;
  let particles = [];
  let rafId = null;
  let running = true;

  // Pointer target vs. smoothed (rendered) position
  const pointer = { x: 0, y: 0 };
  const rendered = { x: 0, y: 0 };
  let hasPointer = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for performance
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fewer particles on small / low-power screens
    const count = width < 640 ? 26 : width < 1100 ? 40 : 56;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 1 + Math.random() * 1.6,
      orange: Math.random() < 0.35 // ~1 in 3 particles are orange, the rest ivory
    }));

    if (!hasPointer) {
      pointer.x = rendered.x = width * 0.5;
      pointer.y = rendered.y = height * 0.35;
    }
  }

  function drawStaticFrame() {
    // Used for reduced-motion: one calm frame, no animation loop.
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.fillStyle = p.orange ? `rgba(${ORANGE}, 0.6)` : `rgba(${IVORY}, 0.4)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    glow.style.transform = `translate3d(${width * 0.7}px, ${height * 0.15}px, 0)`;
  }

  function step(time) {
    if (!running) return;

    // Smooth the glow toward the pointer (lerp) for a "soft light follows cursor" feel
    rendered.x += (pointer.x - rendered.x) * 0.08;
    rendered.y += (pointer.y - rendered.y) * 0.08;
    glow.style.transform = `translate3d(${rendered.x}px, ${rendered.y}px, 0)`;

    // On touch devices, drift the pointer target itself along a slow loop
    if (isCoarsePointer && !hasPointer) {
      const t = time * 0.00006;
      pointer.x = width * 0.5 + Math.cos(t) * width * 0.28;
      pointer.y = height * 0.35 + Math.sin(t * 1.3) * height * 0.22;
    }

    ctx.clearRect(0, 0, width, height);

    // Update + draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // A very gentle pull toward the light, so the mesh feels reactive
      const dx = rendered.x - p.x;
      const dy = rendered.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 220) {
        p.x += dx * 0.0009;
        p.y += dy * 0.0009;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.orange ? `rgba(${ORANGE}, 0.6)` : `rgba(${IVORY}, 0.4)`;
      ctx.fill();
    });

    // Connect nearby particles with faint lines (mesh effect)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(${ORANGE}, ${0.16 * (1 - d / 130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("pointermove", e => {
    hasPointer = true;
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  }, { passive: true });

  // Pause the loop when the tab isn't visible, to save CPU/battery
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden && !reduceMotion;
    if (running && !rafId) rafId = requestAnimationFrame(step);
  });

  if (reduceMotion) {
    drawStaticFrame();
  } else {
    rafId = requestAnimationFrame(step);
  }
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderCertifications();
  renderAchievements();
  initNav();
  initBackground();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "© " + new Date().getFullYear();
});
