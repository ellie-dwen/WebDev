// The image cycler object
function ImageCycler(selector) {

	var imageIdx = 0;
	var imageInterval;
	var imageSelector = document.getElementById("cycle" + selector);
	var buttonSelector = document.getElementById("button" + selector);

	// cycle the images by replacing the source of the img element
	function cycle() {
		imageIdx = (imageIdx + 1) % IMAGE_ARRAY.length;
		imageSelector.src = IMAGE_ARRAY[imageIdx];
	}
	// restart cycle and reset time interval
	function restart() {
		buttonSelector.value = STOP;
		imageInterval = setInterval(cycle, Math.random() * 4000 + 1000);
	}
	// start or stop cycle when the button is clicked
	buttonSelector.onclick = function() {
		if(buttonSelector.value == STOP) {
			clearInterval(imageInterval);
			buttonSelector.value = START;
		} else {
			restart();
		}
	};
	// start cycling
	this.start = function() {
		restart();
	}
}

// contant for toggle button
var START = "Start";
var STOP = "Stop";
// image files
var IMAGE_ARRAY = ["rice.jpg","pizza.jpg","prisma.jpg"];

// onload function will load cards that contain images and start cycling the images
window.onload = function() {
	// cache elements
	var elements = document.getElementsByTagName("img");
	var imageCyclers = [];
	for (var i = 0; i < elements.length; i++) {
		imageCyclers.push(new ImageCycler(i));
		imageCyclers[i].start();
	}
};