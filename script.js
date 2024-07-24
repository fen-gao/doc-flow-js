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

// Função para tornar um elemento editável
function makeEditable(element) {
  // Evita a criação de múltiplos campos de entrada no duplo clique
  if (currentEditingElement) {
    finishEditingCurrentElement();
  }

  // Oculta o inputField durante a edição
  inputField.style.display = "none";

  const text = element.textContent;
  const input = document.createElement("input");
  input.value = text;
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

  element.textContent = "";
  element.appendChild(input);
  input.focus();

  currentEditingElement = element;

  input.addEventListener("input", function () {
    if (element.id === "untitle") {
      updateFileTitle(input.value);
    }
  });

  function finishEditing() {
    let newText = input.value.trim();
    if (newText === "" && element.id === "untitle") {
      newText = "Untitle";
    }
    element.removeChild(input);
    element.textContent = newText;
    element.classList.add("text-ellipsis");

    if (element.id === "untitle") {
      updateFileTitle(newText);
    }

    // Mostra o inputField após a edição
    inputField.style.display = "block";
    inputField.focus();
    currentEditingElement = null;
  }

  input.addEventListener("blur", finishEditing);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      finishEditing();
    } else if (e.key === "Escape") {
      e.preventDefault();
      finishEditing();
    }
  });
}

// Event listener para edição do título
titleElement.addEventListener("click", function () {
  makeEditable(this);
});

// Função para adicionar novo conteúdo
function addContent(text) {
  let element;
  switch (selectedType) {
    case "h1":
      element = document.createElement("h1");
      break;
    case "h2":
      element = document.createElement("h2");
      break;
    case "h3":
      element = document.createElement("h3");
      break;
    case "bullet":
      element = document.createElement("ul");
      const li = document.createElement("li");
      li.textContent = text;
      element.appendChild(li);
      break;
    default:
      element = document.createElement("p");
  }

  if (selectedType !== "bullet") {
    element.textContent = text;
  }

  // Adiciona a classe de elipse para os elementos de texto
  element.classList.add("text-ellipsis");

  // Insere o novo elemento antes do inputField
  contentArea.insertBefore(element, inputField);

  // Adiciona evento de clique para edição
  if (selectedType !== "bullet") {
    element.addEventListener("click", function () {
      makeEditable(this);
    });
  }

  selectedType = null;

  // Mantém o foco no inputField e o rola para a visão
  inputField.focus();
  inputField.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Função para mostrar o dropdown
function showDropdown() {
  const rect = inputField.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.display = "block";
  filterInput.focus();
}

// Função para esconder o dropdown
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
      inputField.placeholder = "";
      break;
    case "2":
    case "h2":
      selectedType = "h2";
      inputField.placeholder = "";
      break;
    case "3":
    case "h3":
      selectedType = "h3";
      inputField.placeholder = "";
      break;
    case "4":
    case "bullet":
      selectedType = "bullet";
      inputField.placeholder = "";
      break;
    default:
      selectedType = null;
      inputField.placeholder = "Type / for blocks, @ to link docs or people";
      return;
  }

  hideDropdown();
  inputField.focus();
  inputField.value = ""; // Limpa o campo de entrada
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

// Event listener para o dropdown
dropdown.addEventListener("click", function (e) {
  if (e.target.classList.contains("dropdown-item")) {
    const type = e.target.getAttribute("data-type");
    handleDropdownSelection(type);
  }
});

// Event listener para keydown no inputField
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
    if (inputField.value.trim() !== "") {
      addContent(inputField.value);
      inputField.value = "";
      selectedType = null;
      inputField.placeholder = "Type / for blocks, @ to link docs or people";
    }
    hideDropdown();
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

// Event listener para input no inputField
inputField.addEventListener("input", function (e) {
  if (e.target.value === "/") {
    isSlashMode = true;
    showDropdown();
  } else {
    hideDropdown();
  }
});

// Event listener para input no filterInput
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

// Evento para salvar a linha ao clicar fora dela
document.addEventListener("click", function (e) {
  if (
    currentEditingElement &&
    !currentEditingElement.contains(e.target) &&
    e.target !== inputField
  ) {
    finishEditingCurrentElement();
  }
});

function finishEditingCurrentElement() {
  if (currentEditingElement) {
    const input = currentEditingElement.querySelector("input");
    let newText = input.value.trim();
    if (newText === "" && currentEditingElement.id === "untitle") {
      newText = "Untitle";
    }
    currentEditingElement.removeChild(input);
    currentEditingElement.textContent = newText;
    currentEditingElement.classList.add("text-ellipsis");

    if (currentEditingElement.id === "untitle") {
      updateFileTitle(newText);
    }

    inputField.style.display = "block";
    inputField.focus();
    currentEditingElement = null;
  }
}

// Inicializa o título do arquivo
updateFileTitle(titleElement.textContent);

// Garante que o inputField esteja sempre no final do contentArea
contentArea.appendChild(inputField);

// Adicione estes event listeners no final do script
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

console.log("Editor script carregado com sucesso!");
