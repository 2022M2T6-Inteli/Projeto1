// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/servicoscurtidos_empreiteira.ejs"); // Fetch the ejs file
const viewPathNF = path.join(__dirname, "../../frontend/views/404/NotFound.ejs"); // Fetch the ejs file "Not found"
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database


// Opening endpoint
router
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
    .route("/listar")
    .get((req, res)=>{
        res.statusCode = 200 // Status: OK
		res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.ID_Proposta, Proposta.ID_Empreiteira_Proposta, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Empreiteira.ID_Empreiteira = Proposta.ID_Empreiteira_Proposta FULL JOIN Responsavel_Empreiteira ON Responsavel_Empreiteira.ID_Responsavel = Empreiteira.ID_Empreiteira FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta`;        
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Proposta.ID_Proposta, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Proposta.ID_Empreiteira_Proposta = Empreiteira.ID_Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira = Responsavel_Empreiteira.ID_Responsavel FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta WHERE Proposta.ID_Empreiteira_Proposta= '${req.query.id}'`;     
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

