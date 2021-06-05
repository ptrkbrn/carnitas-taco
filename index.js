        const pages = document.getElementsByClassName("page");

        // handles navigation between pages
        function changePage(e) {
            const selectedPage = e.value;
            const btnArray = Array.from(document.getElementsByClassName('nav-btn'));
            btnArray.map(button => button.classList.remove('selected'));
            e.classList.add('selected')
            // document.getElementById(selectedPage).classList.add('fadeIn');
            Array.from(pages).map(page => page.classList.add('hidden'));
            document.getElementById(selectedPage).classList.remove('hidden');
            // document.getElementById(selectedPage).classList.add('fadeIn');

            let stateData = { selectedPage };

            // adds page navigation to browser history
            history.pushState(stateData, '', `/${selectedPage}`);;
        };

        // allows navigation back
        window.onpopstate = function(e) {
            console.log(e)
            const lastPage = document.body.querySelector(`button[value='${e.state.selectedPage}']`)
            if (e.state != null) {
                changePage(lastPage);
            }
        }

        // toggles dark mode
        setTheme = (theme) => {
            let darkMode = theme;
            if (darkMode) {
                Array.from(document.querySelectorAll("*")).map(el => el.classList.add('darkMode'));
                Array.from(document.querySelectorAll("*")).map(el => el.classList.remove('lightMode'));
                // toggles which button is selected
                document.getElementById('dark-mode-btn').classList.add('selected');
                document.getElementById('light-mode-btn').classList.remove('selected');
                document.querySelector('img').style.borderColor = "white";

            } else {
                Array.from(document.querySelectorAll("*")).map(el => el.classList.add('lightMode'));
                Array.from(document.querySelectorAll("*")).map(el => el.classList.remove('darkMode'));
                // toggles which button is selected
                document.getElementById('light-mode-btn').classList.add('selected');
                document.getElementById('dark-mode-btn').classList.remove('selected');      
                document.querySelector('img').style.borderColor = "black";           
            }
            return;
        }


        window.onload = function() {            
            // shortens full project text to preview length, trims extraneous whitespace, and appends an ellipses
            function getPreview(text) {
                return text.slice(0, 100).trim() + "...";
            }

            // generates project tile element for each object in the projects array
            projects.map(project => {
                let preview = getPreview(project.description);
                let projectTile = document.createElement('div');
                let header = document.createElement('div');
                let title = document.createElement('h3');
                let hr = document.createElement('hr');
                let description = document.createElement('div');
                let projectText = document.createElement('p');
                let button = document.createElement('button');
                let footer = document.createElement('footer');
                let demoLink = document.createElement('a');
                let codeLink = document.createElement('a');
                title.innerText = project.title;
                projectTile.setAttribute('class', 'project-tile');
                header.setAttribute('class', 'project-header');
                description.setAttribute('class', "project-description");
                projectText.setAttribute('class', 'project-text');
                projectText.innerText = preview;
                button.setAttribute('class', 'toggle-text');
                button.setAttribute('onclick', 'showMore(this)');
                button.innerText = "Show more";
                demoLink.innerText = "See it";
                codeLink.innerText = "GitHub";
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
                footer.append(" | ");
                footer.append(codeLink);

                // appends each project tile to the content element
                document.querySelector('.content').append(projectTile);
            });

            // handles expanding/collapsing project tile description text
            showMore = (e) => {
                let currentProject = projects.filter(project => project.title === e.parentElement.children[0].children[0].innerText);
                currentProject = currentProject[0];
                let displayedText = e.parentElement.children[1].children[0];
                // if preview text is displayed, toggle to full text
                if (displayedText.innerText === getPreview(currentProject.description)) {
                    displayedText.innerText = currentProject.description;
                    e.innerText = "Show less";
                    return;
                // otherwise, toggle to preview text
                } else {
                    displayedText.innerText = getPreview(currentProject.description);
                    e.innerText = "Show more";
                    return;
                }
            }
            // sets inital page theme based on browser preferences
            // setTheme(false);
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

        }