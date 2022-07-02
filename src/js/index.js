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

// Initialize Global timeout and interval for slide-in text
let slideInTimeoutId;
let slideInIntervalId;

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

changeslideInText();

function resetSlideInText() {
  const slideInElement = document.getElementById("slidein-text");
  if (Object.values(slideInElement.classList).includes("slidein-text")) {
    slideInElement.classList.remove("slidein-text");
  }
  document.documentElement.style.setProperty("--slidein-timer", "0s");
  slideInTimeoutId = setTimeout(() => {
    changeslideInText();
  }, 500);
}

window.addEventListener("resize", () => {
  clearTimeout(slideInTimeoutId);
  clearInterval(slideInIntervalId);
  const slideInElement = document.getElementById("slidein-text");
  slideInElement.innerText = "";
  resetSlideInText();
})

function setToggler() {
  const navigationContainer = document.querySelector(".icon-link-container");
  const navigationToggler = document.querySelector(".nav-toggler");
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

setToggler();

function setupProjectButtons() {
  const projectButtons = document.querySelectorAll(".project-type-button");
  projectButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const selectedProjectType = event.target.dataset.type;
      const fetchProjects = async (selectedProjectType) => {
        let data = await fetch("/projects/projects.json");
        let projectsObject = await data.json();
        let project = [];
        for (const projectProp in projectsObject) {
          if (projectProp === selectedProjectType) {
            project = projectsObject[projectProp];
          }
        }
        if (!project.length) {
          throw ("Project type not found");
        }
        displayProjectButtons(selectedProjectType,project)
      }
      fetchProjects(selectedProjectType);
    });
  });
}

setupProjectButtons();

function displayProject(project) {
  let projectHeader = document.querySelector(".project-information-header");
  let projectImage = document.getElementById("project-img");
  let projectGithubLink = document.querySelector(".project-github-link");
  let projectDeployedLink = document.querySelector(".project-deployed-link");
  let projectTechStack = document.querySelector(".project-tech-stack");
  let projectDescription = document.querySelector(".project-description");
  projectHeader.innerText = project.name;
  projectImage.setAttribute("class", "project-img");
  projectImage.setAttribute("src", project.screenshot);
  projectImage.setAttribute("alt", project.screenshotAlt);
  projectGithubLink.setAttribute("href", project.githubLink);
  projectGithubLink.innerText = project.githubLink;
  projectDeployedLink.setAttribute("href", project.deployedLink)
  projectDeployedLink.innerText = project.deployedLink;
  projectTechStack.innerText = "Tech Stack: " + project.techStack;
  projectDescription.innerText = project.description;
}

function displayProjectButtons(projectType, projects) {
  let buttonContainer = document.querySelector(".project-buttons-container");
  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }
  projects.forEach(project => {
    buttonContainer.removeChild
    let button = document.createElement("button");
    button.innerHTML = project.name;
    button.setAttribute("class", `project-type-button ${projectType}`);
    button.addEventListener("click", () => {
      displayProject(project);
    });
    buttonContainer.append(button);
  })
}