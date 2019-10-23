function sendRequest(elementId, url, prop) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById(elementId).innerHTML = JSON.parse(this.responseText)[prop];
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
}