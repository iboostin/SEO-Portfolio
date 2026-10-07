(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header */
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const toggle = $('.menu-toggle'), links = $('#nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => { const o = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', o); });
    links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }

  /* Reveal (content is visible without JS; animation only when supported) */
  if ('IntersectionObserver' in window && !reduce) {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    $$('.reveal').forEach(el => io.observe(el));
    // Anything already on screen shows straight away
    requestAnimationFrame(() => $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in'); }));
  }

  /* Counters: value text is final by default; animate from 0 when scrolled into view */
  if ('IntersectionObserver' in window && !reduce) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '', t0 = performance.now();
      const tick = t => { const p = Math.min((t - t0) / 1500, 1); el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); co.unobserve(el);
    }), { threshold: 0.6 });
    $$('[data-count]').forEach(el => co.observe(el));
  }

  /* SERP query typing */
  const q = $('.q');
  if (q && !reduce) {
    const words = JSON.parse(q.dataset.words); let w = 0, i = words[0].length, del = true;
    const loop = () => {
      const word = words[w]; q.textContent = word.slice(0, i);
      if (del) { if (i > 0) { i--; setTimeout(loop, 28); } else { del = false; w = (w + 1) % words.length; setTimeout(loop, 250); } }
      else { if (i < words[w].length) { i++; setTimeout(loop, 60); } else { del = true; setTimeout(loop, 2400); } }
    };
    setTimeout(loop, 2400);
  }

  /* Results explorer tabs */
  const tabs = $$('[role="tab"]');
  tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
  tabs.forEach((tab, idx) => tab.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); select(n);
  }));
  function select(tab) {
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !on; });
  }


  /* Hero: cycle the stacked Search Console reports */
  const stack = $$('.sc-card');
  if (stack.length) {
    let order = stack.map((_, i) => i);
    const paint = () => order.forEach((cardIdx, pos) => stack[cardIdx].dataset.pos = pos);
    paint();
    if (!reduce && window.matchMedia('(min-width: 641px)').matches) setInterval(() => { order.push(order.shift()); paint(); }, 3200);
  }

  /* Hero before / after */
  const stage = $('.ba-stage'), baBtns = $$('.ba-btn');
  if (stage && baBtns.length) {
    let auto = null;
    const setBA = v => { stage.dataset.state = v; baBtns.forEach(b => b.classList.toggle('on', b.dataset.ba === v)); };
    baBtns.forEach(b => b.addEventListener('click', () => { clearInterval(auto); setBA(b.dataset.ba); }));
    setBA('before');
    if (!reduce) auto = setInterval(() => setBA(stage.dataset.state === 'before' ? 'after' : 'before'), 3500);
  }

  /* Free audit form -> WhatsApp */
  $$('.audit-form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const url = form.querySelector('input').value.trim();
    const msg = form.parentElement.querySelector('.af-msg');
    if (!url || !/\./.test(url)) { if (msg) msg.textContent = 'Please enter your website address, for example yourwebsite.com'; return; }
    if (msg) msg.textContent = '';
    const text = `Hi Hammad, I would like a free SEO audit for my website: ${url}`;
    const link = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`;
    const w = window.open(link, '_blank'); if (w) { w.opener = null; } else { window.location.href = link; }
  }));

  $$('.year').forEach(y => y.textContent = new Date().getFullYear());
})();
