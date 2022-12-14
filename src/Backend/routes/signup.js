// Definição de módulos necessários
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições para este arquivo
const router = express.Router(); 
const viewPath = path.join(__dirname, "../../frontend/views/cadastrar/tela_cadastro"); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }) 
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); 
var resposta_all= null;
var valor_resposta= null;

// Endpoint com várias funcionalidades
router
    .route('/')
    // Esta parte recebe o front da página para renderizar
    .get((req, res) => {
        res.render(viewPath)
    })
    // Este post cria uma linha na tabela "Empreiteira" no banco de dados e descobre qual o último id criado antes deste post para depois inserir os dados do responsável da empreiteira no banco referenciando o id correto
    .post(urlencodedParser, (req, res) => {
        res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });
        var sql = `INSERT INTO Empreiteira (CNPJ, Razao_Social, Nome_Fantasia, CNAE, Data_Abertura, Email, Numero_Funcionarios, Cidade, Estado, Servico_1, Servico_2, Senha) VALUES ("${req.body.cnpj}", "${req.body.razaoSoc}", "${req.body.nomeFant}", "${req.body.cnae}", "${req.body.dataAbert}", "${req.body.email}", "${req.body.func}", "${req.body.cidades}", "${req.body.estados}", "${req.body.serv1}", "${req.body.serv2}","${req.body.senha}");`; // SQL command
        var sql1= `SELECT rowid from Empreiteira order by ROWID DESC limit 1`
        db.all(sql1, [],  (err, rid ) => {
            if (err) {
                throw err;
            }
            var mapjson= rid
            mapjson.map(element => {
                resposta_all+= element.ID_Empreiteira
                
            })
            valor_resposta= resposta_all + 1
            console.log("O valor da resposta é de: "+ valor_resposta)
            var sql2 = `INSERT INTO Responsavel_Empreiteira (CPF, Nome, Email_Responsavel, Celular, ID_Empreiteira_FK) VALUES ("${req.body.cpf_responsavel}", "${req.body.nome_responsavel}", "${req.body.email_responsavel}", "${req.body.celular_responsavel}", "${valor_resposta}");`; // SQL command

            db.run(sql2, [],  err => {
                if (err) {
                    throw err;
                }   
            });
        });
       
	    console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
        });

        console.log(sql1);


       
   
        db.close();
        res.redirect("/login");
    })


module.exports = router; // Export Router