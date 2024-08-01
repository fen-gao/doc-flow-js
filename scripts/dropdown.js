const showDropdown = () => {
  // Retrieve the input field and dropdown elements
  const inputField = document.getElementById("inputField");
  const dropdown = document.getElementById("dropdown");

  // Check if the elements exist
  if (!inputField || !dropdown) {
    console.error("Error: The dropdown or inputField element is not found.");
    return;
  }

  // Get the bounding rectangle of the input field
  const rect = inputField.getBoundingClientRect();

  // Position the dropdown below the input field
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.left + window.scrollX}px`;

  // Display the dropdown
  dropdown.style.display = "block";

  // Set focus to the filter input inside the dropdown
  document.getElementById("filterInput")?.focus();
};

const hideDropdown = () => {
  // Retrieve the dropdown element
  const dropdown = document.getElementById("dropdown");

  // Check if the dropdown element exists
  if (dropdown) {
    // Hide the dropdown
    dropdown.style.display = "none";

    // Clear the filter input value
    const filterInput = document.getElementById("filterInput");
    if (filterInput) {
      filterInput.value = "";
    }

    // Call the filterDropdown function to reset the dropdown
    filterDropdown();
  } else {
    console.error("Error: The dropdown element is not found.");
  }
};

const filterDropdown = () => {
  // Retrieve the filter input element
  const filterInput = document.getElementById("filterInput");
  if (!filterInput) {
    console.error("Error: Element filterInput not found.");
    return;
  }

  // Get the filter value in lowercase
  const filterValue = filterInput.value.toLowerCase();

  // Retrieve all dropdown items
  const items = document.querySelectorAll(".dropdown-item");

  let visibleItemCount = 0;

  // Filter the dropdown items based on the filter value
  items.forEach((item) => {
    const titleElement = item.querySelector(".title");
    if (titleElement) {
      const text = titleElement.textContent.toLowerCase();
      if (text.includes(filterValue)) {
        item.style.display = "flex";
        visibleItemCount++;
      } else {
        item.style.display = "none";
      }
    }
  });

  // Update the count of visible items
  const filteringTypeElement = document.querySelector(".filtering-type");
  if (filteringTypeElement) {
    filteringTypeElement.textContent = visibleItemCount;
  }

  console.log("Dropdown filtered, visible items:", visibleItemCount);
};

// Handles the selection of a dropdown item
const handleDropdownSelection = (type) => {
  // Get the selected type based on the provided type
  const selectedType = getSelectedType(type);

  // Hide the dropdown
  hideDropdown();

  // Add content based on the selected type
  addContent(selectedType);

  // Reset the input field
  resetInputField();
};

// Registers click events for each dropdown item
const registerDropdownItemClickEvents = () => {
  // Retrieve all dropdown items
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  // Add click event listener to each dropdown item
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Get the type from the data-type attribute
      const type = item.getAttribute("data-type");

      // Handle the dropdown selection
      handleDropdownSelection(type);
    });
  });
};

// Register dropdown item click events once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  registerDropdownItemClickEvents();
});
