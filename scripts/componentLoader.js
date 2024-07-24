const loadComponent = (componentId, filePath) => {
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
        console.log(`${componentId} loaded successfully!`);
        initializeComponentListeners(componentId);
      } else {
        console.error(`Erro: Element with id ${componentId} not found.`);
      }
    })
    .catch((error) => console.error(`Erro loading ${componentId}:`, error));
};

const initializeComponents = () => {
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

  components.forEach(({ id, path }) => {
    loadComponent(id, path);
  });
};
