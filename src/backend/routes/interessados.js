// Definição de módulos necessários
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definições para este arquivo
const viewPath = path.join(__dirname, "../../frontend/views/regionalPerfil/interessados.ejs");
const viewPathNF = path.join(__dirname, "../../frontend/views/404/NotFound.ejs");
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db");


router
//Endpoint inicial que carrega a página
    .route('/')
    .get((req, res) => {
		res.statusCode = 200 // Status: OK
		res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
        res.render(viewPath) // Render page
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
    })

        
router
//Endpoint que busca no banco de dados tanto as oportunidades de uma contratante quanto 
    .route("/listar")
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Proposta.ID_Proposta, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.Escopo, Proposta.Valor_Proposta, Oportunidade.ID_Contratante FROM Proposta FULL JOIN Empreiteira ON Proposta.ID_Empreiteira_Proposta = Empreiteira.ID_Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira = Responsavel_Empreiteira.ID_Responsavel FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta FULL JOIN Contratante ON Oportunidade.ID_Contratante = Contratante.ID_Contratante WHERE Oportunidade.ID_Contratante= ${req.query.id} AND Proposta.ID_Proposta > '0'`;       
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Proposta.ID_Empreiteira_Proposta = Empreiteira.ID_Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira = Responsavel_Empreiteira.ID_Responsavel FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta WHERE Proposta.ID_Proposta > 0 AND Oportunidade.ID_Contratante= '${req.query.id_contratante}'`;       
        var sql = `SELECT Proposta.ID_Proposta, Proposta.ID_Empreiteira_Proposta, Proposta.ID_Contratante_Proposta, Empreiteira.Nome_Fantasia, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.Escopo, Proposta.Valor_Proposta, Oportunidade.ID_Contratante, Proposta.ID_Oportunidade FROM Proposta 
        FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Oportunidade 
        FULL JOIN Contratante ON Oportunidade.ID_Contratante = Contratante.ID_Contratante 
        FULL JOIN Empreiteira ON Proposta.ID_Empreiteira_Proposta = Empreiteira.ID_Empreiteira
        FULL JOIN Responsavel_Empreiteira ON Responsavel_Empreiteira.ID_Empreiteira_FK = Empreiteira.ID_Empreiteira
        WHERE Oportunidade.ID_Contratante= '${req.query.id_contratante}' AND Proposta.ID_Proposta > 0`;       
        console.log("Join de listar " + sql)
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
            console.log(rows)
        });
        db.close();
    })

router
    .route("/like")
    .get((req, res)=>{
        var db = new sqlite3.Database(DBPATH);
        // var sql = `SELECT Proposta.Match 
        // FROM Proposta FULL JOIN Contratante ON Proposta.ID_Proposta = ID_Contratante 
        // WHERE Proposta.ID_Proposta= '${req.query.id_proposta}' AND 
        // Proposta.ID_Contratante_Proposta= '${req.query.id}';`;
        var sql = `SELECT * FROM Proposta WHERE ID_Proposta= ${req.query.id_proposta}`;
        console.log("join de like: " + sql)
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
            console.log(rows)
        });
        db.close();
    })
router
    .post("/like", urlencodedParser, (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql= `UPDATE Proposta SET Match= '1' WHERE ID_Proposta= '${req.body.id_proposta}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         db.close(); // Fecha o banco
    });

router
    .post("/dislike", urlencodedParser, (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql= `DELETE FROM Proposta WHERE ID_Proposta= '${req.body.id_proposta}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         db.close(); // Fecha o banco
    });


router
    .post("/avaliar", urlencodedParser, (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql= `INSERT INTO Avaliacoes (ID_Oportunidade, ID_Empreiteira, ID_Contratante, Organizacao, Produtividade, Documentacao, Limpeza, Escopo_Avaliacao) VALUES ('${req.body.id_oport}', '${req.body.id_emp}', '${req.body.id_contrat}', '${req.body.organizacao_avaliacao}', '${req.body.produtividade_avaliacao}', '${req.body.documentacao_avaliacao}', '${req.body.limpeza_avaliacao}', '${req.body.escopo_avaliacao}')`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         db.close(); // Fecha o banco
    });

module.exports = router;

