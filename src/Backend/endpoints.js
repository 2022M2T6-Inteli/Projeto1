const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const hostname = '127.0.0.1'; //Definição do hostname;
const port = 3000; //Definição de qual porta será usada
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database_projeto_web.db'; //referencia o arquivo do banco de dados

app.use(express.static("../Frontend/"));
app.use(express.json());


//CREATE USUÁRIO EMPREITEIRA
app.post('/empreiteira/criar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	 sql = `INSERT INTO Empreiteira (CNPJ, Nome_Fantasia) VALUES ('${req.body.CNPJ}', '${req.body.Nome_Fantasia}')`;
	 console.log(sql);
	 db.run(sql, [],  err => {
	 	if (err) {
	 	    throw err;
	 	}
	 	res.send();
	 });
	 db.close(); // Fecha o banco
	 res.write('<p>Empreiteira cadastrada com sucesso!</p><a href="/lerUserEmp.html">Voltar</a>')
	 
});


//LER USER EMPREITEIRA
app.get('/empreiteira', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT CNPJ, Nome_Fantasia FROM Empreiteira';
	console.log(sql)
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


//UPDATE EMPREITEIRA
app.get('/empreiteira/atualizar', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	 var sql = "SELECT CNPJ, Nome_Fantasia FROM Empreiteira WHERE CNPJ="+ req.query.CNPJ;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/empreiteira/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var sql = `UPDATE Empreiteira SET Nome_Fantasia = '${req.body.Novo_Nome}' WHERE CNPJ = '${req.body.CNPJ}'`; //Lê-se: "update a tabela costumers, colocando (set) no parâmetro adress o termo ... no lugar (where) do termo ...""
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(sql)
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	res.write('<p>Nome fantasia atualizado com sucesso!</p><a href="/lerUserEmp.html">Voltar</a>')
	db.close(); // Fecha o banco
});

//DELETAR UMA EMPREITEIRA
app.get('/empreiteira/remover', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var sql = `DELETE FROM Empreiteira WHERE CNPJ='${req.query.CNPJ}'`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	res.write('<p>Empreiteira removida com sucesso!</p><a href="/lerUserEmp.html">Voltar</a>');
	db.close(); // Fecha o banco
});


//CREATE post
app.post('/postagem/criar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `INSERT INTO Oportunidade (Titulo, Descricao, Data_Inicio, ID_SPE) VALUES ('${req.body.Titulo}', '${req.body.Descricao}', '${req.body.Data_Inicio}', '${req.body.ID_SPE}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
	 	    throw err;
	 	}
	 	res.send();
	 });
	 db.close(); // Fecha o banco
	 res.write('<p>Postagem feita com sucesso!</p><a href="/lerPost.html">Voltar</a>')
	 
});

//LER POSTAGEM PARA UPTADE
app.get('/postagem/atualizar', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT Titulo, Descricao, Data_Inicio, ID_Oportunidade FROM Oportunidade WHERE ID_Oportunidade= '${req.query.ID_Oportunidade}'`;
	console.log(sql)
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//UPDATE POSTAGEM
app.post('/postagem/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `UPDATE Oportunidade SET Titulo= '${req.body.Titulo}', Descricao= '${req.body.Descricao}', Data_Inicio= '${req.body.Data_Inicio}' WHERE ID_Oportunidade= '${req.body.ID_Oportunidade}'`; //Lê-se: "update a tabela costumers, colocando (set) no parâmetro adress o termo ... no lugar (where) do termo ...""
	console.log(sql)
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
	res.write('<p>Postagem atualizada com sucesso!</p><a href="/lerPost.html">Voltar</a>')
});

//DELETE post
app.get('/postagem/remover', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `DELETE FROM Oportunidade WHERE ID_Oportunidade='${req.query.ID_Oportunidade}'`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
	res.write('<p>Postagem apagada com sucesso!</p><a href="/lerPost.html">Voltar</a>')
});

//READ post
app.get('/postagem', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT Titulo, Descricao, Data_Inicio, ID_Oportunidade FROM Oportunidade';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


//Cadastrar um SPE no banco
app.post('/spe/criar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `INSERT INTO SPE (CNPJ, Nome_Fantasia, Data_Abertura) VALUES ('${req.body.CNPJ}', '${req.body.Nome_Fantasia}', '${req.body.Data_Abertura}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
	 		throw err;
	 	}
	 	res.send();
	 });
	 db.close(); // Fecha o banco
});

//Listar os SPE
app.get('/spe', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT CNPJ, Nome_Fantasia FROM SPE';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//Ler para atualizar Nome e data de abertura SPE
app.get('/spe/atualizar', (req, res) => {
    res.statusCode = 200; //Código de status HTTP, que indica pro cliente qual a situação da sua requisição
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT Nome_Fantasia, Data_Abertura FROM Oportunidade WHERE CNPJ= '${req.query.CNPJ}'`;
	console.log(sql)
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

//Atualizar nome fantasia e data abertura SPE
app.post('/spe/atualizar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql= `UPDATE SPE SET Nome_Fantasia = '${req.body.Nome_Fantasia}', Data_Abertura= '${req.body.Data_Abertura}' WHERE CNPJ= '${req.body.CNPJ}'`; 
	console.log(req.body.Data_Abertura);
	console.log(sql)
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
});

//Deletar SPE
app.post('/spe/remover', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `DELETE FROM SPE WHERE CNPJ='${req.body.CNPJ}'`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close(); // Fecha o banco
});

//INNER JOIN CNPJ
app.get('/postagem/listar', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(req.body)
	var sql = `SELECT Oportunidade.Titulo, Oportunidade.Descricao, SPE.CNPJ FROM Oportunidade INNER JOIN SPE ON SPE.CNPJ  = Oportunidade.ID_SPE`;
	console.log(sql);
	db.all(sql, [],  (err, rows ) => {
	   if (err) {
		   throw err;
	   }
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


