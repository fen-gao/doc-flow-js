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
