const drawing = document.querySelector(".module-drawing");
const toggle = drawing?.querySelector(".diagram-toggle");

if (drawing && toggle) {
  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const active = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(active));
    drawing.classList.toggle("is-flowing", active);
    toggle.firstChild.textContent = active
      ? "Pausar recorrido conceptual del aire "
      : "Mostrar recorrido conceptual del aire ";
  });
}
