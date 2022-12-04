// Import modules
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// Definitions
const viewPath = path.join(__dirname, "../../frontend/views/empreiteiraPerfil/perfil_empreiteira.ejs"); // Fetch the ejs file
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
    .route('/perfil')
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
    .post((req, res) => {
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
router
    .route("/atualizarGET")
    .get((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT * FROM Empreiteira WHERE ID_Empreiteira = ${req.query.id};`;
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close();
    })
router
    .route("/mandarAtual")
    .post((req,res)=>{
        var db = new sqlite3.Database(DBPATH);
        var sql = `UPDATE Empreiteiras SET `
    })


module.exports = router;


// //LER POSTAGEM PARA UPTADE
// app.get('/postagem/atualizar', (req, res) => {
//     res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
//     res.setHeader('Access-Control-Allow-Origin', '*'); 
//     var db = new sqlite3.Database(DBPATH); // Abre o banco
// 	var sql = `SELECT Titulo, Descricao, Data_Inicio, ID_Oportunidade FROM Oportunidade WHERE ID_Oportunidade= '${req.query.ID_Oportunidade}'`;
// 	console.log(sql)
//     db.all(sql, [],  (err, rows ) => {
//         if (err) {
//             throw err;
//         }
//         res.json(rows);
//     });
//     db.close(); // Fecha o banco
// });

// //UPDATE POSTAGEM
// app.post('/postagem/atualizar', urlencodedParser, (req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
// 	var db = new sqlite3.Database(DBPATH); // Abre o banco
// 	var sql = `UPDATE Oportunidade SET Titulo= '${req.body.Titulo}', Descricao= '${req.body.Descricao}', Data_Inicio= '${req.body.Data_Inicio}' WHERE ID_Oportunidade= '${req.body.ID_Oportunidade}'`; //Lê-se: "update a tabela costumers, colocando (set) no parâmetro adress o termo ... no lugar (where) do termo ...""
// 	console.log(sql)
// 	db.run(sql, [],  err => {
// 		if (err) {
// 		    throw err;
// 		}
// 		res.send();
// 	});
// 	db.close(); // Fecha o banco
// 	res.write('<p>Postagem atualizada com sucesso!</p><a href="/lerPost.html">Voltar</a>')
// });