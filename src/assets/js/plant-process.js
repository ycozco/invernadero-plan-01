import { animate, createTimeline } from "../vendor/anime.esm.min.js";

const root = document.querySelector("[data-process]");
if (root) {
  const select = root.querySelector("[data-process-select]");
  const list = root.querySelector("[data-process-steps]");
  const context = root.querySelector("[data-process-context]");
  const status = root.querySelector("[data-process-status]");
  const controls = root.querySelector("[data-process-controls]");
  const figure = root.querySelector("[data-process-illustration]");
  const caption = root.querySelector("[data-process-caption]");
  const fallbackImage = figure.querySelector("[data-process-image]");
  const data = JSON.parse(root.querySelector("[data-process-data]").textContent);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const assetRoot = new URL(fallbackImage.getAttribute("src"), location.href).pathname.replace(/[^/]+$/, "");
  const motionButtons = root.querySelectorAll("[data-motion-control]");
  let timeline;
  let diagram;
  let activeIndex = 0;
  let renderToken = 0;

  const announceStep = (index) => {
    const steps = [...list.querySelectorAll(".process-step")];
    activeIndex = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, number) => step.classList.toggle("is-active", number === activeIndex));
    diagram?.querySelectorAll("[data-step]").forEach((stage, number) => {
      stage.classList.toggle("is-current", number === activeIndex);
    });
    const current = steps[activeIndex];
    if (current) status.textContent = `Paso ${activeIndex + 1} de ${steps.length}: ${current.querySelector("h3").textContent}`;
  };

  const loadDiagram = async (pathway, token) => {
    const imageUrl = `${assetRoot}${encodeURIComponent(pathway.illustration)}`;
    fallbackImage.src = imageUrl;
    fallbackImage.alt = `Lámina de proceso: ${pathway.title}. Esquema no a escala.`;
    caption.textContent = pathway.illustrationCaption;
    figure.setAttribute("aria-label", `Ilustración: ${pathway.title}`);
    diagram = null;
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`No se pudo cargar la lámina (${response.status})`);
      const source = await response.text();
      const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
      const svg = parsed.documentElement;
      if (svg.localName !== "svg" || parsed.querySelector("parsererror")) throw new Error("La lámina SVG no es válida");
      if (token !== renderToken) return;
      svg.classList.add("process-diagram");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", `Lámina esquemática del proceso: ${pathway.title}`);
      const visibleDiagram = figure.querySelector("svg") ?? fallbackImage;
      figure.replaceChild(document.importNode(svg, true), visibleDiagram);
      diagram = figure.querySelector("svg");
    } catch {
      if (token === renderToken) figure.replaceChildren(fallbackImage, figure.querySelector("figcaption"));
    }
  };

  const render = async (index) => {
    const token = ++renderToken;
    timeline?.pause();
    const pathway = data[index];
    context.textContent = pathway.context;
    const steps = pathway.steps.map((step, number) => {
      const item = document.createElement("li");
      item.className = "process-step";
      item.dataset.step = String(number);
      item.tabIndex = 0;
      const numberLabel = document.createElement("span");
      numberLabel.className = "process-step__number";
      numberLabel.textContent = String(number + 1).padStart(2, "0");
      const copy = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = step.title;
      const detail = document.createElement("p");
      detail.textContent = step.detail;
      copy.append(title, detail);
      item.append(numberLabel, copy);
      return item;
    });
    list.replaceChildren(...steps);
    status.textContent = `${steps.length} pasos · selecciona un paso o avanza con los controles.`;
    await loadDiagram(pathway, token);
    if (token !== renderToken) return;

    timeline = createTimeline({
      autoplay: false,
      onComplete: () => { status.textContent = `Recorrido completo · ${pathway.steps.length} pasos. Puedes repetirlo o elegir uno.`; },
    });
    if (!reducedMotion.matches) {
      steps.forEach((step, number) => {
        const stage = diagram?.querySelector(`[data-step="${number}"]`);
        const targets = stage ? [step, stage] : [step];
        timeline.add(targets, {
          opacity: [0.55, 1],
          translateY: [7, 0],
          onBegin: () => announceStep(number),
        }, number * 520);
      });
    }
    announceStep(0);
    controls.hidden = false;
  };

  const moveTo = (index) => {
    timeline?.pause();
    const steps = list.querySelectorAll(".process-step");
    const nextIndex = Math.max(0, Math.min(index, steps.length - 1));
    announceStep(nextIndex);
    if (!reducedMotion.matches) {
      const stage = diagram?.querySelector(`[data-step="${nextIndex}"]`);
      animate(stage ? [steps[nextIndex], stage] : steps[nextIndex], {
        opacity: [0.55, 1],
        translateY: [8, 0],
        duration: 260,
        ease: "outQuad",
      });
    }
  };

  select.addEventListener("change", () => render(Number(select.value)));
  list.addEventListener("click", (event) => {
    const step = event.target.closest("[data-step]");
    if (step) moveTo(Number(step.dataset.step));
  });
  list.addEventListener("keydown", (event) => {
    const step = event.target.closest("[data-step]");
    if (step && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      moveTo(Number(step.dataset.step));
    }
  });
  root.querySelector("[data-process-next]").addEventListener("click", () => moveTo(activeIndex + 1));
  root.querySelector("[data-process-prev]").addEventListener("click", () => moveTo(activeIndex - 1));
  root.querySelector("[data-process-play]").addEventListener("click", () => {
    if (reducedMotion.matches || !timeline) return;
    status.textContent = "Recorriendo los pasos y señalando cada zona de la lámina…";
    timeline.play();
  });
  root.querySelector("[data-process-pause]").addEventListener("click", () => {
    timeline?.pause();
    status.textContent = "Recorrido detenido. El paso actual y la lámina siguen disponibles.";
  });
  root.querySelector("[data-process-restart]").addEventListener("click", () => {
    if (reducedMotion.matches || !timeline) return;
    announceStep(0);
    status.textContent = "Reiniciando el recorrido…";
    timeline.restart();
  });

  motionButtons.forEach((button) => { button.hidden = reducedMotion.matches; });
  reducedMotion.addEventListener("change", (event) => {
    motionButtons.forEach((button) => { button.hidden = event.matches; });
    if (event.matches) {
      timeline?.pause();
      list.querySelectorAll(".process-step").forEach((step) => {
        step.style.opacity = "1";
        step.style.transform = "none";
        step.style.backgroundColor = "";
      });
      status.textContent = "Movimiento reducido activo · usa anterior/siguiente o selecciona un paso; la lámina permanece fija.";
    } else {
      render(Number(select.value));
    }
  });
  render(Number(select.value));
}
