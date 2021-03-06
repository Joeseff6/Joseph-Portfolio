import changeslideInText  from "./slideInText.js";
import setToggler from "./navToggler.js";
import setupProjectButtons from "./displayProjects.js";

function calculateTopMargin() {
  const navHeight = document.querySelector("nav").clientHeight;
  document.querySelector("body").style.setProperty("margin-top", `${navHeight}px`);
}

setTimeout(() => {
  calculateTopMargin();
}, 50)

changeslideInText();
setToggler();
setupProjectButtons();