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

                callFills(skills,tools);
            });
        });
    });
}

function getDumbData() {
    $(document).ready(function () {
        $.ajax({
            url: '',
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

                callFills(skills,tools);
            });
        });
    });
}