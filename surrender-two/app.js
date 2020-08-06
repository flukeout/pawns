let duration, flagHeight, leftAngle, rightAngle;
let angleChanged = false;

document.addEventListener("DOMContentLoaded", function(event) {

	document.querySelectorAll("input").forEach(e => {
		let units = e.getAttribute("units");
		let name = e.getAttribute("name");
		e.value = getProperty(name);
		e.addEventListener("input", e => {
			let val = e.target.value;
			setProperty(name, val + units);
			if(name == "--flag-angle" || name == "--flag-reverse-angle") {
				angleChanged = true;
				console.log(angleChanged);
			}

		});
	});

	document.querySelector(".flag-wrapper").addEventListener("animationiteration", e => {

		if(e.animationName == "flagwave") {
			if(angleChanged) {
				e.srcElement.classList.remove("animated");

				setTimeout(() => {
					e.srcElement.classList.add("animated");
					angleChanged = false;
				}, 1);
			}
		}

	})
});


const getProperty = name => {
	return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
}

const setProperty = (name,value) => {
	document.documentElement.style.setProperty(name, value);
}