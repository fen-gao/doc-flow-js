/**
 * This function initializes all components.
 * @returns {void} This function does not return anything.
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeComponents();

  const titleElement = document.getElementById("untitle");
  const contentArea = document.getElementById("contentArea");
  const inputField = document.getElementById("inputField");

  if (titleElement && contentArea && inputField) {
    titleElement.dataset.placeholder = "Untitled";
    updateFileTitle(titleElement.textContent);

    console.log("Components loaded successfully!");
  } else {
    console.error("Erro: Elements not found.");
  }
});
