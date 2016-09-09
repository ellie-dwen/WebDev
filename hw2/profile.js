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
	ID_ARRAY.forEach(function(item, index) {
		displayItems.push(document.getElementById(item));
		displayItems[index].innerHTML = DEFAULT_TEXT[index];
		inputAreas.push(document.getElementById(item + "Input"));
	});
	// when submit button is clicked, check the input values
	var submitButton = document.getElementById("submit");
	submitButton.onclick = function() {
		var message = "";
		var update = true;
		ID_ARRAY.forEach(function(item, index) {
			// if changed, password confirmation must match password
			if(item == "confirmation" &&
				inputAreas[index].value != inputAreas[index-1].value) {
				alert("password and confirmation does not match!");
				update = false;
			}
			// if not changed, no need to check
			if(inputAreas[index].value == "") {
				return;
			}
			// check if the input value matches the pattern
			if(!PATTERNS[index].test(inputAreas[index].value)) {
				alert(item + " format is wrong!");
				update = false;
			}
			// update the message
			message += item + ": " + inputAreas[index].value + "\n";
		});
		if(!update) {
			return;
		}
		// pass validation, make alert
		alert("update\n" + message);
		// update the content
		inputAreas.forEach(function(item, index) {
			if(item.value != "") {
				displayItems[index].innerHTML = item.value;
				item.value = "";
			}
		});
	};
};