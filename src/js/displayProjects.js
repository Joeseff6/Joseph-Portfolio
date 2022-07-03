// Import projects to be displayed
import projectsObject from "./projects.js";
let popInTimeoutId;

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
      displayProjectButtons(selectedProjectType, projects);
    });
  });
}

// Functions to actually display project upon project button click
function displayProjectButtons(projectType, projects) {
  let buttonContainer = document.querySelector(".project-buttons-container");
  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }
  projects.forEach((project) => {
    buttonContainer.removeChild;
    let button = document.createElement("button");
    button.innerHTML = project.name;
    button.setAttribute("class", `project-type-button ${projectType}`);
    button.addEventListener("click", () => {
      console.log(project)
      projectPopIn(project);
    });
    buttonContainer.append(button);
  });
}

function projectPopIn(project) {
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



