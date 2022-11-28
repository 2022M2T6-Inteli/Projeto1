const express = require('express');
const path = require('path')
const db = require('../utils/db');
const router = express.Router();


// Set EJS dir
const viewPath = path.join(__dirname, '..', '..', 'frontend', 'views', 'signup');

// Set elements
const cnpj = req.query["cnpj"];
const razSoc = req.query["razaoSoc"];
const fantasia = req.query["nomeFant"];
const cnae = req.query["cnae"];
const insc = req.query["insc"];
const abertura = req.query["data-abert"];
const email = req.query["email"];
const rua = req.query["rua"];
const numero = req.query["n"];
const bairro = req.query["bairro"];
const estado = req.query["estados"];
const cidade = req.query["cidades"];
const foto = req.query["foto"];
const nFuncionarios= req.query["func"];
const servico1= req.query["serv1"];
const servico2 = req.query["serv2"];
const password = req.query["pass"];



router
    .route('/')
    .get((req, res) =>{
        res.render(viewPath + '/signup')
})
    .post((req, res) =>{
        const sql = 'INSERT INTO Empreiteira (CNPJ, Razao_Social, Nome_Fantasia, CNAE, N_Inscricao, Data_Abertura, Email, Endereco, Cidade, Estado, Foto, Numero_funcionarios, Servico_1, Sevico_2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

        db.run(sql, [cnpj, razSoc, fantasia, cnae, insc, abertura, email, rua, numero, bairro, estado, cidade, foto, nFuncionarios, servico1, servico2, password], (err, rows) => {
            if (err)
                msg = "Erro: " + err.message;
            else
                msg = "Usuário criado com sucesso!";
    
            res.render(msg);
        });
})
module.exports = router;