function fill(fill_list,doc_id){
    let html_elem = document.getElementById(`${doc_id}`);

    for(let elem of fill_list){
        console.log(elem);
        let span = document.createElement("span");
        span.innerHTML = elem;
        span.className += " secondary skill uppercase border-secondary";

        html_elem.appendChild(span);
    }
}

function callFills(skills_list, tools_list){
    fill(skills_list,"skills-list");
    fill(tools_list,"tools-list");
}