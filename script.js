// Seleciona elementos importantes
const titleElement = document.getElementById("untitle");
const fileTitleElement = document.querySelector(".file-title");
const contentArea = document.getElementById("contentArea");
const inputField = document.getElementById("inputField");
const dropdown = document.getElementById("dropdown");
const filterInput = document.getElementById("filterInput");
const filterKeyword = document.querySelector(".filtering-type");

// Variáveis para controle do modo de edição
let isSlashMode = false;
let selectedType = null;
let currentEditingElement = null;

// Função para atualizar o título do arquivo no breadcrumb
function updateFileTitle(text) {
  const truncatedText = text.length > 30 ? text.substring(0, 27) + "..." : text;
  fileTitleElement.textContent = truncatedText;
}

// Modifique a função makeEditable para incluir o placeholder no input
function makeEditable(element) {
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
  input.classList.add("text-input");
  input.style.width = "100%";
  input.style.fontSize = window.getComputedStyle(element).fontSize;
  input.style.fontWeight = window.getComputedStyle(element).fontWeight;
  input.style.fontFamily = window.getComputedStyle(element).fontFamily;
  input.style.margin = window.getComputedStyle(element).margin;
  input.style.padding = window.getComputedStyle(element).padding;
  input.style.border = "none";
  input.style.background = "transparent";
  input.style.outline = "none";
  input.style.caretColor = "black";
  input.style.color = text.trim() === "" ? "lightgray" : "black";

  element.appendChild(input);
  input.focus();
  input.select(); // Seleciona todo o texto no modo de edição

  currentEditingElement = element;
  inputField.style.display = "none";

  input.addEventListener("input", function () {
    if (element.id === "untitle") {
      updateFileTitle(input.value);
    }
    input.style.color = input.value.trim() === "" ? "lightgray" : "black";
  });

  input.addEventListener("blur", finishEditingCurrentElement);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      finishEditingCurrentElement();
      showMainInput();
    } else if (e.key === "Escape") {
      e.preventDefault();
      finishEditingCurrentElement();
    }
  });
}

// Event listener para edição do título
titleElement.addEventListener("click", function () {
  makeEditable(this);
});

// Adiciona um event listener para o evento de duplo clique no título
titleElement.addEventListener("dblclick", function () {
  makeEditable(this);
});

// Função para adicionar novo conteúdo
function addContent(type) {
  let element = document.createElement("div");
  element.classList.add("editable-content");

  let placeholder;
  switch (type) {
    case "h1":
      placeholder = "Heading 1";
      element.style.fontSize = "24px";
      element.style.fontWeight = "bold";
      break;
    case "h2":
      placeholder = "Heading 2";
      element.style.fontSize = "20px";
      element.style.fontWeight = "bold";
      break;
    case "h3":
      placeholder = "Heading 3";
      element.style.fontSize = "16px";
      element.style.fontWeight = "bold";
      break;
    case "bullet":
      placeholder = "List item";
      element.style.paddingLeft = "20px";
      element.textContent = "• ";
      break;
    default:
      placeholder = "Type your text here";
      element.style.fontSize = "14px";
  }

  element.dataset.placeholder = placeholder;
  if (type !== "bullet") {
    element.textContent = placeholder;
  }
  element.style.color = "lightgray";

  contentArea.insertBefore(element, inputField);

  makeEditable(element);

  // Focar no elemento recém-criado
  const input = element.querySelector("input");
  if (input) {
    input.focus();
  }
}

// Funções para mostrar e esconder o dropdown
function showDropdown() {
  const rect = inputField.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.display = "block";
  filterInput.focus();
}

function hideDropdown() {
  dropdown.style.display = "none";
  filterInput.value = "";
  filterDropdown();
}

function handleDropdownSelection(type) {
  switch (type) {
    case "1":
    case "h1":
      selectedType = "h1";
      break;
    case "2":
    case "h2":
      selectedType = "h2";
      break;
    case "3":
    case "h3":
      selectedType = "h3";
      break;
    case "4":
    case "bullet":
      selectedType = "bullet";
      break;
    default:
      selectedType = null;
      return;
  }

  hideDropdown();
  addContent(selectedType);
  inputField.value = "";
  inputField.placeholder = "Type / for blocks, @ to link docs or people";
}

// Função para filtrar os itens do dropdown
function filterDropdown() {
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

  filterKeyword.textContent = count;
}

// Event listeners
dropdown.addEventListener("click", function (e) {
  if (e.target.classList.contains("dropdown-item")) {
    const type = e.target.getAttribute("data-type");
    handleDropdownSelection(type);
  }
});

inputField.addEventListener("keydown", function (e) {
  if (e.key === "/") {
    e.preventDefault();
    isSlashMode = true;
    showDropdown();
  } else if (isSlashMode && ["1", "2", "3", "4"].includes(e.key)) {
    e.preventDefault();
    handleDropdownSelection(e.key);
    isSlashMode = false;
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (selectedType) {
      addContent(selectedType);
    } else if (inputField.value.trim() !== "") {
      addContent("p");
    }
    showMainInput();
    isSlashMode = false;
  } else if (e.key === "Escape") {
    selectedType = null;
    inputField.placeholder = "Type / for blocks, @ to link docs or people";
    hideDropdown();
    isSlashMode = false;
  } else {
    isSlashMode = false;
  }
});

inputField.addEventListener("input", function (e) {
  if (e.target.value === "/") {
    isSlashMode = true;
    showDropdown();
  } else {
    hideDropdown();
  }
});

filterInput.addEventListener("input", filterDropdown);

filterInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const firstVisibleItem = document.querySelector(
      ".dropdown-item:not([style*='display: none'])"
    );
    if (firstVisibleItem) {
      const type = firstVisibleItem.getAttribute("data-type");
      handleDropdownSelection(type);
    }
  } else if (e.key === "Escape") {
    hideDropdown();
  }
});

document.addEventListener("click", function (e) {
  if (
    currentEditingElement &&
    !currentEditingElement.contains(e.target) &&
    e.target !== inputField
  ) {
    finishEditingCurrentElement();
  }
});

// Função para finalizar a edição do elemento atual
function finishEditingCurrentElement() {
  if (currentEditingElement) {
    const input = currentEditingElement.querySelector("input");
    let newText = input.value.trim();

    if (newText === "") {
      newText = currentEditingElement.dataset.placeholder || "Untitle";
      currentEditingElement.style.color = "lightgray";
    } else {
      currentEditingElement.style.color = "black";
    }

    if (currentEditingElement.id === "untitle" && newText === "") {
      newText = "Untitle";
    }

    currentEditingElement.textContent = newText;

    if (currentEditingElement.id === "untitle") {
      updateFileTitle(newText);
    }

    currentEditingElement = null;
    showMainInput();
  }
}

// Função para mostrar o input principal
function showMainInput() {
  inputField.style.display = "block";
  inputField.value = "";
  inputField.placeholder = "Type / for blocks, @ to link docs or people";
  inputField.style.color = "lightgray";
  inputField.focus();
}

// Event listener para o contentArea
contentArea.addEventListener("click", function (e) {
  if (e.target === contentArea) {
    showMainInput();
  }
});

// Inicialização
titleElement.dataset.placeholder = "Untitle";
updateFileTitle(titleElement.textContent);
contentArea.appendChild(inputField);

// Event listeners para resize e scroll
window.addEventListener("resize", function () {
  if (dropdown.style.display === "block") {
    showDropdown();
  }
});

document.addEventListener("scroll", function () {
  if (dropdown.style.display === "block") {
    showDropdown();
  }
});

console.log("Editor script atualizado carregado com sucesso!");
