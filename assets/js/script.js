'use strict'

document.addEventListener('DOMContentLoaded', function () {

	const pomodoro = document.getElementById('pomodoro');
    const shortBreak = document.getElementById('shortBreak');
    const longBreak = document.getElementById('longBreak');
	const timeHour = document.getElementById('timeHour');
	const timeMinute = document.getElementById('timeMinute');
	const timeSecond = document.getElementById('timeSecond');
	const run = document.getElementById('run');
	const pause = document.getElementById('pause');
	const reset = document.getElementById('reset');

	let mode = 1; // 1 - pomodoro, 2 - short break, 3 - long break

	let runCheck = false;
	let pauseCheck = false;
	let resetCheck = true;

	// current time
	let hour = 0;
	let minute = 25;
	let second = 0;

	// standby time
	let standbyHour = 0;
	let standbyMinute = 0;
	let standbySecond = 0;

	// settings
	const settingsOpen = document.getElementById('settingsOpen');
	const settingsClose = document.getElementById('settingsClose');
	const modalSettings = document.getElementById('modalSettings');
	const settingsSave = document.getElementById('settingsSave');
	const settingsReset = document.getElementById('settingsReset');
	const pomodoroHour = document.getElementById('pomodoroHour');
	const pomodoroMinute = document.getElementById('pomodoroMinute');
	const pomodoroSecond = document.getElementById('pomodoroSecond');
	const shortBreakHour = document.getElementById('shortBreakHour');
	const shortBreakMinute = document.getElementById('shortBreakMinute');
	const shortBreakSecond = document.getElementById('shortBreakSecond');
	const longBreakHour = document.getElementById('longBreakHour');
	const longBreakMinute = document.getElementById('longBreakMinute');
	const longBreakSecond = document.getElementById('longBreakSecond');
	let pomodoroHourValue = pomodoroHour.value;
	let pomodoroMinuteValue = pomodoroMinute.value;
	let pomodoroSecondValue = pomodoroSecond.value;
	let shortBreakHourValue = shortBreakHour.value;
	let shortBreakMinuteValue = shortBreakMinute.value;
	let shortBreakSecondValue = shortBreakSecond.value;
	let longBreakHourValue = longBreakHour.value;
	let longBreakMinuteValue = longBreakMinute.value;
	let longBreakSecondValue = longBreakSecond.value;

	// to do list
	const addTaskBtn = document.getElementById('addTaskBtn');
	const pomodoroTasks = document.getElementById('pomodoroTasks');
	const addTaskInput = document.getElementById('addTaskInput');

	// audio
	let audio = document.getElementById('audio');

	// edit task
	const editTaskInput = document.getElementById('editTaskInput');
	const editTaskSave = document.getElementById('editTaskSave');
	const editTaskClose = document.getElementById('editTaskClose');

	//about
	const aboutOpen = document.getElementById('aboutOpen');
	const aboutClose = document.getElementById('aboutClose');
	const modalAbout = document.getElementById('modalAbout');

	// input number arrow
	const ArrowLeft = document.getElementsByClassName('settings__arrow-left');
	const ArrowRight = document.getElementsByClassName('settings__arrow-right');
	const settingsInput = document.getElementsByClassName('settings__input');

	const deleteAllTasks = document.getElementById('deleteAllTasks');

	// make buttons "pause" and "end" inactive - default settings for start
	setDisabledTimerButtons(false, true, true);

	// choice a mode
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

	// work of timer
	run.addEventListener('click', function () {
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
			setDisabledSettings(true);
			let interval = setInterval(function () {
				if (resetCheck === true) {
						runCheck = false;
						pauseCheck = false;
						clearInterval(interval);
				} else if (pauseCheck === true) {
					runCheck = false;
					resetCheck = false;
					pauseCheck = false;
					setStandbyTime(hour, minute, second);
					clearInterval(interval);
				} else {
					second--;
					if (second < 0) {
						if (minute <= 0) {
							if (hour <= 0) {
								runCheck = false;
								pauseCheck = false;
								resetCheck = true;
								clearInterval(interval);
								audio.play();
								setTimeout(function () {
									setDisabledTimerButtons(false, true, true);
									setDisabledModeButtons(false);
									resetStandbyTime();
									getTimeFromMode(mode, hour, minute, second);
									showTime(hour, timeHour);
									showTime(minute, timeMinute);
									showTime(second, timeSecond);
									setDisabledSettings(false);
								},1000);
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
        if (runCheck === true) {
			runCheck = false;
			pauseCheck = true;
			resetCheck = false;
			setDisabledTimerButtons(false, true, false);
			setDisabledModeButtons(true);
		}
	});
	reset.addEventListener('click', function () {
		runCheck = false;
		pauseCheck = false;
		resetCheck = true;
		setDisabledTimerButtons(false, true, true);
		setDisabledModeButtons(false);
		resetStandbyTime();
		getTimeFromMode(mode, hour, minute, second);
        showTime(hour, timeHour);
		showTime(minute, timeMinute);
		showTime(second, timeSecond);
		setDisabledSettings(false);
	});

	if (runCheck === true || pauseCheck === true) {
		window.addEventListener('beforeunload', function (event) {
			event.preventDefault();
			event.returnValue = '';
		});
	}

	let pomodoroHourBackupValue = '0';
	let pomodoroMinuteBackupValue = '25';
	let pomodoroSecondBackupValue = '0';
	let shortBreakHourBackupValue = '0';
	let shortBreakMinuteBackupValue = '5';
	let shortBreakSecondBackupValue = '0';
	let longBreakHourBackupValue = '0';
	let longBreakMinuteBackupValue = '15';
	let longBreakSecondBackupValue = '0';

	// settings
	settingsOpen.addEventListener('click', function () {
		modalSettings.classList.add('active');
		pomodoroHourBackupValue = pomodoroHour.value;
		pomodoroMinuteBackupValue = pomodoroMinute.value;
		pomodoroSecondBackupValue = pomodoroSecond.value;
		shortBreakHourBackupValue = shortBreakHour.value;
		shortBreakMinuteBackupValue = shortBreakMinute.value;
		shortBreakSecondBackupValue = shortBreakSecond.value;
		longBreakHourBackupValue = longBreakHour.value;
		longBreakMinuteBackupValue = longBreakMinute.value;
		longBreakSecondBackupValue = longBreakSecond.value;
	});
	settingsClose.addEventListener('click', function () {
		modalSettings.classList.remove('active');
		pomodoroHour.value = pomodoroHourBackupValue;
		pomodoroMinute.value = pomodoroMinuteBackupValue;
		pomodoroSecond.value = pomodoroSecondBackupValue;
		shortBreakHour.value = shortBreakHourBackupValue;
		shortBreakMinute.value = shortBreakMinuteBackupValue;
		shortBreakSecond.value = shortBreakSecondBackupValue;
		longBreakHour.value = longBreakHourBackupValue;
		longBreakMinute.value = longBreakMinuteBackupValue;
		longBreakSecond.value = longBreakSecondBackupValue;
	});
	settingsSave.addEventListener('click', function () {
		modalSettings.classList.remove('active');
		pomodoroHourValue = pomodoroHour.value;
		pomodoroMinuteValue = pomodoroMinute.value;
		pomodoroSecondValue = pomodoroSecond.value;
		shortBreakHourValue = shortBreakHour.value;
		shortBreakMinuteValue = shortBreakMinute.value;
		shortBreakSecondValue = shortBreakSecond.value;
		longBreakHourValue = longBreakHour.value;
		longBreakMinuteValue = longBreakMinute.value;
		longBreakSecondValue = longBreakSecond.value;
		showChangingSettingsInput(pomodoroHour);
		showChangingSettingsInput(pomodoroMinute);
		showChangingSettingsInput(pomodoroSecond);
		showChangingSettingsInput(shortBreakHour);
		showChangingSettingsInput(shortBreakMinute);
		showChangingSettingsInput(shortBreakSecond);
		showChangingSettingsInput(longBreakHour);
		showChangingSettingsInput(longBreakMinute);
		showChangingSettingsInput(longBreakSecond);
		getTimeFromMode(mode);
		showTime(hour, timeHour);
		showTime(minute, timeMinute);
		showTime(second, timeSecond);
	});
	settingsReset.addEventListener('click', function () {
		pomodoroHour.value = 0;
		pomodoroMinute.value = 25;
		pomodoroSecond.value = 0;
		shortBreakHour.value = 0;
		shortBreakMinute.value = 5;
		shortBreakSecond.value = 0;
		longBreakHour.value = 0;
		longBreakMinute.value = 15;
		longBreakSecond.value = 0;
		pomodoroHourValue = pomodoroHour.value;
		pomodoroMinuteValue = pomodoroMinute.value;
		pomodoroSecondValue = pomodoroSecond.value;
		shortBreakHourValue = shortBreakHour.value;
		shortBreakMinuteValue = shortBreakMinute.value;
		shortBreakSecondValue = shortBreakSecond.value;
		longBreakHourValue = longBreakHour.value;
		longBreakMinuteValue = longBreakMinute.value;
		longBreakSecondValue = longBreakSecond.value;
		showChangingSettingsInput(pomodoroHour);
		showChangingSettingsInput(pomodoroMinute);
		showChangingSettingsInput(pomodoroSecond);
		showChangingSettingsInput(shortBreakHour);
		showChangingSettingsInput(shortBreakMinute);
		showChangingSettingsInput(shortBreakSecond);
		showChangingSettingsInput(longBreakHour);
		showChangingSettingsInput(longBreakMinute);
		showChangingSettingsInput(longBreakSecond);
		getTimeFromMode(mode);
		showTime(hour, timeHour);
		showTime(minute, timeMinute);
		showTime(second, timeSecond);
	});
	
	for (let i = 0; i < ArrowLeft.length; i++) {
		ArrowLeft[i].addEventListener('click', function () {
			let input = ArrowLeft[i].parentElement.getElementsByTagName('input')[0];
			if (input.classList.contains('settings__input--hour')) {
				if (Number(input.value) > 0 && Number(input.value) <= 4) {
					input.value = Number(input.value) - 1;
				}
			}
			else {
				if (Number(input.value) > 0 && Number(input.value) <= 59) {
					input.value = Number(input.value) - 1;
				}
			}
		});
	}
	for (let i = 0; i < ArrowRight.length; i++) {
		ArrowRight[i].addEventListener('click', function () {
			let input = ArrowLeft[i].parentElement.getElementsByTagName('input')[0];
			if (input.classList.contains('settings__input--hour')) {
				if (Number(input.value) >= 0 && Number(input.value) < 4) {
					input.value = Number(input.value) + 1;
				}
			}
			else {
				if (Number(input.value) >= 0 && Number(input.value) < 59) {
					input.value = Number(input.value) + 1;
				}
			}
			
		});
	}
	for (let i = 0; i < settingsInput.length; i++) {
		settingsInput[i].addEventListener('change', function () {
			if (settingsInput[i].value < 0) {
				settingsInput[i].value = 0;
			}
			else if (settingsInput[i].classList.contains('settings__input--hour')) {
				if (settingsInput[i].value > 4) {
					settingsInput[i].value = 4;
				}
			}
			else {
				if (settingsInput[i].value > 59) {
					settingsInput[i].value = 59;
				}
			}
		});
	}

	// to do list
	if (localStorage.getItem('todolist') === null) {
		localStorage.setItem('todolist', '');
	} else {
		pomodoroTasks.innerHTML = localStorage.todolist;
		// cross off tasks
		let pomodoroTaskCheck = document.getElementsByClassName('pomodoro__task-check');
		for (let i = 0; i < pomodoroTaskCheck.length; i++) {
			pomodoroTaskCheck[i].addEventListener('click', function () {
				pomodoroTaskCheck[i].classList.toggle('active');
				if (pomodoroTaskCheck[i].classList.contains('active') === true) {
					pomodoroTaskCheck[i].parentElement.getElementsByTagName('input')[0].style.textDecoration = 'line-through';
				}
				else {
					pomodoroTaskCheck[i].parentElement.getElementsByTagName('input')[0].style.textDecoration = 'none';
				}
				localStorage.todolist = pomodoroTasks.innerHTML;
			});
		}
		// deleting for every task
		let pomodoroTaskdelete = document.getElementsByClassName('pomodoro__taskdelete');
		for (let i = 0; i < pomodoroTaskdelete.length; i++) {
			pomodoroTaskdelete[i].addEventListener('click', function () {
				addEditingTask();
				localStorage.todolist = pomodoroTasks.innerHTML;
			});
		}
		addEditingTask();
	}
	// new task
	addTaskBtn.addEventListener('click', function () {
		addTask(addTaskInput, pomodoroTasks);
	});
	addTaskInput.addEventListener('keypress', function (e) {
		if (e.keyCode === 13) {
			addTask(addTaskInput, pomodoroTasks);
		}
	});

	deleteAllTasks.addEventListener('click', function () {
		pomodoroTasks.innerHTML = '';
		localStorage.todolist = '';
	});

	// about
	aboutOpen.addEventListener('click', function () {
		modalAbout.classList.add('active');
	});
	aboutClose.addEventListener('click', function () {
		modalAbout.classList.remove('active');
	});

	// FUNCTIONS

	// rule for output time
	function showTime(value, elem) {
		if (value < 10) {
			elem.innerHTML = '0' + value;
		} else {
			elem.innerHTML = value;
		}
	}

	// initial time depending on the mode
    function getTimeFromMode(mode) {
        if (standbyHour > 0 || standbyMinute > 0 || standbySecond > 0) {
				hour = standbyHour;
				minute = standbyMinute;
				second = standbySecond;
			} else if (mode === 1) {
				hour = pomodoroHourValue;
				minute = pomodoroMinuteValue;
				second = pomodoroSecondValue;
			} else if (mode === 2) {
				hour = shortBreakHourValue;
				minute = shortBreakMinuteValue;
				second = shortBreakSecondValue;
			} else {
				hour = longBreakHourValue;
				minute = longBreakMinuteValue;
				second = longBreakSecondValue;
			}
			return [hour, minute, second];
    }

	// set/reset disabled for mode buttons
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

	// set/reset disabled for timer buttons
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

	// current mode (css-style)
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

	// write standby time
	function setStandbyTime(hour, minute, second) {
		standbyHour = hour;
		standbyMinute = minute;
		standbySecond = second;
	}

	// reset standby time
	function resetStandbyTime() {
		standbyHour = 0;
		standbyMinute = 0;
		standbySecond = 0;
	}

	function addTask(addTaskInput, pomodoroTasks) {
		if (addTaskInput.value !== '') {
			pomodoroTasks.innerHTML += '<div class="pomodoro__task"><span class="pomodoro__task-check"></span><input type="text" value="' + addTaskInput.value + '" disabled><button class="pomodoro__taskedit"></button><button class="pomodoro__taskdelete" onclick="this.parentElement.remove();"></button></div>'
			addTaskInput.value = '';
			// write in localStorage
			localStorage.todolist = pomodoroTasks.innerHTML;
			// cross off tasks
			let pomodoroTaskCheck = document.getElementsByClassName('pomodoro__task-check');
			for (let i = 0; i < pomodoroTaskCheck.length; i++) {
				pomodoroTaskCheck[i].addEventListener('click', function () {
					pomodoroTaskCheck[i].classList.toggle('active');
					if (pomodoroTaskCheck[i].classList.contains('active') === true) {
						pomodoroTaskCheck[i].parentElement.getElementsByTagName('input')[0].style.textDecoration = 'line-through';
					}
					else {
						pomodoroTaskCheck[i].parentElement.getElementsByTagName('input')[0].style.textDecoration = 'none';
					}
				});
			}
			// deleting for every task
			let pomodoroTaskdelete = document.getElementsByClassName('pomodoro__taskdelete');
			for (let i = 0; i < pomodoroTaskdelete.length; i++) {
				pomodoroTaskdelete[i].addEventListener('click', function () {
					localStorage.todolist = pomodoroTasks.innerHTML;
					addEditingTask();
				});
			}
			addEditingTask();
		}
		else {
			showChangingSettingsInput(addTaskInput);
		}
	}
	
	// set/reset disabled for settings
	function setDisabledSettings(check) {
		settingsSave.disabled = check;
		settingsReset.disabled = check;
		pomodoroHour.disabled = check;
		pomodoroMinute.disabled = check;
		pomodoroSecond.disabled = check;
		shortBreakHour.disabled = check;
		shortBreakMinute.disabled = check;
		shortBreakSecond.disabled = check;
		longBreakHour.disabled = check;
		longBreakMinute.disabled = check;
		longBreakSecond.disabled = check;
	}

	// changing inputs (css-style)
	function showChangingSettingsInput(elem) {
		elem.style.animation = 'inputAnimation 2s linear';
		setTimeout(function () {
			elem.style.animation = 'none';
		}, 2100);
	}

	// editing for every button and write new data in localStorage
	function addEditingTask() {
		let pomodoroTaskedit = document.getElementsByClassName('pomodoro__taskedit');
		for (let i = 0; i < pomodoroTaskedit.length; i++) {
			pomodoroTaskedit[i].addEventListener('click', function () {
				modalEditTask.classList.add('active');
				editTaskInput.value = pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].value;
				editTaskSave.addEventListener('click', function () {
					modalEditTask.classList.remove('active');
					pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].value = editTaskInput.value;
					// save in localStorage
					let value = pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].value;
					pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].outerHTML = '<input type="text" value="' + value + '" disabled>';
					localStorage.todolist = pomodoroTasks.innerHTML;
				})
				editTaskInput.addEventListener('keypress', function (e) {
					if (e.keyCode === 13) {
						modalEditTask.classList.remove('active');
						pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].value = editTaskInput.value;
						// save in localStorage
						let value = pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].value;
						pomodoroTaskedit[i].parentElement.getElementsByTagName("input")[0].outerHTML = '<input type="text" value="' + value + '" disabled>';
						localStorage.todolist = pomodoroTasks.innerHTML;
					}
				})
				editTaskClose.addEventListener('click', function () {
					modalEditTask.classList.remove('active');
				})
			});
		}
	}

});