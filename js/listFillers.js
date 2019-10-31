function list_fill(fill_list, doc_id, class_attributes) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let span = document.createElement("span");

            span.innerHTML = elem;
            span.className += ` ${class_attributes}`;

            html_elem.appendChild(span);
            html_elem.parentNode.classList.remove("no-display");
            html_elem.classList.remove("no-display");
        }
    }
}


function element_fill(fill_elem, doc_id, class_attributes) {
    let html_elem = document.getElementById(`${doc_id}`);

    if (fill_elem !== "") {
        let span = document.createElement("span");

        span.innerHTML = fill_elem;
        span.className += ` ${class_attributes}`;

        html_elem.appendChild(span);
        html_elem.parentNode.classList.remove("no-display");
    }
}


function education_fill(fill_list, doc_id, school_class, years_class) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let span = document.createElement("span");

            span.innerHTML = elem.school;
            span.className += ` ${school_class}`;


            let years = document.createElement("span");

            years.innerHTML = elem.years;
            years.className += `${years_class}`;

            html_elem.appendChild(span);
            html_elem.appendChild(years);
            html_elem.parentNode.classList.remove("no-display");
            html_elem.classList.remove("no-display");
        }
    }
}

function language_fill(fill_list, doc_id, language_class, level_class) {
    let html_elem = document.getElementById(`${doc_id}`);
    let levels = ["basic", "independent", "proficient"];

    for (let elem of fill_list) {
        if (elem !== "") {
            let container = document.createElement("div");
            let language = document.createElement("span");

            language.innerHTML = elem.language;
            language.className += ` ${language_class}`;
            container.appendChild(language);

            let languageLevel = elem.level;

            for (let level of levels) {
                let levelSpan = document.createElement("span");

                levelSpan.innerText = level;
                levelSpan.className += `${level_class}`;

                container.appendChild(levelSpan);

                if (level === languageLevel) {
                    levelSpan.className += " secondary level-border-secondary";
                }
            }

            html_elem.appendChild(container);
            html_elem.parentNode.classList.remove("no-display");
            html_elem.classList.remove("no-display");
        }
    }
}

function project_fill(fill_list, doc_id, section_class, section_items_class) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let project = document.createElement("li");

            // create DOM top div and children
            let top = document.createElement("div");
            let position = document.createElement("div");
            let squareDeco = document.createElement("div");
            let client = document.createElement("div");

            // add classes, content and decoration element to position and client
            top.className += " li-top";
            position.innerText = elem.position;
            position.className += " li-top-left skill uppercase";
            squareDeco.className += " square";
            client.innerText = elem.client;
            client.className += " li-top-right";

            position.prepend(squareDeco);
            top.appendChild(position);
            top.appendChild(client);


            // create DOM project-info div and children
            let projectInfo = document.createElement("div");
            let period = document.createElement("div");
            let name = document.createElement("div");

            // add classes to project-info
            projectInfo.className += " project-info";

            // add classes and content to project period and name
            period.innerText = elem.period;
            period.className += " project-period";
            name.innerText = `Project: ${elem.name}`;
            name.className += " project-name skill";

            projectInfo.appendChild(period);
            projectInfo.appendChild(name);


            project.appendChild(top);
            project.appendChild(projectInfo);


            // create DOM activities, add classes and content
            if (elem.activities !== "") {
                let activities = document.createElement("div");
                let activitiesTitle = document.createElement("p");
                let activitiesSpan = document.createElement("span");

                activitiesTitle.innerText = "Activities";
                activitiesTitle.className += ` ${section_class}`;
                activitiesSpan.innerText = elem.activities;
                activitiesSpan.className += " display-block margin-bottom";

                activities.appendChild(activitiesTitle);
                activities.appendChild(activitiesSpan);
                project.appendChild(activities);
            }

            // create DOM skills, add classes and content
            project_section_fill(elem.skills, project, 'li-middle no-display',
                'Skills', section_class, section_items_class);

            // create DOM tools, add classes and content
            project_section_fill(elem.tools, project, 'li-middle no-display',
                'Tools', section_class, section_items_class);

            // create DOM industry, add classes and content
            project_section_fill(elem.industries, project, 'li-bottom no-display',
                'Business Industry', section_class, section_items_class);


            html_elem.parentNode.classList.remove("no-display");
            html_elem.appendChild(project);
        }
    }
}

function interests_fill(fill_list, doc_id, interest_class) {
    let icons = [
        {
            name: "football",
            url: "assets/football.png"
        },
        {
            name: "gaming",
            url: "assets/gaming.png"
        },
        {
            name: "ping-pong",
            url: "assets/ping-pong.png"
        },
        {
            name: "hiking",
            url: "assets/hiking.png"
        }
    ];
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let found = false;

            for (let icon of icons) {
                if (icon.name === elem.toLowerCase()) {
                    let interest = document.createElement("li");

                    interest.style.backgroundImage = `url(${icon.url})`;
                    interest.className += ` ${interest_class}`;
                    html_elem.appendChild(interest);
                    found = true;
                }
            }

            // add text if icon not available
            if (found === false) {
                let interest = document.createElement("li");

                interest.innerText = elem;
                interest.className += ` ${interest_class}`;
                html_elem.appendChild(interest);
            }
        }

        html_elem.parentNode.classList.remove("no-display");
    }
}



function project_section_fill(items, parent, container_classes, title, section_class, section_items_class) {
    if (items !== []) {
        let div = document.createElement("div");
        let paragraph = document.createElement("p");

        div.className += ` ${container_classes}`;
        paragraph.innerText = title;
        paragraph.className += ` ${section_class}`;
        div.appendChild(paragraph);
        parent.appendChild(div);

        for (let item of items) {
            if (item !== "") {
                let span = document.createElement("span");

                div.classList.remove("no-display");
                span.innerText = item;
                span.className += ` ${section_items_class}`;
                div.appendChild(span);
            }
        }
    }
}
