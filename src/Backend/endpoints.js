const express = require('express'); 
const app = express();

const hostname = '127.0.0.1'; //Definição do hostname;
const port = 3000; //Definição de qual porta será usada
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db'; //referencia o arquivo do banco de dados



//READ
app.use(express.json());
app.get('/sobre_mim', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT endereco, telefone, email, descricao FROM sobre_mim';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


//CREATE
app.post('/insereUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO tbUser (title, id, completed) VALUES ('" + req.body.title + "', 33, " + req.body.completed + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		
	});
	db.close(); // Fecha o banco
	res.end();
});

//UPDATE
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"; //Lê-se: "update a tabela costumers, colocando (set) no parâmetro adress o termo ... no lugar (where) do termo ..."
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

//DELETE
app.post('/removeUsuario', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM tbUser WHERE userId='"+ req.body.userId +"'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.use(express.json());
app.get('/experiencia', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT empresa, descricao, nome_da_empresa, periodo FROM experiencia ORDER BY empresa DESC';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
	res.write();
    db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  // 2 updates, 