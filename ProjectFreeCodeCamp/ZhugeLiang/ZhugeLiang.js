document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('btn-Profile').onclick = function(){
		showProfile();
	};
}, false)

function showProfile() {
	var x=document.getElementById('showprofile');
	x.classList.toggle("hide");
}

