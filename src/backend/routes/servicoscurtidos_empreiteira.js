// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/servicoscurtidos_empreiteira.ejs"); // Fetch the ejs file
const viewPathNF = path.join(__dirname, "../../frontend/views/404/NotFound.ejs"); // Fetch the ejs file "Not found"
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
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
        var db = new sqlite3.Database(DBPATH); // Instantiate database
        // if(req.query.id){
            // var sql = `SELECT * FROM Empreiteira WHERE ID_Empreiteira = ${req.query.id};`;
            var sql = `SELECT * FROM Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira=Responsavel_Empreiteira.ID_Responsavel WHERE ID_Empreiteira = ${req.query.id};`;
	    console.log(sql);
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
        
        // else{
        //     res.statusCode = 404;
        //     res.render(viewPathNF);

        // }
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
        res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql= `UPDATE Empreiteira SET Nome_Fantasia= '${req.body.nome_fantasia_empreiteira}', Razao_Social= '${req.body.razao_social_empreiteira}', Email= '${req.body.email_empreiteira}', CNAE= '${req.body.cnae_empreiteira}', Data_Abertura= '${req.body.data_abertura_empreiteira}', Numero_Funcionarios= '${req.body.numero_funcionarios}', Servico_1= '${req.body.servico_primario_empreiteira}', Servico_2= '${req.body.servico_secundario_empreiteira}' WHERE ID_Empreiteira= '${req.body.id}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         res.write("<h1>Informacoes do Empreiteira atualizadas com sucesso</h1>")
         db.close(); // Fecha o banco
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
        res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql= `UPDATE Responsavel_Empreiteira SET Nome= '${req.body.nome_editar_responsavel}', Email_Responsavel= '${req.body.email_editar_responsavel}', Celular= '${req.body.celular_editar_responsavel}' WHERE ID_Responsavel= '${req.body.id_responsavel}'`; 
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                 throw err;
             }
             res.send();
         });
         res.write("<h1>Informacoes do responsavel pela empreiteira atualizadas com sucesso</h1>")
         db.close(); // Fecha o banco
    });
router
    .route("/listar")
    .get((req, res)=>{
        res.statusCode = 200 // Status: OK
		res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.ID_Proposta, Proposta.ID_Empreiteira_Proposta, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Empreiteira.ID_Empreiteira = Proposta.ID_Empreiteira_Proposta FULL JOIN Responsavel_Empreiteira ON Responsavel_Empreiteira.ID_Responsavel = Empreiteira.ID_Empreiteira FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta`;        
        // var sql = `SELECT Empreiteira.Nome_Fantasia, Proposta.ID_Proposta, Responsavel_Empreiteira.Nome, Oportunidade.Titulo, Proposta.Escopo, Proposta.Valor_Proposta FROM Proposta FULL JOIN Empreiteira ON Proposta.ID_Empreiteira_Proposta = Empreiteira.ID_Empreiteira FULL JOIN Responsavel_Empreiteira ON Empreiteira.ID_Empreiteira = Responsavel_Empreiteira.ID_Responsavel FULL JOIN Oportunidade ON Oportunidade.ID_Oportunidade = Proposta.ID_Empreiteira_Proposta WHERE Proposta.ID_Empreiteira_Proposta= '${req.query.id}'`;     
        if(req.query.id){
            var sql = `SELECT Oportunidade.Titulo, Oportunidade.Servico, Oportunidade.Descricao, Oportunidade.Data_Inicio, Oportunidade.Data_Fim, Oportunidade.Estado, Oportunidade.Cidade FROM Proposta FULL JOIN Oportunidade ON Proposta.ID_Empreiteira_Proposta = Oportunidade.ID_Oportunidade WHERE Proposta.ID_Empreiteira_Proposta= '${req.query.id}'`;       
            console.log(sql)
            db.all(sql, [],  (err, rows ) => {
                if (err) {
                    throw err;
                }
                res.json(rows);
                console.log(rows)
            });
            db.close();
        }else{
            res.statusCode = 404;
            res.render(viewPathNF);

        }
    });
    

module.exports = router;

