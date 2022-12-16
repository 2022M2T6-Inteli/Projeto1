//Essa rota é referente ao perfil da regional, nessa página o usuário poderá fazer as interações de "Alterar Perfil", "Criar Oportunidade", "Alterar Oportunidade", "Ver Oportunidades Criadas" e "Remover Oportunidades", além de ver suas informações perfil

// Importando módulos
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definições
const router = express.Router(); // Configurando rotas
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // Configuando parser
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Buscando banco de dados

// Obtendo arquivo ejs da rota
const viewPath = path.join(__dirname, "../../frontend/views/regionalPerfil/index"); 
const viewPathAlterarOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/alterarOportunidade"); 
const viewPathAlterarPerfil = path.join(__dirname, "../../frontend/views/regionalPerfil/alterarPerfil"); 
const viewPathTeste = path.join(__dirname, "../../frontend/views/regionalPerfil/perfil_contrante"); 
const viewPathTeste2 = path.join(__dirname, "../../frontend/views/regionalPerfil/perfil_contranteteste"); 
const viewPathCriarOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/criarOportunidade"); 
const viewPathFormOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/formOportunidade"); 
const viewPathFormPerfil = path.join(__dirname, "../../frontend/views/regionalPerfil/formPerfil"); 
const viewPathInteressados= path.join(__dirname, "../../frontend/views/regionalPerfil/interessados"); 
const viewPathListar = path.join(__dirname, "../../frontend/views/regionalPerfil/listar"); 
const viewPathRemover = path.join(__dirname, "../../frontend/views/regionalPerfil/remover"); 

router 
	.route('/')
	.get((req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		const params = [req.query.id_contratante];
		console.log('QUERY', params);

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });


		const sql = "SELECT * FROM Contratante WHERE ID_Contratante=? ";
		console.log(sql);


		db.get(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
			res.render(viewPath, { model: rows });
		});
	})

router 
	.route('/perfil_contrante')
	.get(urlencodedParser,(req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		const params = [req.query.id_contratante];
		console.log('QUERY', params);

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });


		const sql = `SELECT * FROM Contratante WHERE ID_Contratante="${params}"`;
		console.log(sql);


		db.get(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
			console.log("entrou");
			res.render(viewPathTeste, { model: rows });
		});
	})

router 
	.route('/perfil_contranteteste')
	.get((req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		const params = [req.query.id_contratante];
		console.log('QUERY', params);

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });


		const sql = "SELECT * FROM Contratante WHERE ID_Contratante=? ";
		console.log(sql);


		db.get(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
			console.log("entrou");
			res.render(viewPathTeste2, { model: rows });
		});
	})

router
	.route("/alterarPerfil")
	.get((req, res) => {
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); 

		let ID_Contratante = req.query["id_contratante"];

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });

		
		if (!ID_Contratante) {
			res.send("ID faltando");
			return;
		}

		const sql = "SELECT ID_Contratante, Cpf, Nome, Email, Celular, Regional FROM Contratante WHERE ID_Contratante=?";

		console.log(sql);
		id=req.query.id_contratante
		
		db.get(sql, [ID_Contratante], (err, rows) => { 
            if (err) {
                throw err;
            }
			res.render(viewPathFormPerfil, { id: id, model: rows });
		});
	})
	.post(urlencodedParser, (req, res) => {
		console.log(res.body)
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });

		let msg;
	
		let Cpf = req.body["Cpf"];
		let Nome = req.body["Nome"];
		let Email = req.body["Email"];
		let Celular = req.body["Celular"];
		let Regional = req.body["Regional"];
		let ID_Contratante = req.body["ID_Contratante"];

	
		if (!Cpf) {
			res.send("CPF faltando");
			return;
		}

		if (!Nome) {
			res.send("Nome faltando");
			return;
		}

		if (!Email) {
			res.send("Email faltando"); 
			return;
		}
		if (!Celular) {
			res.send("Celular faltando");
			return;
		}
		if (!Regional) {
			res.send("Regional faltando");
			return;
		}
	
		const sql = "UPDATE Contratante SET Cpf=?, Nome=?, Email=?, Celular=?, Regional=? WHERE ID_Contratante=?";
	
		console.log(sql);

	
		db.run(sql, [Cpf, Nome, Email, Celular, Regional, ID_Contratante], (err, rows) => {
			if (err) 
                throw err;
			else
				msg = "Usuário Alterado!";
			id=ID_Contratante
			console.log('id db run', id);
			res.render(viewPathAlterarPerfil, { mensagem: msg, id: id });
		});
	});
	
router
	.route('/alterarOportunidade') 
	.get((req, res) => {
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); 
		let ID_Contratante = req.query["id"];
		let ID_Oportunidade = req.query["id_oportunidade"];
		
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
			console.log('id', ID_Contratante);
			console.log('id_oportu', ID_Oportunidade);
        });
	
		if (!ID_Oportunidade) {
			res.send("Id oportunidade");
			return;
		}
		if (!ID_Contratante) {
			res.send("Id contratante");
			return;
		}
	
	
		const sql = "SELECT ID_Contratante, ID_Oportunidade, Data_Oportunidade, Servico, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade FROM Oportunidade WHERE ID_Contratante=? AND ID_Oportunidade=?";
	
		console.log(sql);
	
		db.get(sql, [ID_Contratante, ID_Oportunidade], (err, row) => {
            if (err) {
                throw err;
            }
			id= ID_Contratante
			res.render(viewPathFormOportunidade, { Oportunidade: row });
		});
	})
	.post(urlencodedParser, (req, res) => {
		res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
		
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });

		let msg;
		let ID_Contratante = req.body["ID_Contratante"];
		let ID_Oportunidade = req.body["ID_Oportunidade"];
		let Data_Oportunidade = req.body["Data_Oportunidade"];
		let Servico = req.body["Servico"];
		let Titulo = req.body["Titulo"];
		let Descricao = req.body["Descricao"]; 
		let Data_Inicio = req.body["Data_Inicio"];
		let Data_Fim = req.body["Data_Fim"];
		let Estado = req.body["Estado"];
		let Cidade = req.body["Cidade"];

	
		if (!ID_Oportunidade) {
			res.send("Id faltando");
			return;
		}
		
		if (!Data_Oportunidade) {
			res.send("Data oportunidade faltando");
			return;
		}
	
		if (!Servico) {
			res.send("Serviço faltando"); 
			return;
		}
		if (!Titulo) {
			res.send("Título faltando");
			return;
		}
		if (!Descricao) {
			res.send("Descricao faltando");
			return;
		}
		if (!Data_Inicio) {
			res.send("Data inicio faltando");
			return;
		}
		if (!Data_Fim) {
			res.send("Data fim faltando");
			return;
		}
		if (!Estado) {
			res.send("Estado faltando");
			return;
		}
		if (!Cidade) {
			res.send("Cidade faltando");
			return;
		}
	
		const sql = "UPDATE Oportunidade SET Data_Oportunidade=?, Servico=?, Titulo=?, Descricao=?, Data_Inicio=?, Data_Fim=?, Estado=?, Cidade=? WHERE ID_Oportunidade=? AND Oportunidade.ID_Contratante=?";
	
		console.log(sql);
		console.log("ID_OPORTUNNIDADE: " + ID_Oportunidade);
	
		db.run(sql, [Data_Oportunidade, Servico, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade, ID_Oportunidade, ID_Contratante], (err, rows) => {

			if (err) 
				throw err;
			else
				msg = "Oportunidade Alterada!";
			id=ID_Contratante
			id_oportunidade=ID_Oportunidade
			res.render(viewPathAlterarOportunidade, { mensagem: msg });
		});
	});

router
	.route('/listar')
	.get((req, res) => {
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); 
		const params = [req.query.id];
		console.log('QUERY', params);

        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });
	
		const sql = "SELECT * FROM Oportunidade WHERE ID_Contratante=? ";
		console.log(sql);
	
		db.all(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }
	
			res.render(viewPathListar, { model: rows, id: req.query.id });
		});
	});

router
	.route('/remover')
	.get((req, res) => {
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*'); 
		let ID_Contratante = req.query["id"];
		let ID_Oportunidade = req.query["id_oportunidade"];
		
        var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });

		let msg;
	
		const sql = "DELETE FROM Oportunidade WHERE ID_Contratante=? AND ID_Oportunidade=?";
		console.log(sql);
	
		db.run(sql, [ID_Contratante, ID_Oportunidade], (err, rows) => {
			if (err) 
				throw err;
			else
				msg = "Oportunidade Removida!";
	
			res.render(viewPathRemover, { mensagem: msg });
		});
	});
	
router
	.route('/criarOportunidade')
	.get((req, res) => {
		id=req.query.id
		res.render(viewPathCriarOportunidade, {id: id});
	})
	.post(urlencodedParser, (req, res) => {
		res.statusCode = 200; 
        res.setHeader('Access-Control-Allow-Origin', '*');

		var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });


		const Data_Oportunidade = req.body["Data_Oportunidade"];
		const Servico = req.body["Servico"];
		const Titulo = req.body["Titulo"];
		const Descricao = req.body["Descricao"]; 
		const Data_Inicio = req.body["Data_Inicio"];
		const Data_Fim = req.body["Data_Fim"];
		const Estado = req.body["Estado"];
		const Cidade = req.body["Cidade"];
		const ID_Contratante = req.body["ID_Contratante"]; 
		console.log("ID: "+ID_Contratante);
		
	
		if (!Data_Oportunidade) {
			res.send("Data oportunidade faltando");
			return;
		}
	
		if (!Servico) {
			res.send("Serviço faltando"); 
			return;
		}
		if (!Titulo) {
			res.send("Título faltando");
			return;
		}
		if (!Descricao) {
			res.send("Descricao faltando");
			return;
		}
		if (!Data_Inicio) {
			res.send("Data inicio faltando");
			return;
		}
		if (!Data_Fim) {
			res.send("Data fim faltando");
			return;
		}
		if (!Estado) {
			res.send("Estado faltando");
			return;
		}
		if (!Cidade) {
			res.send("Cidade faltando");
			return;
		}
	
		const sql = "INSERT INTO Oportunidade (Data_Oportunidade, Servico, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade, ID_Contratante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		console.log(sql);
	
		db.run(sql, [Data_Oportunidade, Servico, Titulo, Descricao, Data_Inicio, Data_Fim, Estado, Cidade, ID_Contratante], (err, rows) => {
			if (err) 
                throw err;
			else
				msg = "Oportunidade criada!";
            
			res.render(viewPathAlterarOportunidade, {id: id, mensagem: msg });
		});
	});

module.exports = router;

