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

	setDisabledTimerButtons(false, true, true);

	// выбор режима помодоро
    pomodoro.addEventListener('click', function () {
        if (resetCheck === true) {
            mode = 1;
			document.body.style.backgroundColor = '#e76f51';
            getTimeFromMode(mode);
            showTime(hour, timeHour);
            showTime(minute, timeMinute);
            showTime(second, timeSecond);
            setCurrentMode(mode);
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
            setCurrentMode(mode);
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
            setCurrentMode(mode);
        }
    });
	
	// запуск таймера
	run.addEventListener('click', function () {
		// проверка не запущен ли уже таймер (во избежании повторного нажатия)
		if (runCheck === false) {
			runCheck = true;
			pauseCheck = false;
			resetCheck = false;
			setDisabledTimerButtons(true, false, false);
			setDisabledModeButtons(true);
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
					pauseCheck = false;
					setTimeReserv(hour, minute, second);
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
			pauseCheck = true;
			resetCheck = false;
			setDisabledTimerButtons(false, true, false);
			setDisabledModeButtons(true);
		}
	});

	// сброс таймера
	reset.addEventListener('click', function () {
		runCheck = false;
		pauseCheck = false;
		resetCheck = true;
		setDisabledTimerButtons(false, true, true);
		setDisabledModeButtons(false);
		resetTimeReserv();
		getTimeFromMode(mode, hour, minute, second);
        showTime(hour, timeHour);
		showTime(minute, timeMinute);
		showTime(second, timeSecond);
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
			return [hour, minute, second];
    }

	// разрешение/запрет выбора режима
	function setDisabledModeButtons(check) {
		if (check) {
			pomodoro.disabled = true;
			shortBreak.disabled = true;
			longBreak.disabled = true;
		} else {
			pomodoro.disabled = false;
			shortBreak.disabled = false;
			longBreak.disabled = false;
		}
	}

	// разрешение/запрет нажатия кнопок управления таймером
	function setDisabledTimerButtons(checkRun, checkPause, checkReset) {
		if (checkRun) {
			run.disabled = true;
		} else {
			run.disabled = false;
		}
		if (checkPause) {
			pause.disabled = true;
		} else {
			pause.disabled = false;
		}
		if (checkReset) {
			reset.disabled = true;
		} else {
			reset.disabled = false;
		}
	}

	// выбор текущего режима в css
	function setCurrentMode(mode) {
		if (mode === 1) {
			pomodoro.classList.add('current');
			shortBreak.classList.remove('current');
			longBreak.classList.remove('current');
		} else if (mode === 2) {
			pomodoro.classList.remove('current');
			shortBreak.classList.add('current');
			longBreak.classList.remove('current');
		} else {
			pomodoro.classList.remove('current');
			shortBreak.classList.remove('current');
			longBreak.classList.add('current');
		}
	}

	// записать данные в резерв
	function setTimeReserv(hour, minute, second) {
		hourReserv = hour;
		minuteReserv = minute;
		secondReserv = second;
	}

	// сбросить резерв
	function resetTimeReserv() {
		hourReserv = 0;
		minuteReserv = 0;
		secondReserv = 0;
	}
	
});