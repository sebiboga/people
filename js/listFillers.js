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
        html_elem.classList.remove("no-display");
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

            // create DOM project-info div and children
            let projectInfo = document.createElement("div");
            let period = document.createElement("div");
            let name = document.createElement("div");

            // create DOM skills div and children
            let skills = document.createElement("div");
            let skillsTitle = document.createElement("p");


            // create DOM tools div and children
            let tools = document.createElement("div");
            let toolsTitle = document.createElement("p");

            // create DOM industry div and children
            let industry = document.createElement("div");
            let industryTitle = document.createElement("p");

            // create DOM activities div and children
            let activities = document.createElement("div");
            let activitiesTitle = document.createElement("p");


            top.appendChild(position);
            top.appendChild(client);

            skills.appendChild(skillsTitle);
            tools.appendChild(toolsTitle);
            industry.appendChild(industryTitle);
            activities.appendChild(activitiesTitle);

            projectInfo.appendChild(period);
            projectInfo.appendChild(name);
            project.appendChild(top);
            project.appendChild(projectInfo);
            project.appendChild(activities);
            project.appendChild(skills);
            project.appendChild(tools);
            project.appendChild(industry);
            

            // add position classes, content and decoration element
            top.className += " li-top";
            position.innerText = elem.position;
            position.prepend(squareDeco);
            position.className += " li-top-left skill uppercase";
            squareDeco.className += " square";

            // add client classes and content
            client.innerText = elem.client;
            client.className += " li-top-right";

            // add project-info classes
            projectInfo.className += " project-info";

            // add period classes and content
            period.innerText = elem.period;
            period.className += " project-period";

            // add project name classes and content
            name.innerText = `Project: ${elem.name}`;
            name.className += " project-name skill";


            // add skills section classes
            skills.className += " li-middle no-display";

            // add skill title content and classes
            skillsTitle.innerText = "Skills";
            skillsTitle.className += ` ${section_class}`;

            // add skills and classes
            for (let skill of elem.skills) {
                if (skill !== "") {
                    let skillsSpan = document.createElement("span");

                    skills.classList.remove("no-display");
                    skillsSpan.innerText = skill;
                    skillsSpan.className += ` ${section_items_class}`;
                    skills.appendChild(skillsSpan);
                }
            }


            // add tools section classes
            tools.className += " li-middle no-display";

            // add tools title content and classes
            toolsTitle.innerText = "Tools";
            toolsTitle.className += ` ${section_class}`;

            // add tools and classes
            for (let tool of elem.tools) {
                if (tool !== "") {
                    let toolsSpan = document.createElement("span");

                    tools.classList.remove("no-display");
                    toolsSpan.innerText = tool;
                    toolsSpan.className += ` ${section_items_class}`;
                    tools.appendChild(toolsSpan);
                }
            }


            // add industry section classes
            industry.className += " li-middle no-display";

            // add industry title content and classes
            industryTitle.innerText = "Business Industry";
            industryTitle.className += ` ${section_class}`;

            // add industry and classes
            for (let industryField of elem.industries) {
                if (industryField !== "") {
                    let industrySpan = document.createElement("span");

                    industry.classList.remove("no-display");
                    industrySpan.innerText = industryField;
                    industrySpan.className += ` ${section_items_class}`;
                    industry.appendChild(industrySpan);
                }
            }


            // add activities section classes
            activities.className += " li-middle no-display";

            // add activities title content and classes
            activitiesTitle.innerText = "Activities";
            activitiesTitle.className += ` ${section_class}`;

            // add activities content and classes
            if (elem.activities !== "") {
                let activitiesSpan = document.createElement("span");

                activitiesSpan.innerText = elem.activities;
                activitiesSpan.className += " display-block margin-bottom";
                activities.classList.remove("no-display");
                activities.appendChild(activitiesSpan);
            }


            html_elem.parentNode.classList.remove("no-display");
            html_elem.appendChild(project);
        }
    }
}

function education_fill(fill_list, doc_id, school_class, years_class) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let span = document.createElement("span");
            span.innerHTML = elem.school;
            span.className += ` ${school_class}`;
            span.style = "display: block";

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