import {
  getLocalStorage,
  updateCartCount,
  loadHeaderFooter,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems) {
    document.querySelector(".product-list").innerHTML =
      "<p class='empty-cart-banner'>No items in cart</p>";
    return;
  } else {
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index),
    );
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function removeItemFromCart(number) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter(
    (_, index) => index !== parseInt(number),
  );
  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  renderCartContents();
  setCartTotal();
  updateCartCount();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider" data-index="${index}"> 
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove">
    ❌
  </span>
</li>`;

  return newItem;
}

function setCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    return;
  } else {
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    document.querySelector("#cart-total-span").textContent =
      `${total.toFixed(2)}`;
    document.querySelector(".cart-footer").style.display = "block";
  }
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    const itemIndex = e.target.closest(".cart-card").dataset.index; // Get the index from data-index
    removeItemFromCart(itemIndex);
  }
});
loadHeaderFooter();
renderCartContents();
setCartTotal();
// updateCartCount();
