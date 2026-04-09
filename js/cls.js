import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

function legacy() {
  const menu = document.querySelector(".comfy-menu");

  const clsButton = document.createElement("button");
  clsButton.textContent = "CLS (MPS)";
  clsButton.addEventListener("click", () => {
    api.fetchApi("/utils/cls_mps");
    console.clear();
  });

  const clearButton = document.getElementById("comfy-clear-button");
  menu.insertBefore(clsButton, clearButton);
}

async function frontend() {
  const btn = new (
    await import("../../scripts/ui/components/button.js")
  ).ComfyButton({
    icon: "backspace-outline",
    action: () => {
      api.fetchApi("/utils/cls_mps");
      console.clear();
    },
    tooltip: "Clear Console (MPS fixed",
    content: "CLS",
    classList: "comfyui-button comfyui-menu-mobile-collapse",
  }).element;

  app.menu.actionsGroup.element.after(btn);
}

app.registerExtension({
  name: "Blackest.ClearScreenMPS",
  async setup() {
    try {
      await frontend();
    } catch {
      // No Frontend
    }

    legacy();
  },
});
