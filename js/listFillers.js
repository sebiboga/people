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


function project_fill(fill_list, doc_id, section_class) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let project = document.createElement("li");

            let top = document.createElement("div");
            let position = document.createElement("div");
            let squareDeco = document.createElement("div");
            let client = document.createElement("div");

            let projectInfo = document.createElement("div");
            let period = document.createElement("div");
            let name = document.createElement("div");

            let skills = document.createElement("div");
            let skillTitle = document.createElement("p");
            let skillsSpan = document.createElement("span");

            let tools = document.createElement("div");
            let toolsTitle = document.createElement("p");
            let toolsSpan = document.createElement("span");

            let industry = document.createElement("div");
            let industryTitle = document.createElement("p");
            let industrySpan = document.createElement("span");

            let activities = document.createElement("div");
            let activitiesTitle = document.createElement("p");
            let activitiesSpan = document.createElement("span");

            position.appendChild(squareDeco);
            top.appendChild(position, client);

            skills.appendChild(skillTitle, skillsSpan);
            tools.appendChild(toolsTitle, toolsSpan);
            industry.appendChild(industryTitle, industrySpan);
            activities.appendChild(activitiesTitle, activitiesSpan);

            projectInfo.appendChild(period, name);
            project.appendChild(top, projectInfo, skills, tools, industry, activities);


            position.innerText = elem.position;
            console.log(elem);

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