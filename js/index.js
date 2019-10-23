function getName() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("root").innerHTML = JSON.parse(this.responseText).name;
        }
    };

    xhr.open('GET', 'http://whoami/api/getfullname');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send();
}
          