// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/profile"); // Fetch the ejs file
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database

// Opening endpoint
router
    .route('/')
    .get((req, res) => {
		res.statusCode = 200 // Status: OK
		res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
        res.render(viewPath) // Render page
		var db = new sqlite3.Database(DBPATH); // Instantiate database
        var sql = `SELECT CNPJ, CNAE FROM Empreiteira WHERE CNPJ = 23456;`;
	    console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
        });
        db.close();
        res.end();
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
    })


module.exports = router;