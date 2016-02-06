var flkty;

window.onload = function() {
	document.body.classList.add("js");

	flkty = new Flickity(".carousel", {
		initialIndex: 1
	});

	var timerButton = document.getElementById("timer-button");
	var timerDisplay = document.getElementById("timer-display");
	var timerSound = document.getElementById("timer-sound");
	var running, timeRemaining;
	resetTimer();
	timerButton.addEventListener("click", function() {
		if (running) resetTimer();
		else {
			running = true;
			timerButton.innerHTML = "Reset";
			updateTimer();
		}
	});
	function resetTimer() {
		timeRemaining = 4 * 60;
		timerButton.innerHTML = "Start";
		timerButton.classList.remove('reset');
		running = false;
		printTime();
	}
	function updateTimer() {
		if (timeRemaining === 0) {
			timerSound.play();
			resetTimer();
			setTimeout(function() {
				flkty.next();
			}, 1000);
		}
		else if (!running) {
			resetTimer();
		}
		else {
			if (!timerButton.classList.contains('reset')) timerButton.classList.add('reset');
			setTimeout(function() {
				timeRemaining--;
				printTime();
				updateTimer();
			}, 1000);
		}
	}
	function printTime() {
		var hrs = addZero(Math.floor(timeRemaining / 60));
		var min = addZero(timeRemaining % 60);
		timerDisplay.innerHTML = hrs + ":" + min;
	}
	function addZero(num) {
		if (num < 10) return "0" + num;
		return "" + num;
	}
};
