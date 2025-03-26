import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, updateBreadcrumb, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);

loadHeaderFooter();
productList.init();
updateBreadcrumb();
updateCartCount();