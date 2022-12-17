// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router();
const viewPath = path.join(__dirname, "../../frontend/views/login/loginCont"); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db");
let login = [];


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
// Endpoint que busca no banco as informações de login para comparar com os dados inseridos com as contratantes existentes
router
    .route('/banco')
    .post(urlencodedParser,(req, res) => {
        var cpf = req.body.cpf
        var senha = req.body.senha
        var id = "";
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });
        var sql = `SELECT CPF, Senha, ID_Contratante FROM Contratante WHERE CPF="${cpf}"`;

        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            } else{
                if(rows.length>0){
                    for(var i = 0; i < rows.length; i++){
                        if(rows[i].Senha == senha){
                            id = rows[i].ID_Contratante
                            res.redirect(`/regionalPerfil/?id=${id}`)
                        } else{
                            res.redirect(`/loginCont#probSenha`)
                        }
                    } 
                } else {
                    res.redirect('/loginCont#probCPF')
                }
            }
        });
        db.close();
    })

console.log(login)
module.exports = router;
