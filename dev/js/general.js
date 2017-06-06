;'use strict';
//= ./imports/calculator.js
//= ./imports/popUpWindow.js

$('.works').addPopUp({
		popUpWindowClass: 'my_works',
		parentLinksSelector: '.works a',
		containerSelector: '.wrapper',
		nodes: [
			'<div><a href="../calendar/index.html">Календарь на javascript</a><span> | </span><a href="https://github.com/nicon-83/calendar.git">GitHub</a></div>',
			'<div><a href="../trafficLight/index.html">Светофор на javascript</a><span> | </span><a href="https://github.com/nicon-83/traffic_light.git">GitHub</a></div>',
			'<div><a href="../index.html">Свадебные плакаты</a><span> | </span><a href="https://github.com/nicon-83/wedding_posters.git">GitHub</a></div>'
		]
	});