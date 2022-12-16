// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router(); // Setup router
const viewPath = path.join(__dirname, "../../frontend/views/cadastrar/cadastroCont"); // Fetch the ejs file
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // Setup parser
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database

router
    //Rota básica que mostra a página
    .route('/')
    .get((req, res) => {
		res.statusCode = 200 // Status: OK
		res.setHeader('Access-Control-Allow-Origin', '*');
        res.render(viewPath) // Render page
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*');
    })

router
    //Rota que recebe os dados enviados pelo form do arquivo "cadastroCont" e insere no banco de dados
    .route('/enviar')
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH, err => {
            if (err){
                return console.error(err.message);
            }
        });
        var sql = `INSERT INTO contratante (CPF, Nome, Email, Celular, Regional, Senha) VALUES ("${req.body.cpf}","${req.body.nome}","${req.body.email}","${req.body.celular}","${req.body.regional}","${req.body.senha}")`
        db.run(sql, [], err => {
            if(err){
                throw err;
            }
        });
        res.redirect(`/loginCont`);
        db.close();
        res.end();
    });

module.exports = router;

