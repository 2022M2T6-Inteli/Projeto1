// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/signup/signup"); // Fetch the ejs file
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database

// Opening endpoint
router
    .route('/')
    .get((req, res) => {
        res.render(viewPath) // Render page
    })
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
        var db = new sqlite3.Database(DBPATH);
        var sql = `INSERT INTO Empreiteira (CNPJ, Razao_Social, Nome_Fantasia, CNAE, Data_Abertura, Email, Numero_Funcionarios, Servico_1, Servico_2) VALUES (${req.body.cnpj}, "${req.body.razaoSoc}", "${req.body.nomeFant}", ${req.body.cnae}, "${req.body.dataAbert}", "${req.body.email}", " ${req.body.func}", "${req.body.serv1}", "${req.body.serv2}");`;
	    console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
        });
        db.close();
        res.end();
    })





// const express = require('express');
// const path = require('path');
// const db = require('../utils/db');
// const router = express.Router();


// Set EJS dir
// const viewPath =  path.join(__dirname, "../../frontend/views/signup");
// console.log(viewPath);
// router.set('view engine', 'ejs');


// router.get('/', (req, res) => {
//     res.send('hello world');
// })

// router
//     .route('/')
//     .get((req, res) =>{
//         res.render(viewPath + '/signup')
// })
//     .post((req, res) =>{
//         const sql = 'INSERT INTO Empreiteira (CNPJ, Razao_Social, Nome_Fantasia, CNAE, N_Inscricao, Data_Abertura, Email, Endereco, Cidade, Estado, Foto, Numero_funcionarios, Servico_1, Sevico_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

//         db.run(sql, [cnpj, razSoc, fantasia, cnae, insc, abertura, email, rua, numero, bairro, estado, cidade, foto, nFuncionarios, servico1, servico2, password], (err, rows) => {
//             if (err)
//                 msg = "Erro: " + err.message;
//             else
//                 msg = "Usuário criado com sucesso!";
    
//             res.render(msg);
//         });
// })

module.exports = router;