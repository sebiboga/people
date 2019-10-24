function fill(fill_list,doc_id){
    let html_list = document.getElementById(`${doc_id}`);

    for(let elem of fill_list){
        console.log(elem);
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = elem;

        li.appendChild(a);
        html_list.appendChild(li);
    }
}

function callFills(skills_list, tools_list){
    fill(skills_list,"skill-list");
    fill(tools_list,"tools-list");
}