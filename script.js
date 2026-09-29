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

const demoToggle = $('#demo-toggle');
let simulationOn = true;
let simTick = 0;
function updateSimulation() {
  if (!simulationOn) return;
  simTick += 1;
  const temp = 24.6 + Math.sin(simTick / 2.5) * 1.2;
  const humidity = Math.round(82 + Math.cos(simTick / 3.2) * 4);
  const rootTemp = 22.8 + Math.sin(simTick / 3.5) * .4;
  $('#dial-temp').textContent = `${temp.toFixed(1)}°`;
  $('#sensor-air-temp').innerHTML = `${temp.toFixed(1)} <small>°C</small>`;
  $('#sensor-air-humidity').innerHTML = `${humidity} <small>%</small>`;
  $('#sensor-root-temp').innerHTML = `${rootTemp.toFixed(1)} <small>°C</small>`;
  $('#humidity-reading').textContent = humidity;
  $('#humidity-bar').style.width = `${humidity}%`;
  $('#last-reading').textContent = new Date().toLocaleTimeString('es-PE', {hour:'2-digit', minute:'2-digit'});
}
demoToggle.addEventListener('click', () => { simulationOn = !simulationOn; demoToggle.classList.toggle('off', !simulationOn); demoToggle.setAttribute('aria-pressed', simulationOn ? 'true' : 'false'); demoToggle.innerHTML = `<span></span> ${simulationOn ? 'simulación activa' : 'simulación pausada'}`; });
updateSimulation();
setInterval(updateSimulation, 4000);

const dateEl = $('#current-date');
dateEl.textContent = new Intl.DateTimeFormat('es-PE', {day:'2-digit', month:'short', year:'numeric'}).format(new Date()).replace('.', '').toUpperCase();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.style.scrollBehavior = 'auto';
