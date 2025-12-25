document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const app = {
    init: function () {
      this.initNavigation();
      this.initHeroAnimations();
      this.initPowerMeter();
      this.initTechniques();
      this.initGallery();
      this.initVideoModal();
      this.initScrollAnimations();
      this.initCombatMode();
      this.initCounters();
      this.initMouseTrail();
    },

    smoothScroll: (target, offset = 80) => {
      const el = document.querySelector(target);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - offset,
          behavior: "smooth",
        });
      }
    },

    animateElement: (el, props) => gsap.from(el, props),

    // ------------------ Navigation ------------------
    initNavigation: function () {
      const mobileBtn = document.getElementById("mobileMenuBtn");
      const mainNav = document.querySelector(".main-nav");
      const links = document.querySelectorAll(".nav-link");
      const header = document.querySelector(".header");

      // Mobile toggle
      mobileBtn.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        mobileBtn.classList.toggle("active");
      });

      // Smooth scrolling
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = link.getAttribute("href");
          mainNav.classList.remove("active");
          mobileBtn.classList.remove("active");

          app.smoothScroll(target);

          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        });
      });

      // Header scroll effect
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.style.padding = "1rem 0";
          header.style.background = "rgba(10, 10, 10, 0.95)";
        } else {
          header.style.padding = "1.5rem 0";
          header.style.background = "rgba(10, 10, 10, 0.9)";
        }
      });
    },

    // ------------------ Hero ------------------
    initHeroAnimations: function () {
      app.animateElement(".hero-main-title", { duration: 1, y: 50, opacity: 0, ease: "power3.out" });
      app.animateElement(".hero-subtitle", { duration: 0.8, y: 30, opacity: 0, delay: 0.3, ease: "power2.out" });
      app.animateElement(".stat-item", { duration: 0.6, y: 30, opacity: 0, stagger: 0.2, delay: 0.6, ease: "power2.out" });
      app.animateElement(".hero-cta", { duration: 0.8, y: 30, opacity: 0, delay: 0.9, ease: "power2.out" });
      app.animateElement(".character-silhouette", { duration: 1.2, scale: 0.8, opacity: 0, delay: 0.5, ease: "back.out(1.7)" });

      document.getElementById("explorePower")?.addEventListener("click", () => {
        app.smoothScroll("#power");
        gsap.to("#explorePower", { duration: 0.1, scale: 0.95, yoyo: true, repeat: 1, ease: "power1.inOut" });
      });

      document.getElementById("viewBattles")?.addEventListener("click", () => app.openVideoModal());
    },

    // ------------------ Power Meter ------------------
    initPowerMeter: function () {
      const meter = document.getElementById("powerMeter");
      const valueEl = document.getElementById("powerValue");

      gsap.to(meter, {
        width: "100%",
        duration: 3,
        delay: 1,
        ease: "power2.out",
        onUpdate: function () {
          valueEl.textContent = Math.round(this.progress() * 100);
        },
      });
    },

    // ------------------ Techniques ------------------
    techniquesData: {
      galick: { title: "GALICK GUN", name: "PRIMARY ENERGY ATTACK", desc: "A concentrated blast of purple energy. Vegeta's signature technique." },
      finalflash: { title: "FINAL FLASH", name: "ULTIMATE ENERGY DISCHARGE", desc: "Powerful energy attack in Vegeta's arsenal." },
      bigbang: { title: "BIG BANG ATTACK", name: "SPHERE OF DESTRUCTIVE ENERGY", desc: "A sphere of concentrated energy that expands upon impact." },
      finalexplosion: { title: "FINAL EXPLOSION", name: "SELF-DESTRUCTIVE TECHNIQUE", desc: "Vegeta's ultimate sacrifice in a massive explosion." },
    },

    initTechniques: function () {
      const items = document.querySelectorAll(".technique-item");
      const displayTitle = document.querySelector(".display-title");
      const displayInfo = document.querySelector(".display-info h4");
      const displayDesc = document.querySelector(".display-info p");

      items.forEach((item) => {
        item.addEventListener("click", () => {
          items.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");

          const tech = app.techniquesData[item.dataset.technique];
          if (tech) {
            displayTitle.textContent = tech.title;
            displayInfo.textContent = tech.name;
            displayDesc.textContent = tech.desc;
          }

          gsap.from(".technique-display", { duration: 0.5, scale: 0.95, opacity: 0.8, ease: "power2.out" });
        });
      });
    },

    // ------------------ Gallery ------------------
    initGallery: function () {
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("mouseenter", () => gsap.to(item, { duration: 0.3, scale: 1.05, ease: "power2.out" }));
        item.addEventListener("mouseleave", () => gsap.to(item, { duration: 0.3, scale: 1, ease: "power2.out" }));
      });
    },

    // ------------------ Video Modal ------------------
    initVideoModal: function () {
      const modal = document.getElementById("videoModal");
      const closeBtn = modal.querySelector(".close-modal");

      app.openVideoModal = () => {
        modal.style.display = "flex";
        gsap.from(".modal-container", { duration: 0.5, scale: 0.8, opacity: 0, ease: "back.out(1.7)" });
        const video = document.getElementById("battleVideo");
        video?.play().catch(() => console.log("User interaction required"));
      };

      const closeVideoModal = () => {
        gsap.to(".modal-container", {
          duration: 0.3,
          scale: 0.8,
          opacity: 0,
          ease: "power2.in",
          onComplete: () => {
            modal.style.display = "none";
            const video = document.getElementById("battleVideo");
            if (video) { video.pause(); video.currentTime = 0; }
          },
        });
      };

      closeBtn?.addEventListener("click", closeVideoModal);
      window.addEventListener("click", (e) => { if (e.target === modal) closeVideoModal(); });
    },

    // ------------------ Scroll Animations ------------------
    initScrollAnimations: function () {
      gsap.utils.toArray(".section").forEach((s) => {
        gsap.from(s, { scrollTrigger: { trigger: s, start: "top 80%", toggleActions: "play none none reverse" }, y: 50, opacity: 0, duration: 1, ease: "power2.out" });
      });

      gsap.utils.toArray(".power-card").forEach((card, i) => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: "top 90%" }, y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out" });
      });

      gsap.utils.toArray(".chart-bar").forEach((bar, i) => {
        const fill = bar.querySelector(".bar-fill");
        gsap.from(fill, { scrollTrigger: { trigger: bar, start: "top 90%" }, height: "0%", duration: 1.5, delay: i * 0.2, ease: "power2.out" });
      });
    },

    // ------------------ Combat Mode ------------------
    initCombatMode: function () {
      const combatBtn = document.getElementById("combatMode");
      const soundBtn = document.getElementById("soundToggle");
      let combat = false, sound = true;

      const toggleCombat = () => {
        combat = !combat;
        document.body.classList.toggle("combat-mode", combat);
        combatBtn.innerHTML = combat
          ? '<i class="fas fa-crosshairs"></i><span>COMBAT ACTIVE</span>'
          : '<i class="fas fa-crosshairs"></i><span>COMBAT MODE</span>';
        combatBtn.style.background = combat ? "var(--color-energy)" : "var(--color-accent)";
        combatBtn.style.borderColor = combat ? "var(--color-energy)" : "var(--color-accent)";
        combat ? app.intensifyEffects() : app.normalizeEffects();
      };

      const toggleSound = () => {
        sound = !sound;
        soundBtn.innerHTML = sound ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        soundBtn.style.color = sound ? "var(--color-text)" : "var(--color-text-secondary)";
      };

      combatBtn?.addEventListener("click", toggleCombat);
      soundBtn?.addEventListener("click", toggleSound);
    },

    intensifyEffects: function () {
      const core = document.querySelector(".energy-core");
      if (core) gsap.to(core, { duration: 0.5, scale: 1.5, opacity: 0.8, ease: "power2.out" });
      for (let i = 0; i < 20; i++) app.createParticle();
    },

    normalizeEffects: function () {
      const core = document.querySelector(".energy-core");
      if (core) gsap.to(core, { duration: 0.5, scale: 1, opacity: 0.5, ease: "power2.out" });
    },

    createParticle: function () {
      const p = document.createElement("div");
      Object.assign(p.style, {
        position: "fixed", width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`,
        background: "var(--color-accent)", borderRadius: "50%", pointerEvents: "none", zIndex: 1000,
        top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw`, opacity: 0
      });
      document.body.appendChild(p);
      gsap.to(p, { duration: Math.random() * 2 + 1, x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, opacity: 0.8, ease: "power2.out", onComplete: () => p.remove() });
    },

    // ------------------ Counters ------------------
    initCounters: function () {
      document.querySelectorAll("[data-count]").forEach((el) => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = () => {
          current += target / 120; // ~2s at 60fps
          if (current < target) {
            el.textContent = Math.round(current).toLocaleString();
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toLocaleString();
          }
        };
        step();
      });
    },

    // ------------------ Energy Trail ------------------
    createEnergyTrail: function (x, y) {
      const trail = document.createElement("div");
      Object.assign(trail.style, {
        position: "fixed", width: "3px", height: "3px", background: "var(--color-energy)", borderRadius: "50%",
        pointerEvents: "none", zIndex: 1000, top: `${y}px`, left: `${x}px`, boxShadow: "0 0 10px var(--color-energy)"
      });
      document.body.appendChild(trail);
      gsap.to(trail, { duration: 0.5, width: 0, height: 0, opacity: 0, ease: "power2.out", onComplete: () => trail.remove() });
    },

    initMouseTrail: function () {
      document.addEventListener("mousemove", (e) => {
        if (Math.random() > 0.7) app.createEnergyTrail(e.clientX, e.clientY);
      });
    },
  };

  app.init();
});
