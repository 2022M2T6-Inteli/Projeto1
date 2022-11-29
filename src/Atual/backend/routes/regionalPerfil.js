const express = require('express');
const db = require('../utils/db');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

////como nesse caso so vai haver apenas um usuario, n é necessário ordenar, verificar com o prof minha sugestão??
router.all("/", (req, res) => { // rota index onde será a tela inicial do perfil do usuário, nessa tela aparecerá as informações deles e os links "Ver Oportunidades", "Alterar Perfil", "Criar Oportunidades"
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

	const sql = "SELECT CPF_Responsavel, Nome_Responsavel, Email_Responsavel, Celular_Responsavel, Departamento_Responsavel, Funcao_Responsavel, Empresa_Responsavel FROM Regional " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("regionalPerfil/index", { model: rows });
	});
});

router.get("/alterarPerfil", (req, res) => { 
	let CPF_Responsavel = req.body["CPF_Responsavel"];
	let Nome_Responsavel = req.body["Nome_Responsavel"];
	let Email_Responsavel = req.body["Email_Responsavel"];
	let Celular_Responsavel = req.body["Celular_Responsavel"];
	let Departamento_Responsavel = req.body["Departamento_Responsavel"]; // entender se a MRV vai postar isso tbm ou nao
	let Funcao_Responsavel = req.body["Funcao_Responsavel"];
	let Empresa_Responsavel = req.body["Empresa_Responsavel"];

	if (!CPF_Responsavel) {
		res.send("CPF faltando");
		return;
	}

	if (!Nome_Responsavel) {
		res.send("Nome faltando");
		return;
	}

	if (!Email_Responsavel) {
		res.send("Email faltando"); 
		return;
	}
	if (!Celular_Responsavel) {
		res.send("Celular faltando");
		return;
	}
	if (!Departamento_Responsavel) {
		res.send("Departamento faltando");
		return;
	}
	if (!Funcao_Responsavel) {
		res.send("Funcao faltando");
		return;
	}
	if (!Empresa_Responsavel) {
		res.send("Data fim faltando");
		return;
	}
	
	const sql = "SELECT CPF_Responsavel, Nome_Responsavel, Email_Responsavel, Celular_Responsavel, Departamento_Responsavel, Funcao_Responsavel, Empresa_Responsavel FROM Regional WHERE CPF_Responsavel=?";

	console.log(sql);

	db.get(sql, [CPF_Responsavel], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("regionalPerfil/formPerfil", { Oportunidade: row });
	});
});

router.post("/alterarPerfil", (req, res) => {
	let msg;
	let CPF_Responsavel = req.body["CPF_Responsavel"];
	let Nome_Responsavel = req.body["Nome_Responsavel"];
	let Email_Responsavel = req.body["Email_Responsavel"];
	let Celular_Responsavel = req.body["Celular_Responsavel"];
	let Departamento_Responsavel = req.body["Departamento_Responsavel"]; 
	let Funcao_Responsavel = req.body["Funcao_Responsavel"];
	let Empresa_Responsavel = req.body["Empresa_Responsavel"];

	if (!CPF_Responsavel) {
		res.send("CPF faltando");
		return;
	}
	
	if (!Nome_Responsavel) {
		res.send("Nome faltando");
		return;
	}

	if (!Email_Responsavel) {
		res.send("Email faltando"); 
		return;
	}
	if (!Celular_Responsavel) {
		res.send("Celular faltando");
		return;
	}
	if (!Departamento_Responsavel) {
		res.send("Departamento faltando");
		return;
	}
	if (!Funcao_Responsavel) {
		res.send("Funcao faltando");
		return;
	}
	if (!Empresa_Responsavel) {
		res.send("Empresa faltando");
		return;
	}


	const sql = "UPDATE Oportunidade SET CPF_Responsavel=?, Nome_Responsavel=?, Email_Responsavel=?, Celular_Responsavel=?, Departamento_Responsavel=?, Funcao_Responsavel=?, Empresa_Responsavel=? FROM Regional WHERE CPF_Responsavel=?";

	console.log(sql);

	db.run(sql, [CPF_Responsavel, Nome_Responsavel, Email_Responsavel, Celular_Responsavel, Departamento_Responsavel, Funcao_Responsavel, Empresa_Responsavel], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("regionalPerfil/alterarPerfil", { mensagem: msg });
	});
});

router.get("/alterarOportunidade", (req, res) => { 
	let Id_Oportunidade = req.body["Id_Oportunidade"];
	let Data_oportunidade = req.body["Data_Oportunidade"];
	let Servico = req.body["Servico"];
	let Titulo = req.body["Titulo"];
	let Escopo = req.body["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	let Data_inicio = req.body["Data_Inicio"];
	let Data_fim = req.body["Data_Fim"];
	let Status = req.body["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	let Estado = req.body["Estado"];
	let Cidade = req.body["Cidade"];
	let Nome_obra = req.body["Nome_Obra"]; 
	let Endereco = req.body["Endereco"]; 

	if (!Id_Oportunidade) {
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
	if (!Escopo) {
		res.send("Escopo faltando");
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
	if (!Status) {
		res.send("Status faltando");
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
	if (!Nome_Obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!Endereco) {
		res.send("Endereço faltando");
		return;
	}

	const sql = "SELECT Id_Oportunidade, Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco FROM Oportunidade WHERE Id_Oportunidade=?";

	console.log(sql);

	db.get(sql, [Id_Oportunidade], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("regionalPerfil/formOportunidade", { Oportunidade: row });
	});
});

router.post("/alterarOportunidade", (req, res) => {
	let msg;
	let Id_Oportunidade = req.body["Id_Oportunidade"];
	let Data_Oportunidade = req.body["Data_Oportunidade"];
	let Servico = req.body["Servico"];
	let Titulo = req.body["Titulo"];
	let Escopo = req.body["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	let Data_Inicio = req.body["Data_Inicio"];
	let Data_Fim = req.body["Data_Fim"];
	let Status = req.body["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	let Estado = req.body["Estado"];
	let Cidade = req.body["Cidade"];
	let Nome_Obra = req.body["Nome_Obra"]; 
	let Endereco = req.body["Endereco"]; 

	if (!Id_Oportunidade) {
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
	if (!Escopo) {
		res.send("Escopo faltando");
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
	if (!Status) {
		res.send("Status faltando");
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
	if (!Nome_Obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!Endereco) {
		res.send("Endereço faltando");
		return;
	}

	const sql = "UPDATE Oportunidade SET Data_Oportunidade=?, Servico=?, Titulo=?, Escopo=?, Data_Inicio=?, Data_Fim=?, Status=?, Estado=?, Cidade=?, Nome_Obra=?, Endereco=? FROM Oportunidade WHERE Id_Oportunidade=?";

	console.log(sql);

	db.run(sql, [Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_fim, Status, Estado, Cidade, Nome_Obra, Endereco, Id_Oportunidade], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Oportunidade Alterada!";

		res.render("regionalPerfil/alterarOportunidade", { mensagem: msg });
	});
});

// entender com o prof como faço aparecer apenas as oportunidades daquele regional
router.all("/listar", (req, res) => { //essa URL aparecerá quando o usuário apertar "Ver Oportunidades" no index do perfil, nessa página ele tera como botões "Alterar Oportunidade", "Remover Oportunidade" e ver "Interessados" para cada oportunidade
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
	let Id_Oportunidade = req.body["Id_Oportunidade"];

	const sql = "DELETE FROM Oportunidades WHERE Id_Oportunidade=?";
	console.log(sql);

	db.all(sql, [Id_Oportunidade], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Oportunidade Removida!";

		res.render("regionalPerfil/remover", { mensagem: msg });
	});
});

router.all("/criarOportunidade", (req, res) => { //usar body com url parser, 
	const Id_Oportunidade = req.body["Id_Oportunidade"]; // esse ID n é usado msm? Verificar prof
	const Data_Oportunidade = req.body["Data_Oportunidade"];
	const Servico = req.body["Servico"];
	const Titulo = req.body["Titulo"];
	const Escopo = req.body["Escopo"]; // entender se a MRV vai postar isso tbm ou nao
	const Data_Inicio = req.body["Data_Inicio"];
	const Data_Fim = req.body["Data_Fim"];
	const Status = req.body["Status"]; // verificar posteriormente se sera necessario frente ao nosso tempo e como fazemos para atualizar automaticamente
	const Estado = req.body["Estado"];
	const Cidade = req.body["Cidade"];
	const Nome_Obra = req.body["Nome_Obra"]; 
	const Endereco = req.body["Endereco"]; 

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
	if (!Escopo) {
		res.send("Escopo faltando");
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
	if (!Status) {
		res.send("Status faltando");
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
	if (!Nome_Obra) {
		res.send("Nome obra faltando");
		return;
	}
	if (!Endereco) {
		res.send("Endereço faltando");
		return;
	}

	// os nomes abaixo tem que estar na mesma ordem de cima??
	//os nomes abaxio tem que estar igual ao da tabela ou igual as variaveis declaradas acima??
	const sql = "INSERT INTO Oportunidade (Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	console.log(sql);

	db.run(sql, [Data_Oportunidade, Servico, Titulo, Escopo, Data_Inicio, Data_Fim, Status, Estado, Cidade, Nome_Obra, Endereco], (err, rows) => {
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
	const id = req.body["Id_Oportunidade"];
	const idAvaliacao = req.body["Id_Avaliacao"]; //necessário criar essa coluna no db
	const avaliacaoGeral = req.body["Avaliacao_Geral"]; 
	const organizacao = req.body["Organizacao"]; 
	const produtividade = req.body["Produtividade"]; 
	const documentacao = req.body["Documentacao"]; 
	const limpeza = req.body["Limpeza"]; 
	
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

	db.run(sql, [organizacao, produtividade, documentacao, limpeza], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}
		res.render("regionalPerfil/avaliar", {msg: mensagem}); //escrevi para renderizar essa página pq dps de criado quero que volte para o perfil, verificar com o professor?
	});
});

module.exports = router;

