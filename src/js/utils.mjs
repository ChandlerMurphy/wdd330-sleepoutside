// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Use those lines to create a new function in the utils.mjs file called getParam(param) that you can 
// use to return a parameter from the URL when requested.

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListwithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback){
    callback(data);
  }
}

async function loadTemplate(url) {
  const response = await fetch(url);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const cartCount = cart.length;

  const cartCountElement = document.querySelector(".cart_count");
  cartCountElement.textContent = cartCount > 0 ? cartCount : "0";
}

export function updateBreadcrumb() {
  const breadcrumbContainer = document.getElementById("breadcrumb-container");
  const breadcrumbContent = document.getElementById("breadcrumb-content");

  const path = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search); // Parse the query string

  const category = urlParams.get("category"); // Extract the 'category' query parameter from the URL
  const productId = urlParams.get("product"); // Extract the 'product' query parameter from the URL

  if (path === "/" || path === "/index.html") {
    // Home page: don't show breadcrumb
    breadcrumbContainer.style.display = "none";
  } else if (path.includes("product_listing") && category) {
    // Product list page with category query (e.g., ?category=tents)
    const productCount = countProductCards(); // Count all product cards on the page
    console.log("Product Count:", productCount); // Debugging output
    breadcrumbContent.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} (${productCount} items)`; // Display category and product count
    breadcrumbContainer.style.display = "block";
  } else if (path.includes("product_pages") && productId) {
    // Individual product page with product query (e.g., ?product=123)
    breadcrumbContent.textContent = `Product - ${productId}`;
    breadcrumbContainer.style.display = "block";
  }

  // Function to count product cards (elements with the class 'product-card')
  function countProductCards() {
    const productCards = document.querySelectorAll(".product-card"); // Select all elements with class 'product-card'
    return productCards.length; // Return the number of product cards
  }
}


