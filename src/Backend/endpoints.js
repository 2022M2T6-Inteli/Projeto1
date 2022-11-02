const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const hostname = '127.0.0.1'; //Definição do hostname;
const port = 3000; //Definição de qual porta será usada
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database_projetoMRV.db'; //referencia o arquivo do banco de dados

app.use(express.static("../Frontend/"));
app.use(express.json());


app.get('/read_user_empreiteira', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT CNPJ, Nome_Fantasia FROM Empreiteira';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


//CREATE USUÁRIO EMPREITEIRA
app.post('/criar_user_empreiteira', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(req.body)
	 sql = `INSERT INTO Empreiteira (CNPJ, Nome_Fantasia) VALUES ('${req.body.CNPJ}', '${req.body.Nome_Fantasia}')`;
	 console.log(sql);
	 db.run(sql, [],  err => {
	 	if (err) {
	 	    throw err;
	 	}
	 	res.send();
	 });
	
	 db.close(); // Fecha o banco
	 
});

//UPDATE
app.post('/atualizar_user_empreiteira', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = `UPDATE Empreiteira SET Nome_Fantasia = '${req.body.Novo_Nome}' WHERE Nome_Fantasia = '${req.body.Nome_Fantasia}'`; //Lê-se: "update a tabela costumers, colocando (set) no parâmetro adress o termo ... no lugar (where) do termo ...""
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(sql)
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
});

//DELETE
app.post('/remover_user_empeiteira', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `DELETE FROM Empreiteira WHERE CNPJ='${req.body.CNPJ}'`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  // 2 updates 