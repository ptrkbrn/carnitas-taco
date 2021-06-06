const pages = document.getElementsByClassName('page');

// handles navigation between pages
function changePage(selectedPage, back) {
  const btnArray = Array.from(document.getElementsByClassName('nav-btn'));
  const selectedBtn = document.querySelector(`button[value='${selectedPage}']`);
  btnArray.map((button) => button.classList.remove('selected'));
  Array.from(pages).map((page) => page.classList.add('hidden'));
  if (selectedBtn) {
    selectedBtn.classList.add('selected');
    document.getElementById(selectedPage).classList.remove('hidden');
  } else {
    document.getElementById('landing').classList.remove('hidden');
  }
  // document.getElementById(selectedPage).classList.add('fadeIn');
  // document.getElementById(selectedPage).classList.add('fadeIn');

  const stateData = { selectedPage };

  // if the function isn't triggered by the back button
  if (!back) {
    // adds page navigation to browser history
    history.pushState(stateData, '', `/${selectedPage}`);
  }
}

// allows navigation back
window.onpopstate = function (e) {
  console.log(e);
  if (e.state != null) {
    const lastPage = document.body.querySelector(`button[value='${e.state.selectedPage}']`);
    changePage(lastPage, true);
  }
};

// toggles dark mode
const setTheme = (theme) => {
  const darkMode = theme;
  if (darkMode) {
    Array.from(document.querySelectorAll('*')).map((el) => el.classList.add('darkMode'));
    Array.from(document.querySelectorAll('*')).map((el) => el.classList.remove('lightMode'));
    // toggles which button is selected
    document.getElementById('dark-mode-btn').classList.add('selected');
    document.getElementById('light-mode-btn').classList.remove('selected');
    document.querySelector('img').style.borderColor = 'white';
  } else {
    Array.from(document.querySelectorAll('*')).map((el) => el.classList.add('lightMode'));
    Array.from(document.querySelectorAll('*')).map((el) => el.classList.remove('darkMode'));
    // toggles which button is selected
    document.getElementById('light-mode-btn').classList.add('selected');
    document.getElementById('dark-mode-btn').classList.remove('selected');
    document.querySelector('img').style.borderColor = 'black';
  }
};

// shortens project text to preview length, trims extraneous whitespace, and appends an ellipses
function getPreview(text) {
  return `${text.slice(0, 100).trim()}...`;
}

// handles expanding/collapsing project tile description text
function showMore(e) {
  let currentProject = projects.filter(
    (project) => project.title === e.parentElement.children[0].children[0].innerText,
  );
  [currentProject] = currentProject;
  const displayedText = e.parentElement.children[1].children[0];
  // if preview text is displayed, toggle to full text
  if (displayedText.innerText === getPreview(currentProject.description)) {
    displayedText.innerText = currentProject.description;
    e.innerText = 'Show less';
    // otherwise, toggle to preview text
  } else {
    displayedText.innerText = getPreview(currentProject.description);
    e.innerText = 'Show more';
  }
}

window.onload = function () {
  // generates project tile element for each object in the projects array
  projects.forEach((project) => {
    const preview = getPreview(project.description);
    const projectTile = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('h3');
    const hr = document.createElement('hr');
    const description = document.createElement('div');
    const projectText = document.createElement('p');
    const button = document.createElement('button');
    const footer = document.createElement('footer');
    const demoLink = document.createElement('a');
    const codeLink = document.createElement('a');
    title.innerText = project.title;
    projectTile.setAttribute('class', 'project-tile');
    header.setAttribute('class', 'project-header');
    description.setAttribute('class', 'project-description');
    projectText.setAttribute('class', 'project-text');
    projectText.innerText = preview;
    button.setAttribute('class', 'toggle-text');
    button.setAttribute('onclick', 'showMore(this)');
    button.innerText = 'Show more';
    demoLink.innerText = 'See it';
    codeLink.innerText = 'GitHub';
    demoLink.setAttribute('href', project.liveLink);
    codeLink.setAttribute('href', project.codeLink);

    projectTile.append(header);
    header.append(title);
    projectTile.append(hr);
    projectTile.append(description);
    description.append(projectText);
    projectTile.append(button);
    projectTile.append(footer);
    projectTile.append(hr);
    footer.append(demoLink);
    footer.append(' | ');
    footer.append(codeLink);

    // appends each project tile to the content element
    document.querySelector('.content').append(projectTile);
  });

  // sets inital page theme based on browser preferences
  // setTheme(false);
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

  setTimeout(() => { Array.from(document.querySelectorAll('*')).map((el) => el.classList.add('fadeIn')); }, 500);
};
