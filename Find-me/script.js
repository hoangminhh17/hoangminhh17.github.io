var root = document.documentElement;

function getLight(event) {
	// body...
	let x = event.clientX/innerWidth;
	let y = event.clientY/innerHeight;
	console.log(event.composed);
	root.style.setProperty('--x', x);
	root.style.setProperty('--y', y);
}
document.addEventListener('mousemove', event => getLight(event));

//mobile
document.addEventListener('touchmove', event => {
	console.log(event.changedTouches[0].clientX);
	let x = event.changedTouches[0].clientX/innerWidth;
	let y = event.changedTouches[0].clientY/innerHeight;
	console.log(event.composed);
	root.style.setProperty('--x', x);
	root.style.setProperty('--y', y);
});

