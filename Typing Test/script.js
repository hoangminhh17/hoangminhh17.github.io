const content  = document.querySelector('#content p'),
	  textBox  = document.querySelector('#text'),
	  times    = document.querySelector('#time span#times'),
	  seconds  = document.querySelector('#time span#sec'),
	  minutes  = document.querySelector('#time span#min'),
	  btnReset = document.querySelector('#btn-reset'),
	  blackScr = document.querySelector('.black-screen'),
	  score    = document.querySelector('.notify .score span'),
	  root     = document.documentElement;

var time = 0,
	sec  = 0,
	min  = 0,
	secScore=0,
	interval,
	timerRunning = false;

// run time count
function runTimer() {

	showTime(time, sec, min);
	time++;
	sec = Math.floor(time/100) + sec%60;
	min = Math.floor(sec/60) + min;
	time = time%100;
	secScore = sec + min*60;
}

// start
function start() {
	let textLength = textBox.value.length;
	if(textLength === 0 && !timerRunning){
		timerRunning = true;
		interval = setInterval(runTimer,10);
	}
}

//notify
function notify(event) {
	if(event == true){
		root.style.setProperty('--display', 'flex');
		score.innerText = Math.floor(content.innerText.length/secScore);
	}
	else 
		root.style.setProperty('--display', 'none');
}

// matching text 
function spellCheck() {
	let text = textBox.value;
	let str = content.innerText.substring(0, text.length);

	if(text === content.innerText){
		root.style.setProperty('--c', '#09ed12');
		notify(true);
		stop();
	}
	else {
		if(text === str)
			root.style.setProperty('--c', '#edd507')
		else
			root.style.setProperty('--c', '#ff0000')
	}
}


// Stop timer add reset time
function stop() {
	timerRunning = false;
	clearInterval(interval);
	time = 0;
	sec  = 0;
	min  = 0;
	interval = null;
}

// show time to screen
function showTime(time, sec, min) {
	times.innerHTML = (time <= 9) ? ('0' + time):time;
	seconds.innerHTML = (sec <= 9) ? ('0' + sec):sec;
	minutes.innerHTML = (min <= 9) ? ('0' + min):min;
}

// reset button click
function reset() {
	textBox.value='';
	root.style.setProperty('--c', '#00000082');
	stop();
	showTime(time, sec, min);
}


// add event when first key press in text box
textBox.addEventListener('keypress', start, false);
textBox.addEventListener('keyup', spellCheck, false);
btnReset.addEventListener('click', reset, false);
blackScr.addEventListener('click', notify, false);