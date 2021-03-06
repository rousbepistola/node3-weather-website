const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Rous Epistola'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Rous Epistola'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Rous Epistola',
		message: 'Welcome to our page, we will assist you any way we can'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	const { address } = req.query;

	!address
		? console.log('please provide an address')
		: geocode(address, (error, { latitude, longitude, location } = {}) => {
				if (error) {
					return res.send({ error });
				}

				forecast(latitude, longitude, (error, { temperature, feelslike, weather_descriptions }) => {
					error && res.send({ error });
					res.send({
						forecast: { weather_descriptions, temperature, feelslike },
						location,
						address
					});
				});
			});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}

	// console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		error: 'Article not found',
		title: '404',
		name: 'Rous Epistola'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		error: 'Page not found',
		title: '404',
		name: 'Rous Epistola'
	});
});

app.listen(PORT, () => {
	console.log(`Server is up on PORT ${PORT}`);
});
