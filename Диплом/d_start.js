"use strict";
let button = document.getElementById('button'),
	P1Name = document.getElementById('P1Name'),
	P2Name = document.getElementById('P2Name'),
	Player1Name, Player2Name, Player1Color, Player2Color;
P1Name.addEventListener("input", newName);
P2Name.addEventListener("input", newName);
button.addEventListener("click", check);
function check() {
	if (Player1Name == '' || Player2Name == '') {
		alert('Вы не ввели имя первого игрока!')
		EO.preventDefault();
	}
	else {
		let P1Color = document.getElementById('P1Color'),
			P2Color = document.getElementById('P2Color');
		localStorage.Player1Color = `${P1Color.value}`;
		localStorage.Player2Color = `${P2Color.value}`;
		localStorage.Player1Name = `${P1Name.value}`;
		localStorage.Player2Name = `${P2Name.value}`;
		document.location.replace('Volleyball.html');
	}
}
function newName() {
	Player1Name = P1Name.value;
	Player2Name = P2Name.value;
}