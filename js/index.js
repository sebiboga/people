function sendRequest(elementId, url, prop) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const text = JSON.parse(this.responseText)[prop];

            if (text !== undefined) {
                document.getElementById(elementId).innerHTML += text;
            }
        }
    };
    xhr.open('GET', url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
}

function getName() {
    sendRequest('full-name', 'http://whoami/api/getfullname', 'name');
}

function getLocation() {
    sendRequest('location', 'http://whoami/api/getlocation', 'l');
}

function getDepartment() {
    sendRequest('department', 'http://whoami/api/getdepartment', 'department');
}

function getTitle() {
    $(document).ready(function () {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(function (result) {
            fetch(`http://people:8983/solr/skills/select?fl=features&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
                return res.json();
            }).then((res) => {
                let finalString = res.response.docs[0].features[0].toString() + ' ';
                finalString = finalString[0].toUpperCase() + finalString.slice(1);
                document.getElementById('title').innerHTML = finalString;
            });
            sendRequest('title', 'http://whoami/api/gettitle', 'title');
        });
    });
}

function getPhysicalOffice() {
    sendRequest('office', 'http://whoami/api/getphysicaloffice', 'PhysicalOffice');
}

function getDesk() {
    sendRequest('desk', 'http://whoami/api/getphysicaloffice', 'Location');
}

function getData() {
    getName();
    getLocation();
    getDepartment();
    getTitle();
    getPhysicalOffice();
    getIdentity();
    getDesk();
    getSkillsAndTools();
    getCertifications();
    getSummary();
    getExpertise();
    getInterests();
    getEducation();
    getDomainKnowledge();
    getTeckniques();
}

getData();

function getIdentity() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = this.responseText;
            let finalString = '';

            let years = Number(JSON.parse(response)['years']);
            if(years !== 0 && years > 1){
                finalString += `${years} YEARS `;
            }
            else if (years !== 0){
                finalString += `${years} YEAR `;
            }

            let months = Number(JSON.parse(response)['months']);
            if(months !== 0 && months > 1){
                finalString += `${months} MONTHS`;
            }
            else if (months !== 0){
                finalString += `${months} MONTH`;
            }

            document.getElementById('duration').innerHTML = finalString;
        }
    };
    xhr.open('GET', 'http://whoami/api/getemploymenttime');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
}

function getSkillsAndTools() {
    let skills;
    let tools;
    $(document).ready(function () {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(function (result) {
            fetch(`http://people:8983/solr/skills/select?fl=skills%2C%20tools&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
                return res.json();
            }).then((res) => {
                skills = res.response.docs[0].skills;
                tools = res.response.docs[0].tools;

                list_fill(skills,'skills-list', "secondary skill uppercase border-secondary");
                list_fill(tools,'tools-list', "secondary skill uppercase border-secondary");
                // callFills(skills,tools);
            });
        });
    });
}

function getDomainKnowledge() {
    let dom;
    $(document).ready(function () {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(function (result) {
            fetch(`http://people:8983/solr/skills/select?fl=industry&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
                return res.json();
            }).then((res) => {
                dom=res.response.docs[0].industry;

                list_fill(dom, 'domain-knowledge-list', 'primary skill uppercase display-block')
            });
        });
    });

}

function getTeckniques() {
    let tech;
    $(document).ready(function () {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(function (result) {
            fetch(`http://people:8983/solr/skills/select?fl=sdlc&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
                return res.json();
            }).then((res) => {
                tech=res.response.docs[0].sdlc;

                list_fill(tech, 'techniques-list', 'primary skill uppercase display-block')
            });
        });
    });

}
function getCertifications() {
    let certifications;
    $(document).ready(function () {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(function (result) {
            fetch(`http://people:8983/solr/skills/select?fl=certification&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
                return res.json();
            }).then((res) => {
                certifications = res.response.docs[0].certification;

                list_fill(certifications,"certifications-list", "primary skill uppercase");
            });
        });
    });
}

function getSummary() {
    // let summary;
    // $(document).ready(function () {
    //     $.ajax({
    //         url: 'http://whoami/api/GetIdentity',
    //         type: 'GET',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }).done(function (result) {
    //         fetch(`http://people:8983/solr/skills/select?fl=summary&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
    //             return res.json();
    //         }).then((res) => {
    //             summary = res.response.docs[0].summary;
    //
    //             fill_secondary(summary,"summary-container");
    //         });
    //     });
    // });
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json',(res)=>{
        element_fill(res.response.docs[0].summary,"summary-container", "");
    });
}

function getExpertise(){
    // let expertises;
    // $(document).ready(function () {
    //     $.ajax({
    //         url: 'http://whoami/api/GetIdentity',
    //         type: 'GET',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }).done(function (result) {
    //         fetch(`http://people:8983/solr/skills/select?fl=expertise&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
    //             return res.json();
    //         }).then((res) => {
    //             expertises = res.response.docs[0].expertise;
    //
    //             //call function that fills the expertises list with the expertises
    //         });
    //     });
    // });
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json',(res)=>{
        list_fill(res.response.docs[0].expertise,"expertise-list", "skill uppercase border-primary");
    });
}

function getInterests(){
    // let interests;
    // $(document).ready(function () {
    //     $.ajax({
    //         url: 'http://whoami/api/GetIdentity',
    //         type: 'GET',
    //         xhrFields: {
    //             withCredentials: true
    //         }
    //     }).done(function (result) {
    //         fetch(`http://people:8983/solr/skills/select?fl=interests&q=${result.samaccountname}&omitHeaders=true`).then((res) => {
    //             return res.json();
    //         }).then((res) => {
    //             interests = res.response.docs[0].interests;
    //
    //             //call function that fills the interests list with the interests
    //         });
    //     });
    // });
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json',(res)=>{
        list_fill(res.response.docs[0].interests,"interest-list", "");
    });
}

function getEducation() {
    //
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json',(res)=>{
        education_fill(res.response.docs[0].education,"qualifications-list","primary skill uppercase", "");
    });
}


