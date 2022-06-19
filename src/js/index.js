const fullPage = new fullpage("#fullpage-wrapper", {
  licenseKey: "gplv3-license",
  anchors: ['about-me', 'projects', 'contact-me'],
  loopTop: true,
  loopBottom: true,
  verticalCentered: false,
  recordHistory: false,
  menu: "#link-menu",
  navigation: true,
  navigationPosition: "left",
  navigationTooltips: ['about-me', 'projects', 'contact-me'],
  showNavigationTooltips: true,
});

function calculateTopMargin() {
  let navHeight = document.getElementById("link-menu").clientHeight;
  document.querySelector("body").style.setProperty("margin-top", `${navHeight}px`)
}

calculateTopMargin();