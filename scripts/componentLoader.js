/**
 * This function loads a component from a specified file path.
 * @param {*} componentId The ID of the component to be loaded.
 * @param {*} filePath The file path of the component to be loaded.
 * @returns {void} This function does not return anything.
 */
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

/**
 * This function initializes all components.
 * @returns {void} This function does not return anything.
 */
const initializeComponents = () => {
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
};
