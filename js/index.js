function sendRequest(elementId, url, prop) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById(elementId).innerHTML = JSON.parse(this.responseText)[prop];
            // console.log(JSON.parse(this.responseText));
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
    sendRequest('title', 'http://whoami/api/gettitle', 'title');
}

function getPhysicalOffice() {
    sendRequest('office', 'http://whoami/api/getphysicaloffice', 'PhysicalOffice');
}

function getData() {
    getName();
    getLocation();
    getDepartment();
    getTitle();
    getPhysicalOffice();
    getIdentity();
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