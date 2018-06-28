const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
//middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} : ${req.path}` ; 
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to log to file server.log');
		}
	})
  next();
});

// app.use((req, res, next) => {
// 	res.render('maintanance.hbs');
// })

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screatIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
  	welcomeMessage: 'Welcome to node.js',
  	pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
})

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request'
	});
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});