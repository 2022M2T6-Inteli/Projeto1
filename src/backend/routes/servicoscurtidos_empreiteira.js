// Definição de módulos necessários
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definições para este arquivo
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/servicoscurtidos_empreiteira.ejs"); 
const viewPathNF = path.join(__dirname, "../../frontend/views/404/NotFound.ejs"); 
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); 

// Endpoint base para carregar a página web
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

//Endpoint que busca no banco todas as oportunidades as quais a empreiteira declarou interesse
router
    .route("/listar")
    .get((req, res)=>{
        res.statusCode = 200
		res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        if(req.query.id){
            var sql = `SELECT Oportunidade.Titulo, Oportunidade.Servico, Oportunidade.Descricao, 
            Oportunidade.Data_Inicio, Oportunidade.Data_Fim, Oportunidade.Estado, Oportunidade.Cidade 
            FROM Proposta FULL JOIN Oportunidade ON Proposta.ID_Oportunidade = Oportunidade.ID_Oportunidade 
            WHERE Proposta.ID_Empreiteira_Proposta= '${req.query.id}'`;       
            console.log(sql)
            db.all(sql, [],  (err, rows ) => {
                if (err) {
                    throw err;
                }
                res.json(rows);
                console.log(rows)
            });
            db.close();
        }else{
            res.statusCode = 404;
            res.render(viewPathNF);

        }
    });
    

module.exports = router;

