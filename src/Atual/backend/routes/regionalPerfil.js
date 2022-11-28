const express = require('express');
const db = require('../utils/db');

const router = express.Router();

router.all("/", (req, res) => {
	res.render("regionalProfile/index");
});

router.get("/alterarOportunidade", (req, res) => {
	let id = req.query["Id_Oportunidade"];
	let data_oportunidade = req.query["Data_Oportunidade"];
	let servico = req.query["Servico"];
	let titulo = req.query["Titulo"];
	let escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	let data_inicio = req.query["Data_Inicio"];
	let data_fim = req.query["Data_Fim"];
	let status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	let estado = req.query["Estado"];
	let cidade = req.query["Cidade"];
	let nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
	let endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

	if (!id) {
		res.send("Id faltando");
		return;
	}

	if (!data_oportunidade) {
		res.send("Data oportunidade faltando");
		return;
	}

	if (!servico) {
		res.send("Serviço faltando"); 
		return;
	}
	if (!titulo) {
		res.send("Título faltando");
		return;
	}
	if (!escopo) {
		res.send("Escopo faltando");
		return;
	}
	if (!data_inicio) {
		res.send("Data inicio faltando");
		return;
	}
	if (!data_fim) {
		res.send("Data fim faltando");
		return;
	}
	if (!status) {
		res.send("Status faltando");
		return;
	}
	if (!estado) {
		res.send("Estado faltando");
		return;
	}
	if (!cidade) {
		res.send("Cidade faltando");
		return;
	}
	if (!nome_obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!endereco) {
		res.send("Endereço faltando");
		return;
	}

	const sql = "SELECT Id_Oportunidade, Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco FROM Oportunidades WHERE id=?";

	console.log(sql);

	db.get(sql, [id], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("regionalPerfil/form", { funcionario: row });
	});
});

router.post("/alterarOportunidade", (req, res) => {
	let msg;
	let id = req.query["Id_Oportunidade"];
	let data_oportunidade = req.query["Data_Oportunidade"];
	let servico = req.query["Servico"];
	let titulo = req.query["Titulo"];
	let escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	let data_inicio = req.query["Data_Inicio"];
	let data_fim = req.query["Data_Fim"];
	let status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	let estado = req.query["Estado"];
	let cidade = req.query["Cidade"];
	let nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
	let endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

	if (!id) {
		res.send("Id faltando");
		return;
	}
	
	if (!data_oportunidade) {
		res.send("Data oportunidade faltando");
		return;
	}

	if (!servico) {
		res.send("Serviço faltando"); 
		return;
	}
	if (!titulo) {
		res.send("Título faltando");
		return;
	}
	if (!escopo) {
		res.send("Escopo faltando");
		return;
	}
	if (!data_inicio) {
		res.send("Data inicio faltando");
		return;
	}
	if (!data_fim) {
		res.send("Data fim faltando");
		return;
	}
	if (!status) {
		res.send("Status faltando");
		return;
	}
	if (!estado) {
		res.send("Estado faltando");
		return;
	}
	if (!cidade) {
		res.send("Cidade faltando");
		return;
	}
	if (!nome_obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!endereco) {
		res.send("Endereço faltando");
		return;
	}

	const sql = "UPDATE Oportunidades SET Data_Oportunidade=?, Servico=?, Titulo=?, Escopo=?, Data_Inicio=?, Data_Fim=?, Status=?, Estado=?, Cidade=?, Nome_Obra=?, Endereco=? FROM Oportunidades WHERE id=?";

	console.log(sql);

	db.run(sql, [nome, email, id], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("regionalPerfil/alterarOportunidade", { mensagem: msg });
	});
});

// entender com o prof como faço aparecer apenas as oportunidades daquele regional
router.all("/listar", (req, res) => {
	let pessoas; //entender pq foi declarado essas 3 variaveis? Declaro o nome da minha tabela??
	let ordenar = req.query["ordenar"];
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}

	const sql = "SELECT Id_Oportunidade, Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco FROM Oportunidades " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("regionalPerfil/listar", { model: rows });
	});
});

router.get("/remover", (req, res) => {
	let msg;
	let id = req.query["id"];

	const sql = "DELETE FROM Oportunidades WHERE id=?";
	console.log(sql);

	db.all(sql, [id], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("regionalPerfil/remover", { mensagem: msg });
	});
});

router.all("/criarOportunidade", (req, res) => {
	const id = req.query["Id_Oportunidade"];
	const data_oportunidade = req.query["Data_Oportunidade"];
	const servico = req.query["Servico"];
	const titulo = req.query["Titulo"];
	const escopo = req.query["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	const data_inicio = req.query["Data_Inicio"];
	const data_fim = req.query["Data_Fim"];
	const status = req.query["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	const estado = req.query["Estado"];
	const cidade = req.query["Cidade"];
	const nome_obra = req.query["Nome_Obra"]; //necessario atualizar o db com essa coluna e apagar o CNPJ 
	const endereco = req.query["Endereco"]; //necessario atualizar o db com essa coluna e apagar o CNPJ

	if (!data_oportunidade) {
		res.send("Data oportunidade faltando");
		return;
	}

	if (!servico) {
		res.send("Serviço faltando"); 
		return;
	}
	if (!titulo) {
		res.send("Título faltando");
		return;
	}
	if (!escopo) {
		res.send("Escopo faltando");
		return;
	}
	if (!data_inicio) {
		res.send("Data inicio faltando");
		return;
	}
	if (!data_fim) {
		res.send("Data fim faltando");
		return;
	}
	if (!status) {
		res.send("Status faltando");
		return;
	}
	if (!estado) {
		res.send("Estado faltando");
		return;
	}
	if (!cidade) {
		res.send("Cidade faltando");
		return;
	}
	if (!nome_obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!endereco) {
		res.send("Endereço faltando");
		return;
	}

	// os nomes abaixo tem que estar na mesma ordem de cima??
	//os nomes abaxio tem que estar igual ao da tabela ou igual as variaveis declaradas acima??
	const sql = "INSERT INTO Oportunidade (data_oportunidade, servico, titulo, escopo, data_inicio, data_fim, status, estado, cidade, nome_obra, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	console.log(sql);

	db.run(sql, [data_oportunidade, servico, titulo, escopo, data_inicio, data_fim, status, estado, cidade, nome_obra, endereco], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("regionalPerfil/criarOportunidade", { msg: mensagem }); //escrevi para renderizar essa página pq dps de criado quero que volte para o perfil, verificar com o professor?
	});
});

//como junto o id da oportunidade na proposta??
//como faço  a avaliação geral ser a média das avaliações?
router.all("/avaliar", (req, res) => {
	const id = req.query["Id_Oportunidade"];
	const idAvaliacao = req.query["Id_Avaliacao"]; //necessário criar essa coluna no db
	const avaliacaoGeral = req.query["Avaliacao_Geral"]; 
	const organizacao = req.query["Organizacao"]; 
	const produtividade = req.query["Produtividade"]; 
	const documentacao = req.query["Documentacao"]; 
	const limpeza = req.query["Limpeza"]; 
	
	if (!organizacao) {
		res.send("Organização faltando");
		return;
	}

	if (!produtividade) {
		res.send("Produtividade faltando"); 
		return;
	}

	if (!documentacao) {
		res.send("Documentacao faltando");
		return;
	}

	if (!limpeza) {
		res.send("Limpeza faltando");
		return;
	}

	// os nomes abaixo tem que estar na mesma ordem de cima??
	//os nomes abaxio tem que estar igual ao da tabela ou igual as variaveis declaradas acima??
	const sql = "INSERT INTO Avaliacoes (Organizacao, Produtividade, Documentacao, Limpezaco) VALUES (?, ?,  ? ?)";
	console.log(sql);

	db.run(sql, [organizacao, produtividade, documentacao, limpezaco], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}
		res.render("regionalPerfil/avaliar", {msg: mensagem}); //escrevi para renderizar essa página pq dps de criado quero que volte para o perfil, verificar com o professor?
	});
});

module.exports = router;

