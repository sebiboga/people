// function wrapper - get all necessary data
function getData() {
    getPersonalInfo();
    getTitle();
    getProfessionalInfo();
    getProjects();
    getEmployeeDuration();
    getInterests();
}

getData();


function getPersonalInfo() {
    sendRequest('full-name', 'http://whoami/api/getfullname', 'name');
    sendRequest('department', 'http://whoami/api/getdepartment', 'department');
    sendRequest('location', 'http://whoami/api/getlocation', 'l');
    sendRequest('office', 'http://whoami/api/getphysicaloffice', 'PhysicalOffice');
    sendRequest('desk', 'http://whoami/api/getphysicaloffice', 'Location');
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

function getProfessionalInfo() {
    $(document).ready(() => {
        $.ajax({
            url: 'http://whoami/api/GetIdentity',
            type: 'GET',
            xhrFields: {
                withCredentials: true
            }
        }).done(result => {
            fetch(`http://people:8983/solr/skills/select?q=${result.samaccountname}`)
                .then(res => res.json())
                .then(res => {
                    list_fill(res.response.docs[0].skills,'skills-list',
                        'secondary skill uppercase border-secondary display-inline');

                    list_fill(res.response.docs[0].tools,'tools-list',
                        'secondary skill uppercase border-secondary display-inline');

                    list_fill(res.response.docs[0].sdlc, 'techniques-list',
                        'primary skill uppercase display-block');

                    education_fill(res.response.docs[0].education,'education-list',
                        'primary skill uppercase school-elem display-block', 'year-elem');

                    list_fill(res.response.docs[0].certification,'certifications-list',
                        'primary skill uppercase');

                    language_fill(res.response.docs[0].language,'languages-list','language',
                        'level level-border-primary');

                    summary_fill(res.response.docs[0].summary_t,'summary-container');

                    list_fill(res.response.docs[0].expertise,'expertise-list',
                        'primary skill uppercase border-primary');

                    list_fill(res.response.docs[0].industry, 'domain-knowledge-list',
                        'primary skill uppercase display-block');
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
