function fill(fill_list, doc_id) {
    let html_elem = document.getElementById(`${doc_id}`);

    for (let elem of fill_list) {
        if (elem !== "") {
            let span = document.createElement("span");
            span.innerHTML = elem;
            span.className += " secondary skill uppercase border-secondary";

            html_elem.appendChild(span);
            html_elem.parentNode.classList.remove("no-display");
            html_elem.classList.remove("no-display");
        }
    }
}

function callFills(skills_list, tools_list) {
    fill(skills_list,"skills-list");
    fill(tools_list,"tools-list");
}