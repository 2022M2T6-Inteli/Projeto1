// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/regionalPerfil/perfil_contratante.ejs"); // Fetch the ejs file
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database

// Opening endpoint
router
    .route('/criarpostagem')
    .get((req, res) => {
        res.render(viewPath) // Render page
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
        var db = new sqlite3.Database(DBPATH);
        var sql = `INSERT INTO Oportunidade (Servico, Data_Oportunidade, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade) VALUES (${req.body.servico}, "${req.body.data_oportunidade}", "${req.body.titulo}", ${req.body.descricao}, "${req.body.data_inicio}", "${req.body.data_fim}", " ${req.body.estado}", "${req.body.cidade}");`;
	    console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
        });
        db.close();
        res.end();
    })

module.exports = router;



