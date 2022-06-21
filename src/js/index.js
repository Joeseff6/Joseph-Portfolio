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

function changeDropInText() {
  const textArray = [
    "A Front End Developer",
    "A professional worker",
    "A team player",
    "A fast and efficient learner",
    "A positive spirited individual",
    "A graduate in Mechanical Engineering",
    "A great fit for any company!",
  ];
  const dropInElement = document.getElementById("dropin-text");
  const delay = dropInElement.dataset.timer;
  document.documentElement.style.setProperty("--dropin-timer", delay);
  const intervalDelay = Number(delay.replace("s","")) * 1000;
  let i = 0;
  dropInElement.innerHTML = textArray[i];
  dropInElement.classList.add("dropin-text");
  setInterval(() => {
    i++;
    if (i === textArray.length) i = 0;
    dropInElement.innerText = textArray[i];
  }, intervalDelay);
}

changeDropInText();