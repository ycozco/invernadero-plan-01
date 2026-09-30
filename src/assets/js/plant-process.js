import { createTimeline } from "../vendor/anime.esm.min.js";

const root = document.querySelector("[data-process]");
if (root) {
  const select = root.querySelector("[data-process-select]");
  const list = root.querySelector("[data-process-steps]");
  const context = root.querySelector("[data-process-context]");
  const status = root.querySelector("[data-process-status]");
  const controls = root.querySelector("[data-process-controls]");
  const data = JSON.parse(root.querySelector("[data-process-data]").textContent);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timeline;

  const render = (index) => {
    timeline?.pause();
    const pathway = data[index];
    context.textContent = pathway.context;
    list.replaceChildren(...pathway.steps.map((step, number) => {
      const item = document.createElement("li");
      item.className = "process-step";
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
    }));
    status.textContent = `${pathway.steps.length} pasos · lectura completa disponible sin animación.`;
    timeline = createTimeline({
      autoplay: false,
      onComplete: () => { status.textContent = `Secuencia completa · ${pathway.steps.length} pasos.`; },
    });
    if (!reducedMotion.matches) {
      list.querySelectorAll(".process-step").forEach((step, number) => {
        timeline.add(step, {
          opacity: [0.5, 1],
          translateY: [8, 0],
          backgroundColor: ["#18211b", "#1e3024"],
        }, number * 460);
      });
    }
  };

  select.addEventListener("change", () => render(Number(select.value)));
  root.querySelector("[data-process-play]").addEventListener("click", () => {
    if (reducedMotion.matches) return;
    status.textContent = "Reproduciendo la secuencia…";
    timeline.play();
  });
  root.querySelector("[data-process-pause]").addEventListener("click", () => {
    timeline.pause();
    status.textContent = "Secuencia detenida. Todos los pasos siguen visibles.";
  });
  root.querySelector("[data-process-restart]").addEventListener("click", () => {
    if (reducedMotion.matches) return;
    status.textContent = "Reiniciando la secuencia…";
    timeline.restart();
  });

  controls.hidden = reducedMotion.matches;
  reducedMotion.addEventListener("change", (event) => {
    controls.hidden = event.matches;
    if (event.matches) {
      timeline.pause();
      list.querySelectorAll(".process-step").forEach((step) => {
        step.style.opacity = "1";
        step.style.transform = "none";
        step.style.backgroundColor = "";
      });
      status.textContent = "Movimiento reducido activo · todos los pasos están disponibles sin animación.";
    } else {
      render(Number(select.value));
    }
  });
  render(Number(select.value));
  controls.hidden = reducedMotion.matches;
}
