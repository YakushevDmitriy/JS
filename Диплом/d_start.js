"use strict";
var button = document.getElementById('button'),
	P1Name = document.getElementById('P1Name'),
	P2Name = document.getElementById('P2Name'),
	Player1Name, Player2Name,
	res = {},
	updatePassword;
P1Name.addEventListener("change", locStor);
P2Name.addEventListener("change", locStor);
button.addEventListener("click", check);
function locStor() {
	Player1Name = `${P1Name.value}`;
	Player2Name = `${P2Name.value}`;
	localStorage.Player1Name = `${P1Name.value}`;
	localStorage.Player2Name = `${P2Name.value}`;
}

function check(EO) {
	locStor();
	if (Player1Name == '' || Player2Name == '') {
		alert('Вы не ввели имя игрока!')
		return false;
	}
	restoreInfo();
	document.documentElement.requestFullscreen();
}

function storeInfo() {
	updatePassword = Math.random();
	$.ajax({
		url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
		data: { f: 'LOCKGET', n: stringName, p: updatePassword },
		success: lockGetReady, error: errorHandler
	}
	);
}

function lockGetReady(callresult) {
	if (callresult.error != undefined)
		alert(callresult.error);
	else {
		const info = JSON.parse(callresult.result);
		res = info;
		res[P1Name.value] = 0;
		res[P2Name.value] = 0;
		console.log(res)
		$.ajax({
			url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
			data: {
				f: 'UPDATE', n: stringName,
				v: JSON.stringify(res), p: updatePassword
			},
			success: updateReady, error: errorHandler
		}
		);
	}
}

function updateReady(callresult) {
	if (callresult.error != undefined)
		alert(callresult.error);
	switchToVolleyballPage();
}

function restoreInfo() {
	$.ajax(
		{
			url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
			data: { f: 'READ', n: stringName },
			success: readReady, error: errorHandler
		}
	);
}

function readReady(callresult) {
	if (callresult.error != undefined)
		alert(callresult.error);
	else if (callresult.result != "") {
		const info = JSON.parse(callresult.result);
		if (P1Name.value in info || P2Name.value in info) {
			if (confirm('Игрок с таким именем уже существует!!! нажмите ОК если это Вы или отмена чтобы ввести новое имя'))
				storeInfo();
		}
		else storeInfo();
	}
}

function errorHandler(jqXHR, statusStr, errorStr) {
	alert(statusStr + ' ' + errorStr);
}

