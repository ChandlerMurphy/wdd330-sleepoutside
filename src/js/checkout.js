import { loadHeaderFooter, clearCart } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
// renderCartContents();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const checkStatus = myForm.checkValidity();
  myForm.reportValidity();
  if (checkStatus) {
    order.checkout();
    clearCart();
    // Redirect to success page
    window.location.href = "success.html";

    return;
  }
});
