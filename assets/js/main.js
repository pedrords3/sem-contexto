/*
 * Sem Contexto — site oficial
 * Animações, idioma, baralho do topo, abas e galeria de mídias. Sem dependências.
 */

const state = {
    lang: 'pt',
    scrollY: 0,
    lastScrollY: 0,
    ticking: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches
};

const dom = {};

const CURSOR_EN = { Jogar: 'Play', Baixar: 'Download', Ver: 'View', Assistir: 'Watch', Embaralhar: 'Shuffle' };

const UI_TEXT = {
    pt: { media: 'Mídias', video: 'Vídeo', image: 'Imagem', shuffle: 'Embaralhar as cartas', items: n => `${n} mídia${n === 1 ? '' : 's'}` },
    en: { media: 'Media', video: 'Video', image: 'Image', shuffle: 'Shuffle the cards', items: n => `${n} item${n === 1 ? '' : 's'}` }
};

/* ---------- utilidades ---------- */

function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

function t(value) {
    return typeof value === 'object' && value !== null ? value[state.lang] : value;
}

function storage(action, key, value) {
    try {
        if (action === 'get') return localStorage.getItem(key);
        localStorage.setItem(key, value);
    } catch (e) {
        return null;
    }
}

/* ---------- idioma ---------- */

function initLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.dataset.pt = el.innerHTML.trim();
    });

    document.querySelector('.lang-toggle').addEventListener('click', () => {
        setLanguage(state.lang === 'pt' ? 'en' : 'pt');
    });

    const saved = storage('get', 'lang');
    if (saved === 'en') setLanguage('en');
}

function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.pt;
    });
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(el => {
        el.classList.toggle('is-active', el.dataset.lang === lang);
    });
    storage('set', 'lang', lang);

    splitWords();
    updateStatement();
    dealCards();
    if (dom.mediaDialog.open) renderMedia();
}

/* ---------- intro ---------- */

function initIntro() {
    const intro = document.querySelector('.intro');
    const count = intro.querySelector('.intro__count');
    const bar = intro.querySelector('.intro__bar i');

    const finish = () => {
        document.body.classList.add('is-ready');
        intro.classList.add('is-done');
        window.setTimeout(() => intro.remove(), 1200);
    };

    if (state.reducedMotion) {
        finish();
        return;
    }

    const duration = 1300;
    const start = performance.now();
    function step(now) {
        const p = clamp((now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
        bar.style.transform = `scaleX(${eased})`;
        if (p < 1) requestAnimationFrame(step);
        else window.setTimeout(finish, 180);
    }
    requestAnimationFrame(step);
}

/* ---------- texto animado ---------- */

function splitChars() {
    document.querySelectorAll('.split').forEach(el => {
        const text = el.textContent;
        el.setAttribute('aria-label', text);
        el.innerHTML = [...text].map((char, i) =>
            `<span class="split-char" aria-hidden="true" style="--i:${i}">${char}</span>`
        ).join('');
    });
}

function splitWords() {
    document.querySelectorAll('[data-words]').forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    });
    dom.words = [...document.querySelectorAll('[data-words] .word')];
}

function updateStatement() {
    if (!dom.words || !dom.words.length) return;
    if (state.reducedMotion) {
        dom.words.forEach(w => w.classList.add('is-lit'));
        return;
    }
    const el = dom.words[0].parentElement;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Acende palavra por palavra enquanto o parágrafo atravessa a tela.
    const progress = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.35));
    const lit = Math.round(progress * dom.words.length);
    dom.words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
}

/* ---------- baralho do topo ---------- */

const deck = { question: 0, answer: 0 };

function randomOther(current, length) {
    const next = Math.floor(Math.random() * (length - 1));
    return next >= current ? next + 1 : next;
}

function dealCards() {
    const cards = deckCards[state.lang];
    dom.deckQuestion.textContent = cards.questions[deck.question];
    dom.deckAnswer.textContent = cards.answers[deck.answer];
    dom.deck.setAttribute('aria-label', UI_TEXT[state.lang].shuffle);
}

function initDeck() {
    dom.deck = document.querySelector('.deck');
    dom.deckQuestion = document.getElementById('deckQuestion');
    dom.deckAnswer = document.getElementById('deckAnswer');
    const wrap = document.querySelector('.hero__deck');

    dom.deck.addEventListener('click', () => {
        const cards = deckCards[state.lang];
        deck.question = randomOther(deck.question, cards.questions.length);
        deck.answer = randomOther(deck.answer, cards.answers.length);

        if (state.reducedMotion) {
            dealCards();
            return;
        }
        dom.deck.classList.remove('is-shuffling');
        void dom.deck.offsetWidth; // reinicia a animação em cliques seguidos
        dom.deck.classList.add('is-shuffling');
        // Troca o texto no meio do movimento, quando as cartas estão afastadas.
        window.setTimeout(dealCards, 260);
    });
    dom.deck.addEventListener('animationend', () => dom.deck.classList.remove('is-shuffling'));

    if (!state.finePointer || state.reducedMotion) return;
    // Inclina as cartas na direção do ponteiro.
    wrap.addEventListener('pointermove', e => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dom.deck.style.setProperty('--rx', `${x * 14}deg`);
        dom.deck.style.setProperty('--ry', `${y * -14}deg`);
    });
    wrap.addEventListener('pointerleave', () => {
        dom.deck.style.setProperty('--rx', '0deg');
        dom.deck.style.setProperty('--ry', '0deg');
    });
}

/* ---------- reveal e contadores ---------- */

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (state.reducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6%' });
    elements.forEach(el => observer.observe(el));
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const animate = el => {
        const target = Number(el.dataset.counter);
        const start = performance.now();
        const step = now => {
            const p = clamp((now - start) / 1200);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if (state.reducedMotion || !('IntersectionObserver' in window)) {
        counters.forEach(el => { el.textContent = el.dataset.counter; });
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.6 });
    counters.forEach(el => observer.observe(el));
}

/* ---------- ticker ---------- */

function initTicker() {
    const track = document.querySelector('.ticker__track');
    if (!track) return;
    // Duplica o conteúdo para o loop ficar contínuo.
    track.innerHTML += track.innerHTML;
}

/* ---------- parallax, header e nav ---------- */

function updateParallax() {
    if (state.reducedMotion) return;
    dom.parallax.forEach(el => {
        const rect = el.getBoundingClientRect();
        const p = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const amount = Number(el.dataset.parallax || 0);
        el.style.setProperty('--parallax', `${(p - 0.5) * amount * 2}px`);
    });
}

function updateHeader() {
    const y = state.scrollY;
    dom.header.classList.toggle('is-scrolled', y > 40);
    const goingDown = y > state.lastScrollY && y > 300;
    dom.header.classList.toggle('is-hidden', goingDown && !document.body.classList.contains('menu-open'));
    state.lastScrollY = y;

    let current = '';
    dom.sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.4) current = section.id;
    });
    // A seção Web faz parte de "Telas" no menu.
    if (current === 'web') current = 'telas';
    dom.navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
}

function onScroll() {
    state.ticking = false;
    state.scrollY = window.scrollY;
    updateHeader();
    updateParallax();
    updateStatement();
}

function requestUpdate() {
    if (state.ticking) return;
    state.ticking = true;
    requestAnimationFrame(onScroll);
}

function initScroll() {
    onScroll();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
}

function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const close = () => {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    dom.navLinks.forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- cursor ---------- */

function initCursor() {
    if (!state.finePointer || state.reducedMotion) return;
    const cursor = document.querySelector('.cursor');
    const label = cursor.querySelector('.cursor__label');

    // Posição aplicada direto no evento, sem suavização: a bolha acompanha o ponteiro sem atraso.
    window.addEventListener('pointermove', e => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-label'));

    document.addEventListener('pointerover', e => {
        const labelled = e.target.closest('[data-cursor]');
        cursor.classList.toggle('is-label', !!labelled);
        // Sobre fundos amarelos a bolha fica escura para continuar visível.
        cursor.classList.toggle('is-dark', !!e.target.closest('.cta, .btn--accent, .header-cta'));
        if (labelled) {
            const text = labelled.dataset.cursor;
            label.textContent = state.lang === 'en' ? (CURSOR_EN[text] || text) : text;
        }
    });
}

/* ---------- abas dos controles ---------- */

function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(list => {
        const tabs = [...list.querySelectorAll('[role="tab"]')];
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(other => {
                    const active = other === tab;
                    other.classList.toggle('is-active', active);
                    other.setAttribute('aria-selected', String(active));
                    document.getElementById(other.dataset.tab).hidden = !active;
                });
            });
        });
    });
}

/* ---------- modal ---------- */

function initDialogs() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', e => {
            // Clique no fundo (fora do conteúdo) fecha.
            if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
        });
        dialog.addEventListener('close', () => {
            document.body.classList.remove('dialog-open');
            if (dialog === dom.mediaDialog) dom.mediaStage.innerHTML = '';
        });
    });
}

function openDialog(dialog) {
    document.body.classList.add('dialog-open');
    dialog.showModal();
}

/* ---------- galeria de mídias ---------- */

const media = { project: '', name: '', index: 0, filter: 'all' };

function stepMedia(direction) {
    const items = projectMedia[media.project] || [];
    if (items.length) showMedia((media.index + direction + items.length) % items.length);
}

function initMedia() {
    document.querySelectorAll('.view-media-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            media.project = btn.dataset.project;
            media.name = btn.dataset.projectName;
            media.index = Number(btn.dataset.index || 0);
            media.filter = 'all';
            renderMedia();
            openDialog(dom.mediaDialog);
            // Só dá para rolar a lista depois que o modal está visível.
            dom.mediaThumbs.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
        });
    });

    dom.mediaDialog.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            media.filter = btn.dataset.filter;
            renderThumbs();
        });
    });

    dom.mediaDialog.querySelectorAll('[data-step]').forEach(btn => {
        btn.addEventListener('click', () => stepMedia(Number(btn.dataset.step)));
    });

    dom.mediaDialog.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') stepMedia(1);
        if (e.key === 'ArrowLeft') stepMedia(-1);
    });
}

function renderMedia() {
    const ui = UI_TEXT[state.lang];
    document.getElementById('mediaDialogTitle').textContent = `${media.name} — ${ui.media}`;
    renderThumbs();
    showMedia(media.index);
}

function renderThumbs() {
    const items = projectMedia[media.project] || [];
    const ui = UI_TEXT[state.lang];
    const hasVideo = items.some(m => m.type === 'video');
    const hasImage = items.some(m => m.type === 'image');
    dom.mediaDialog.querySelector('.media-filters').hidden = !(hasVideo && hasImage);
    dom.mediaDialog.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.filter === media.filter);
    });

    dom.mediaThumbs.innerHTML = '';
    let count = 0;
    items.forEach((item, index) => {
        if (media.filter !== 'all' && item.type !== media.filter) return;
        count++;
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'media-thumb' + (index === media.index ? ' is-active' : '');
        thumb.dataset.index = index;
        thumb.innerHTML = `
            <img src="${item.thumbnail || item.path}" alt="" loading="lazy">
            <i class="bi ${item.type === 'video' ? 'bi-play-fill' : 'bi-image'}"></i>
            <span>${t(item.title)}</span>`;
        thumb.addEventListener('click', () => showMedia(index));
        dom.mediaThumbs.appendChild(thumb);
    });

    const counter = document.createElement('p');
    counter.className = 'media-count';
    counter.textContent = ui.items(count);
    dom.mediaThumbs.appendChild(counter);
}

function showMedia(index) {
    const items = projectMedia[media.project] || [];
    const item = items[index];
    if (!item) return;
    media.index = index;
    const ui = UI_TEXT[state.lang];

    if (item.type === 'video') {
        dom.mediaStage.innerHTML = `<video controls autoplay playsinline poster="${item.thumbnail || ''}"><source src="${item.path}" type="video/mp4"></video>`;
        dom.mediaStage.querySelector('video').play().catch(() => {});
    } else {
        dom.mediaStage.innerHTML = `<a href="${item.path}" target="_blank" rel="noopener" class="media-stage__img"><img src="${item.path}" alt="${t(item.title)}"></a>`;
    }

    document.getElementById('mediaType').innerHTML = item.type === 'video'
        ? `<i class="bi bi-play-circle"></i> ${ui.video}`
        : `<i class="bi bi-image"></i> ${ui.image}`;
    document.getElementById('mediaTitle').textContent = t(item.title);
    document.getElementById('mediaDescription').textContent = t(item.description);

    dom.mediaThumbs.querySelectorAll('.media-thumb').forEach(thumb => {
        const active = Number(thumb.dataset.index) === index;
        thumb.classList.toggle('is-active', active);
        if (active) thumb.scrollIntoView({ block: 'nearest' });
    });
}

/* ---------- init ---------- */

function cacheDom() {
    dom.header = document.querySelector('.site-header');
    dom.navLinks = [...document.querySelectorAll('.nav a')];
    dom.sections = [...document.querySelectorAll('main section[id]')];
    dom.parallax = [...document.querySelectorAll('[data-parallax]')];
    dom.mediaDialog = document.getElementById('mediaDialog');
    dom.mediaStage = document.getElementById('mediaStage');
    dom.mediaThumbs = document.getElementById('mediaThumbs');
}

function init() {
    cacheDom();
    splitChars();
    initDeck();
    initLanguage();
    if (!dom.words) splitWords();
    initIntro();
    initTicker();
    initReveal();
    initCounters();
    initMenu();
    initCursor();
    initTabs();
    initDialogs();
    initMedia();
    initScroll();
}

document.addEventListener('DOMContentLoaded', init, { once: true });
