// Menú hamburguesa// Esperar a que el documento se cargue

const navToggle = document.querySelector('.nav-toggle');document.addEventListener('DOMContentLoaded', function() {

const primaryNav = document.querySelector('.primary-nav');    // Obtener elementos del menú

    var botonMenu = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', () => {    var menu = document.getElementById('primary-nav');

  const isOpen = navToggle.classList.toggle('active');    

  primaryNav.classList.toggle('active');    // Agregar funcionalidad al botón del menú

      if (botonMenu && menu) {

  // Prevenir scroll cuando el menú está abierto        botonMenu.addEventListener('click', function() {

  document.body.style.overflow = isOpen ? 'hidden' : '';            menu.classList.toggle('open');

});        });

    }

// Cerrar menú al hacer click en un enlace});

document.querySelectorAll('.nav-link').forEach(link => {    this.overlay.setAttribute('role', 'dialog');

  link.addEventListener('click', () => {    this.overlay.setAttribute('aria-modal', 'true');

    navToggle.classList.remove('active');    this.overlay.innerHTML = [

    primaryNav.classList.remove('active');      '<div class="lightbox-header">',

    document.body.style.overflow = '';      '  <div class="lightbox-title"></div>',

  });      '  <button class="lightbox-close" aria-label="Cerrar">Cerrar</button>',

});      '</div>',

      '<div class="lightbox-main">',

// Actualizar header al hacer scroll      '  <div class="lightbox-img-wrap">',

const header = document.querySelector('.site-header');      '    <img class="lightbox-img" alt="" />',

window.addEventListener('scroll', () => {      '  </div>',

  if (window.scrollY > 50) {      '  <div class="lightbox-controls">',

    header.classList.add('scrolled');      '    <button class="lightbox-arrow prev" aria-label="Anterior">‹</button>',

  } else {      '    <button class="lightbox-arrow next" aria-label="Siguiente">›</button>',

    header.classList.remove('scrolled');      '  </div>',

  }      '  <div class="lightbox-zoom">',

});      '    <button class="zoom-in" aria-label="Acercar">+</button>',
      '    <button class="zoom-out" aria-label="Alejar">−</button>',
      '    <button class="zoom-reset" aria-label="Restablecer">100%</button>',
      '  </div>',
      '</div>',
      '<div class="lightbox-thumbs"></div>'
    ].join('');
    document.body.appendChild(this.overlay);

    this.titleEl = this.overlay.querySelector('.lightbox-title');
    this.imgEl = this.overlay.querySelector('.lightbox-img');
    this.thumbsEl = this.overlay.querySelector('.lightbox-thumbs');
    this.closeBtn = this.overlay.querySelector('.lightbox-close');
    this.prevBtn = this.overlay.querySelector('.lightbox-arrow.prev');
    this.nextBtn = this.overlay.querySelector('.lightbox-arrow.next');
    this.zoomInBtn = this.overlay.querySelector('.zoom-in');
    this.zoomOutBtn = this.overlay.querySelector('.zoom-out');
    this.zoomResetBtn = this.overlay.querySelector('.zoom-reset');
    this.mainEl = this.overlay.querySelector('.lightbox-main');

    this.items = [];
    this.index = 0;
    this.scale = 1;
    this.lastFocused = null;

    var self = this;
    this.close = function () {
      self.overlay.classList.remove('open');
      self.overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', self._onKey);
      self._setScale(1);
      // Restore previous focus
      if (self.lastFocused && typeof self.lastFocused.focus === 'function') {
        self.lastFocused.focus();
      }
    };
    this._onKey = function (e) {
      if (e.key === 'Escape') return self.close();
      if (e.key === 'ArrowLeft') return self.prev();
      if (e.key === 'ArrowRight') return self.next();
    };
    this._setScale = function (val) {
      self.scale = Math.max(0.5, Math.min(3, val));
      self.imgEl.style.transform = 'scale(' + self.scale + ')';
    };
    this._render = function () {
      if (!self.items.length) return;
      var item = self.items[self.index];
      self.imgEl.src = item.src;
      self.imgEl.alt = item.title || '';
      self.titleEl.textContent = item.title || '';
      self._setScale(1);
      // Preload neighbours for smoother nav
      var next = new Image();
      next.src = self.items[(self.index + 1) % self.items.length].src;
      var prev = new Image();
      prev.src = self.items[(self.index - 1 + self.items.length) % self.items.length].src;
      // Thumbs
      self.thumbsEl.innerHTML = '';
      self.items.forEach(function (it, i) {
        var t = document.createElement('div');
        t.className = 'lightbox-thumb' + (i === self.index ? ' active' : '');
        var img = document.createElement('img');
        img.src = it.src;
        img.alt = it.title || '';
        t.appendChild(img);
        t.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          self.go(i);
        });
        self.thumbsEl.appendChild(t);
      });
      // Ensure active thumbnail is visible
      var activeThumb = self.thumbsEl.querySelector('.lightbox-thumb.active');
      if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    };
    this.go = function (i) {
      if (!self.items.length) return;
      self.index = (i + self.items.length) % self.items.length;
      self._render();
    };
    this.prev = function () { self.go(self.index - 1); };
    this.next = function () { self.go(self.index + 1); };
    this._collectFromRoot = function (rootEl) {
      // Collect gallery figures, company logo, and founder portraits in DOM order
      var nodes = Array.prototype.slice.call(
        rootEl.querySelectorAll('.gallery figure.tile, .img-box.img-xl, .portrait.img-box')
      );
      var withImgs = nodes.filter(function (n) { return n.querySelector('img'); });
      return withImgs;
    };
    this.openFromCompany = function (companyEl, startHolderEl) {
      var withImgs = self._collectFromRoot(companyEl);
      if (!withImgs.length) return;
      self.items = withImgs.map(function (el) {
        var img = el.querySelector('img');
        var title = '';
        if (el.matches('figure.tile')) {
          var cap = el.querySelector('figcaption');
          title = cap ? cap.textContent.trim() : (img ? img.alt : '');
        } else if (el.classList.contains('img-xl')) {
          title = img ? img.alt || 'Logo' : 'Logo';
        } else if (el.classList.contains('portrait')) {
          title = img ? img.alt || 'Fundador' : 'Fundador';
        }
        return { src: img ? img.getAttribute('src') : '', title: title };
      });
      var startIndex = withImgs.indexOf(startHolderEl);
      self.index = Math.max(0, startIndex);
      // Save focus and open
      self.lastFocused = document.activeElement;
      self.overlay.classList.add('open');
      self.overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', self._onKey);
      self._render();
      // Focus close button for accessibility
      self.closeBtn.focus();
    };

    // Events
    this.closeBtn.addEventListener('click', this.close);
    this.prevBtn.addEventListener('click', this.prev);
    this.nextBtn.addEventListener('click', this.next);
    this.zoomInBtn.addEventListener('click', function () { self._setScale(self.scale + 0.2); });
    this.zoomOutBtn.addEventListener('click', function () { self._setScale(self.scale - 0.2); });
    this.zoomResetBtn.addEventListener('click', function () { self._setScale(1); });
    // Click outside image to close (but not when clicking controls or thumbnails)
    this.overlay.addEventListener('click', function (e) {
      var wrap = self.overlay.querySelector('.lightbox-img-wrap');
      var isArrow = e.target.closest('.lightbox-arrow');
      var isZoom = e.target.closest('.lightbox-zoom');
      var isThumb = e.target.closest('.lightbox-thumbs');
      if (!wrap.contains(e.target) && !isArrow && !isZoom && !isThumb) {
        self.close();
      }
    });

    // Touch swipe gestures on main area
    var touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0, dragging = false;
    function onTouchStart(ev) {
      var t = ev.touches[0];
      touchStartX = t.clientX; touchStartY = t.clientY; dragging = true;
    }
    function onTouchMove(ev) {
      if (!dragging) return;
      var t = ev.touches[0];
      touchEndX = t.clientX; touchEndY = t.clientY;
    }
    function onTouchEnd() {
      if (!dragging) return;
      var dx = touchEndX - touchStartX;
      var dy = touchEndY - touchStartY;
      dragging = false;
      // Horizontal swipe threshold
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) self.next(); else self.prev();
      }
      touchStartX = touchStartY = touchEndX = touchEndY = 0;
    }
    this.mainEl.addEventListener('touchstart', onTouchStart, { passive: true });
    this.mainEl.addEventListener('touchmove', onTouchMove, { passive: true });
    this.mainEl.addEventListener('touchend', onTouchEnd);
  }

  var lightbox = new Lightbox();

  // Delegate clicks on gallery tiles, founders portraits, and company logo
  document.addEventListener('click', function (e) {
    var imgBox = e.target.closest('.gallery .tile .img-box, .section.company .img-xl, .section.company .portrait.img-box');
    if (!imgBox) return;
    var img = imgBox.querySelector('img');
    if (!img) return; // No image yet (placeholder)
    var holder = imgBox.closest('figure.tile') || imgBox; // figure for tiles, container div for logo/portrait
    var company = imgBox.closest('.section.company');
    if (!holder || !company) return;
    e.preventDefault();
    lightbox.openFromCompany(company, holder);
  });
});
