
window.onload = function() {
	var clickMe = document.getElementById("moves");
	var congDiv = document.getElementById("cong");

	clickMe.onmouseover = function() {
		if(!event.shiftKey && congDiv.style.visibility === "hidden") {
			moveButton(clickMe);
		}
	};

	clickMe.onclick = function() {
		if(congDiv.style.visibility === "hidden") {
			congDiv.style.visibility = "visible";
			clickMe.value = "Play Again";
		} else {
			congDiv.style.visibility = "hidden";
			clickMe.value = "Click Me";
			moveButton(clickMe);
		}
	};

	function moveButton(button) {
		button.style.position = "absolute";
		button.style.left = Math.random() * 400 + "px";
		button.style.top = Math.random() * 400 + "px";
	}
}