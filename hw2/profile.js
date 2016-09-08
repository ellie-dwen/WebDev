// element ids
var ID_ARRAY = ["name","email","phone","zipcode","password","confirmation"];
// default values for the elements
var DEFAULT_TEXT = ["dw20","dw20@rice.edu","123-456-7890","77005","xyz","xyz"];
// input value of an element must match the corresponding pattern
var PATTERNS = [/^[\S\s]*$/,/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	/^\d{3}-\d{3}-\d{4}$/,/^\d{5}$/,/^\S+$/,/^\S+$/];

// onload function will
window.onload = function() {
	// cache all the elements
	var displayItems = [];
	var inputAreas = [];
	for(var i = 0; i < ID_ARRAY.length; i++) {
		displayItems.push(document.getElementById(ID_ARRAY[i]));
		displayItems[i].innerHTML = DEFAULT_TEXT[i];
		inputAreas.push(document.getElementById(ID_ARRAY[i] + "Input"));
	}
	// when submit button is clicked, check the input values
	var submitButton = document.getElementById("submit");
	submitButton.onclick = function() {
		var message = "";
		var update = true;
		for(var i = 0; i < ID_ARRAY.length; i++) {
			// if changed, password confirmation must match password
			if(ID_ARRAY[i] == "confirmation" && inputAreas[i].value != inputAreas[i-1].value) {
				alert("password and confirmation does not match! Please double check before submit!");
				update = false;
			}
			// if not changed, no need to check
			if(inputAreas[i].value == "") {
				continue;
			}
			// check if the input value matches the pattern
			if(!PATTERNS[i].test(inputAreas[i].value)) {
				alert(ID_ARRAY[i] + " format is wrong! Please double check before submit!");
				update = false;
			}
			// update the message
			message += ID_ARRAY[i] + ": " + inputAreas[i].value + "\n";
		}
		if(!update) {
			return;
		}
		// pass validation, make alert
		alert("update\n" + message);
		// update the content
		for(var i = 0; i < ID_ARRAY.length; i++) {
			if(inputAreas[i].value == "") {
				continue;
			}
			displayItems[i].innerHTML = inputAreas[i].value;
			inputAreas[i].value = "";
		}
	};
};