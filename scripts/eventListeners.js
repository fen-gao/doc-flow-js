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
      registerDropdownItemClickEvents();
      break;
    case "component-dropdown-items":
      registerDropdownItemClickEvents();
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

  // Add click event listeners to all existing editable content
  const editableElements = document.querySelectorAll(".editable-content");
  editableElements.forEach((element) => {
    element.addEventListener("click", () => makeEditable(element));
  });
};

const initializeDropdownListeners = () => {
  const filterInput = document.getElementById("filterInput");

  if (filterInput) {
    filterInput.addEventListener("input", filterDropdown);
    filterInput.addEventListener("keydown", handleFilterInputKeydown);
  }
};
