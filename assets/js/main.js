document.documentElement.classList.add('js');

(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const renderPublication = (pub, compact = false) => compact ? `
    <article class="recent-publication-item">
      <div class="recent-publication-year">${pub.year}</div>
      <div><div class="recent-publication-title">${pub.title}</div><div class="recent-publication-meta"><em>${pub.journal}</em></div></div>
      ${pub.url ? `<a class="publication-link" href="${pub.url}" target="_blank" rel="noopener" aria-label="Open publication">↗</a>` : ''}
    </article>` : `
    <article class="publication-item">
      <div class="publication-year">${pub.year}</div>
      <div>
        <div class="publication-title">${pub.title}</div>
        <div class="publication-meta">${pub.authors}<br><em>${pub.journal}</em></div>
      </div>
      ${pub.url ? `<a class="publication-link" href="${pub.url}" target="_blank" rel="noopener">Publication ↗</a>` : ''}
    </article>`;

  if (Array.isArray(window.PUBLICATIONS)) {
    const pubList = document.getElementById('publication-list');
    if (pubList) pubList.innerHTML = window.PUBLICATIONS.map(pub => renderPublication(pub, false)).join('');

    const recentList = document.getElementById('recent-publication-list');
    if (recentList) {
      const limit = Number(recentList.dataset.limit || 10);
      recentList.innerHTML = window.PUBLICATIONS.slice(0, limit).map(pub => renderPublication(pub, true)).join('');
    }
  }

  const topicImages = window.RESEARCH_TOPIC_IMAGES || {};
  document.querySelectorAll('[data-research-key]').forEach(slot => {
    const item = topicImages[slot.dataset.researchKey];
    if (item && item.src) {
      slot.hidden = false;
      slot.innerHTML = `<img src="${item.src}" alt="${item.alt || ''}">${item.caption ? `<span>${item.caption}</span>` : ''}`;
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('visible'));
  }

  const gallery = Array.isArray(window.RESEARCH_GALLERY) ? window.RESEARCH_GALLERY : [];
  const gallerySection = document.getElementById('research-gallery');
  if (gallerySection && gallery.length) {
    gallerySection.hidden = false;
    const stage = gallerySection.querySelector('.carousel-stage');
    const dots = gallerySection.querySelector('.carousel-dots');
    const prev = gallerySection.querySelector('[data-carousel="prev"]');
    const next = gallerySection.querySelector('[data-carousel="next"]');
    let index = 0;
    let timer = null;

    stage.innerHTML = gallery.map((item, i) => `
      <figure class="carousel-slide${i === 0 ? ' active' : ''}" data-index="${i}">
        <img src="${item.src}" alt="${item.alt || ''}">
        ${(item.title || item.caption) ? `<figcaption class="carousel-caption">${item.title ? `<strong>${item.title}</strong>` : ''}${item.caption ? `<span>${item.caption}</span>` : ''}</figcaption>` : ''}
      </figure>
    `).join('');
    dots.innerHTML = gallery.map((_, i) => `<button class="carousel-dot${i===0?' active':''}" aria-label="Show image ${i+1}" data-index="${i}"></button>`).join('');

    const slides = [...stage.querySelectorAll('.carousel-slide')];
    const dotEls = [...dots.querySelectorAll('.carousel-dot')];
    const show = newIndex => {
      index = (newIndex + gallery.length) % gallery.length;
      slides.forEach((s,i) => s.classList.toggle('active', i === index));
      dotEls.forEach((d,i) => d.classList.toggle('active', i === index));
    };
    const stop = () => { if (timer) clearInterval(timer); };
    const start = () => {
      stop();
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && gallery.length > 1) {
        timer = setInterval(() => show(index + 1), 6000);
      }
    };
    prev?.addEventListener('click', () => { show(index - 1); start(); });
    next?.addEventListener('click', () => { show(index + 1); start(); });
    dotEls.forEach(d => d.addEventListener('click', () => { show(Number(d.dataset.index)); start(); }));
    gallerySection.addEventListener('mouseenter', stop);
    gallerySection.addEventListener('mouseleave', start);
    gallerySection.addEventListener('focusin', stop);
    gallerySection.addEventListener('focusout', start);
    start();
  }
})();
