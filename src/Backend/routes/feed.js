// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router();
const viewPath = path.join(__dirname, "../../frontend/views/feed/feed"); 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db");


// Endpoint base o qual a página web pertence
router
    .route('/')
    .get((req, res) => {
		res.statusCode = 200 
		res.setHeader('Access-Control-Allow-Origin', '*');
        res.render(viewPath) 
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*');
    })
// Endpoint que busca no banco de dados as oportunidades disponíveis
router
    .route('/info')
    .get((req, res) => {
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });
        var sql = `SELECT Servico, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade, ID_Oportunidade, ID_Contratante FROM Oportunidade`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
    })
// Endpoint que recebe o form correspondente a proposta da empreiteira quando ela for declarar interesse 
router
    .route('/proposta')
    .post(urlencodedParser, (req,res) => {
        var db = new sqlite3.Database(DBPATH, err => {
            if (err){
                return console.error(err.message);
            }
        });
        var sql = `INSERT INTO Proposta (ID_Oportunidade, ID_Empreiteira_Proposta, Valor_Proposta, Escopo, ID_Contratante_Proposta) VALUES ("${req.body.id_post}","${req.body.id_emp}","${req.body.valor_op}","${req.body.escopo_op}", "${req.body.id_contrat}")`
        db.run(sql, [], err => {
            if(err){
                throw err;
            }
        });
        res.redirect("/feed/?id=1#modal_conf");
        db.close();
        res.end();
    })

module.exports = router; 
