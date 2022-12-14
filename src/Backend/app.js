// Import modules
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const { reset } = require('nodemon');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
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
const viewPath = path.join(__dirname, '../frontend/views/index/index');
app.get('/', (req, res) =>{
    res.render(viewPath)
})


// Endpoint signup
const signupRouter = require('./routes/signup');
app.use('/cadastrar', signupRouter);

// Endpoint empreiteira profile
const empProfileRouter = require('./routes/perfil_empreiteira', './routes/perfil_empreiteira');
app.use('/perfil', empProfileRouter);

// Endpoint regional profile
const regionalRouter = require('./routes/regionalPerfil');
app.use('/regionalPerfil', regionalRouter);

const interessadosRouter = require('./routes/interessados');
app.use('/interessados', interessadosRouter);

const servcurtidosRouter = require('./routes/servicoscurtidos_empreiteira');
app.use('/servcurtidos', servcurtidosRouter);

// Endpoint faq
// const faqRouter = require('./routes/faq');
//  app.use('/faq', faqRouter);

// Endpoint signup
const feedRouter = require('./routes/feed');
app.use('/feed', feedRouter);


// Endpoint Page not found
const viewPathNF = path.join(__dirname, "../frontend/views/404/NotFound.ejs"); // Fetch the ejs file "Not found"
app.get('*', function(req, res) {
    res.render(viewPathNF);
});


// Start server with port
app.listen(port);
console.log(`Server hosted at: ${ip}`)