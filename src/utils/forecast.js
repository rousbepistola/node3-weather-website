const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=c616f0a12f04a88b5b0bcb01693602b2&query=${latitude},${longitude}&units=f`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to WeatherStack API', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const { temperature, feelslike, weather_descriptions } = body.current;
			callback(undefined, { temperature, feelslike, weather_descriptions });
		}
	});
};

module.exports = forecast;
