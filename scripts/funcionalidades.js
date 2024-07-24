// Função para carregar componentes
function loadComponent(componentId, filePath) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const element = document.getElementById(componentId);
      if (element) {
        element.innerHTML = data;
        console.log(`${componentId} carregado com sucesso!`);
        // Após carregar o componente, inicializar seus event listeners
        initializeComponentListeners(componentId);
      } else {
        console.error(`Erro: Elemento com id ${componentId} não encontrado.`);
      }
    })
    .catch((error) => console.error(`Erro ao carregar ${componentId}:`, error));
}

// Inicializar componentes
function initializeComponents() {
  loadComponent("component-header", "components/header/index.html");
  loadComponent("component-top-controls", "components/top-controls/index.html");
  loadComponent(
    "component-content-wrapper",
    "components/content-wrapper/index.html"
  );
  loadComponent("component-content-area", "components/content-area/index.html");
  loadComponent("component-dropdown", "components/dropdown/index.html");
  loadComponent(
    "component-dropdown-items",
    "components/dropdown-items/index.html"
  );
}

// Inicializar event listeners para os componentes carregados
function initializeComponentListeners(componentId) {
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
      const inputField = document.getElementById("inputField");
      if (inputField) {
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
            const text = inputField.value.trim();
            if (text) {
              addContent(selectedType || "p", text);
            } else {
              addContent("p");
            }
            selectedType = "p";
            showMainInput();
            isSlashMode = false;
          } else if (e.key === "Escape") {
            selectedType = "p";
            inputField.placeholder =
              "Type / for blocks, @ to link docs or people";
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
            inputField.style.color = "black";
            hideDropdown();
          }
        });
        inputField.style.fontSize = "14px";
        inputField.style.fontWeight = "normal";
      }
      break;
    case "component-dropdown":
      const filterInput = document.getElementById("filterInput");
      if (filterInput) {
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
      }
      break;
    case "component-dropdown-items":
      // Listeners específicos do dropdown items
      break;
  }
}

// Variáveis globais
let currentEditingElement = null;
let isSlashMode = false;
let selectedType = "p";

function updateFileTitle(text) {
  const truncatedText = text.length > 30 ? text.substring(0, 27) + "..." : text;
  const fileTitleElement = document.querySelector(".file-title");
  if (fileTitleElement) {
    fileTitleElement.textContent = truncatedText;
  }
}

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
  input.classList.add("input-field");
  input.style.width = "100%";
  input.style.fontSize = getComputedStyle(element).fontSize;
  input.style.fontWeight = getComputedStyle(element).fontWeight;
  input.style.fontFamily = getComputedStyle(element).fontFamily;
  input.style.margin = getComputedStyle(element).margin;
  input.style.padding = getComputedStyle(element).padding;
  input.style.border = "none";
  input.style.background = "transparent";
  input.style.outline = "none";
  input.style.caretColor = "black";
  input.style.color = "black";

  element.appendChild(input);
  input.focus();
  input.setSelectionRange(0, input.value.length);

  currentEditingElement = element;
  const inputField = document.getElementById("inputField");
  if (inputField) {
    inputField.style.display = "none";
  }

  input.addEventListener("blur", finishEditingCurrentElement);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      finishEditingCurrentElement();
      addContent("p");
    } else if (e.key === "Escape") {
      e.preventDefault();
      finishEditingCurrentElement();
    }
  });
}

function finishEditingCurrentElement() {
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
}

function addContent(type, text = "") {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) {
    console.error("Erro: Elemento contentArea não encontrado.");
    return;
  }

  let element = document.createElement(type === "bullet" ? "li" : type);
  element.classList.add("editable-content");

  let fontSize, fontWeight;
  switch (type) {
    case "h1":
      fontSize = "24px";
      fontWeight = "bold";
      placeholder = "Heading 1";
      break;
    case "h2":
      fontSize = "20px";
      fontWeight = "bold";
      placeholder = "Heading 2";
      break;
    case "h3":
      fontSize = "16px";
      fontWeight = "bold";
      placeholder = "Heading 3";
      break;
    case "bullet":
      fontSize = "14px";
      fontWeight = "normal";
      element.style.paddingLeft = "20px";
      element.textContent = "• ";
      placeholder = "List item";
      break;
    default:
      fontSize = "14px";
      fontWeight = "normal";
      type = "p";
      placeholder = "Type your text here";
  }

  element.style.fontSize = fontSize;
  element.style.fontWeight = fontWeight;
  element.dataset.placeholder = placeholder;
  element.textContent = text || placeholder;
  element.style.color = text ? "black" : "lightgray";

  contentArea.insertBefore(element, document.getElementById("inputField"));

  if (!text) {
    makeEditable(element);
  }
}

function showDropdown() {
  const inputField = document.getElementById("inputField");
  if (!inputField) {
    console.error("Erro: Elemento inputField não encontrado.");
    return;
  }

  const dropdown = document.getElementById("dropdown");
  if (!dropdown) {
    console.error("Erro: Elemento dropdown não encontrado.");
    return;
  }

  const rect = inputField.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.display = "block";
  document.getElementById("filterInput").focus();
}

function hideDropdown() {
  const dropdown = document.getElementById("dropdown");
  if (dropdown) {
    dropdown.style.display = "none";
    document.getElementById("filterInput").value = "";
    filterDropdown();
  } else {
    console.error("Erro: Elemento dropdown não encontrado.");
  }
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
      selectedType = "p";
      break;
  }

  hideDropdown();
  addContent(selectedType);
  document.getElementById("inputField").value = "";
  document.getElementById("inputField").placeholder =
    "Type / for blocks, @ to link docs or people";
}

function filterDropdown() {
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
}

function showMainInput() {
  const inputField = document.getElementById("inputField");
  if (inputField) {
    inputField.style.display = "block";
    inputField.value = "";
    inputField.placeholder = "Type / for blocks, @ to link docs or people";
    inputField.style.color = "lightgray";
    inputField.focus();
  } else {
    console.error("Erro: Elemento inputField não encontrado.");
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeComponents();

  const titleElement = document.getElementById("untitle");
  const contentArea = document.getElementById("contentArea");
  const inputField = document.getElementById("inputField");

  if (titleElement && contentArea && inputField) {
    titleElement.dataset.placeholder = "Untitled";
    updateFileTitle(titleElement.textContent);

    console.log("Editor script atualizado carregado com sucesso!");
  } else {
    console.error("Erro: Elementos iniciais não encontrados.");
  }
});
