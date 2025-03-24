import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);

        // the product details are needed before rendering the HTML
        this.renderProductDetails("main");

        // Event listenser to dynamically update image on window resize
        window.addEventListener("resize", this.updateProductImage.bind(this));
        this.updateProductImage();

        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart");
        document.addEventListener("click", this.addToCart.bind(this));
    }
    addProductToCart() {
        let cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
          "afterBegin",
          productDetailsTemplate(this.product)
        );
    }
    updateProductImage() {
      const imageElement = document.getElementById("product-image");

      if (window.innerWidth <= 100) {
        imageElement.src = this.product.Images.PrimarySmall;
      } else if (window.innerWidth <= 200) {
        imageElement.src = this.product.Images.PrimaryMedium;
      } else if (window.innerWidth <= 300) {
        imageElement.src = this.product.Images.PrimaryLarge;
      } else {
        imageElement.src = this.product.Images.PrimaryExtraLarge;
      }
    }
}


function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      id="product-image"
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

