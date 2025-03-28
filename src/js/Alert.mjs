import alerts from "../public/json/alerts.json";

export default class Alert {
  constructor(selector) {
    this.selector = selector;
  }
  displayAlert(selector, alert) {
    const p = document.createElement("p");
    p.classList.add("alert");
    p.style = `background-color: ${alert.background};
    color:${alert.color}`;

    p.textContent = alert.message;
    selector.appendChild(p);
  }
  clearAlert() {
    const alertElement = document.querySelector(this.selector);
    alertElement.innerHTML = "";
  }
  readAlerts() {
    const sect = document.createElement("section");
    sect.classList.add("alert-list");
    document.querySelector("main").prepend(sect);
    alerts.forEach((alert) => {
      this.displayAlert(sect, alert);
    });
    console.log(alerts);
  }
}
