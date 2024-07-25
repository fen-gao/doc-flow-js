const handleInputFieldKeydown = (e) => {
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
    const text = e.target.value.trim();
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
    e.target.placeholder = "Type / for blocks, @ to link docs or people";
    hideDropdown();
    isSlashMode = false;
  } else {
    isSlashMode = false;
  }
};

const handleInputFieldInput = (e) => {
  if (e.target.value === "/") {
    isSlashMode = true;
    showDropdown();
  } else {
    e.target.style.color = "black";
    hideDropdown();
  }
};

const handleFilterInputKeydown = (e) => {
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
};

const handleEditableInputKeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    finishEditingCurrentElement();
    addContent("p");
  } else if (e.key === "Escape") {
    e.preventDefault();
    finishEditingCurrentElement();
  }
};
