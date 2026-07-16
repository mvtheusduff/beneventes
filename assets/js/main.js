(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    mobileNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mobileNav.classList.contains("is-open");
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileNav();
  });

  /* ---------- Como funciona: toggle etapas ---------- */
  var processToggle = document.getElementById("processToggle");
  var processGrid = document.getElementById("processGrid");
  if (processToggle && processGrid) {
    processToggle.addEventListener("click", function () {
      var isOpen = processGrid.classList.toggle("is-open");
      processToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      processToggle.setAttribute("aria-label", isOpen ? "Ocultar etapas" : "Mostrar etapas");
    });
  }

  /* ---------- Portfolio carousel: manifest of every photo, every folder ---------- */
  var CATEGORIES = [
    { key: "blackwork", folder: "blackwork", prefix: "black", count: 39, label: "Blackwork" },
    { key: "fineline", folder: "fineline", prefix: "fine", count: 70, label: "Fineline" },
    { key: "anime", folder: "anime", prefix: "anime", count: 13, label: "Anime / Geek" },
    { key: "pretoecinza", folder: "preto e cinza", prefix: "pc", count: 21, label: "Preto & Cinza" }
  ];

  var GALLERY_ITEMS = [];
  CATEGORIES.forEach(function (cat) {
    for (var i = 1; i <= cat.count; i++) {
      GALLERY_ITEMS.push({
        category: cat.key,
        label: cat.label,
        src: cat.folder + "/" + cat.prefix + i + ".jpg",
        alt: "Tatuagem " + cat.label + " feita por Beneventes (" + i + ")"
      });
    }
  });

  var galleryTrack = document.getElementById("galleryTrack");
  var galleryDots = document.getElementById("galleryDots");
  var prevBtn = document.querySelector(".carousel-arrow-prev");
  var nextBtn = document.querySelector(".carousel-arrow-next");
  var DOT_COUNT = 5;
  var galleryAutoplayTimer = null;

  /* currentItems mirrors whatever filter is active; the carousel, the
     all-photos grid and the lightbox all navigate this same array by index */
  var currentItems = GALLERY_ITEMS.slice();

  function filterItems(filter) {
    return filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(function (it) { return it.category === filter; });
  }

  function renderGalleryItems(filter) {
    if (!galleryTrack) return;
    currentItems = filterItems(filter);
    galleryTrack.innerHTML = "";
    var frag = document.createDocumentFragment();

    currentItems.forEach(function (it, idx) {
      var item = document.createElement("div");
      item.className = "gallery-item";
      item.dataset.category = it.category;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.index = idx;

      var img = document.createElement("img");
      img.src = it.src;
      img.alt = it.alt;
      img.loading = "lazy";

      var tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = it.label;

      btn.appendChild(img);
      item.appendChild(btn);
      item.appendChild(tag);
      frag.appendChild(item);
    });

    galleryTrack.appendChild(frag);
    galleryTrack.scrollLeft = 0;
    buildDots();
    updateDots();
  }

  /* ---------- JS-driven eased scroll animation (used by arrows, dots, autoplay) ---------- */
  function animateScrollTo(el, target, duration) {
    duration = duration || 500;
    var start = el.scrollLeft;
    var change = target - start;
    if (Math.abs(change) < 1) return;
    var startTime = null;

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      el.scrollLeft = start + change * easeInOutQuad(progress);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function galleryMaxScroll() {
    return Math.max(0, galleryTrack.scrollWidth - galleryTrack.clientWidth);
  }

  function scrollGalleryBy(dir) {
    var slide = galleryTrack.querySelector(".gallery-item");
    var step = slide ? slide.getBoundingClientRect().width + 14 : 260;
    var target = galleryTrack.scrollLeft + dir * step * 2;
    target = Math.max(0, Math.min(target, galleryMaxScroll()));
    animateScrollTo(galleryTrack, target, 450);
  }

  function buildDots() {
    if (!galleryDots) return;
    galleryDots.innerHTML = "";
    for (var i = 0; i < DOT_COUNT; i++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Ir para trecho " + (i + 1) + " do portfólio");
      (function (idx) {
        dot.addEventListener("click", function () {
          stopGalleryAutoplay();
          var max = galleryMaxScroll();
          animateScrollTo(galleryTrack, (max * idx) / (DOT_COUNT - 1), 500);
        });
      })(i);
      galleryDots.appendChild(dot);
    }
  }

  function updateDots() {
    if (!galleryDots) return;
    var max = galleryMaxScroll();
    var ratio = max > 0 ? galleryTrack.scrollLeft / max : 0;
    var activeIdx = Math.round(ratio * (DOT_COUNT - 1));
    galleryDots.querySelectorAll(".carousel-dot").forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === activeIdx);
    });
  }

  function startGalleryAutoplay() {
    if (reduceMotion || !galleryTrack) return;
    stopGalleryAutoplay();
    galleryAutoplayTimer = setInterval(function () {
      if (galleryTrack.scrollLeft >= galleryMaxScroll() - 4) {
        animateScrollTo(galleryTrack, 0, 600);
      } else {
        scrollGalleryBy(1);
      }
    }, 4000);
  }

  function stopGalleryAutoplay() {
    if (galleryAutoplayTimer) clearInterval(galleryAutoplayTimer);
  }

  if (galleryTrack) {
    if (prevBtn) prevBtn.addEventListener("click", function () { stopGalleryAutoplay(); scrollGalleryBy(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stopGalleryAutoplay(); scrollGalleryBy(1); });

    var galleryScrollTicking = false;
    galleryTrack.addEventListener("scroll", function () {
      if (!galleryScrollTicking) {
        galleryScrollTicking = true;
        requestAnimationFrame(function () {
          updateDots();
          galleryScrollTicking = false;
        });
      }
    }, { passive: true });

    galleryTrack.addEventListener("pointerenter", stopGalleryAutoplay);
    galleryTrack.addEventListener("pointerleave", startGalleryAutoplay);
    galleryTrack.addEventListener("touchstart", stopGalleryAutoplay, { passive: true });
  }

  /* ---------- Gallery filter ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn[data-filter]");

  function applyFilter(filter) {
    renderGalleryItems(filter);
    filterButtons.forEach(function (btn) {
      var active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    startGalleryAutoplay();
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.dataset.filter);
    });
  });

  /* Style cards link into the filtered gallery */
  document.querySelectorAll("[data-filter-link]").forEach(function (card) {
    card.addEventListener("click", function () {
      applyFilter(card.dataset.filterLink);
    });
  });

  renderGalleryItems("all");
  startGalleryAutoplay();

  /* ---------- Lightbox (event delegation: gallery is built dynamically) ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var lightboxCounter = document.getElementById("lightboxCounter");
  var lastFocused = null;
  var lightboxIndex = 0;

  function isGridOverlayOpen() {
    return !!(gridOverlay && gridOverlay.classList.contains("is-open"));
  }

  function updateLightboxImage() {
    var it = currentItems[lightboxIndex];
    if (!it) return;
    lightboxImg.src = it.src;
    lightboxImg.alt = it.alt || "";
    if (lightboxCounter) lightboxCounter.textContent = (lightboxIndex + 1) + " / " + currentItems.length;
    var hideNav = currentItems.length <= 1;
    if (lightboxPrev) lightboxPrev.classList.toggle("is-hidden", hideNav);
    if (lightboxNext) lightboxNext.classList.toggle("is-hidden", hideNav);
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    lightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
    document.body.style.overflow = isGridOverlayOpen() ? "hidden" : "";
    if (lastFocused) lastFocused.focus();
  }

  function showPrevPhoto() {
    if (currentItems.length < 2) return;
    lightboxIndex = (lightboxIndex - 1 + currentItems.length) % currentItems.length;
    updateLightboxImage();
  }

  function showNextPhoto() {
    if (currentItems.length < 2) return;
    lightboxIndex = (lightboxIndex + 1) % currentItems.length;
    updateLightboxImage();
  }

  if (galleryTrack) {
    galleryTrack.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      openLightbox(Number(btn.dataset.index));
    });
  }

  lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevPhoto);
  if (lightboxNext) lightboxNext.addEventListener("click", showNextPhoto);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* Swipe left/right to move between photos, iOS Photos-style */
  var lightboxTouchX = null;
  var lightboxTouchY = null;
  lightbox.addEventListener("touchstart", function (e) {
    var t = e.touches[0];
    lightboxTouchX = t.clientX;
    lightboxTouchY = t.clientY;
  }, { passive: true });

  lightbox.addEventListener("touchend", function (e) {
    if (lightboxTouchX === null) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - lightboxTouchX;
    var dy = t.clientY - lightboxTouchY;
    lightboxTouchX = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) showNextPhoto();
      else showPrevPhoto();
    }
  }, { passive: true });

  /* ---------- All-photos grid overlay (iPhone Photos-style) ---------- */
  var galleryGridBtn = document.getElementById("galleryGridBtn");
  var gridOverlay = document.getElementById("gridOverlay");
  var gridOverlayGrid = document.getElementById("gridOverlayGrid");
  var gridOverlayClose = document.getElementById("gridOverlayClose");
  var gridOverlayCount = document.getElementById("gridOverlayCount");
  var lastFocusedGrid = null;

  /* currentItems is already grouped by category (GALLERY_ITEMS is built
     category-by-category), so a single pass splitting on category change
     is enough to produce contiguous style sections, iOS Photos-style */
  function renderGridOverlay() {
    if (!gridOverlayGrid) return;
    gridOverlayGrid.innerHTML = "";
    var frag = document.createDocumentFragment();

    var groups = [];
    currentItems.forEach(function (it, idx) {
      var group = groups.length ? groups[groups.length - 1] : null;
      if (!group || group.category !== it.category) {
        group = { category: it.category, label: it.label, entries: [] };
        groups.push(group);
      }
      group.entries.push({ item: it, index: idx });
    });

    groups.forEach(function (group) {
      var header = document.createElement("div");
      header.className = "grid-overlay-section-head";
      header.textContent = group.label;

      var count = document.createElement("span");
      count.className = "grid-overlay-section-count";
      count.textContent = group.entries.length;
      header.appendChild(count);
      frag.appendChild(header);

      var sectionGrid = document.createElement("div");
      sectionGrid.className = "grid-overlay-section-grid";

      group.entries.forEach(function (entry) {
        var cell = document.createElement("div");
        cell.className = "grid-overlay-item";

        var btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.index = entry.index;

        var img = document.createElement("img");
        img.src = entry.item.src;
        img.alt = entry.item.alt;
        img.loading = "lazy";

        btn.appendChild(img);
        cell.appendChild(btn);
        sectionGrid.appendChild(cell);
      });

      frag.appendChild(sectionGrid);
    });

    gridOverlayGrid.appendChild(frag);
    if (gridOverlayCount) gridOverlayCount.textContent = "(" + currentItems.length + ")";
  }

  function openGridOverlay() {
    if (!gridOverlay) return;
    lastFocusedGrid = document.activeElement;
    stopGalleryAutoplay();
    renderGridOverlay();
    gridOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (gridOverlayClose) gridOverlayClose.focus();
  }

  function closeGridOverlay() {
    if (!gridOverlay) return;
    gridOverlay.classList.remove("is-open");
    document.body.style.overflow = lightbox.classList.contains("is-open") ? "hidden" : "";
    if (lastFocusedGrid) lastFocusedGrid.focus();
    startGalleryAutoplay();
  }

  if (galleryGridBtn) galleryGridBtn.addEventListener("click", openGridOverlay);
  if (gridOverlayClose) gridOverlayClose.addEventListener("click", closeGridOverlay);
  if (gridOverlay) {
    gridOverlay.addEventListener("click", function (e) {
      if (e.target === gridOverlay) closeGridOverlay();
    });
  }
  if (gridOverlayGrid) {
    gridOverlayGrid.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      openLightbox(Number(btn.dataset.index));
    });
  }
  /* Escape/arrow handling: the lightbox (photo view) takes priority over
     the grid behind it, mirroring how a single Escape only backs out one
     level of the iOS Photos view stack at a time */
  document.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrevPhoto();
      else if (e.key === "ArrowRight") showNextPhoto();
      return;
    }
    if (e.key === "Escape" && isGridOverlayOpen()) {
      closeGridOverlay();
    }
  });

  /* ---------- Small crossfade carousels: style cards + hero "tatuando" photo ---------- */
  if (!reduceMotion) {
    document.querySelectorAll("[data-carousel]").forEach(function (media, idx) {
      var imgs = media.querySelectorAll("img");
      if (imgs.length < 2) return;
      var current = 0;
      setInterval(function () {
        imgs[current].classList.remove("is-active");
        current = (current + 1) % imgs.length;
        imgs[current].classList.add("is-active");
      }, 3400 + idx * 500);
    });
  }

  /* ---------- WhatsApp float: fade out once the footer (with its own contact links) is in view ---------- */
  var whatsappFloat = document.querySelector(".whatsapp-float");
  var siteFooter = document.querySelector(".site-footer");

  if (whatsappFloat && siteFooter && "IntersectionObserver" in window) {
    var footerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          whatsappFloat.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );
    footerObserver.observe(siteFooter);
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
