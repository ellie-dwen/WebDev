'use strict'

var createApp = function(canvas) {
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings and windows
	var blgColors = [ 'red', 'blue', 'gray', 'orange']
	var windowColors = ['black', 'yellow']

	// measurements for sun
	var sunR = 30
	var sunX = sunR
	var sunY = sunR

	// measurements for car and wheels
	var carHeight = 25
	var carWidth = 50
	var wheelP = 10
	var wheelR = 5
	var carX = 0
	var carY = floor - carHeight - wheelR

	// update step size
	var blgStep = 20
	var carStep = 10
	var sunStep = 1

	// building list
	var blgs = []

	//build a building
	var build = function() {
		var blg = {}
		blg['x0'] = Math.random()*canvas.width
		blg['width'] = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		blg['height'] = Math.random()*canvas.height/2
		blg['color'] =  blgColors[ Math.floor(Math.random()*blgColors.length)]
		blgs.push(blg)
	}

	// update the height of the building on click
	canvas.addEventListener('click', function(event) {
		var x = event.layerX - canvas.offsetLeft
		var y = event.layerY - canvas.offsetTop
		blgs.forEach(function(blg) {
			if (x > blg.x0 && x < blg.x0 + blg.width && y > floor - blg.height && y < floor){
				blg.height = Math.min(floor, blg.height + blgStep)
			}
		});
	}, false);

	// plot the buildings
	function plotBlgs() {
		blgs.forEach(function(blg) {
			c.fillStyle= blg.color
			c.fillRect(blg.x0, floor - blg.height, blg.width, blg.height)
			for (var y = floor - floorSpacing; y > floor - blg.height; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < blg.width - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle= windowColors[ Math.floor(Math.random()*windowColors.length)]
					c.fillRect(blg.x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		})
	}

	// plot the car
	function plotCar() {
		c.fillStyle = "maroon"
		c.fillRect(carX, carY, carWidth, carHeight)
		c.fillStyle = "black"
		c.beginPath()
		c.arc(carX+wheelP, floor-wheelR, wheelR, 0, 2*Math.PI, false)
		c.closePath()
		c.fill()
		c.beginPath()
		c.arc(carX+carWidth-wheelP, floor-wheelR, wheelR, 0, 2*Math.PI, false)
		c.closePath()
		c.fill()
	}

	// plot the sun
	function plotSun() {
		c.fillStyle = "gold"
		c.beginPath()
		c.arc(sunX, sunY, sunR, 0, 2*Math.PI, false)
		c.closePath()
		c.fill()
	}

	// update the canvas by re-plotting all the elements
	function update(){
		c.clearRect(0, 0, canvas.width, floor);
		sunX = (sunX + sunStep) % canvas.width
		carX = (carX + carStep) % canvas.width
		plotBlgs()
		plotCar()
		plotSun()
	}

	return {
		build: build,
		update: update
	}
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(app.update, 100)
}