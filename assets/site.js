/* =========================================================================
   Fátima Rivas — JS compartido de todo el sitio
   Nav móvil · formularios · tarjetas de propiedad · filtros · modal ficha
   ========================================================================= */

/* --- Menú móvil ---------------------------------------------------------- */
function smToggleMenu(){
  var n = document.getElementById('navlinks');
  if (n) n.classList.toggle('open');
  smHeaderState();
}

/* --- Cabecera: transparente sobre el hero, sólida al hacer scroll --------- */
function smHeaderState(){
  var header = document.querySelector('header.site');
  if (!header) return;
  var hero = document.querySelector('.hero-full');
  var heroVisible = hero && hero.offsetParent !== null;
  var menuAbierto = document.getElementById('navlinks') && document.getElementById('navlinks').classList.contains('open');
  document.body.classList.toggle('sin-pad', !!heroVisible);
  header.classList.toggle('trans', !!heroVisible && window.scrollY < 60 && !menuAbierto);
}
window.addEventListener('scroll', smHeaderState, { passive: true });
/* red de seguridad: en entornos donde el evento scroll no llega, revisamos igualmente */
setInterval(smHeaderState, 400);

/* --- Aparición al hacer scroll (IntersectionObserver) --------------------- */
var smObserver = null;
var smIoActivo = false; // se pone a true en cuanto el observer dispara una vez
function smScanReveals(){
  var sel = '.sec-head, .card, .paso, .testi, .benef, .ayuda-card, .guia, .post, .stat, .info-item, .faq details, .valores, .puntos';
  var els = document.querySelectorAll(sel);
  if ((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.remove('reveal'); el.classList.add('in'); });
    return;
  }
  if (!smObserver){
    smObserver = new IntersectionObserver(function(entries){
      smIoActivo = true;
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('in'); smObserver.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  els.forEach(function(el, i){
    if (el.classList.contains('reveal') || el.classList.contains('in')) return;
    // pequeño escalonado dentro de cada fila
    el.style.setProperty('--d', (i % 3) * 0.09 + 's');
    el.classList.add('reveal');
    // si ya está en pantalla, aparece al momento
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0){ el.classList.add('in'); return; }
    smObserver.observe(el);
  });
  // Red de seguridad: si el observer no llega a dispararse (navegadores raros,
  // webviews), mostramos todo el contenido — la web nunca puede quedar en blanco.
  setTimeout(function(){
    if (!smIoActivo) document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ el.classList.add('in'); });
  }, 2200);
}

/* --- Iconos SVG reutilizables ------------------------------------------- */
function smIconos(){
  return {
    cama:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20M6 8V6a2 2 0 012-2h3a2 2 0 012 2v2"/></svg>',
    bano:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4zM6 12V5a2 2 0 014 0"/></svg>',
    metros:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM9 3v18M3 9h18"/></svg>',
    pin:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };
}

/* --- HTML de una tarjeta de propiedad ------------------------------------ */
function smCardHTML(p){
  var ic = smIconos();
  return '<a class="card" href="propiedad.html?id=' + p.id + '">' +
    '<div class="card-img">' +
      '<div class="card-img-bg" style="background-image:url(\'' + (p.fotos[0]||'') + '\')"></div>' +
      '<div class="card-badges">' +
        (p.destacado ? '<span class="badge badge-dest">Destacada</span>' : '') +
        '<span class="badge badge-op">' + (p.operacion==='alquiler'?'Alquiler':'Venta') + '</span>' +
      '</div>' +
      (p.vendido ? '<div class="badge-vendido">VENDIDA</div>' : '') +
    '</div>' +
    '<div class="card-body">' +
      '<div class="card-zona">' + p.zona + '</div>' +
      '<h3>' + p.titulo + '</h3>' +
      '<div class="card-precio">' + smPrecio(p.precio) + (p.operacion==='alquiler'?' /mes':'') + '</div>' +
      '<div class="card-specs">' +
        '<span>' + ic.cama + ' ' + p.habitaciones + ' dorm.</span>' +
        '<span>' + ic.bano + ' ' + p.banos + ' baños</span>' +
        '<span>' + ic.metros + ' ' + p.metros + ' m²</span>' +
      '</div>' +
    '</div>' +
  '</a>';
}

/* --- Pintar una lista de propiedades en un contenedor -------------------- */
function smRenderGrid(el, lista, vacioMsg){
  if (!el) return;
  if (!lista.length){
    el.innerHTML = '<div class="vacio">' + (vacioMsg || 'No hay propiedades disponibles ahora mismo. Escríbeme y te aviso en cuanto entre algo que encaje.') + '</div>';
    return;
  }
  el.innerHTML = lista.map(smCardHTML).join('');
}


/* --- Carrusel de reseñas de Google ---------------------------------------- */
function smRenderResenas(el){
  if (!el || typeof SM_RESENAS === 'undefined') return;
  var g = '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.7-.4-4z"/></svg>';
  var cards = SM_RESENAS.map(function(r){
    return '<a class="resena" href="' + SM_GOOGLE_RESENAS_URL + '" target="_blank" rel="noopener">' +
      '<div class="resena-top"><span class="estrellas">★★★★★</span>' + g + '</div>' +
      '<p>«' + r.t + '»</p>' +
      '<div class="resena-quien"><strong>' + r.n + '</strong><span>' + r.c + ' · Reseña de Google</span></div>' +
    '</a>';
  }).join('');
  // dos copias para el bucle continuo del carrusel
  el.innerHTML = '<div class="carrusel-track">' + cards + cards + '</div>';
}

/* --- Formularios: envío real (Web3Forms, funciona en Vercel) --------------- */
function smEnviar(e, okId){
  e.preventDefault();
  var form = e.target;
  var ok = okId && document.getElementById(okId);
  function fallo(){
    if (ok){
      ok.textContent = 'Ahora mismo no se ha podido enviar. Escríbeme por WhatsApp al +34 674 13 08 18 y te atiendo al momento.';
      ok.style.display = 'block';
    } else {
      alert('No se ha podido enviar. Escríbeme por WhatsApp: +34 674 13 08 18');
    }
  }
  if (typeof SM_FORMS_KEY === 'undefined' || SM_FORMS_KEY === 'PENDIENTE'){ fallo(); return false; }
  var datos = new FormData(form);
  datos.append('access_key', SM_FORMS_KEY);
  var nombreForm = datos.get('form-name') || 'contacto';
  datos.append('subject', 'Web Inmobiliaria Sierra Madrid — ' + nombreForm);
  datos.append('from_name', 'Inmobiliaria Sierra Madrid');
  fetch('https://api.web3forms.com/submit', { method: 'POST', body: datos })
    .then(function(r){ return r.json(); })
    .then(function(j){
      if (!j.success) throw new Error('web3forms');
      if (ok) ok.style.display = 'block';
      form.reset();
    })
    .catch(fallo);
  return false;
}


/* =========================================================================
   MOVIMIENTO AL HACER SCROLL
   Hilo conector · parallax de portada · cabecera compacta · contadores
   Todo con JS nativo: ni GSAP ni CDNs. Si el usuario pide movimiento
   reducido en su sistema, nada de esto se activa.
   ========================================================================= */

function smMovReducido(){
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/* --- Hilo conector -------------------------------------------------------
   Riel fijo a la izquierda con un punto por sección. El relleno crece con el
   scroll y cada punto se enciende justo cuando su sección queda alcanzada. */
var smHilo = { el:null, fill:null, puntos:[], secs:[] };

function smCrearHilo(){
  if (smHilo.el) return;
  // Preferimos las secciones; las fichas de vivienda y los artículos del blog
  // no las usan, así que ahí nos apoyamos en los títulos h2.
  var secs = [].slice.call(document.querySelectorAll('section'));
  if (secs.length < 2) secs = [].slice.call(document.querySelectorAll('h2'));
  if (secs.length < 2) return;   // con menos de dos hitos el hilo no aporta nada

  var cont = document.createElement('div');
  cont.className = 'hilo';
  cont.setAttribute('aria-hidden','true');
  var riel = document.createElement('div');
  riel.className = 'hilo-riel';
  var fill = document.createElement('div');
  fill.className = 'hilo-fill';
  riel.appendChild(fill);

  secs.forEach(function(sec, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'hilo-pt';
    var t = (sec.tagName === 'H2') ? sec : sec.querySelector('h1, h2, .eyebrow');
    var nombre = t ? t.textContent.trim().replace(/\s+/g,' ').slice(0,34) : ('Sección ' + (i+1));
    b.setAttribute('aria-label', 'Ir a: ' + nombre);
    var et = document.createElement('span');
    et.className = 'hilo-et';
    et.textContent = nombre;
    b.appendChild(et);
    b.addEventListener('click', function(){
      sec.scrollIntoView({ behavior: smMovReducido() ? 'auto' : 'smooth', block:'start' });
    });
    riel.appendChild(b);
    smHilo.puntos.push(b);
  });

  cont.appendChild(riel);
  document.body.appendChild(cont);
  smHilo.el = cont;
  smHilo.fill = fill;
  smHilo.secs = secs;
  smColocarHilo();
}

var smMedidas = { scrollable:1, heroAlto:0, heroFin:0 };

/* Las medidas se toman aquí y solo aquí: así el manejador de scroll no lee
   el layout en cada píxel (que es lo que provoca tirones). */
function smMedir(){
  smMedidas.scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  var hero = document.querySelector('.hero-full');
  smMedidas.heroAlto = hero ? hero.offsetHeight : 0;
  var foto = document.querySelector('.hero-full, .page-head-foto');
  smMedidas.heroFin = foto ? (foto.getBoundingClientRect().top + window.scrollY + foto.offsetHeight) : 0;
}

function smColocarHilo(){
  if (!smHilo.el) return;
  var scrollable = smMedidas.scrollable;
  smHilo.secs.forEach(function(sec, i){
    var top = sec.getBoundingClientRect().top + window.scrollY;
    var pct = (top - window.innerHeight * 0.4) / scrollable;
    pct = Math.max(0, Math.min(1, pct));
    smHilo.puntos[i].style.top = (pct * 100) + '%';
    smHilo.puntos[i].dataset.pct = pct;
  });
}

function smPintarHilo(y){
  if (!smHilo.el) return;
  var avance = Math.max(0, Math.min(1, y / smMedidas.scrollable));
  smHilo.fill.style.height = (avance * 100) + '%';
  smHilo.puntos.forEach(function(b){
    b.classList.toggle('on', avance >= (parseFloat(b.dataset.pct) || 0) - 0.004);
  });
  // sobre la foto de portada el hilo se aclara para seguir viéndose
  smHilo.el.classList.toggle('claro', smMedidas.heroFin > y + window.innerHeight * 0.5);
}

/* --- Portada: el texto se va con el scroll ------------------------------- */
var smHeroCont = null;
function smParallaxHero(y){
  if (smMovReducido()) return;
  if (smHeroCont === null) smHeroCont = document.querySelector('.hero-full .hero-cont') || false;
  if (!smHeroCont) return;
  var alto = smMedidas.heroAlto || 1;
  if (y > alto) return;
  smHeroCont.style.transform = 'translateY(' + (y * 0.22) + 'px)';
  smHeroCont.style.opacity = String(Math.max(0, 1 - (y / (alto * 0.8))));
}

/* --- Contadores: los números suben hasta su valor ------------------------ */
var smIoNum = null;
function smContadores(){
  if (smMovReducido() || !('IntersectionObserver' in window)) return;
  var els = [].slice.call(document.querySelectorAll('.ficha-specs .n, .stat .n, .stat strong'))
    .filter(function(el){
      if (el.dataset.contado) return false;
      // solo cifras puras: "98" sí, "Piso" o "445.900 €" no
      return /^\d{1,4}$/.test(el.textContent.trim());
    });
  if (!els.length) return;
  var io = smIoNum || (smIoNum = new IntersectionObserver(function(entradas){
    entradas.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target;
      smIoNum.unobserve(el);
      el.dataset.contado = '1';
      el.classList.add('num-anim');
      var fin = parseInt(el.textContent.trim(), 10);
      var ini = performance.now(), dur = 900;
      (function paso(ahora){
        var t = Math.min(1, (ahora - ini) / dur);
        var e = 1 - Math.pow(1 - t, 3);            // desacelera al final
        el.textContent = Math.round(fin * e);
        if (t < 1) requestAnimationFrame(paso); else el.textContent = fin;
      })(ini);
    });
  }, { threshold: 0.6 }));
  els.forEach(function(el){ io.observe(el); });
}

/* --- Un solo manejador de scroll para todo -------------------------------
   Síncrono a propósito: con las medidas ya cacheadas aquí solo se hacen
   cuentas y escrituras de estilo, nunca lecturas del layout. Un rAF con
   bandera se quedaría colgado para siempre si un frame no llegase. */
var smHeaderEl = null;
function smOnScroll(){
  var y = window.scrollY;
  smPintarHilo(y);
  smParallaxHero(y);
  if (smHeaderEl === null) smHeaderEl = document.querySelector('header.site') || false;
  if (smHeaderEl) smHeaderEl.classList.toggle('mini', y > 140);
}

function smInitMovimiento(){
  smMedir();
  smCrearHilo();
  smContadores();
  smOnScroll();
  window.addEventListener('scroll', smOnScroll, { passive:true });
  /* Misma red de seguridad que ya usa la cabecera: hay navegadores y webviews
     donde el evento scroll no llega. Comparar un número cada 200 ms no cuesta
     nada y evita que el hilo se quede congelado. */
  var smUltimaY = -1;
  setInterval(function(){
    if (window.scrollY !== smUltimaY){ smUltimaY = window.scrollY; smOnScroll(); }
  }, 200);
  window.addEventListener('resize', function(){ smMedir(); smColocarHilo(); smOnScroll(); }, { passive:true });
  // el contenido se pinta con JS (propiedades, reseñas) y las fotos cambian la
  // altura al cargar: volvemos a medir un par de veces
  window.addEventListener('load', function(){ smMedir(); smColocarHilo(); smOnScroll(); });
  setTimeout(function(){ smMedir(); smColocarHilo(); smOnScroll(); smContadores(); }, 700);
  setTimeout(function(){ smMedir(); smColocarHilo(); smOnScroll(); smContadores(); }, 2000);
}

/* --- Año dinámico en el footer + botón flotante de WhatsApp --------------- */
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-anio]').forEach(function(x){ x.textContent = new Date().getFullYear(); });
  smHeaderState();
  smScanReveals();
  smInitMovimiento();

  // Botón flotante de WhatsApp en todas las páginas públicas
  if (!document.querySelector('.wa-float')){
    var a = document.createElement('a');
    a.className = 'wa-float';
    a.href = 'https://wa.me/34674130818';
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label','Escribir por WhatsApp a Fátima');
    a.innerHTML = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.5c1.2.5 2.5.8 3.8.8 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.2 0-2.4-.3-3.4-.8l-.6-.3-4.9.9.9-4.7-.3-.6c-.7-1.1-1-2.4-1-3.8 0-5.2 4.2-9.4 9.4-9.4s9.4 4.2 9.4 9.4-4.3 9.3-9.5 9.3zm5.2-7c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>';
    document.body.appendChild(a);
  }
});
