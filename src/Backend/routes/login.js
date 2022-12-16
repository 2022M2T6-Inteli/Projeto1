// // Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definitions
const router = express.Router(); // Setup router
const viewPath = path.join(__dirname, "../../frontend/views/login/login"); // Fetch the ejs file
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
    .route('/banco')
    .post(urlencodedParser, (req, res) => {
        var email = req.body.email
        var senha = req.body.senha
        var id = ""; 
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            // console.log("Successful connection to the database 'ConstruMatch.db'");
        });
        var sql = `SELECT Email, Senha, ID_Empreiteira FROM Empreiteira WHERE Email="${email}"`;

        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            } else {
                if(rows.length>0){
                    for(var i = 0; i < rows.length; i++){
                        if(rows[i].Senha == senha){
                            id = rows[i].ID_Empreiteira
                            res.redirect(`/perfil/?id=${id}`)
                        } else{
                            res.redirect(`/login#probSenha`)
                        }
                    } 
                } else {
                    res.redirect('/login#probEmail')
                }
            }
        });
        db.close();
    })

module.exports = router; // Export Router
