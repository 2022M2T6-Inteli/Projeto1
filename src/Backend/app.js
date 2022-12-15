//Importação de módulos
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const { reset } = require('nodemon');
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());
//Inicialização do módulo "express"
const app = express();

//Definições utilizadas para a criação do servidor
const port = 1234
const ip = `http://localhost:${port}`

//Associação ao método de vizualização
app.set('view engine', 'ejs')

//Parte estática do ejs (caminho referente as páginas)
app.use('/frontend', express.static(path.join(__dirname, "../frontend")))
console.log(`Static Path at: ${path.join(__dirname, "../frontend")}`);

//Endpoint base
const viewPath = path.join(__dirname, '../frontend/views/index/index');
app.get('/', (req, res) =>{
    res.render(viewPath)
})


//Endpoint de cadastro de empreiteiras
const signupRouter = require('./routes/signup');
app.use('/cadastrar', signupRouter);

//Endpoint de cadastro de contratantes
const cadastroContRouter = require('./routes/cadastroCont');
app.use('/cadastrarCont', cadastroContRouter);

//Endpoint de login dos contratantes
const loginContRouter = require('./routes/loginCont');
app.use('/loginCont', loginContRouter);

// Endpoint de perfil da empreiteira
const empProfileRouter = require('./routes/perfil_empreiteira', './routes/perfil_empreiteira');
app.use('/perfil', empProfileRouter);

// Endpoint perfil da contratante
const regionalRouter = require('./routes/regionalPerfil');
app.use('/regionalPerfil', regionalRouter);

//Endpoint que mostra as empreiteiras interessados em uma oportunidade
const interessadosRouter = require('./routes/interessados');
app.use('/interessados', interessadosRouter);

//Endpoint que mostra as oportunidades as quais empreiteira demonstrou interesse
const servcurtidosRouter = require('./routes/servicoscurtidos_empreiteira');
app.use('/servcurtidos', servcurtidosRouter);

// Endpoint de fluxo web que mostra aos empreiteiros as oportunidades disponíveis
const feedRouter = require('./routes/feed');
app.use('/feed', feedRouter);


// Endpoint de erro "Page not found"
const viewPathNF = path.join(__dirname, "../frontend/views/404/NotFound.ejs"); // Fetch the ejs file "Not found"
app.get('*', function(req, res) {
    res.render(viewPathNF);
});


//Parte que imprime no console o link de acesso
app.listen(port);
console.log(`Server hosted at: ${ip}`)