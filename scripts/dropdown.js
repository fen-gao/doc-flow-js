/**
 * This function shows the dropdown.
 * @returns {void} This function does not return anything.
 */
const showDropdown = () => {
  const inputField = document.getElementById("inputField");
  const dropdown = document.getElementById("dropdown");

  if (!inputField || !dropdown) {
    console.error("Erro: Elementos necessários não encontrados.");
    return;
  }

  const rect = inputField.getBoundingClientRect();

  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.display = "block";
  document.getElementById("filterInput").focus();
};

/**
 * This function hides the dropdown.
 * @returns {void} This function does not return anything.
 */
const hideDropdown = () => {
  const dropdown = document.getElementById("dropdown");

  if (dropdown) {
    dropdown.style.display = "none";
    document.getElementById("filterInput").value = "";
    filterDropdown();
  } else {
    console.error("Erro: Element dropdown not found.");
  }
};

/**
 * This function handles the selection of a dropdown item.
 * @param {*} type The type of the dropdown item to be selected.
 * @returns {void} This function does not return anything.
 */
const handleDropdownSelection = (type) => {
  selectedType = getSelectedType(type);

  hideDropdown();
  addContent(selectedType);
  resetInputField();
};

/**
 * This function filters the dropdown items.
 * @returns {void} This function does not return anything.
 */
const filterDropdown = () => {
  const filterInput = document.getElementById("filterInput");

  if (!filterInput) {
    console.error("Erro: Element filterInput not found.");
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
