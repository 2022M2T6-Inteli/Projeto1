// Import modules
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const { reset } = require('nodemon');

// Instantiating modules
const app = express();

// Server definitions
const port = 1234
const ip = `http://localhost:${port}`

// Set view engine
app.set('view engine', 'ejs')

// Static EJS
app.use('/frontend', express.static(path.join(__dirname, "../frontend")))
console.log(`Static Path at: ${path.join(__dirname, "../frontend")}`);

// Endpoint index
const viewPath = path.join(__dirname, '..', 'frontend', 'views', 'login');
app.get('/', (req, res) =>{
    res.render(viewPath + '/login')
})

// Endpoint signup
const signupRouter = require('./routes/signup');
app.use('/cadastrar', signupRouter);

// Endpoint empreiteira profile
const empProfileRouter = require('./routes/empreiteiraProfile');
app.use('/perfilEmp', empProfileRouter);

// Endpoint regional profile
// const regionalPerfil = require('./routes/regionalPerfil');
// app.use('/regional/profile', regProfileRouter);

// Endpoint faq
const faqRouter = require('./routes/faq');
app.use('/faq', faqRouter);

// Endpoint signup
const feedRouter = require('./routes/feed');
app.use('/feed', feedRouter);



// Start server with port
app.listen(port);
console.log(`Server hosted at: ${ip}`)