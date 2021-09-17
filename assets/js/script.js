'use strict'

document.addEventListener('DOMContentLoaded', function () {

	const timeHour = document.getElementById('timeHour');
	const timeMinute = document.getElementById('timeMinute');
	const timeSecond = document.getElementById('timeSecond');
	
	const run = document.getElementById('run');
	const pause = document.getElementById('pause');
	const reset = document.getElementById('reset');
	
	let runCheck = false;
	let pauseCheck = false;
	let resetCheck = false;
	
	let hour = 0;
	let minute = 25;
	let second = 0;
	
	let hourReserv = 0;
	let minuteReserv = 0;
	let secondReserv = 0;
	
	showTime(hour, timeHour);
	showTime(minute, timeMinute);
	showTime(second, timeSecond);

	run.addEventListener('click', function () {
		resetCheck = false;
		if (runCheck === false) {
				runCheck = true;
				if (hourReserv > 0 || minuteReserv > 0 || secondReserv > 0) {
					hour = hourReserv;
					minute = minuteReserv;
					second = secondReserv;
				} else {
					hour = 0;
					minute = 25;
					second = 0;
				}
				showTime(hour, timeHour);
				showTime(minute, timeMinute);
				showTime(second, timeSecond);
				let interval = setInterval(function () {
					if (resetCheck === true) {
							runCheck = false;
							resetCheck = false;
							clearInterval(interval);
					} else if (pauseCheck === true) {
						runCheck = false;
						hourReserv = hour;
						minuteReserv = minute;
						secondReserv = second;
						pauseCheck = false;
						clearInterval(interval);
					} else {
						second--;
						if (second < 0) {
							if (minute <= 0) {
								if (hour === 0) {
									runCheck = false;
									clearInterval(interval);
								} else {
									hour--;
									minute = 59;
									second = 59;
									showTime(hour, timeHour);
									showTime(minute, timeMinute);
									showTime(second, timeSecond);
								}
							} else {
								minute--;
								second = 59;
								showTime(hour, timeHour);
								showTime(minute, timeMinute);
								showTime(second, timeSecond);
							}
						} else {
							showTime(hour, timeHour);
							showTime(minute, timeMinute);
							showTime(second, timeSecond);
						}
					}
				}, 1000);
			}
	});

	pause.addEventListener('click', function () {
		pauseCheck = true;
	});

	reset.addEventListener('click', function () {
		resetCheck = true;
		showTime(0, timeHour);
		showTime(25, timeMinute);
		showTime(0, timeSecond);
		hourReserv = 0;
		minuteReserv = 0;
		secondReserv = 0;
	});

	function showTime(value, elem) {
		if (value < 10) {
			elem.innerHTML = '0' + value;
		} else {
			elem.innerHTML = value;
		}
	}
	
});