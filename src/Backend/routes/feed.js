// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definitions
const router = express.Router(); // Setup router
const viewPath = path.join(__dirname, "../../frontend/views/feed/feed"); // Fetch the ejs file
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // Setup parser
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

module.exports = router; // Export Router
