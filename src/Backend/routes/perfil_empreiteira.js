// Definição de módulos necessários
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definições para este arquivo
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/perfil_empreiteira.ejs"); 
const viewPathNF = path.join(__dirname, "../../frontend/views/404/NotFound.ejs"); 
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
// Endpoint que busca todas as informações pertinentes ao perfil da empreiteira
router
    .route('/info')
    .get((req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); 
        if(req.query.id){
            var sql = `SELECT * FROM Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira=Responsavel_Empreiteira.ID_Responsavel WHERE ID_Empreiteira = ${req.query.id};`;
	    console.log(sql);
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
        
        }else{
            res.statusCode = 404;
            res.render(viewPathNF);

        }
    })

/*Atualizar Informações Empreiteira*/
router
    .route("/empreiteira/atualizar")
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT * FROM Empreiteira WHERE ID_Empreiteira = ${req.query.id};`;
        console.log(sql)
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
            console.log(rows)
        });
        db.close();
    })
router
    .post("/empreiteira/atualizar", urlencodedParser, (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); 
        var sql= `UPDATE Empreiteira SET Nome_Fantasia= '${req.body.nome_fantasia_empreiteira}', Razao_Social= '${req.body.razao_social_empreiteira}', Email= '${req.body.email_empreiteira}', CNAE= '${req.body.cnae_empreiteira}', Data_Abertura= '${req.body.data_abertura_empreiteira}', Numero_Funcionarios= '${req.body.numero_funcionarios}', Servico_1= '${req.body.servico_primario_empreiteira}', Servico_2= '${req.body.servico_secundario_empreiteira}' WHERE ID_Empreiteira= '${req.body.id}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         res.write("<h1>Informacoes do Empreiteira atualizadas com sucesso</h1>")
         db.close();
    });
    
/*Atualizar Informações Responsável Empreiteira*/
router
    .route("/responsavel/atualizar")
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT * FROM Responsavel_Empreiteira WHERE ID_Responsavel = ${req.query.id};`;
        console.log(sql)
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
            console.log(rows)
        });
        db.close();
    })
router
    .post("/responsavel/atualizar", urlencodedParser, (req, res)=>{
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); 
        var sql= `UPDATE Responsavel_Empreiteira SET Nome= '${req.body.nome_editar_responsavel}', Email_Responsavel= '${req.body.email_editar_responsavel}', Celular= '${req.body.celular_editar_responsavel}' WHERE ID_Responsavel= '${req.body.id_responsavel}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         res.write("<h1>Informacoes do responsavel pela empreiteira atualizadas com sucesso</h1>")
         db.close(); 
    });
//Endpoint que recebe as avaliações das oportunidades feitas pela empreiteira
router
    .route("/avaliacao")
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT Oportunidade.Titulo, Avaliacoes.Escopo_Avaliacao, Avaliacoes.Avaliacao_Geral, Avaliacoes.Organizacao, Avaliacoes.Produtividade, Avaliacoes.Documentacao, Avaliacoes.Limpeza FROM Avaliacoes 
        FULL JOIN Oportunidade ON Avaliacoes.ID_Oportunidade = Oportunidade.ID_Oportunidade
        WHERE Avaliacoes.ID_Empreiteira = ${req.query.id};`;
        console.log(sql)
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
            console.log(rows)
        });
        db.close();
    })

module.exports = router;

