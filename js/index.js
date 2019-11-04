// function wrapper - get all necessary data
function getData() {
    getName();
    getTitle();
    getDepartment();
    getLocation();
    getPhysicalOffice();
    getDesk();
    getSkillsAndTools();
    getTechniques();
    getEducation();
    getCertifications();
    getLanguages();
    getProjects();
    getSummary();
    getEmployeeDuration();
    getExpertise();
    getDomainKnowledge();
    getInterests();
}

getData();



function getName() {
    sendRequest('full-name', 'http://whoami/api/getfullname', 'name');
}

function getTitle() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=features&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    let finalString = res.response.docs[0].features[0].toString() + ' ';

                    finalString = finalString[0].toUpperCase() + finalString.slice(1);
                    document.getElementById('title').innerHTML = finalString;
                });

            sendRequest('title', 'http://whoami/api/gettitle', 'title');
        });
    });
}


function getDepartment() {
    sendRequest('department', 'http://whoami/api/getdepartment', 'department');
}

function getLocation() {
    sendRequest('location', 'http://whoami/api/getlocation', 'l');
}

function getPhysicalOffice() {
    sendRequest('office', 'http://whoami/api/getphysicaloffice', 'PhysicalOffice');
}

function getDesk() {
    sendRequest('desk', 'http://whoami/api/getphysicaloffice', 'Location');
}


function getSkillsAndTools() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=skills%2C%20tools&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const skills = res.response.docs[0].skills;
                    const tools = res.response.docs[0].tools;

                    list_fill(skills,'skills-list', 'secondary skill uppercase border-secondary display-inline');
                    list_fill(tools,'tools-list', 'secondary skill uppercase border-secondary display-inline');
                });
        });
    });
}

function getTechniques() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=sdlc&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const techniques = res.response.docs[0].sdlc;

                    list_fill(techniques, 'techniques-list', 'primary skill uppercase display-block');
                });
        });
    });

}


function getEducation() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=education&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const education = res.response.docs[0].education;

                    education_fill(education,'education-list', 'primary skill uppercase school-elem display-block',
                    'year-elem');
            });
        });
    });
}

function getCertifications() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=certification&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const certifications = res.response.docs[0].certification;

                    list_fill(certifications,'certifications-list', 'primary skill uppercase');
            });
        });
    });
}

function getLanguages() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=language&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const languages = res.response.docs[0].language;

                    language_fill(languages,'languages-list','language', 'level level-border-primary');
            });
        });
    });
}


function getProjects() {
    // TODO get info from server when development done
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json', res => {
        project_fill(res.response.docs[0].projects,'projects-list', 'section-subtitle',
            'primary skill uppercase border-primary-small display-inline margin-bottom');
    });
}



function getSummary() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=summary_t&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const summary = res.response.docs[0].summary_t;

                    summary_fill(summary,'summary-container');
            });
        });
    });
}

function getEmployeeDuration() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const response = this.responseText;
            let finalString = '';
            const years = Number(JSON.parse(response)['years']);

            if (years !== 0 && years > 1) {
                finalString += `${years} YEARS `;
            } else if (years !== 0) {
                finalString += `${years} YEAR `;
            }

            const months = Number(JSON.parse(response)['months']);

            if (months !== 0 && months > 1) {
                finalString += `${months} MONTHS`;
            } else if (months !== 0) {
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


function getExpertise() {
    // TODO get info from server when development done
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json', res => {
        list_fill(res.response.docs[0].expertise,'expertise-list',
            'primary skill uppercase border-primary');
    });

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
}

function getDomainKnowledge() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?fl=industry&q=${result.samaccountname}&omitHeaders=true`)
                .then(res => res.json())
                .then(res => {
                    const domains = res.response.docs[0].industry;

                    list_fill(domains, 'domain-knowledge-list', 'primary skill uppercase display-block');
                });
        });
    });

}


function getInterests() {
    // TODO get info from server when development done
    $.getJSON('dumbDataPleaseDontModify/dumbdata.json', res => {
        interests_fill(res.response.docs[0].interests,'interests-list', 'interest-item');
    });
}



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
