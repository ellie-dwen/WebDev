var STATUS = "Hello, papaguena!";

window.onload = function() {
    // clear post when clear button is clicked
    var clearPostBtn = document.getElementById("clear");
    var postArea = document.getElementById("postArea");
    clearPostBtn.onclick = function() {
        postArea.value = "";
    };
    // update the status of the user when update button is clicked
    var updateStatusBtn = document.getElementById("updateBtn");
    var statusArea = document.getElementById("status");
    var statusInput = document.getElementById("newStatus");
    statusArea.innerHTML = STATUS;
    updateStatusBtn.onclick = function () {
        statusArea.innerHTML = statusInput.value;
        statusInput.value = "";
    };

};