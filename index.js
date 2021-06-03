        const pages = document.getElementsByClassName("page");

        // handles navigation between pages
        function changePage(e) {
            const selectedPage = e.value;
            const btnArray = Array.from(document.getElementsByClassName('nav-btn'));
            btnArray.map(button => button.classList.remove('selected'));
            e.classList.add('selected')
            document.getElementById(selectedPage).classList.add('fadeIn');
            Array.from(pages).map(page => page.classList.add('hidden'));
            document.getElementById(selectedPage).classList.remove('hidden');
            document.getElementById(selectedPage).classList.add('fadeIn');
        };


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
                let link = document.createElement('a');
                title.innerText = project.title;
                projectTile.setAttribute('class', 'project-tile');
                header.setAttribute('class', 'project-header');
                description.setAttribute('class', "project-description");
                projectText.setAttribute('class', 'project-text');
                projectText.innerText = preview;
                button.setAttribute('class', 'toggle-text');
                button.setAttribute('onclick', 'showMore(this)');
                button.innerText = "Show more";
                link.setAttribute('href', project.liveLink);
                link.innerText = "See it";

                projectTile.append(header);
                header.append(title);
                projectTile.append(hr);
                projectTile.append(description);
                description.append(projectText);
                projectTile.append(button);
                projectTile.append(footer);
                projectTile.append(hr);
                footer.append(link);

                // appends each project tile to the content element
                document.querySelector('.content').append(projectTile);

                // let projectTile = document.createElement(
                //         `<div class="project-header">
                //             <h3>${project.title}</h3>
                //         </div>
                //         <hr></hr>
                //         <div class="project-description">
                //             <p class="project-text">${preview}</p>
                //             <button class="toggle-text" onclick="showMore(this)">Show more</button>
                //         </div>
                //         <hr></hr>
                //         <footer><a href="https://codepen.io/ptrkbrn/pen/mNwLqG" target="_blank">Frasier Docs Page</a></footer>
                //     </div>`
                // )
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
        }