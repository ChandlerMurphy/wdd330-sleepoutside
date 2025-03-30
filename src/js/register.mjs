import { loadHeaderFooter } from "./utils.mjs";

function setupRegistrationForm() {
const form = document.getElementById("registrationForm");

if (form) {
    form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = document.getElementById("customername").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;

    const user = { name, address, email };
    localStorage.setItem("user", JSON.stringify(user));
    
    alert("Registration successful!");
    
    });
} else {
    console.error("Registration form not found");
}
}

loadHeaderFooter();
console.log("Header and footer loading initiated");

document.addEventListener("DOMContentLoaded", function() {
    setupRegistrationForm();
  });

export { setupRegistrationForm };