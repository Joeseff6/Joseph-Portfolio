export default function setToggler() {
  const navigationContainer = document.querySelector(".icon-link-container");
  const navigationToggler = document.querySelector(".icon-link-toggler");
  navigationToggler.addEventListener("click", () => {
    const visibility = navigationContainer.getAttribute("data-visible");
    if (visibility === "false") {
      navigationContainer.setAttribute("data-visible", "true");
      navigationToggler.setAttribute("aria-expanded", "true");
      document.querySelector('i[class~="closed"]').style.setProperty("display","none");
      document.querySelector('i[class~="open"]').style.setProperty("display","block");
    } else {
      navigationContainer.setAttribute("data-visible", "false");
      navigationToggler.setAttribute("aria-expanded", "false");
      document.querySelector('i[class~="closed"]').style.setProperty("display","block");
      document.querySelector('i[class~="open"]').style.setProperty("display","none");
    }
  })
}