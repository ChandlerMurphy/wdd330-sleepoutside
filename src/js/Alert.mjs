import alerts from "../public/json/alerts.json";

export default class Alert {
  constructor(selector) {
    this.selector = selector;
  }
  displayAlert(selector, alert) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="alert-container" style="background-color: ${alert.background}; color:${alert.color}">
    <p class="alert">\
    ${alert.message}
    </p>
    <span class="delete-alert">❌</span>
    </div>
    `;
    selector.appendChild(div);
    div.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-alert")) {
        e.target.parentElement.remove();
      }
    });
  }
  clearAlert() {
    const alertElement = document.querySelector(this.selector);
    alertElement.innerHTML = "";
  }
  readAlerts(sect) {
    alerts.forEach((alert) => {
      this.displayAlert(sect, alert);
    });
    console.log(alerts);
  }
  insertAlerts() {
    const sect = document.createElement("section");
    sect.classList.add("alert-list");
    document.querySelector("main").prepend(sect);
    this.readAlerts(sect);
  }
}
