const loadComponent = async (componentId, filePath) => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const element = document.getElementById(componentId);
    if (element) {
      element.innerHTML = data;
      console.log(`${componentId} loaded successfully!`);
      initializeComponentListeners(componentId);
    } else {
      console.error(`Erro: Element with id ${componentId} not found.`);
    }
  } catch (error) {
    console.error(`Erro loading ${componentId}:`, error);
  }
};

const initializeComponents = async () => {
  const components = [
    { id: "component-header", path: "components/header/index.html" },
    {
      id: "component-top-controls",
      path: "components/top-controls/index.html",
    },
    {
      id: "component-content-wrapper",
      path: "components/content-wrapper/index.html",
    },
    {
      id: "component-content-area",
      path: "components/content-area/index.html",
    },
    { id: "component-dropdown", path: "components/dropdown/index.html" },
    {
      id: "component-dropdown-items",
      path: "components/dropdown-items/index.html",
    },
  ];

  for (const { id, path } of components) {
    await loadComponent(id, path);
  }
};

document.addEventListener("DOMContentLoaded", initializeComponents);
