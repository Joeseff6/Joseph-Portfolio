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

function changeslideInText() {
  const textArray = [
    "A Front End Developer",
    "A professional worker",
    "A team player",
    "A fast and efficient learner",
    "A positive spirited individual",
    "A problem solver",
    "A great fit for any company!",
  ];
  const slideInElement = document.getElementById("slidein-text");
  const delay = slideInElement.dataset.timer;
  document.documentElement.style.setProperty("--slidein-timer", delay);
  const intervalDelay = Number(delay.replace("s","")) * 1000;
  let i = 0;
  slideInElement.innerHTML = textArray[i];
  slideInElement.classList.add("slidein-text");
  setInterval(() => {
    i++;
    if (i === textArray.length) i = 0;
    slideInElement.innerText = textArray[i];
  }, intervalDelay);
}

changeslideInText();