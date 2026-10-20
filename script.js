// Morales Locksmith: language switch, "What happened?" picker, text-a-quote form
(function () {
  var PHONE = "+19564559249";

  var ES = {
    "skip": "Ir al contenido",
    "nav.keys": "Llaves de carro",
    "nav.services": "Servicios",
    "nav.area": "Dónde vamos",
    "nav.quote": "Pedir precio",
    "hero.open": "Abierto ahora, las 24 horas, los 7 días",
    "hero.title1": "¿Se quedó afuera?",
    "hero.title2": "Vamos a usted.",
    "hero.sub": "Llaves de carro, controles y aperturas en Brownsville, South Padre Island y todo el Valle del Río Grande.",
    "hero.call": "Llame al",
    "hero.quote": "Pida un precio por texto",
    "fact.1t": "De día o de noche",
    "fact.1d": "Siempre abierto",
    "fact.2t": "Vamos a usted",
    "fact.2d": "Servicio 100% a domicilio",
    "fact.3t": "We speak English",
    "fact.3d": "Inglés y español",
    "keys.title": "Llaves y controles que hacemos",
    "keys.sub": "Cortadas y programadas en el lugar, junto a su carro. Arrastre una llave para girarla.",
    "k.fob": "Llaves inteligentes y controles",
    "k.fobd": "Controles de encendido por botón, programados a su carro.",
    "k.flip": "Llaves de navaja",
    "k.flipd": "Llaves plegables con hoja de corte láser y control.",
    "k.remote": "Llaves con control integrado",
    "k.remoted": "Llave y control en uno, cortada y sincronizada.",
    "k.trans": "Llaves con chip",
    "k.transd": "Llaves con transponder que su carro necesita para arrancar.",
    "k.house": "Llaves de casa y oficina",
    "k.housed": "Copias de llaves normales y de alta seguridad.",
    "brands.lead": "Trabajamos con casi todas las marcas, como",
    "pick.title": "¿Con qué le ayudamos?",
    "pick.car": "Dejé las llaves en el carro",
    "pick.home": "No puedo entrar a mi casa",
    "pick.carkey": "Perdí la llave o el control del carro",
    "pick.rekey": "Cambiar o recodificar cerraduras",
    "pick.business": "Negocio o comercial",
    "pick.safe": "La caja fuerte no abre",
    "svc.title": "Lo que hacemos",
    "svc.car": "Automotriz",
    "svc.car1": "Aperturas de carro",
    "svc.car1d": "Llaves adentro o una cerradura que no gira. Lo abrimos sin dañarlo.",
    "svc.car2": "Reemplazo de llaves",
    "svc.car2d": "¿Perdió todas las llaves? Le hacemos una nueva en el lugar, sin llevar el carro a la agencia.",
    "svc.car3": "Programación de controles",
    "svc.car3d": "Controles nuevos o adicionales programados a su carro.",
    "svc.car4": "Llaves con chip",
    "svc.car4d": "Llaves con transponder cortadas y emparejadas para que su carro arranque.",
    "svc.car5": "Llaves de camión",
    "svc.car5d": "Llaves para camiones de trabajo y tráileres, incluso Freightliner.",
    "svc.home": "Casa",
    "svc.home1": "Aperturas de casa",
    "svc.home1d": "Se quedó afuera a cualquier hora. Le ayudamos a entrar.",
    "svc.home2": "Recodificar cerraduras",
    "svc.home2d": "¿Se acaba de mudar? Cambiamos sus cerraduras para que las llaves viejas ya no sirvan.",
    "svc.home3": "Duplicado de llaves",
    "svc.home3d": "Copias de llaves de casa, oficina y alta seguridad.",
    "svc.biz": "Negocio",
    "svc.biz1": "Sistemas de llave maestra",
    "svc.biz1d": "Una llave para gerentes y llaves limitadas para empleados.",
    "svc.biz2": "Herrajes comerciales",
    "svc.biz2d": "Cilindros de alta seguridad, barras antipánico y control de acceso.",
    "svc.biz3": "Cajas fuertes",
    "svc.biz3d": "Cambio de combinación y aperturas de emergencia.",
    "steps.title": "Qué pasa cuando nos llama",
    "steps.1t": "Díganos dónde está",
    "steps.1d": "Su ciudad o dirección, y qué está cerrado o perdido.",
    "steps.2t": "Pregunte el precio",
    "steps.2d": "Por teléfono o por texto, antes de que salgamos.",
    "steps.3t": "Nuestra camioneta va hasta usted",
    "steps.3d": "Llevamos las herramientas a su carro, casa o negocio.",
    "steps.4t": "Ya puede entrar",
    "steps.4d": "Con una llave o cerradura que funciona antes de irnos.",
    "van.title": "Busque nuestra camioneta",
    "van.body": "Felipe Morales maneja Morales Locksmith desde Brownsville en una camioneta bien equipada. Cuando llega, sabe que somos nosotros.",
    "area.title": "Vamos a donde esté en el Valle",
    "area.body": "No hay tienda que visitar. Llámenos desde donde esté y vamos a usted.",
    "area.ask": "¿No sabe si llegamos a su ciudad? Llame y pregunte.",
    "area.more": "y el resto del Valle del Río Grande",
    "rev.title": "Lo que dicen nuestros clientes",
    "rev.body": "Lea lo que dice la gente del Valle sobre nosotros en nuestra página de Facebook. ¿Le ayudamos? Una reseña ayuda a sus vecinos a encontrarnos.",
    "rev.read": "Ver reseñas en Facebook",
    "q.title": "Pida un precio por texto",
    "q.body": "Llene esto y toque el botón. Su teléfono abre un texto para nosotros con todo listo, y le contestamos con un precio.",
    "q.or": "¿Tiene prisa? Solo llame al",
    "q.service": "¿Qué necesita?",
    "q.choose": "Escoja uno",
    "q.other": "Otra cosa",
    "q.town": "¿Dónde está?",
    "q.townph": "Ciudad o dirección",
    "q.details": "Detalles",
    "q.optional": "(opcional)",
    "q.detailsph": "Año, marca y modelo del carro, o cuántas cerraduras",
    "q.name": "Su nombre",
    "q.send": "Mandar mi texto",
    "q.note": "¿Está en una computadora? Los textos solo funcionan desde un teléfono, así que mejor llámenos.",
    "foot.hours": "Abierto las 24 horas, los 7 días",
    "foot.based": "Con base en Brownsville, TX 78520",
    "foot.area": "Servimos Brownsville, South Padre Island y el Valle del Río Grande",
    "dock.call": "Llamar",
    "dock.text": "Texto"
  };

  var ERR = {
    en: { service: "Choose what you need.", town: "Tell us where you are." },
    es: { service: "Escoja lo que necesita.", town: "Díganos dónde está." }
  };
  var SMS = {
    en: { hi: "Hi Morales Locksmith, I need a price.", need: "Need", where: "Where", details: "Details", name: "Name" },
    es: { hi: "Hola Morales Locksmith, necesito un precio.", need: "Necesito", where: "Dónde", details: "Detalles", name: "Nombre" }
  };

  // Save the English text that's already in the page
  var EN = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var k = el.getAttribute("data-i18n");
    if (!(k in EN)) EN[k] = el.textContent;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    EN[el.getAttribute("data-i18n-ph")] = el.getAttribute("placeholder");
  });

  var lang = "en";
  var toggle = document.getElementById("langToggle");

  function setLang(next) {
    lang = next;
    var dict = next === "es" ? ES : EN;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    document.documentElement.lang = next;
    toggle.textContent = next === "es" ? "English" : "Español";
    toggle.setAttribute("aria-label", next === "es" ? "View in English" : "Ver en español");
    try { localStorage.setItem("ml-lang", next); } catch (e) {}
  }

  toggle.addEventListener("click", function () { setLang(lang === "es" ? "en" : "es"); });

  var saved = null;
  try { saved = localStorage.getItem("ml-lang"); } catch (e) {}
  if (saved === "es" || (!saved && /^es\b/i.test(navigator.language || ""))) setLang("es");

  // "What happened?" picker fills in the form
  var select = document.getElementById("fService");
  var picks = document.querySelectorAll(".pick");
  var form = document.getElementById("quoteForm");

  function markPick(value) {
    picks.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.service === value)); });
  }
  picks.forEach(function (b) {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      select.value = b.dataset.service;
      markPick(b.dataset.service);
      document.getElementById("quote").scrollIntoView({ block: "start" });
      select.classList.remove("flash"); void select.offsetWidth; select.classList.add("flash");
      setTimeout(function () { document.getElementById("fTown").focus({ preventScroll: true }); }, 450);
    });
  });
  select.addEventListener("change", function () { markPick(select.value); });

  // Build a text message to the shop
  var errBox = document.getElementById("formError");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var town = document.getElementById("fTown");
    var details = document.getElementById("fDetails").value.trim();
    var name = document.getElementById("fName").value.trim();
    var problem = !select.value ? "service" : !town.value.trim() ? "town" : null;
    if (problem) {
      errBox.textContent = ERR[lang][problem];
      errBox.hidden = false;
      (problem === "service" ? select : town).focus();
      return;
    }
    errBox.hidden = true;
    var t = SMS[lang];
    var lines = [t.hi, t.need + ": " + select.options[select.selectedIndex].text, t.where + ": " + town.value.trim()];
    if (details) lines.push(t.details + ": " + details);
    if (name) lines.push(t.name + ": " + name);
    window.location.href = "sms:" + PHONE + "?&body=" + encodeURIComponent(lines.join("\n"));
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
