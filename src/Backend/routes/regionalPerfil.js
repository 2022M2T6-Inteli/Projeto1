// Import modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Definitions
const router = express.Router(); // Setup router
const viewPath = path.join(__dirname, "../../frontend/views/regionalPerfil/index"); // Fetch the ejs file
const viewPathAlterarOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/alterarOportunidade"); // Fetch the ejs file
const viewPathAlterarPerfil = path.join(__dirname, "../../frontend/views/regionalPerfil/alterarPerfil"); // Fetch the ejs file
const viewPathAvaliar = path.join(__dirname, "../../frontend/views/regionalPerfil/avaliar"); // Fetch the ejs file
const viewPathCriarOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/criarOportunidade"); // Fetch the ejs file
const viewPathFormOportunidade = path.join(__dirname, "../../frontend/views/regionalPerfil/formOportunidade"); // Fetch the ejs file
const viewPathFormPerfil = path.join(__dirname, "../../frontend/views/regionalPerfil/formPerfil"); // Fetch the ejs file
const viewPathInteressados= path.join(__dirname, "../../frontend/views/regionalPerfil/interessados"); // Fetch the ejs file
const viewPathListar = path.join(__dirname, "../../frontend/views/regionalPerfil/listar"); // Fetch the ejs file
const viewPathRemover = path.join(__dirname, "../../frontend/views/regionalPerfil/remover"); // Fetch the ejs file
const urlencodedParser = bodyParser.urlencoded({ extended: false }) // Setup parser
const DBPATH = path.join(__dirname, "../data/ConstruMatch.db"); // Fetch the database

router
	.route('/')
	.get((req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		const params = [req.query.id];
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
	.route("/alterarPerfil")
	.get((req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		//const params = [req.query.id];
		let ID_Contratante = req.query["id"];

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
		id=req.query.id
		
		db.get(sql, [ID_Contratante], (err, rows) => { //entender com o prof oqe o ID_
		//db.get(sql, params, (err, rows) => {
            if (err) {
                throw err;
            }

			res.render(viewPathFormPerfil, { id: id, model: rows });
		});
	})
	.post(urlencodedParser, (req, res) => {
		console.log(res.body)
		res.statusCode = 200; // Status: OK
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
	.route('/alterarOportunidade') //como linkar com o id regional ?
	.get((req, res) => {
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
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
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
		
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
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
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
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*'); // No CORS errors
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
		res.statusCode = 200; // Status: OK
        res.setHeader('Access-Control-Allow-Origin', '*');
		// const Id_Oportunidade = req.body["Id_Oportunidade"]; // esse ID n é usado msm? Verificar prof

		var db = new sqlite3.Database(DBPATH, err => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Successful connection to the database 'ConstruMatch.db'");
        });


		const Data_Oportunidade = req.body["Data_Oportunidade"];
		const Servico = req.body["Servico"];
		const Titulo = req.body["Titulo"];
		const Descricao = req.body["Descricao"]; // entender se a MRV vai postar isso tbm ou nao
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
	


// ////como nesse caso so vai haver apenas um usuario, n é necessário ordenar, verificar com o prof minha sugestão?? ctrl+k+c
// router.all("/", (req, res) => { // rota index onde será a tela inicial do perfil do usuário, nessa tela aparecerá as informações deles e os links "Ver Oportunidades", "Alterar Perfil", "Criar Oportunidades"
// 	let pessoas; //entender pq foi declarado essas 3 variaveis? Declaro o nome da minha tabela??
// 	let ordenar = req.query["ordenar"];
// 	let params;

// 	if (!ordenar) {
// 		ordenar = "";
// 		params = [];
// 	} else {
// 		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
// 		params = [ordenar];
// 	}

// 	const sql = "SELECT CPF_Responsavel, Nome_Responsavel, Email_Responsavel, Celular_Responsavel, Departamento_Responsavel, Funcao_Responsavel, Empresa_Responsavel FROM Regional " + ordenar;
// 	console.log(sql);

// 	db.all(sql, params, (err, rows) => {
// 		if (err) {
// 			console.error(err.message);
// 			res.send("Erro: " + err.message);
// 			return;
// 		}

// 		res.render("regionalPerfil/index", { model: rows });
// 	});
// });

// router.get("/alterarOportunidade", (req, res) => { 
// 	let id = req.query["Id_Oportunidade"];
// 	let data_oportunidade = req.query["Data_Oportunidade"];
// 	let servico = req.query["Servico"];
// 	let titulo = req.query["Titulo"];
// 	let escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
// 	let data_inicio = req.query["Data_Inicio"];
// 	let data_fim = req.query["Data_Fim"];
// 	let status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
// 	let estado = req.query["Estado"];
// 	let cidade = req.query["Cidade"];
// 	let nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
// 	let endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

// 	if (!id) {
// 		res.send("Id faltando");
// 		return;
// 	}

// 	if (!data_oportunidade) {
// 		res.send("Data oportunidade faltando");
// 		return;
// 	}

// 	if (!servico) {
// 		res.send("Serviço faltando"); 
// 		return;
// 	}
// 	if (!titulo) {
// 		res.send("Título faltando");
// 		return;
// 	}
// 	if (!escopo) {
// 		res.send("Escopo faltando");
// 		return;
// 	}
// 	if (!data_inicio) {
// 		res.send("Data inicio faltando");
// 		return;
// 	}
// 	if (!data_fim) {
// 		res.send("Data fim faltando");
// 		return;
// 	}
// 	if (!status) {
// 		res.send("Status faltando");
// 		return;
// 	}
// 	if (!estado) {
// 		res.send("Estado faltando");
// 		return;
// 	}
// 	if (!cidade) {
// 		res.send("Cidade faltando");
// 		return;
// 	}
// 	if (!nome_obra) {
// 		res.send("Nome obra faltando");
// 		return;
// 	}
// 	if (!endereco) {
// 		res.send("Endereço faltando");
// 		return;
// 	}

// 	const sql = "SELECT Id_Oportunidade, Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco FROM Oportunidade WHERE id=?";

// 	console.log(sql);

// 	db.get(sql, [id], (err, row) => {
// 		if (err) {
// 			console.error(err.message);
// 			res.send("Erro: " + err.message);
// 			return;
// 		}

// 		res.render("regionalPerfil/formOportunidade", { funcionario: row });
// 	});
// });

// router.post("/alterarOportunidade", (req, res) => {
// 	let msg;
// 	let id = req.query["Id_Oportunidade"];
// 	let data_oportunidade = req.query["Data_Oportunidade"];
// 	let servico = req.query["Servico"];
// 	let titulo = req.query["Titulo"];
// 	let escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
// 	let data_inicio = req.query["Data_Inicio"];
// 	let data_fim = req.query["Data_Fim"];
// 	let status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
// 	let estado = req.query["Estado"];
// 	let cidade = req.query["Cidade"];
// 	let nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
// 	let endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

// 	if (!id) {
// 		res.send("Id faltando");
// 		return;
// 	}
	
// 	if (!data_oportunidade) {
// 		res.send("Data oportunidade faltando");
// 		return;
// 	}

// 	if (!servico) {
// 		res.send("Serviço faltando"); 
// 		return;
// 	}
// 	if (!titulo) {
// 		res.send("Título faltando");
// 		return;
// 	}
// 	if (!escopo) {
// 		res.send("Escopo faltando");
// 		return;
// 	}
// 	if (!data_inicio) {
// 		res.send("Data inicio faltando");
// 		return;
// 	}
// 	if (!data_fim) {
// 		res.send("Data fim faltando");
// 		return;
// 	}
// 	if (!status) {
// 		res.send("Status faltando");
// 		return;
// 	}
// 	if (!estado) {
// 		res.send("Estado faltando");
// 		return;
// 	}
// 	if (!cidade) {
// 		res.send("Cidade faltando");
// 		return;
// 	}
// 	if (!nome_obra) {
// 		res.send("Nome obra faltando");
// 		return;
// 	}
// 	if (!endereco) {
// 		res.send("Endereço faltando");
// 		return;
// 	}

// 	const sql = "UPDATE Oportunidade SET Data_Oportunidade=?, Servico=?, Titulo=?, Escopo=?, Data_Inicio=?, Data_Fim=?, Status=?, Estado=?, Cidade=?, Nome_Obra=?, Endereco=? FROM Oportunidade WHERE id=?";

// 	console.log(sql);

// 	db.run(sql, [nome, email, id], (err, rows) => {
// 		if (err)
// 			msg = "Erro: " + err.message;
// 		else
// 			msg = "Usuário Alterado!";

// 		res.render("regionalPerfil/alterarOportunidade", { mensagem: msg });
// 	});
// });

// // entender com o prof como faço aparecer apenas as oportunidades daquele regional
// router.all("/listar", (req, res) => { //essa URL aparecerá quando o usuário apertar "Ver Oportunidades" no index do perfil, nessa página ele tera como botões "Alterar Oportunidade", "Remover Oportunidade" e ver "Interessados" para cada oportunidade
// 	let pessoas; //entender pq foi declarado essas 3 variaveis? Declaro o nome da minha tabela??
// 	let ordenar = req.query["ordenar"];
// 	let params;

// 	if (!ordenar) {
// 		ordenar = "";
// 		params = [];
// 	} else {
// 		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
// 		params = [ordenar];
// 	}

// 	const sql = "SELECT Id_Oportunidade, Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco FROM Oportunidades " + ordenar;
// 	console.log(sql);

// 	db.all(sql, params, (err, rows) => {
// 		if (err) {
// 			console.error(err.message);
// 			res.send("Erro: " + err.message);
// 			return;
// 		}

// 		res.render("regionalPerfil/listar", { model: rows });
// 	});
// });

// router.get("/remover", (req, res) => {
// 	let msg;
// 	let id = req.query["id"];

// 	const sql = "DELETE FROM Oportunidades WHERE id=?";
// 	console.log(sql);

// 	db.all(sql, [id], (err, rows) => {
// 		if (err)
// 			msg = err.message;
// 		else
// 			msg = "Usuário Removido!";

// 		res.render("regionalPerfil/remover", { mensagem: msg });
// 	});
// });

// router.all("/criarOportunidade", (req, res) => {
// 	const id = req.query["Id_Oportunidade"];
// 	const data_oportunidade = req.query["Data_Oportunidade"];
// 	const servico = req.query["Servico"];
// 	const titulo = req.query["Titulo"];
// 	const escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
// 	const data_inicio = req.query["Data_Inicio"];
// 	const data_fim = req.query["Data_Fim"];
// 	const status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
// 	const estado = req.query["Estado"];
// 	const cidade = req.query["Cidade"];
// 	const nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
// 	const endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

// 	if (!data_oportunidade) {
// 		res.send("Data oportunidade faltando");
// 		return;
// 	}

// 	if (!servico) {
// 		res.send("Serviço faltando"); 
// 		return;
// 	}
// 	if (!titulo) {
// 		res.send("Título faltando");
// 		return;
// 	}
// 	if (!escopo) {
// 		res.send("Escopo faltando");
// 		return;
// 	}
// 	if (!data_inicio) {
// 		res.send("Data inicio faltando");
// 		return;
// 	}
// 	if (!data_fim) {
// 		res.send("Data fim faltando");
// 		return;
// 	}
// 	if (!status) {
// 		res.send("Status faltando");
// 		return;
// 	}
// 	if (!estado) {
// 		res.send("Estado faltando");
// 		return;
// 	}
// 	if (!cidade) {
// 		res.send("Cidade faltando");
// 		return;
// 	}
// 	if (!nome_obra) {
// 		res.send("Nome obra faltando");
// 		return;
// 	}
// 	if (!endereco) {
// 		res.send("Endereço faltando");
// 		return;
// 	}

// 	// os nomes abaixo tem que estar na mesma ordem de cima??
// 	//os nomes abaxio tem que estar igual ao da tabela ou igual as variaveis declaradas acima??
// 	const sql = "INSERT INTO Oportunidade (data_oportunidade, servico, titulo, escopo, data_inicio, data_fim, status, estado, cidade, nome_obra, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// 	console.log(sql);

// 	db.run(sql, [data_oportunidade, servico, titulo, escopo, data_inicio, data_fim, status, estado, cidade, nome_obra, endereco], (err, rows) => {
// 		if (err) {
// 			res.send("Erro: " + err.message);
// 			console.error(err.message);
// 			return;
// 		}

// 		res.render("regionalPerfil/criarOportunidade", { msg: mensagem }); //escrevi para renderizar essa página pq dps de criado quero que volte para o perfil, verificar com o professor?
// 	});
// });

// //como junto o id da oportunidade na proposta??
// //como faço  a avaliação geral ser a média das avaliações?
// router.all("/avaliar", (req, res) => {
// 	const id = req.query["Id_Oportunidade"];
// 	const idAvaliacao = req.query["Id_Avaliacao"]; //necessário criar essa coluna no db
// 	const avaliacaoGeral = req.query["Avaliacao_Geral"]; 
// 	const organizacao = req.query["Organizacao"]; 
// 	const produtividade = req.query["Produtividade"]; 
// 	const documentacao = req.query["Documentacao"]; 
// 	const limpeza = req.query["Limpeza"]; 
	
// 	if (!organizacao) {
// 		res.send("Organização faltando");
// 		return;
// 	}

// 	if (!produtividade) {
// 		res.send("Produtividade faltando"); 
// 		return;
// 	}

// 	if (!documentacao) {
// 		res.send("Documentacao faltando");
// 		return;
// 	}

// 	if (!limpeza) {
// 		res.send("Limpeza faltando");
// 		return;
// 	}

// 	// os nomes abaixo tem que estar na mesma ordem de cima??
// 	//os nomes abaxio tem que estar igual ao da tabela ou igual as variaveis declaradas acima??
// 	const sql = "INSERT INTO Avaliacoes (Organizacao, Produtividade, Documentacao, Limpezaco) VALUES (?, ?,  ? ?)";
// 	console.log(sql);

// 	db.run(sql, [organizacao, produtividade, documentacao, limpeza], (err, rows) => {
// 		if (err) {
// 			res.send("Erro: " + err.message);
// 			console.error(err.message);
// 			return;
// 		}
// 		res.render("regionalPerfil/avaliar", {msg: mensagem}); //escrevi para renderizar essa página pq dps de criado quero que volte para o perfil, verificar com o professor?
// 	});
// });

module.exports = router;

