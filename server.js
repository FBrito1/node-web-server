const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

/* app.use((req, res, next) => {
    res.render('maintence.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to Home Page dude.'
   })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page!!'
    });
});

app.get('/portifolio', (req, res) => {
    res.render('portifolio.hbs', {
        pageTitle: 'Portifolio Page',
        welcomeMessage: 'Welcome to Portifolio page bro.'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});