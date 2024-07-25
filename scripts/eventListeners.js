/**
 * This function initializes the listeners for a specific component.
 * @param {*} componentId The ID of the component to be initialized.
 * @returns {void} This function does not return anything.
 */
const initializeComponentListeners = (componentId) => {
  switch (componentId) {
    case "component-header":
      // Listeners específicos do header
      break;
    case "component-top-controls":
      // Listeners específicos do top controls
      break;
    case "component-content-wrapper":
      const titleElement = document.getElementById("untitle");
      if (titleElement) {
        titleElement.addEventListener("click", function () {
          makeEditable(this);
        });
      }
      break;
    case "component-content-area":
      initializeContentAreaListeners();
      break;
    case "component-dropdown":
      initializeDropdownListeners();
      break;
    case "component-dropdown-items":
      // Listeners específicos do dropdown items
      break;
  }
};

const initializeContentAreaListeners = () => {
  const inputField = document.getElementById("inputField");

  if (inputField) {
    inputField.addEventListener("keydown", handleInputFieldKeydown);
    inputField.addEventListener("input", handleInputFieldInput);
    inputField.style.fontSize = "14px";
    inputField.style.fontWeight = "normal";
  }
};

const initializeDropdownListeners = () => {
  const filterInput = document.getElementById("filterInput");

  if (filterInput) {
    filterInput.addEventListener("input", filterDropdown);
    filterInput.addEventListener("keydown", handleFilterInputKeydown);
  }
};

// Certifique-se de que filterDropdown está definido
const filterDropdown = () => {
  const filterInput = document.getElementById("filterInput");
  if (!filterInput) {
    console.error("Erro: Elemento filterInput não encontrado.");
    return;
  }

  const filterValue = filterInput.value.toLowerCase();
  const items = document.querySelectorAll(".dropdown-item");

  let count = 0;
  items.forEach((item) => {
    const text = item.querySelector(".title").textContent.toLowerCase();
    if (text.includes(filterValue)) {
      item.style.display = "flex";
      count++;
    } else {
      item.style.display = "none";
    }
  });

  document.querySelector(".filtering-type").textContent = count;
};
