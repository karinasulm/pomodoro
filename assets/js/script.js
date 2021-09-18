'use strict'

document.addEventListener('DOMContentLoaded', function () {

	// поля для вывода времени
	const timeHour = document.getElementById('timeHour');
	const timeMinute = document.getElementById('timeMinute');
	const timeSecond = document.getElementById('timeSecond');
	
	// кнопки управления таймером
	const run = document.getElementById('run');
	const pause = document.getElementById('pause');
	const reset = document.getElementById('reset');

	// переменные для проверки, была ли нажата какая либо кнопка управления таймером
	let runCheck = false;
	let pauseCheck = false;
	let resetCheck = true;

	// кнопки выбора режима
    const pomodoro = document.getElementById('pomodoro');
    const shortBreak = document.getElementById('shortBreak');
    const longBreak = document.getElementById('longBreak');

	// режим (1 - помодоро, 2 - короткий перерыв, 3 - длинный перерыв)
	let mode = 1;
	
	// переменные для текущего времени
	let hour = 0;
	let minute = 25;
	let second = 0;
	
	// переменные для сохранения времени на случай паузы
	let hourReserv = 0;
	let minuteReserv = 0;
	let secondReserv = 0;

	// выбор режима помодоро
    pomodoro.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 1;
			document.body.style.backgroundColor = '#e76f51';
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.remove('current');
            longBreak.classList.remove('current');
            pomodoro.classList.add('current');
        }
    });

	// выбор режима короткого перерыва
    shortBreak.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 2;
			document.body.style.backgroundColor = '#468faf';
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.add('current');
            longBreak.classList.remove('current');
            pomodoro.classList.remove('current');
        }
    });

	// выбор режима длинного перерыва
    longBreak.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 3;
			document.body.style.backgroundColor = '#4d908e';
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            shortBreak.classList.remove('current');
            longBreak.classList.add('current');
            pomodoro.classList.remove('current');
        }
    });
	
	// запуск таймера
	run.addEventListener('click', function () {
		// проверка не запущен ли уже таймер (во избежании повторного нажатия)
		if (runCheck === false) {
			pauseCheck = false;
			resetCheck = false;
			runCheck = true;
			getTimeFromMode(mode);
			showTime(hour, timeHour);
			showTime(minute, timeMinute);
			showTime(second, timeSecond);
			let interval = setInterval(function () {
				if (resetCheck === true) {
						runCheck = false;
						pauseCheck = false;
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
								pauseCheck = false;
								resetCheck = true;
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

	// пауза таймера
	pause.addEventListener('click', function () {
		// проверка, запущен ли таймер, чтобы поставить его на паузу
        if (runCheck === true) {
			runCheck = false;
        	resetCheck = false;
			pauseCheck = true;
		}
	});

	// сброс таймера
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

	// вывод времени (нужно ли подставить ноль перед значением)
	function showTime(value, elem) {
		if (value < 10) {
			elem.innerHTML = '0' + value;
		} else {
			elem.innerHTML = value;
		}
	}

	// получение начального времени таймера
    function getTimeFromMode(mode) {
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
        return hour, minute, second;
    }
	
});