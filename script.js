const speciesData = {
  duranta: {
    index:'01 / 03', name:'Duranta <em>erecta</em>', code:'D1 · ensayo IBA', evidence:'evidencia experimental', mode:'duranta-mode',
    summary:'El protocolo con más evidencia específica: esqueje tierno, dos yemas, hojas superiores conservadas y una comparación controlada de IBA.',
    metrics:[['esqueje','8–12 cm'],['sombra','40–50 %'],['IBA','0 / 2500 / 5000 ppm']],
    steps:[['01','cortar temprano'],['02','retirar hojas basales'],['03','sumergir base'],['04','mantener fresco']],
    callout:'El ensayo publicado encontró su mejor resultado general con 5000 ppm de IBA; úsalo como tratamiento experimental frente a 0 y 2500 ppm, no como receta universal.'
  },
  lantana: {
    index:'02 / 03', name:'Lantana <em>camara</em>', code:'L1 · nebulización dinámica', evidence:'evidencia ambiental', mode:'lantana-mode',
    summary:'La prioridad es evitar el estrés combinado de calor y baja humedad. Nebulizar corto y frecuente protege la hoja sin empapar el sustrato.',
    metrics:[['aire día','22–26 °C'],['HR inicial','75–85 %'],['niebla','cada 2 h · 7 días']],
    steps:[['01','cortar al amanecer'],['02','conservar hidratación'],['03','nebulizar pulsos'],['04','abrir por HR']],
    callout:'La literatura reporta ensayos controlados a 22, 26 y 30 °C con 75 ± 2 % HR. Aquí se propone empezar en 22–26 °C y ajustar con sensores.'
  },
  mioporo: {
    index:'03 / 03', name:'Mioporo <em>Myoporum</em>', code:'M1 · tratamiento separado', evidence:'hipótesis a validar', mode:'mioporo-mode',
    summary:'Hay menos evidencia específica de propagación. Su tolerancia como planta establecida no debe confundirse con tolerancia del esqueje recién cortado.',
    metrics:[['tratamiento','cámara común'],['prioridad','hidratar tejido'],['resultado','medir % raíz']],
    steps:[['01','cortar material sano'],['02','reducir exposición'],['03','comparar sustrato'],['04','registrar días']],
    callout:'No forzamos una receta falsa: separamos 60 esquejes y observamos porcentaje de enraizamiento, tiempo a raíz visible y supervivencia frente a las mismas mezclas.'
  }
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function renderSpecies(key) {
  const data = speciesData[key];
  if (!data) return;
  const panel = $('#species-panel');
  panel.classList.remove('is-changing');
  void panel.offsetWidth;
  panel.classList.add('is-changing');
  $('#species-index').textContent = data.index;
  $('#species-name').innerHTML = data.name;
  $('#species-code').textContent = data.code;
  $('#species-evidence').textContent = data.evidence;
  $('#species-summary').textContent = data.summary;
  $('#species-callout p').textContent = data.callout;
  $('#species-metrics').innerHTML = data.metrics.map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`).join('');
  $('#species-steps').innerHTML = data.steps.map(([num, label]) => `<div class="process-step"><b>${num}</b><span>${label}</span></div>`).join('');
  const visual = $('.species-visual');
  visual.className = `species-visual ${data.mode}`;
  $$('.species-tab').forEach(tab => {
    const active = tab.dataset.species === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

$$('.species-tab').forEach(tab => tab.addEventListener('click', () => renderSpecies(tab.dataset.species)));
renderSpecies('duranta');

const recipeData = {
  s1: {label:'S1 · Arena + pumita', organic:0, pumice:42, sand:58},
  s2: {label:'S2 · Arena + pumita + coco', organic:30, pumice:30, sand:40},
  s3: {label:'S3 · Pumita + coco', organic:40, pumice:35, sand:25},
  s4: {label:'S4 · Control comercial', organic:50, pumice:50, sand:0}
};

$$('.recipe-row').forEach(row => row.addEventListener('click', () => {
  const data = recipeData[row.dataset.recipe];
  $$('.recipe-row').forEach(item => item.classList.toggle('active', item === row));
  $('#recipe-label').textContent = data.label;
  $('#layer-organic').style.height = `${data.organic}%`;
  $('#layer-pumice').style.height = `${data.pumice}%`;
  $('#layer-sand').style.height = `${data.sand}%`;
}));

function setNavActive() {
  const sections = $$('section[id]');
  const links = $$('.nav-link');
  const y = window.scrollY + 180;
  let current = sections[0]?.id;
  sections.forEach(section => { if (section.offsetTop <= y) current = section.id; });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', setNavActive, {passive:true});

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), {threshold:.12});
$$('.reveal').forEach(item => observer.observe(item));

/* ========================================================
   OPCIÓN 3: SELECTOR DE RANGO TEMPORAL (TIMEFRAME SELECTOR)
   ======================================================== */
const timeframeData = {
  '4h': {
    hours: ['16:00', '17:00', '18:00', '19:00', '20:00'],
    tempD: 'M0,110 C150,115 300,95 450,75 S650,85 800,68',
    humD: 'M0,82 C160,78 320,88 480,95 S640,76 800,84',
    tempArea: 'M0,110 C150,115 300,95 450,75 S650,85 800,68 V200 H0 Z',
    humArea: 'M0,82 C160,78 320,88 480,95 S640,76 800,84 V200 H0 Z'
  },
  '12h': {
    hours: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
    tempD: 'M0,140 C80,145 110,130 160,110 S250,72 320,83 S400,52 470,62 S560,86 620,67 S720,48 800,34',
    humD: 'M0,49 C90,45 130,55 190,73 S300,110 370,94 S450,90 510,115 S620,95 680,108 S740,126 800,119',
    tempArea: 'M0,140 C80,145 110,130 160,110 S250,72 320,83 S400,52 470,62 S560,86 620,67 S720,48 800,34 V200 H0 Z',
    humArea: 'M0,49 C90,45 130,55 190,73 S300,110 370,94 S450,90 510,115 S620,95 680,108 S740,126 800,119 V200 H0 Z'
  },
  '24h': {
    hours: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    tempD: 'M0,160 C60,165 140,150 220,135 S320,65 420,55 S540,75 640,120 S720,145 800,155',
    humD: 'M0,35 C70,30 150,45 230,65 S330,125 430,135 S550,115 650,70 S730,45 800,38',
    tempArea: 'M0,160 C60,165 140,150 220,135 S320,65 420,55 S540,75 640,120 S720,145 800,155 V200 H0 Z',
    humArea: 'M0,35 C70,30 150,45 230,65 S330,125 430,135 S550,115 650,70 S730,45 800,38 V200 H0 Z'
  }
};

let currentTf = '12h';

$$('.tf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tf = btn.dataset.tf;
    if (!timeframeData[tf]) return;
    currentTf = tf;
    $$('.tf-btn').forEach(b => b.classList.toggle('active', b === btn));
    const config = timeframeData[tf];
    $('#temp-path').setAttribute('d', config.tempD);
    $('#hum-path').setAttribute('d', config.humD);
    $('#temp-area').setAttribute('d', config.tempArea);
    $('#hum-area').setAttribute('d', config.humArea);
    $('#chart-hours').innerHTML = config.hours.map(h => `<span>${h}</span>`).join('');
  });
});

/* ========================================================
   OPCIÓN 2 & 4: SIMULACIÓN DE TELEMETRÍA, SPARKLINES Y BANDAS
   ======================================================== */
const demoToggle = $('#demo-toggle');
let simulationOn = true;
let simTick = 0;

function updateSimulation() {
  if (!simulationOn) return;
  simTick += 1;
  const temp = 24.6 + Math.sin(simTick / 2.5) * 1.3;
  const humidity = Math.round(82 + Math.cos(simTick / 3.2) * 4);
  const rootTemp = 22.8 + Math.sin(simTick / 3.5) * 0.4;

  // Diales y lecturas numéricas
  $('#dial-temp').textContent = `${temp.toFixed(1)}°`;
  $('#sensor-air-temp').innerHTML = `${temp.toFixed(1)} <small>°C</small>`;
  $('#sensor-air-humidity').innerHTML = `${humidity} <small>%</small>`;
  $('#sensor-root-temp').innerHTML = `${rootTemp.toFixed(1)} <small>°C</small>`;
  $('#humidity-reading').textContent = humidity;
  $('#humidity-bar').style.width = `${humidity}%`;
  $('#last-reading').textContent = new Date().toLocaleTimeString('es-PE', {hour:'2-digit', minute:'2-digit', second:'2-digit'});

  // Verificación de Banda de Confort (OPCIÓN 4)
  const isTempGood = temp >= 22.0 && temp <= 26.5;
  const isHumGood = humidity >= 75 && humidity <= 88;

  const tempStatus = $('#air-temp-status');
  if (tempStatus) {
    tempStatus.textContent = isTempGood ? 'En Rango Óptimo' : (temp > 26.5 ? 'Atención: T° Elevada' : 'Atención: T° Baja');
    tempStatus.className = `reading-status ${isTempGood ? 'good' : 'neutral'}`;
  }

  const humStatus = $('#air-humidity-status');
  if (humStatus) {
    humStatus.textContent = isHumGood ? 'En Rango Óptimo' : (humidity > 88 ? 'Atención: HR Elevada' : 'Atención: HR Baja');
    humStatus.className = `reading-status ${isHumGood ? 'good' : 'neutral'}`;
  }

  // Micro-Sparklines Dinámicos (OPCIÓN 2)
  const sparkY1 = 28 - Math.sin(simTick) * 8;
  const sparkY2 = 18 + Math.cos(simTick) * 7;
  const sparkT = $('#sparkline-temp-path');
  if (sparkT) sparkT.setAttribute('d', `M0,30 Q25,${sparkY1.toFixed(1)} 50,${sparkY2.toFixed(1)} T100,10`);

  const humSparkY1 = 15 + Math.sin(simTick / 1.5) * 8;
  const humSparkY2 = 25 - Math.cos(simTick / 1.5) * 6;
  const sparkH = $('#sparkline-hum-path');
  if (sparkH) sparkH.setAttribute('d', `M0,14 Q30,${humSparkY1.toFixed(1)} 65,${humSparkY2.toFixed(1)} T100,20`);

  const rootSparkY = 20 + Math.sin(simTick / 2) * 3;
  const sparkR = $('#sparkline-root-path');
  if (sparkR) sparkR.setAttribute('d', `M0,24 Q35,${rootSparkY.toFixed(1)} 70,16 T100,12`);
}

demoToggle.addEventListener('click', () => {
  simulationOn = !simulationOn;
  demoToggle.classList.toggle('off', !simulationOn);
  demoToggle.setAttribute('aria-pressed', simulationOn ? 'true' : 'false');
  demoToggle.innerHTML = `<span></span> ${simulationOn ? 'Simulación activa' : 'Simulación pausada'}`;
});

updateSimulation();
setInterval(updateSimulation, 3500);

const dateEl = $('#current-date');
dateEl.textContent = new Intl.DateTimeFormat('es-PE', {day:'2-digit', month:'short', year:'numeric'}).format(new Date()).replace('.', '').toUpperCase();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.style.scrollBehavior = 'auto';
