var initVal = Number(document.getElementById('initial-value').value);
var finalVal = Number(document.getElementById('final-value').value);
var step = Number(document.getElementById('step').value)

const table = document.getElementById('results');
const tbody = document.createElement('tbody');
table.appendChild(tbody);

const canvas = document.getElementById('сanvas');
const ctx = canvas.getContext('2d');
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const canvasHeight = canvas.offsetHeight;
const canvasWidth = canvas.offsetWidth;

ctx.translate(canvasWidth / 2, canvasHeight / 2);

const amountOfSteps = (finalVal - initVal) / step + 1;

const hDistance = canvasHeight / amountOfSteps;
const vDistance = canvasWidth / amountOfSteps;
const minX = -(canvasWidth / 2);
const maxX = canvasWidth;
const minY = canvasHeight;
const maxY = -(canvasHeight / 2);

var values = [];

function getData()
{
	initVal = Number(document.getElementById('initial-value').value);
	finalVal = Number(document.getElementById('final-value').value);
	step = Number(document.getElementById('step').value)
	values = [];
	for (let x = initVal; x <= finalVal; x += step)
		values.push([x, 1000 * Math.abs(x - 1)]);
}

getData();

const stepY = Math.abs(values[1][1] - values[0][1]);

function fillTable0() {
	let i = 0;
	tbody.innerHTML = '';
	while (i < values.length) {
		let row = document.createElement('tr');
		let cellX = document.createElement('td');
		let cellY = document.createElement('td');
		tbody.appendChild(row);
		row.appendChild(cellX);
		row.appendChild(cellY);
		cellX.innerHTML = values[i][0];
		cellY.innerHTML = values[i][1];
		i++;
	}
}

function fillTable1() {
	let i = 0;
	tbody.innerHTML = '';
	do {
		let row = document.createElement('tr');
		let cellX = document.createElement('td');
		let cellY = document.createElement('td');
		tbody.appendChild(row);
		row.appendChild(cellX);
		row.appendChild(cellY);
		cellX.innerHTML = values[i][0];
		cellY.innerHTML = values[i][1];
		i++;
	} while (i < values.length);
}

function fillTable2() {
	tbody.innerHTML = '';
	for (let i = 0; i < values.length; i++) {
		let row = document.createElement('tr');
		let cellX = document.createElement('td');
		let cellY = document.createElement('td');
		tbody.appendChild(row);
		row.appendChild(cellX);
		row.appendChild(cellY);
		cellX.innerHTML = values[i][0];
		cellY.innerHTML = values[i][1];		
	}
}

function createCleanGraph() 
{
	
	ctx.beginPath();
	ctx.clearRect(minX, maxY, canvasWidth, canvasHeight);
	ctx.strokeStyle = "#aaa";
	for (let i = minY - hDistance; i >= maxY; i -= hDistance) {
		ctx.moveTo(minX, i);
		ctx.lineTo(maxX, i);
		ctx.moveTo(0, i);
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "#000";
	ctx.moveTo(0, 0);
	ctx.lineTo(minX, 0);
	ctx.lineTo(maxX, 0);
	ctx.moveTo(0, 0);
	ctx.lineTo(0, minY);
	ctx.lineTo(0, maxY);
	ctx.stroke();
}

function drawGraph()
{
	ctx.beginPath();
	ctx.strokeStyle = "#ff0000";
	ctx.fillStyle = "#ff0000";
	ctx.lineWidth = 4;
	values.forEach(point => ctx.lineTo(point[0] * vDistance * 2, (-1) * (point[1] / stepY * hDistance / 2)));
	ctx.stroke();
	values.forEach(point => {
		ctx.beginPath();
		ctx.arc(point[0] * vDistance * 2, -(point[1] / stepY * hDistance / 2), 8, 0, Math.PI * 2, true);
		ctx.fill();
	});
	
}

function calculate() {
	let choises = document.getElementsByName('type');
	let choise;
	getData();
	ctx.clearRect(minX, maxY, canvasWidth, canvasHeight);
	ctx.beginPath();
	createCleanGraph();
	drawGraph();
	choises.forEach(element => {
		if (element.checked)
		{
			choise = element.value;
		}
	});
	if(choise == 0)
		fillTable0();
	else if(choise ==1)
		fillTable1();
	else
		fillTable2();
}
