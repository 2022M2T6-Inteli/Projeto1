// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router(); 
const viewPath = path.join(__dirname, "../../frontend/views/login/login"); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db");

// Endpoint que renderiza a página
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

// Este endpoint compara as informações do banco com o que é colocado na tela de login para checar se há alguma empreiteira com estes dados
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

module.exports = router;
