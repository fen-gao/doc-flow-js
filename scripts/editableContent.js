let currentEditingElement = null;

const makeEditable = (element) => {
  if (currentEditingElement) {
    finishEditingCurrentElement();
  }

  const text =
    element.textContent.trim() === element.dataset.placeholder
      ? ""
      : element.textContent;

  element.innerHTML = "";
  const input = document.createElement("input");
  input.value = text;
  input.placeholder = element.dataset.placeholder;
  input.classList.add("input-field");

  setInputStyles(input, element);

  element.appendChild(input);
  input.focus();
  input.setSelectionRange(0, input.value.length);

  currentEditingElement = element;

  const inputField = document.getElementById("inputField");

  if (inputField) {
    inputField.style.display = "none";
  }

  input.addEventListener("blur", finishEditingCurrentElement);
  input.addEventListener("keydown", handleEditableInputKeydown);
};

const finishEditingCurrentElement = () => {
  if (currentEditingElement) {
    const input = currentEditingElement.querySelector("input");
    let newText = input.value.trim();

    if (newText === "") {
      newText = currentEditingElement.dataset.placeholder || "";
      currentEditingElement.style.color = "lightgray";
    } else {
      currentEditingElement.style.color = "black";
    }

    currentEditingElement.textContent = newText;
    currentEditingElement.style.fontSize = input.style.fontSize;
    currentEditingElement.style.fontWeight = input.style.fontWeight;

    if (currentEditingElement.id === "untitle") {
      updateFileTitle(newText);
    }

    currentEditingElement = null;
    showMainInput();
  }
};

const createNewLine = () => {
  const newElement = document.createElement("p");
  newElement.classList.add("editable-content");
  newElement.textContent = "Type / for blocks, @ to link docs or people";
  newElement.style.color = "lightgray";
  newElement.dataset.placeholder =
    "Type / for blocks, @ to link docs or people";

  const contentArea = document.getElementById("contentArea");
  if (contentArea) {
    contentArea.insertBefore(newElement, document.getElementById("inputField"));
    newElement.addEventListener("click", () => makeEditable(newElement));
  }

  showMainInput(); // Add this line to show the main input field

  return newElement;
};
