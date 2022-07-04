// Import projects to be displayed
import projectsObject from "./projects.js";
let popInTimeoutId, slideInTimeoutId, currentProjectType, currentProjectName;


// Main display projects function. Export to main JS file.
export default function setupProjectButtons() {
  const projectButtons = document.querySelectorAll(".project-type-button");
  projectButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let projects = [];
      const selectedProjectType = event.target.dataset.type;
      for (const projectTypeProp in projectsObject) {
        if (projectTypeProp === selectedProjectType) {
          projects = projectsObject[projectTypeProp];
        }
      }
      if (!projects.length) {
        throw "Project type not found";
      }
      projectTypesSlideIn(selectedProjectType, projects);
    });
  });
}

// Functions to actually display project upon project button click
function displayProjectButtons(projectType, projects) {
  let slideInContainer = document.querySelector(".slideIn-container");
  while (slideInContainer.firstChild) {
    slideInContainer.removeChild(slideInContainer.firstChild);
  }
  projects.forEach((project) => {
    let button = document.createElement("button");
    button.innerHTML = project.name;
    button.setAttribute("class", `project-type-button ${projectType}`);
    button.addEventListener("click", () => {
      projectPopIn(project);
    });
    slideInContainer.append(button);
  });
}

function projectTypesSlideIn(projectType, projects) {
  if (currentProjectType === projectType) return;
  currentProjectType = projectType;
  let slideInContainer = document.querySelector(".slideIn-container");
  let slideInContainerClassArray = Array(...slideInContainer.classList);
  if (
    !slideInContainerClassArray.includes("slide-in") &&
    !slideInContainerClassArray.includes("slide-out")
  ) {
    displayProjectButtons(projectType, projects);
    slideInContainer.classList.add("slide-in");
  } else if (slideInContainerClassArray.includes("slide-in")) {
    clearTimeout(slideInTimeoutId);
    slideInContainer.classList.remove("slide-in");
    slideInContainer.classList.add("slide-out");
    slideInTimeoutId = setTimeout(() => {
      slideInContainer.classList.remove("slide-out");
      displayProjectButtons(projectType, projects);
      slideInContainer.classList.add("slide-in");
    }, 1000);
  }
}

function projectPopIn(project) {
  if (currentProjectName === project.name) return;
  currentProjectName = project.name;
  let popInContainer = document.querySelector(".popIn-container");
  let popInContainerClassesArray = Array(...popInContainer.classList);
  if (
    !popInContainerClassesArray.includes("pop-in") &&
    !popInContainerClassesArray.includes("pop-out")
  ) {
    displayProject(project);
    popInContainer.classList.add("pop-in");
  } else if (popInContainerClassesArray.includes("pop-in")) {
    clearTimeout(popInTimeoutId);
    popInContainer.classList.remove("pop-in");
    popInContainer.classList.add("pop-out");
    popInTimeoutId = setTimeout(() => {
      displayProject(project);
      popInContainer.classList.add("pop-in");
      popInContainer.classList.remove("pop-out");
    }, 1000);
  }
}

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
  projectGithubLink.innerText = "Github Link";
  projectDeployedLink.removeAttribute("href");
  if (!project.deployedLink) {
    projectDeployedLink.innerText = "Deployment link unavailable";
  } else {
    projectDeployedLink.setAttribute("href", project.deployedLink);
    projectDeployedLink.innerText = "Deployed Link";
  }
  projectTechStack.innerText = "Tech Stack: " + project.techStack;
  projectDescription.innerText = project.description;
}



