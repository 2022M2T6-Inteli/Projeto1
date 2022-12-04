// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/perfil"); // Fetch the ejs file
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
        var db = new sqlite3.Database(DBPATH); // Instantiate database
        var sql = `SELECT * FROM Empreiteira WHERE ID_Empreiteira = ${req.query.id};`;
	    console.log(sql);
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
    })

    router
    .route('/infoResp')
    .get((req, res) => {
        var db = new sqlite3.Database(DBPATH); // Instantiate database
        var sql = `SELECT * FROM Responsavel_Empreiteira WHERE ID_Empreiteira = ${req.query.id};`;
	    console.log(sql);
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
    })


module.exports = router;