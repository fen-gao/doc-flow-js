let isSlashMode = false;
let selectedType = "p";

/**
 *
 * @param {*} type the type of content to be added
 * @param {*} text the text to be added
 * @returns {void} this function does not return anything
 */
const addContent = (type, text = "") => {
  const contentArea = document.getElementById("contentArea");

  if (!contentArea) {
    console.error("Erro: Element contentArea not found.");
    return;
  }

  let element = document.createElement(type === "bullet" ? "li" : type);

  element.classList.add("editable-content");

  const { fontSize, fontWeight, placeholder } = getElementStyles(type);

  element.style.fontSize = fontSize;
  element.style.fontWeight = fontWeight;
  element.dataset.placeholder = placeholder;
  element.textContent = text || placeholder;
  element.style.color = text ? "black" : "lightgray";

  if (type === "bullet") {
    element.style.paddingLeft = "20px";
    element.textContent = "• " + element.textContent;
  }

  contentArea.insertBefore(element, document.getElementById("inputField"));

  if (!text) {
    makeEditable(element);
  }
};

/**
 * This function updates the file title.
 * @param {*} text The new text for the file title.
 * @returns {void} This function does not return anything.
 */
const updateFileTitle = (text) => {
  const truncatedText = text.length > 30 ? text.substring(0, 27) + "..." : text;
  const fileTitleElement = document.querySelector(".file-title");

  if (fileTitleElement) {
    fileTitleElement.textContent = truncatedText;
  }
};
