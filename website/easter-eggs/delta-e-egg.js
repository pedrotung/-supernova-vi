/* SUPERNOVA easter egg: ΔE colour challenge (option 3 of 5, see ../easter-eggs.md).
   Mix cyan, magenta and yellow until your sample matches the target, then MEASURE:
   the lab scanner sweeps both samples and reports CIEDE2000 ΔE with a PASS / FAIL stamp.
   Hidden: type "nova" anywhere, tap the 8x2 pixel blocks (#boom or .pxblocks) five times
   within 2 s (for phones), or open a URL ending in #nova. Esc or the close button exits.
   Self-contained: injects its own CSS, uses SUPERNOVA VI tokens, no dependencies.
   Also exposes window.SupernovaEgg.open() so another module can launch it. */
(function () {
  var INKS = [
    { k: 'c', name: 'CYAN', hex: '#00A3E0', rgb: [0, 163, 224] },
    { k: 'm', name: 'MAGENTA', hex: '#CE0058', rgb: [206, 0, 88] },
    { k: 'y', name: 'YELLOW', hex: '#FFCD00', rgb: [255, 205, 0] }
  ];
  /* grade names are placeholders, same as the QC lab scanner: swap in real SUPERNOVA grades */
  var GRADES = { c: ['PB-15:3', 'PB-15:4', 'PG-7'], m: ['PR-122', 'PR-57:1', 'PV-19'], y: ['PY-83', 'PY-74', 'PO-13'] };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css =
    '.ne{position:fixed;inset:0;z-index:2147483000;background:rgba(15,42,74,.92);overflow-y:auto;-webkit-overflow-scrolling:touch;' +
    '  padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));' +
    '  font-family:"IBM Plex Sans","Noto Sans SC",system-ui,sans-serif;color:#161815;animation:ne-in .3s steps(6)}' +
    '@keyframes ne-in{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}}' +
    '.ne *{box-sizing:border-box}' +
    '.ne-box:focus{outline:none}.ne-box{position:relative;max-width:720px;margin:4vh auto;background:#fff;border:1.5px solid #0F2A4A;padding:28px;display:grid;gap:22px}' +
    '.ne-box::after{content:"";position:absolute;top:-2px;right:-2px;width:34px;height:20px;background:rgba(15,42,74,.92)}' +
    '.ne-box::before{content:"";position:absolute;top:-6px;right:14px;width:10px;height:10px;background:#FFCD00;z-index:1}' +
    '.ne-mono{font-family:"IBM Plex Mono","Noto Sans SC",ui-monospace,monospace;font-variant-numeric:tabular-nums}' +
    '.ne-top{display:flex;justify-content:space-between;align-items:center;gap:12px}' +
    '.ne-lbl{display:flex;align-items:center;gap:10px;font:500 .72rem/1 "IBM Plex Mono",monospace;letter-spacing:.14em;color:#0F2A4A}' +
    '.ne-cmyk{display:inline-grid;grid-template-columns:repeat(4,1fr);width:40px;height:4px}' +
    '.ne-cmyk i:nth-child(1){background:#0F2A4A}.ne-cmyk i:nth-child(2){background:#00A3E0}.ne-cmyk i:nth-child(3){background:#CE0058}.ne-cmyk i:nth-child(4){background:#FFCD00}' +
    '.ne-x{min-width:44px;height:44px;margin:-10px -10px -10px 0;padding:0 10px;border:0;background:none;cursor:pointer;font:500 .72rem/1 "IBM Plex Mono",monospace;letter-spacing:.14em;color:#6E7379}' +
    '@media (hover:hover){.ne-x:hover{color:#0F2A4A}}' +
    '.ne h2{margin:0;font-weight:600;letter-spacing:-.02em;color:#0F2A4A;font-size:clamp(1.6rem,4.6vw,2.4rem);line-height:1.05}' +
    '.ne h2 span{font-family:"IBM Plex Mono",monospace;letter-spacing:-.05em}' +
    '.ne-lede{margin:8px 0 0;color:#454A50;font-size:.92rem;line-height:1.6;max-width:52ch}' +
    '.ne-samples{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:20px}' +
    '.ne-smp{min-width:0}' +
    '.ne-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:2px;padding:2px;background:#D9DEE6;max-width:224px}' +
    '.ne-grid i{aspect-ratio:1;background:var(--c,#F4F5F6);transition:background .12s steps(2)}' +
    '.ne-cap{margin-top:10px;font:500 .68rem/1.5 "IBM Plex Mono",monospace;letter-spacing:.12em;color:#6E7379}' +
    '.ne-cap b{color:#0F2A4A;font-weight:600}' +
    '.ne-scan{position:absolute;left:-6px;right:-6px;height:3px;top:0;background:#FFCD00;outline:1px solid #0F2A4A;opacity:0;pointer-events:none}' +
    '.ne-scan.go{opacity:1;animation:ne-scan 1.2s steps(24) 2 alternate}' +
    '@keyframes ne-scan{to{top:var(--h,200px)}}' +
    '.ne-sl{display:grid;gap:14px}' +
    '.ne-row{display:grid;grid-template-columns:110px 1fr 56px;gap:14px;align-items:center;font:500 .72rem/1 "IBM Plex Mono",monospace;letter-spacing:.12em;color:#454A50}' +
    '.ne-row label{display:flex;align-items:center;gap:8px}' +
    '.ne-row label::before{content:"";width:10px;height:10px;background:var(--ink)}' +
    '.ne-row output{text-align:right;color:#0F2A4A;font-weight:600}' +
    '.ne input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:32px;margin:0;background:transparent;cursor:pointer;touch-action:pan-y}' +
    '.ne input[type=range]::-webkit-slider-runnable-track{height:10px;background:linear-gradient(90deg,#fff,var(--ink));outline:1px solid #D9DEE6}' +
    '.ne input[type=range]::-moz-range-track{height:10px;background:linear-gradient(90deg,#fff,var(--ink));outline:1px solid #D9DEE6}' +
    '.ne input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;margin-top:-6px;background:#0F2A4A;border:3px solid #fff;outline:1.5px solid #0F2A4A;border-radius:0}' +
    '.ne input[type=range]::-moz-range-thumb{width:16px;height:16px;background:#0F2A4A;border:3px solid #fff;outline:1.5px solid #0F2A4A;border-radius:0}' +
    '.ne input[type=range]:focus-visible{outline:3px solid #FFCD00;outline-offset:2px}' +
    '.ne-res{display:grid;grid-template-columns:110px 1fr auto;gap:14px;align-items:center;padding-top:18px;border-top:1.5px solid #0F2A4A;font:500 .72rem/1 "IBM Plex Mono",monospace;letter-spacing:.12em;color:#454A50}' +
    '.ne-de{font:600 1.5rem/1 "IBM Plex Mono",monospace;letter-spacing:-.03em;color:#0F2A4A}' +
    '.ne-meter{display:grid;grid-template-columns:repeat(12,1fr);gap:2px;height:10px}' +
    '.ne-meter i{background:#D9DEE6}.ne-meter i.f{background:#0F2A4A}' +
    '.ne-stamp{justify-self:end;font-weight:600;letter-spacing:.12em;padding:6px 8px;color:#6E7379}' +
    '.ne-stamp.pass{background:#FFF3C4;color:#0F2A4A}.ne-stamp.fail{background:#CE0058;color:#fff}' +
    '.ne-msg{grid-column:1/-1;font:400 .9rem/1.5 "IBM Plex Sans","Noto Sans SC",sans-serif;letter-spacing:0;color:#454A50;min-height:1.5em}' +
    '.ne-act{display:flex;gap:10px;flex-wrap:wrap}' +
    '.ne-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:46px;padding:12px 20px;border:1.5px solid #0F2A4A;border-radius:0;background:transparent;color:#0F2A4A;font:600 .9rem/1 "IBM Plex Sans",sans-serif;cursor:pointer}' +
    '@media (hover:hover){.ne-btn.solid:hover{background:#CE0058;border-color:#CE0058}.ne-btn:not(.solid):hover{background:#0F2A4A;color:#fff}}' +
    '.ne-btn.solid{background:#0F2A4A;color:#fff}' +
    '.ne-btn:disabled{opacity:.4;cursor:default;pointer-events:none}' +
    '.ne-btn .px{width:8px;height:8px;background:currentColor}' +
    '.ne-btn:focus-visible,.ne-x:focus-visible{outline:3px solid #FFCD00;outline-offset:2px}' +
    '.ne-foot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font:500 .68rem/1.4 "IBM Plex Mono",monospace;letter-spacing:.12em;color:#6E7379}' +
    '.ne-foot b{color:#0F2A4A;font-weight:600}' +
    '@media (max-width:600px){.ne-box{padding:22px 18px;gap:18px;margin:0 auto}.ne-samples{gap:14px}' +
    '  .ne-row{grid-template-columns:86px 1fr 46px;gap:10px}.ne-res{grid-template-columns:1fr auto;gap:10px}.ne-res>span:first-child{display:none}.ne-cap{font-size:.62rem;letter-spacing:.06em}' +
    '  .ne-act .ne-btn{flex:1 1 140px}}' +
    '@media (prefers-reduced-motion:reduce){.ne{animation:none}.ne-scan.go{animation:none;opacity:0}}';

  /* --- colour maths ---------------------------------------------------- */
  // Pigment-style (multiplicative) mix of the three brand inks on white.
  function mix(a) {
    var out = [255, 255, 255];
    INKS.forEach(function (ink, i) {
      for (var ch = 0; ch < 3; ch++) out[ch] *= 1 - a[i] * (1 - ink.rgb[ch] / 255);
    });
    return out.map(function (v) { return Math.round(v); });
  }
  function hex(rgb) { return '#' + rgb.map(function (v) { return (v < 16 ? '0' : '') + v.toString(16); }).join('').toUpperCase(); }
  function lab(rgb) {
    var l = rgb.map(function (v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    var x = (l[0] * 0.4124 + l[1] * 0.3576 + l[2] * 0.1805) / 0.95047;
    var y = (l[0] * 0.2126 + l[1] * 0.7152 + l[2] * 0.0722);
    var z = (l[0] * 0.0193 + l[1] * 0.1192 + l[2] * 0.9505) / 1.08883;
    function f(t) { return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; }
    return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
  }
  // CIEDE2000, the industry colour-difference formula.
  function de2000(p, q) {
    var rad = Math.PI / 180, L1 = p[0], a1 = p[1], b1 = p[2], L2 = q[0], a2 = q[1], b2 = q[2];
    var C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cb = (C1 + C2) / 2;
    var G = 0.5 * (1 - Math.sqrt(Math.pow(Cb, 7) / (Math.pow(Cb, 7) + Math.pow(25, 7))));
    var a1p = (1 + G) * a1, a2p = (1 + G) * a2;
    var C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
    function hp(b, a) { if (!b && !a) return 0; var h = Math.atan2(b, a) / rad; return h < 0 ? h + 360 : h; }
    var h1p = hp(b1, a1p), h2p = hp(b2, a2p);
    var dLp = L2 - L1, dCp = C2p - C1p, dhp = 0;
    if (C1p * C2p) { dhp = h2p - h1p; if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360; }
    var dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(dhp / 2 * rad);
    var Lbp = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2, hbp = h1p + h2p;
    if (C1p * C2p) { if (Math.abs(h1p - h2p) > 180) hbp += hbp < 360 ? 360 : -360; hbp /= 2; }
    var T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad) + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
    var dTh = 30 * Math.exp(-Math.pow((hbp - 275) / 25, 2));
    var Rc = 2 * Math.sqrt(Math.pow(Cbp, 7) / (Math.pow(Cbp, 7) + Math.pow(25, 7)));
    var Sl = 1 + 0.015 * Math.pow(Lbp - 50, 2) / Math.sqrt(20 + Math.pow(Lbp - 50, 2));
    var Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T, Rt = -Math.sin(2 * dTh * rad) * Rc;
    return Math.sqrt(Math.pow(dLp / Sl, 2) + Math.pow(dCp / Sc, 2) + Math.pow(dHp / Sh, 2) + Rt * (dCp / Sc) * (dHp / Sh));
  }

  /* --- game state ------------------------------------------------------ */
  var overlay = null, els = {}, target = null, round = 0, best = null, lastScore = null, prevFocus = null;

  function newTarget() {
    // One dominant ink, one supporting, one trace: reads like a real shade, always reachable.
    var order = [0, 1, 2].sort(function () { return Math.random() - 0.5; });
    var a = [0, 0, 0];
    a[order[0]] = 0.55 + Math.random() * 0.4;
    a[order[1]] = Math.random() * 0.45;
    a[order[2]] = Math.random() < 0.5 ? 0 : Math.random() * 0.15;
    a = a.map(function (v) { return Math.round(v * 100) / 100; });
    var pool = GRADES[INKS[order[0]].k];
    var lot = (1000 + Math.floor(Math.random() * 9000)).toString();
    return { a: a, rgb: mix(a), name: pool[Math.floor(Math.random() * pool.length)], lot: lot };
  }

  function n1(v) { var t = v.toFixed(1); return t === '-0.0' ? '0.0' : t; }
  function fmtLab(l) { return 'L ' + n1(l[0]) + ' a ' + n1(l[1]) + ' b ' + n1(l[2]); }

  function paint(grid, color) { grid.style.setProperty('--c', color); }

  function current() { return els.sliders.map(function (s) { return s.value / 100; }); }

  function updateMix() {
    var rgb = mix(current());
    paint(els.mixGrid, hex(rgb));
    els.sliders.forEach(function (s, i) { els.outs[i].textContent = ('00' + s.value).slice(-3) + '%'; });
    els.mixCap.innerHTML = '<b>YOUR MIX</b><br>' + fmtLab(lab(rgb));
  }

  function resetResult() {
    els.de.textContent = '—.——';
    els.stamp.textContent = '····';
    els.stamp.className = 'ne-stamp';
    [].forEach.call(els.meter.children, function (c) { c.className = ''; });
    els.msg.textContent = 'Drag the sliders, then measure.';
    els.share.hidden = true;
  }

  function nextRound() {
    round++;
    target = newTarget();
    paint(els.tGrid, hex(target.rgb));
    els.tCap.innerHTML = '<b>TARGET · ' + target.name + '</b><br>' + fmtLab(lab(target.rgb));
    els.sliders.forEach(function (s) { s.value = 0; });
    updateMix();
    resetResult();
    els.round.textContent = ('0' + round).slice(-2);
  }

  function verdict(d) {
    if (d <= 1) return ['pass', 'PASS', 'Lab grade. Our QC team would sign this batch off.'];
    if (d <= 2) return ['pass', 'PASS', 'Commercial match. Most eyes cannot tell them apart.'];
    if (d <= 3.5) return ['fail', 'FAIL', 'Close, but a trained eye sees the difference.'];
    return ['fail', 'FAIL', 'Visible difference. Keep mixing.'];
  }

  function measure() {
    var d = de2000(lab(target.rgb), lab(mix(current())));
    var v = verdict(d);
    els.measure.disabled = els.next.disabled = true;
    els.sliders.forEach(function (s) { s.disabled = true; });
    els.de.textContent = '·.··';
    els.stamp.textContent = '····';
    els.stamp.className = 'ne-stamp';
    els.msg.textContent = 'Measuring…';
    var cells = els.meter.children, fill = Math.max(0, Math.min(12, Math.round(12 - d * 2)));
    [].forEach.call(cells, function (c) { c.className = ''; });
    var h = els.tGrid.getBoundingClientRect().height;
    els.scan.style.setProperty('--h', h - 3 + 'px');
    els.scan.classList.remove('go'); void els.scan.offsetWidth; els.scan.classList.add('go');
    var wait = reduced ? 0 : 2400;
    for (var k = 0; k < fill; k++) (function (c, t) { setTimeout(function () { c.className = 'f'; }, wait + t); })(cells[k], reduced ? 0 : k * 55);
    setTimeout(function () {
      els.scan.classList.remove('go');
      els.de.textContent = d.toFixed(2);
      els.stamp.textContent = v[1];
      els.stamp.className = 'ne-stamp ' + v[0];
      els.msg.textContent = v[2];
      if (best === null || d < best) best = d;
      lastScore = d;
      els.best.textContent = best.toFixed(2);
      els.measure.disabled = els.next.disabled = false;
      els.sliders.forEach(function (s) { s.disabled = false; });
      els.share.hidden = false;
    }, wait + (reduced ? 0 : 12 * 55 + 150));
  }

  function share() {
    var text = 'I matched ' + target.name + ' at ΔE ' + lastScore.toFixed(2) + ' in the SUPERNOVA lab challenge.';
    var url = location.href.split('#')[0] + '#nova';
    if (navigator.share) { navigator.share({ text: text, url: url }).catch(function () {}); return; }
    var done = function () { els.msg.textContent = 'Copied. Paste it anywhere.'; };
    if (navigator.clipboard) navigator.clipboard.writeText(text + ' ' + url).then(done, function () {});
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'ne';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Delta E colour challenge. Press Escape to close.');
    var sliders = INKS.map(function (ink, i) {
      return '<div class="ne-row" style="--ink:' + ink.hex + '"><label for="ne-s' + i + '">' + ink.name + '</label>' +
        '<input id="ne-s' + i + '" type="range" min="0" max="100" step="1" value="0"><output class="ne-mono">000%</output></div>';
    }).join('');
    overlay.innerHTML =
      '<div class="ne-box" tabindex="-1">' +
      '<div class="ne-top"><span class="ne-lbl"><span class="ne-cmyk"><i></i><i></i><i></i><i></i></span>QC LAB · ΔE CHALLENGE</span>' +
      '<button type="button" class="ne-x" aria-label="Close">CLOSE ✕</button></div>' +
      '<div><h2>Match the <span>shade</span>.</h2><p class="ne-lede">Mix cyan, magenta and yellow until your sample matches the target. ' +
      'Our lab passes a batch at ΔE ≤ 1.0. Can you?</p></div>' +
      '<div class="ne-samples"><div class="ne-smp"><div class="ne-grid" data-t></div><div class="ne-cap" data-tc></div></div>' +
      '<div class="ne-smp"><div class="ne-grid" data-m></div><div class="ne-cap" data-mc></div></div><span class="ne-scan" aria-hidden="true"></span></div>' +
      '<div class="ne-sl">' + sliders + '</div>' +
      '<div class="ne-res" aria-live="polite"><span>ΔE 2000</span><span class="ne-de">—.——</span><span class="ne-stamp">····</span>' +
      '<span class="ne-meter" aria-hidden="true" style="grid-column:1/-1"></span><p class="ne-msg"></p></div>' +
      '<div class="ne-act"><button type="button" class="ne-btn solid" data-go>Measure <span class="px"></span></button>' +
      '<button type="button" class="ne-btn" data-next>Next sample</button><button type="button" class="ne-btn" data-share hidden>Share score</button></div>' +
      '<div class="ne-foot"><span>ROUND <b data-r>01</b> · BEST ΔE <b data-b>—</b></span><span>Bright color. Proven data.</span></div>' +
      '</div>';
    var q = function (s) { return overlay.querySelector(s); };
    els = {
      tGrid: q('[data-t]'), mixGrid: q('[data-m]'), tCap: q('[data-tc]'), mixCap: q('[data-mc]'), scan: q('.ne-scan'),
      sliders: [].slice.call(overlay.querySelectorAll('input[type=range]')), outs: [].slice.call(overlay.querySelectorAll('output')),
      de: q('.ne-de'), stamp: q('.ne-stamp'), meter: q('.ne-meter'), msg: q('.ne-msg'),
      measure: q('[data-go]'), next: q('[data-next]'), share: q('[data-share]'), round: q('[data-r]'), best: q('[data-b]'), x: q('.ne-x')
    };
    [els.tGrid, els.mixGrid].forEach(function (g) { for (var k = 0; k < 64; k++) g.appendChild(document.createElement('i')); });
    for (var k = 0; k < 12; k++) els.meter.appendChild(document.createElement('i'));
    els.sliders.forEach(function (s) { s.addEventListener('input', function () { updateMix(); if (els.stamp.textContent !== '····') resetResult(); }); });
    els.measure.addEventListener('click', measure);
    els.next.addEventListener('click', nextRound);
    els.share.addEventListener('click', share);
    els.x.addEventListener('click', close);
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') { // keep focus inside the dialog
      var f = [].filter.call(overlay.querySelectorAll('button,input'), function (n) { return !n.disabled && !n.hidden; });
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  var prevOverflow = '';
  function open() {
    if (overlay && overlay.isConnected) return;
    if (!overlay) build();
    round = 0; best = null;
    els.best.textContent = '—';
    prevFocus = document.activeElement;
    document.body.appendChild(overlay);
    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    nextRound();
    addEventListener('keydown', onKey, true);
    overlay.firstChild.focus();
  }

  function close() {
    if (!overlay || !overlay.isConnected) return;
    overlay.remove();
    document.documentElement.style.overflow = prevOverflow;
    removeEventListener('keydown', onKey, true);
    if (location.hash === '#nova') history.replaceState(null, '', location.pathname + location.search);
    if (prevFocus && prevFocus.focus) prevFocus.focus();
  }

  /* --- triggers -------------------------------------------------------- */
  var typed = '';
  addEventListener('keydown', function (e) {
    if (overlay && overlay.isConnected) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (!e.key || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === 'nova') { typed = ''; open(); }
  });

  // Five quick taps on the 8x2 pixel blocks, for phones without a keyboard.
  function watchBlockTaps() {
    var blocks = document.getElementById('boom') || document.querySelector('.pxblocks');
    if (!blocks) return;
    var taps = [];
    blocks.addEventListener('click', function () {
      var now = Date.now();
      taps = taps.filter(function (t) { return now - t < 2000; });
      taps.push(now);
      if (taps.length >= 5) { taps = []; setTimeout(open, 350); } // let the last burst play first
    });
  }

  function checkHash() { if (location.hash === '#nova') open(); }
  addEventListener('hashchange', checkHash);

  function init() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
    watchBlockTaps();
    checkHash();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.SupernovaEgg = { open: open, close: close };
})();
