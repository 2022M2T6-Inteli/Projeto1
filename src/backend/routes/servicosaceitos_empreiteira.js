// Definição de módulos necessários
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definições para este arquivo
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/servicosaceitos_empreiteira.ejs"); 
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

// Endpoint que busca no banco de dados se determinado empreiteiro teve sua proposta aceita
router
    .route("/listar")
    .get((req, res)=>{
        res.statusCode = 200 
		res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);   
        if(req.query.id){
            var sql = `SELECT Proposta.ID_Proposta, Contratante.Nome, Contratante.Email, Contratante.Celular, Contratante.Regional, Oportunidade.Titulo, Oportunidade.Servico, Oportunidade.Data_Inicio, Oportunidade.Data_Fim FROM Proposta
            FULL JOIN Contratante ON Contratante.ID_Contratante = Proposta.ID_Contratante_Proposta
            FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Oportunidade
            WHERE Proposta.ID_Empreiteira_Proposta= '${req.query.id}' AND Proposta.Match= '1' `;       
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

