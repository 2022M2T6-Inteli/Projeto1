// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
// const { FULL } = require('sqlite3');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/regionalPerfil/interessados.ejs"); // Fetch the ejs file
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
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT Empreiteira.Nome_Fantasia, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.ID_Proposta, Proposta.ID_Empreiteira_Proposta, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Empreiteira.ID_Empreiteira = Proposta.ID_Empreiteira_Proposta FULL JOIN Responsavel_Empreiteira ON Responsavel_Empreiteira.ID_Responsavel = Empreiteira.ID_Empreiteira FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta`;        
        console.log(sql)
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
        var sql = `SELECT Match FROM Proposta WHERE ID_Proposta= '${req.query.id_proposta}';`;
        console.log(sql)
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

module.exports = router;

