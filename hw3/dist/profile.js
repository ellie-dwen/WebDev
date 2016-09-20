// element ids
var ID_ARRAY = ["name","email","phone","zipcode","password"];
var DISPLAY_ARRAY = ["pName","pEmail","pPhone","pZipcode"];
var DISPLAY_ID = ["Name","Email","Phone","Zipcode", "Password"];
var DISPLAY_IDX = 4;
// default values for the elements
var DEFAULT_TEXT = ["Stuart Minion","stuart@minions.com","123-456-7890","12345"];
// input value of an element must match the corresponding pattern
var PATTERNS = [/^[\S\s]*$/,/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    /^\d{3}-\d{3}-\d{4}$/,/^\d{5}$/,/^\S+$/];

// onload function
window.onload = function() {
    // cache all the elements
    var displayItems = [];
    var inputAreas = [];
    DISPLAY_ARRAY.forEach(function(item, index) {
        displayItems.push(document.getElementById(item));
        displayItems[index].innerHTML = DEFAULT_TEXT[index];
    });
    ID_ARRAY.forEach(function(item) {
        inputAreas.push(document.getElementById(item));
    });
    // when submit button is clicked, check the input values
    var submitButton = document.getElementById("submit");
    submitButton.onclick = function() {
        ID_ARRAY.forEach(function(item, index) {
            // if not changed, no need to check
            if(inputAreas[index].value === "") {
                return;
            }
            // check if the input value matches the pattern
            if(!PATTERNS[index].test(inputAreas[index].value)) {
                inputAreas[index].value = "";
                inputAreas[index].placeholder = DISPLAY_ID[index] + " - invalid input, try again";
            } else if (index == DISPLAY_IDX) {
                inputAreas[index].value = "";
                inputAreas[index].placeholder = DISPLAY_ID[index] + " - updated successfully";
            } else {
                displayItems[index].innerHTML = inputAreas[index].value;
                inputAreas[index].value = "";
                inputAreas[index].placeholder = DISPLAY_ID[index];
            }
        });
    };
};