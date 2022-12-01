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

	const sql = "SELECT Foto, Numero_funcionarios, Email FROM Empreiteira WHERE CNPJ=?";

	console.log(sql);

	db.get(sql, [CNPJ], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("emp-profile/form", { funcionario: row });
	});
});

router.post("/alterar", (req, res) => {
	let msg;
	let Foto = req.body["Foto"];
	let Numero_funcionarios = req.body["Numero_funcionarios"];
	let Email = req.body["Email"];


	if (!Numero_funcionarios) {
		res.send("Numero de funcionarios faltando");
		return;
	}

	if (!Email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "UPDATE Empreiteira SET Foto=?, Numero_funcionarios=?, Email=? WHERE CNPJ=?";

	console.log(sql);

	db.run(sql, [Foto, Numero_funcionarios, Email], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("emp-profile/alterar", { mensagem: msg });
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

	const sql = "SELECT CNPJ, nome, Email FROM empreiteira " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("emp-profile/listar", { model: rows });
	});
});

/*router.get("/remover", (req, res) => {
	let msg;
	let CNPJ = req.query["CNPJ"];

	const sql = "DELETE FROM pessoa WHERE CNPJ=?";
	console.log(sql);

	db.all(sql, [CNPJ], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("emp-profile/remover", { mensagem: msg });
	});
});*/

router.all("/inserir", (req, res) => {
	const CNPJ = req.query["CNPJ"];
    const Foto = req.query["]
	const Numero_funcionarios = req.query["Numero_funcionarios"];
	const Email = req.query["Email"];

	if (!Numero_funcionarios) {
		res.send("Numero de funcionarios faltando");
		return;
	}

	if (!Email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "INSERT INTO empreiteira (Foto, Numero_funcionarios, Email) VALUES (?, ?)";
	console.log(sql);

	db.run(sql, [Foto, Numero_funcionarios, Email], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("emp-profile/inserir", { msg: mensagem });
	});
});

module.exports = router;
