// Morales Locksmith: English/Spanish, live open/closed status, entrances.
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) root.classList.add("js");

  var ES = {
    "skip": "Ir al contenido",
    "nav.services": "Servicios", "nav.gallery": "Trabajos", "nav.hours": "Horario", "nav.faq": "Preguntas",
    "hero.kicker": "Cerrajero a domicilio · Brownsville, TX",
    "hero.h1": "¿Se quedó afuera? ¿Perdió su llave? <em>Vamos a donde esté.</em>",
    "hero.sub": "Llaves de carro, controles, aperturas y recodificación en Brownsville, South Padre Island y el Valle del Río Grande. Las llaves se cortan y programan junto a su carro.",
    "cta.call": "Llame ahora", "cta.text": "Mande foto de su llave", "cta.callp": "Pregunte el precio",
    "hero.f1": "Vamos a donde esté", "hero.f2": "Llaves hechas al momento", "hero.f3": "Hablamos español",
    "hero.tag1": "¿Perdió todas las llaves?", "hero.tag2": "Hacemos una nueva junto al carro. Sin grúa a la agencia.",
    "strip.1": "Llaves y controles", "strip.2": "Aperturas", "strip.3": "Recodificación", "strip.4": "Llaves con chip", "strip.5": "Llaves de camión", "strip.6": "Casas y negocios",
    "svc.title": "Lo que hacemos",
    "svc.sub": "Una llamada para su carro, su casa o su negocio. Pregunte el precio por teléfono antes de que Felipe salga.",
    "c1.t": "Llaves y controles de carro", "c1.d": "Copias, llaves con control integrado y llaves de navaja, cortadas y sincronizadas con su carro.",
    "c1.l1": "Copias de llaves", "c1.l2": "Llaves con control y de navaja", "c1.l3": "Llaves con chip",
    "c2.t": "Llaves inteligentes y controles", "c2.d": "Controles nuevos o adicionales, programados para que el arranque de botón funcione.",
    "c2.l1": "Llaves de arranque de botón", "c2.l2": "Programación de controles", "c2.l3": "Controles de repuesto",
    "c3.t": "Llaves de camión y tráiler", "c3.d": "Camiones de trabajo y tráileres, incluso Freightliner y Kenworth.",
    "c3.l1": "Copias de llaves de camión", "c3.l2": "Llaves con chip", "c3.l3": "Reemplazo de llaves perdidas",
    "c4.t": "Aperturas de carro", "c4.d": "Llaves adentro o una cerradura que no gira. Se abre sin dañarla.",
    "c5.t": "Casas", "c5.d": "Aperturas, recodificación al mudarse, reparación de cerraduras, cerraduras sin llave y copias.",
    "c6.t": "Negocios", "c6.d": "Aperturas comerciales, recodificación cuando cambia el personal, reparación o cambio de cerraduras.",
    "how.title": "Cómo funciona",
    "how.1t": "Llame o mande mensaje", "how.1d": "Díganos el año, marca y modelo, o mande foto de su llave. Le damos el precio antes de salir.",
    "how.2t": "Felipe va a donde esté", "how.2d": "A su carro, su casa o su negocio, desde Brownsville hasta South Padre Island.",
    "how.3t": "Listo para seguir", "how.3d": "La llave se corta y programa al momento, o la cerradura se abre, recodifica o repara.",
    "brands.title": "Llaves para casi todas las marcas",
    "gal.title": "Trabajos recientes", "gal.sub": "Llaves y controles de la camioneta, directo de nuestra página de Facebook.",
    "g.1": "Controles Dodge y Chrysler", "g.2": "Llaves Freightliner y Kenworth", "g.3": "Control nuevo de 7 botones", "g.4": "Llave Nissan con control", "g.5": "Llave Ford con arranque remoto", "g.6": "Listo para programar",
    "about.title": "Conozca a Felipe Morales",
    "about.p1": "Felipe es el maestro cerrajero detrás de Morales Locksmith. Trabaja desde Brownsville y maneja por todo el Valle hasta South Padre Island, para que nunca tenga que remolcar su carro.",
    "about.p2": "Cada trabajo empieza con un precio claro por teléfono. We speak English too.",
    "about.cta": "Hable con Felipe",
    "st.1t": "A domicilio", "st.1d": "Él va a donde esté",
    "st.2t": "Al momento", "st.2d": "Cortada y programada junto a su carro",
    "st.3t": "Bilingüe", "st.3d": "Español and English",
    "st.4t": "Local", "st.4d": "Brownsville y el Valle",
    "hours.title": "Horario y zona de servicio", "hours.h": "Horario",
    "d.1": "Lunes", "d.2": "Martes", "d.3": "Miércoles", "d.4": "Jueves", "d.5": "Viernes", "d.6": "Sábado", "d.0": "Domingo",
    "h.wk": "10 AM – 1:30 PM · 6 – 9:30 PM", "h.we": "Algunos días, llame antes",
    "area.h": "A dónde vamos", "area.rgv": "El Valle del Río Grande",
    "faq.title": "Preguntas", "faq.sub": "¿Otra pregunta? Llame o mande mensaje al (956) 455-9249.",
    "q1": "¿Vienen a donde estoy?", "a1": "Sí. Morales Locksmith es a domicilio. Felipe va a su carro, casa o negocio en Brownsville, South Padre Island y el Valle del Río Grande.",
    "q2": "Perdí todas las llaves del carro. ¿Pueden hacer una nueva?", "a2": "Sí. Se puede cortar y programar una llave nueva junto al carro, sin remolcarlo a la agencia.",
    "q3": "¿Cuánto cuesta?", "a3": "Depende del carro y de la llave. Llame o mande el año, marca y modelo (una foto de la llave ayuda) y le damos el precio antes de salir.",
    "q4": "¿Pueden programar un control o llave de botón?", "a4": "Sí. Controles y llaves inteligentes nuevos o adicionales se programan al momento para casi todas las marcas, como Ford, Chevrolet, Dodge, Chrysler, Jeep, Toyota, Honda y Nissan.",
    "q5": "¿Abren los fines de semana?", "a5": "Algunos sábados y domingos. Llame antes para confirmar.",
    "q6": "Do you speak English?", "a6": "Yes. Felipe speaks English and Spanish.",
    "cta.title": "¿Necesita una llave hoy?", "cta.sub": "Llame para un precio o para apartar una hora.",
    "foot.about": "Cerrajero a domicilio para carros, casas y negocios en Brownsville y el Valle del Río Grande.",
    "foot.contact": "Contacto", "foot.follow": "Síganos", "foot.hours": "Horario",
    "foot.h1": "Lun–Vie 10–1:30 · 6–9:30 PM", "foot.h2": "Sáb–Dom: llame antes", "foot.top": "Volver arriba",
    "dock.call": "Llamar", "dock.text": "Mensaje"
  };
  var ES_ALT = {
    "alt.fobs": "Tres controles negros de Dodge y Chrysler con botón rojo de pánico.",
    "alt.ford": "Una llave Ford con control integrado y botones de cerrar, abrir, pánico y arranque remoto.",
    "alt.truck": "Llaves de camión Freightliner y Kenworth en abanico sobre una mesa.",
    "alt.nissan": "Una llave Nissan con control integrado.",
    "alt.fobbag": "Un control Chrysler nuevo de siete botones en su bolsa."
  };

  var EN = {}, EN_HTML = {}, EN_ALT = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (!(k in EN)) EN[k] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) { EN_HTML[el.getAttribute("data-i18n-html")] = el.innerHTML; });
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) { EN_ALT[el.getAttribute("data-i18n-alt")] = el.alt; });

  var lang = "en";
  var toggle = document.getElementById("langToggle");

  function setLang(next) {
    lang = next;
    var es = next === "es";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"), v = es ? ES[k] : EN[k];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html"), v = es ? ES[k] : EN_HTML[k];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt"), v = es ? ES_ALT[k] : EN_ALT[k];
      if (v) el.alt = v;
    });
    root.lang = next;
    toggle.textContent = es ? "English" : "Español";
    toggle.lang = es ? "en" : "es";
    updateStatus();
    try { localStorage.setItem("ml-lang", next); } catch (e) {}
  }
  toggle.addEventListener("click", function () { setLang(lang === "es" ? "en" : "es"); });

  /* Live status from the posted hours, in Brownsville time.
     Mon–Fri 10:00–13:30 and 18:00–21:30. Weekends: some days, call ahead. */
  var SLOTS = [[600, 810], [1080, 1290]];
  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60, ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + " " + ap;
  }
  function now() {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function statusText() {
    var t = now(), es = lang === "es";
    if (t.day >= 1 && t.day <= 5) {
      for (var i = 0; i < SLOTS.length; i++) {
        if (t.mins >= SLOTS[i][0] && t.mins < SLOTS[i][1]) return { open: true, text: es ? "Abierto ahora · hasta las " + fmt(SLOTS[i][1]) : "Open now · until " + fmt(SLOTS[i][1]) };
        if (t.mins < SLOTS[i][0]) return { open: false, text: es ? "Cerrado ahora · abrimos hoy a las " + fmt(SLOTS[i][0]) : "Closed now · opens today at " + fmt(SLOTS[i][0]) };
      }
    }
    if (t.day === 6 || t.day === 0 || (t.day === 5 && t.mins >= 1290)) return { open: false, text: es ? "Fin de semana · algunos días, llame antes" : "Weekend · some days, call ahead" };
    return { open: false, text: es ? "Cerrado ahora · abrimos mañana a las 10 AM" : "Closed now · opens tomorrow at 10 AM" };
  }
  function updateStatus() {
    var s = statusText(), t = now();
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.textContent = s.text;
      el.parentElement.classList.toggle("is-open", s.open);
    });
    document.querySelectorAll(".hours tr").forEach(function (tr) {
      tr.classList.toggle("today", tr.getAttribute("data-day") === String(t.day));
    });
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* Entrances */
  if (!reduce && "IntersectionObserver" in window) {
    var groups = [".cards .card", ".steps li", ".brand-list li", ".gallery .g", ".about-stats li", ".ha .panel", ".faq details", ".sec-head"];
    groups.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.classList.add("rv");
        el.style.setProperty("--i", Math.min(i, 8));
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
  }

  var saved = null;
  try { saved = localStorage.getItem("ml-lang"); } catch (e) {}
  if (saved === "es" || (!saved && /^es/i.test(navigator.language || ""))) setLang("es");

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
