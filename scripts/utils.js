const setInputStyles = (input, element) => {
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
};

const getElementStyles = (type) => {
  switch (type) {
    case "h1":
      return { fontSize: "24px", fontWeight: "bold", placeholder: "Heading 1" };
    case "h2":
      return { fontSize: "20px", fontWeight: "bold", placeholder: "Heading 2" };
    case "h3":
      return { fontSize: "16px", fontWeight: "bold", placeholder: "Heading 3" };
    case "bullet":
      return {
        fontSize: "14px",
        fontWeight: "normal",
        placeholder: "List item",
      };
    default:
      return {
        fontSize: "14px",
        fontWeight: "normal",
        placeholder: "Type / for blocks, @ to link docs or people",
      };
  }
};

const getSelectedType = (type) => {
  switch (type) {
    case "1":
    case "h1":
      return "h1";
    case "2":
    case "h2":
      return "h2";
    case "3":
    case "h3":
      return "h3";
    case "4":
    case "bullet":
      return "bullet";
    default:
      return "p";
  }
};

const resetInputField = () => {
  const inputField = document.getElementById("inputField");
  if (inputField) {
    inputField.value = "";
    inputField.placeholder = "Type / for blocks, @ to link docs or people";
  }
};

const showMainInput = () => {
  const inputField = document.getElementById("inputField");

  if (inputField) {
    inputField.style.display = "block";
    inputField.value = "";
    inputField.placeholder = "Type / for blocks, @ to link docs or people";
    inputField.style.color = "lightgray";
    inputField.focus();
  } else {
    console.error("Erro: Element inputField not found.");
  }
};
