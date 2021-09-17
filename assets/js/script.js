'use strict'

document.addEventListener('DOMContentLoaded', function () {

	const timeHour = document.getElementById('timeHour');
	const timeMinute = document.getElementById('timeMinute');
	const timeSecond = document.getElementById('timeSecond');
	
	const run = document.getElementById('run');
	const pause = document.getElementById('pause');
	const reset = document.getElementById('reset');

    const pomodoro = document.getElementById('pomodoro');
    const shortBreak = document.getElementById('shortBreak');
    const longBreak = document.getElementById('longBreak');
	
	let runCheck = false;
	let pauseCheck = false;
	let resetCheck = true;

    let mode = 1;
	
	let hour = 0;
	let minute = 25;
	let second = 0;
	
	let hourReserv = 0;
	let minuteReserv = 0;
	let secondReserv = 0;

    pomodoro.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 1;
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.remove('current');
            longBreak.classList.remove('current');
            pomodoro.classList.add('current');
        }
    });
    shortBreak.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 2;
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.add('current');
            longBreak.classList.remove('current');
            pomodoro.classList.remove('current');
        }
    });
    longBreak.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 3;
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.remove('current');
            longBreak.classList.add('current');
            pomodoro.classList.remove('current');
        }
    });
	
	run.addEventListener('click', function () {
        pauseCheck = false;
		resetCheck = false;
		if (runCheck === false) {
				runCheck = true;
				if (hourReserv > 0 || minuteReserv > 0 || secondReserv > 0) {
					hour = hourReserv;
					minute = minuteReserv;
					second = secondReserv;
				} else if (mode === 1) {
                    hour = 0;
                    minute = 25;
                    second = 0;
                } else if (mode === 2) {
                    hour = 0;
                    minute = 5;
                    second = 0;
                } else {
                    hour = 0;
                    minute = 15;
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
                        resetCheck = false;
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
        runCheck = false;
        resetCheck = false;
		pauseCheck = true;
	});

	reset.addEventListener('click', function () {
        runCheck = false;
        pauseCheck = false;
		resetCheck = true;
		getTimeFromMode(mode, hour, minute, second);
        showTime(hour, timeHour);
		showTime(minute, timeMinute);
		showTime(second, timeSecond);
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

    function getTimeFromMode(mode) {
        if (mode === 1) {
            hour = 0;
            minute = 25;
            second = 0;
        } else if (mode === 2) {
            hour = 0;
            minute = 5;
            second = 0;
        } else {
            hour = 0;
            minute = 15;
            second = 0;
        }
        return hour, minute, second;
    }
	
});