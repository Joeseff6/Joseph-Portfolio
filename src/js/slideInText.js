// Initialize Global timeout and interval for slide-in text
let slideInIntervalId;

// Main slide-in text function. Export to main JS file.
export default function changeslideInText() {
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
  const intervalDelay = parseInt(delay) * 1000;
  let i = 0;
  slideInElement.innerHTML = textArray[i];
  slideInElement.classList.add("slidein-text");
  slideInIntervalId = setInterval(() => {
    i++;
    if (i === textArray.length) i = 0;
    slideInElement.innerText = textArray[i];
  }, intervalDelay);
}