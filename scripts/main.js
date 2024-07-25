document.addEventListener("DOMContentLoaded", () => {
  initializeComponents();

  const titleElement = document.getElementById("untitle");
  const contentArea = document.getElementById("contentArea");
  const inputField = document.getElementById("inputField");

  if (titleElement && contentArea && inputField) {
    titleElement.dataset.placeholder = "Untitled";
    updateFileTitle(titleElement.textContent);

    // Add click event listener to make the title editable
    titleElement.addEventListener("click", () => makeEditable(titleElement));

    console.log("Components loaded successfully!");
  } else {
    console.error("Erro: Elements not found.");
  }
});
