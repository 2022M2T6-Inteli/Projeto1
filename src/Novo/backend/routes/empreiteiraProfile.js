const express = require('express');
const db = require('../utils/db');

const router = express.Router();

// AO INVES DE app.(...) usem router.(...)

router.all("/", (req, res) => {
	res.render("emp-profile/index");
});

router.get("/alterar", (req, res) => {
	let CNPJ = req.query["CNPJ"];

	if (!CNPJ) {
		res.send("CNPJ faltando");
		return;
	}

	const sql = "SELECT CNPJ, nome, email FROM pessoa WHERE CNPJ=?";

	console.log(sql);

	db.get(sql, [CNPJ], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/form", { funcionario: row });
	});
});

router.post("/alterar", (req, res) => {
	let msg;
	let CNPJ = req.body["CNPJ"];
	let nome = req.body["nome"];
	let email = req.body["email"];

	if (!CNPJ) {
		res.send("CNPJ faltando");
		return;
	}

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "UPDATE pessoa SET nome=?, email=? WHERE CNPJ=?";

	console.log(sql);

	db.run(sql, [nome, email, CNPJ], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("funcionarios/alterar", { mensagem: msg });
	});
});

router.all("/listar", (req, res) => {
	let pessoas;
	let ordenar = req.query["ordenar"];
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}
	
	const sql = "SELECT CNPJ, nome, email FROM pessoa " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/listar", { model: rows });
	});
});

router.get("/remover", (req, res) => {
	let msg;
	let id = req.query["id"];

	const sql = "DELETE FROM pessoa WHERE id=?";
	console.log(sql);

	db.all(sql, [id], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("funcionarios/remover", { mensagem: msg });
	});
});

router.all("/inserir", (req, res) => {
	const id = req.query["id"];
	const nome = req.query["nome"];
	const email = req.query["email"];

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "INSERT INTO pessoa (nome, email) VALUES (?, ?)";
	console.log(sql);

	db.run(sql, [nome, email], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("funcionarios/inserir", { msg: mensagem });
	});
});

module.exports = router;
