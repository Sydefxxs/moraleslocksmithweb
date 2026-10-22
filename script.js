// Morales Locksmith: language switch, live open/closed line, service details,
// entrances and the scroll-linked wordmark.
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) root.classList.add("js");

  /* ---------- Words ---------- */
  var ES = {
    "skip": "Ir al contenido",
    "nav.services": "Servicios", "nav.keys": "Llaves", "nav.hours": "Horario",
    "hero.sub": "Cerrajero a domicilio en Brownsville y el Valle del Río Grande. Llaves, controles, aperturas y recodificación, donde usted esté.",
    "hero.call": "Llame al",
    "svc.title": "Lo que hacemos",
    "svc.car": "Carros y camiones", "svc.home": "Casas", "svc.biz": "Negocios",
    "svc.c1": "Aperturas de carro", "svc.c2": "Llaves hechas desde cero", "svc.c3": "Copias de llaves de carro", "svc.c4": "Controles remotos",
    "svc.c5": "Programación de controles", "svc.c6": "Llaves inteligentes de botón", "svc.c7": "Llaves con chip", "svc.c8": "Llaves de camión y Freightliner",
    "svc.h1": "Aperturas de casa", "svc.h2": "Recodificación de cerraduras", "svc.h3": "Reparación de cerraduras", "svc.h4": "Cerraduras sin llave", "svc.h5": "Copias de llaves de casa",
    "svc.b1": "Aperturas de negocio", "svc.b2": "Recodificación cuando cambia el personal", "svc.b3": "Reparación y cambio de cerraduras", "svc.b4": "Cerraduras sin llave",
    "svc.carsum": "Casi todas las marcas, como Honda, Ford, Chevrolet, Toyota, Chrysler, Jeep y Nissan.",
    "svc.homesum": "Si se quedó afuera, se acaba de mudar o la cerradura se traba.",
    "svc.bizsum": "Tiendas y oficinas en todo el Valle.",
    "work.title": "Llaves recientes",
    "work.a": "Controles Chrysler y Dodge, listos para programar.",
    "work.b": "Llaves de camión Freightliner y Kenworth.",
    "about.title": "Sobre Felipe Morales",
    "about.f1": "Brownsville, Texas", "about.f2": "Hablamos inglés",
    "about.p1": "Felipe Morales es el maestro cerrajero detrás de Morales Locksmith. Trabaja desde Brownsville y en todo el Valle hasta South Padre Island, en su carro, en su puerta o en su negocio.",
    "about.p2": "Las llaves se cortan y los controles se programan en el lugar. Pregunte el precio antes de que él salga.",
    "keys.title": "Llaves",
    "k1.t": "Llaves inteligentes y controles de botón", "k1.d": "Controles nuevos o adicionales, programados a su carro para que el arranque de botón funcione.",
    "k2.t": "Llaves con control integrado", "k2.d": "Llave y control en una sola pieza. Se corta la hoja y se sincroniza el control con el carro.",
    "k3.t": "Llaves de navaja", "k3.d": "Llaves plegables con hoja de corte láser y botones de control.",
    "k4.t": "Llaves con chip", "k4.d": "Llaves con un chip que el carro debe leer para arrancar. Se cortan y sincronizan en el lugar.",
    "k5.t": "Perdió todas las llaves", "k5.d": "Una llave nueva hecha desde cero junto al carro, sin grúa a la agencia.",
    "k6.t": "Llaves de camión", "k6.d": "Camiones de trabajo y tráileres, incluso Freightliner.",
    "k7.t": "Llaves de casa y oficina", "k7.d": "Copias de llaves normales y de alta seguridad, y recodificación para que las llaves viejas ya no sirvan.",
    "price": "Pregunte el precio",
    "call.note": "Llame para un precio o para apartar una hora.",
    "call.text": "Mándenos foto de su llave",
    "h.wd": "Lunes a viernes", "h.wdt": "10 AM a 1:30 PM, 6 a 9:30 PM",
    "h.we": "Sábado y domingo", "h.wet": "algunos días, llame antes",
    "foot.rgv": "El Valle del Río Grande", "foot.top": "Volver arriba",
    "dock.call": "Llame al"
  };
  var DETAILS = {
    en: {
      "svc.d1": "Keys locked inside, or a lock that won't turn. Opened without damage.",
      "svc.d2": "Lost every key? A new one is made at the car, so no tow to the dealer.",
      "svc.d3": "A spare cut to match the key you already have.",
      "svc.d4": "Replacement remotes for locking, unlocking and the trunk.",
      "svc.d5": "New or extra fobs paired to your car.",
      "svc.d6": "Push-button start keys, programmed so the car starts.",
      "svc.d7": "Chip keys the car must read before it will start.",
      "svc.d8": "Work trucks and big rigs, Freightliner included.",
      "svc.d9": "Locked out at the front door? We get you back inside.",
      "svc.d10": "Just moved in? Old keys stop working, your keys still do.",
      "svc.d11": "A lock that sticks, spins or won't latch, repaired.",
      "svc.d12": "Keypad and keyless locks fitted and set up.",
      "svc.d13": "Copies of house and high-security keys.",
      "svc.d14": "Locked out of the shop or office.",
      "svc.d15": "Someone left with a key? Rekey so it no longer opens.",
      "svc.d16": "Worn or broken commercial locks repaired or swapped.",
      "svc.d17": "Keypad locks for doors staff use every day."
    },
    es: {
      "svc.d1": "Llaves adentro o una cerradura que no gira. Se abre sin dañarla.",
      "svc.d2": "¿Perdió todas las llaves? Se hace una nueva junto al carro, sin grúa a la agencia.",
      "svc.d3": "Una copia cortada igual a la llave que ya tiene.",
      "svc.d4": "Controles de repuesto para cerrar, abrir y la cajuela.",
      "svc.d5": "Controles nuevos o adicionales sincronizados con su carro.",
      "svc.d6": "Llaves de arranque de botón, programadas para que el carro arranque.",
      "svc.d7": "Llaves con chip que el carro debe leer para arrancar.",
      "svc.d8": "Camiones de trabajo y tráileres, incluso Freightliner.",
      "svc.d9": "¿Se quedó afuera de su casa? Le ayudamos a entrar.",
      "svc.d10": "¿Se acaba de mudar? Las llaves viejas dejan de servir y las suyas siguen funcionando.",
      "svc.d11": "Una cerradura que se traba, gira o no cierra, reparada.",
      "svc.d12": "Cerraduras de teclado sin llave, instaladas y programadas.",
      "svc.d13": "Copias de llaves de casa y de alta seguridad.",
      "svc.d14": "Se quedó afuera de la tienda u oficina.",
      "svc.d15": "¿Alguien se fue con una llave? Se recodifica la cerradura para que ya no abra.",
      "svc.d16": "Cerraduras comerciales gastadas o rotas, reparadas o cambiadas.",
      "svc.d17": "Cerraduras de teclado para puertas de uso diario."
    }
  };
  var HINT = { en: "Point at a service to read what it covers.", es: "Pase el cursor por un servicio para ver qué incluye." };

  var EN = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in EN)) EN[k] = el.textContent;
  });
  var EN_ALT = {};
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) { EN_ALT[el.getAttribute("data-i18n-alt")] = el.alt; });
  var ES_ALT = {
    "work.a.alt": "Tres controles negros de Dodge y Chrysler con botón rojo de pánico, sobre una mesa gris.",
    "work.b.alt": "Llaves con chip para camiones Freightliner y Kenworth, en abanico sobre una mesa blanca.",
    "about.alt": "Un control Chrysler nuevo, todavía en su bolsa.",
    "k1.alt": "Un control Chrysler nuevo de siete botones en su bolsa.",
    "k2.alt": "Una llave Nissan con control integrado y botones de cerrar, abrir, cajuela y pánico.",
    "keys.alt": "Una llave Ford con control integrado y botones de cerrar, abrir, pánico y arranque remoto."
  };

  var lang = "en";
  var toggle = document.getElementById("langToggle");
  var detail = document.querySelector("[data-detail]");

  function setLang(next) {
    lang = next;
    var dict = next === "es" ? ES : EN;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    var alts = next === "es" ? ES_ALT : EN_ALT;
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt");
      if (alts[k]) el.alt = alts[k];
    });
    root.lang = next;
    toggle.textContent = next === "es" ? "English" : "Español";
    toggle.lang = next === "es" ? "en" : "es";
    if (detail) { detail.textContent = ""; detail.setAttribute("data-hint", HINT[next]); }
    updateStatus();
    try { localStorage.setItem("ml-lang", next); } catch (e) {}
  }
  toggle.addEventListener("click", function () { setLang(lang === "es" ? "en" : "es"); });

  /* ---------- Live status from the posted hours (Brownsville time) ---------- */
  // Mon–Fri 10:00–13:30 and 18:00–21:30. Weekends: some days, call ahead.
  var SLOTS = [[600, 810], [1080, 1290]];
  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60, ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + " " + ap;
  }
  function nowInBrownsville() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
    return { day: day, mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function statusText() {
    var t = nowInBrownsville(), es = lang === "es";
    var clock = fmt(t.mins);
    var weekday = t.day >= 1 && t.day <= 5;
    if (weekday) {
      for (var i = 0; i < SLOTS.length; i++) {
        if (t.mins >= SLOTS[i][0] && t.mins < SLOTS[i][1]) {
          return { open: true, text: es ? "Son las " + clock + " en Brownsville. Abierto hasta las " + fmt(SLOTS[i][1]) + "." : "It's " + clock + " in Brownsville. Open until " + fmt(SLOTS[i][1]) + "." };
        }
        if (t.mins < SLOTS[i][0]) {
          return { open: false, text: es ? "Son las " + clock + " en Brownsville. Abrimos hoy a las " + fmt(SLOTS[i][0]) + "." : "It's " + clock + " in Brownsville. Open today at " + fmt(SLOTS[i][0]) + "." };
        }
      }
    }
    if (t.day === 6 || t.day === 0 || (t.day === 5 && t.mins >= 1290)) {
      return { open: false, text: es ? "Son las " + clock + " en Brownsville. Fines de semana: algunos días, llame antes." : "It's " + clock + " in Brownsville. Weekends: some days, call ahead." };
    }
    return { open: false, text: es ? "Son las " + clock + " en Brownsville. Abrimos mañana a las 10 AM." : "It's " + clock + " in Brownsville. Open tomorrow at 10 AM." };
  }
  function updateStatus() {
    var s = statusText();
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.textContent = s.text;
      el.parentElement.classList.toggle("is-open", s.open);
    });
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ---------- Service details on hover / focus ---------- */
  if (detail) {
    detail.setAttribute("data-hint", HINT.en);
    document.querySelectorAll(".svc-col li").forEach(function (li) {
      li.tabIndex = 0;
      function show() {
        document.querySelectorAll(".svc-col li.is-on").forEach(function (x) { x.classList.remove("is-on"); });
        li.classList.add("is-on");
        detail.textContent = DETAILS[lang][li.getAttribute("data-desc")] || "";
      }
      li.addEventListener("mouseenter", show);
      li.addEventListener("focus", show);
    });
  }

  /* ---------- Entrances: each section's parts arrive in reading order ---------- */
  if (!reduce && "IntersectionObserver" in window) {
    var groups = [
      [".services h2", ".svc-col h3", ".svc-col li", ".svc-detail"],
      [".work-a", ".work-b"],
      [".about-facts li", ".about-text .lead"],
      [".bars details", ".keys-photo"],
      [".call-note", ".call-foot"],
      [".foot-places li", ".foot-links li"]
    ];
    groups.forEach(function (sels) {
      var i = 0;
      sels.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.classList.add(/work-|keys-photo/.test(el.className) ? "mask" : "rise");
          el.style.setProperty("--i", Math.min(i++, 10));
        });
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".rise, .mask").forEach(function (el) { io.observe(el); });
    // the keys heading fills in, the number rises
    document.querySelectorAll(".giant, .call-number").forEach(function (el) { el.classList.add("rise"); io.observe(el); });
  }

  /* ---------- Signature: the wordmark gets heavier as the page moves ---------- */
  var mono = document.querySelector(".monument");
  var footName = document.querySelector(".foot-name");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = window.innerHeight;
      if (mono) {
        var p = Math.min(Math.max(window.scrollY / vh, 0), 1);
        mono.style.transform = "scale(" + (1 - p * 0.07).toFixed(4) + ")";
      }
      if (footName) {
        var r = footName.getBoundingClientRect();
        var q = Math.min(Math.max((vh - r.top) / vh, 0), 1);
        footName.style.transform = "scale(" + (0.93 + q * 0.07).toFixed(4) + ")";
      }
    });
  }
  if (!reduce) { window.addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

  /* ---------- Fit the display lines to the measure ---------- */
  function fit() {
    document.querySelectorAll(".call-number, .foot-name").forEach(function (el) {
      var box = el.parentElement.clientWidth - parseFloat(getComputedStyle(el.parentElement).paddingLeft) - parseFloat(getComputedStyle(el.parentElement).paddingRight);
      el.style.fontSize = "";
      var size = parseFloat(getComputedStyle(el).fontSize);
      var w = el.scrollWidth;
      if (w > 0) el.style.fontSize = Math.floor(size * box / w * 0.995) + "px";
    });
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); else fit();
  window.addEventListener("resize", fit);

  var saved = null;
  try { saved = localStorage.getItem("ml-lang"); } catch (e) {}
  if (saved === "es" || (!saved && /^es\b/i.test(navigator.language || ""))) setLang("es");

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
