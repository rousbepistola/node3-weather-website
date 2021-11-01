const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('p1');
const messageTwo = document.getElementById('p2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	messageTwo.textContent = `Loading`;
	messageOne.textContent = ``;

	fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageTwo.innerHTML = data.error;
			}
			console.log(data.forecast);
			const { location, forecast } = data;
			const { weather_descriptions, feelslike, temperature } = forecast;

			messageOne.innerHTML = `It is currently ${temperature} degrees out, It feels like ${feelslike} degrees. Weather is ${weather_descriptions}`;
			messageTwo.innerHTML = data.location;
		});
	});

	// console.log(location);
});
