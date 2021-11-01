const request = require('postman-request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1Ijoicm91c2JlcGlzdG9sYSIsImEiOiJja3Y4cHN2ZGY5dndzMnVrNmkwd3JlcW1hIn0.F5O04tccnTwP9tGkY39LaA&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services');
		} else if (body.features.length === 0) {
			callback('Unable to find location, try another search', undefined);
		} else {
			const { place_name: location } = body.features[0];
			const [ longitude, latitude ] = body.features[0].center;
			callback(undefined, { latitude, longitude, location });
		}
	});
};

module.exports = geocode;
