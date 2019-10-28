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

function projects_fill(fill_list) {
    let html_elem = document.getElementById("projects-list");

    for (let elem of fill_list) {
        if (fill_elem !== "") {
            let li = document.createElement("li");
            let li_wrapper = document.createElement("div");
            let li_top = document.createElement("div");
            let li_top_left = document.createElement("div");
            let li_top_middle = document.createElement("div");
            let li_top_right = document.createElement("div");
            let li_middle = document.createElement("div");
            let li_bottom = document.createElement("div");


            html_elem.appendChild(li);
            html_elem.parentNode.classList.remove("no-display");
            html_elem.classList.remove("no-display");

            li.appendChild(li_wrapper);
            li_wrapper.appendChild(li_top);
            li_wrapper.appendChild(li_middle);
            li_wrapper.appendChild(li_bottom);

            li_top.append(li_top_left);
            li_top.append(li_top_middle);
            li_top.append(li_top_right);
        }
    }
}