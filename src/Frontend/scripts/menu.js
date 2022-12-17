//Variáveis importantes/ids
let urlHost = window.location.origin;
let id = new URLSearchParams(document.location.search).get("id")
let idc = new URLSearchParams(document.location.search).get("id")

//Função que redireciona o empreiteiro para determinada página, mantendo sua "sessão"
function redirect(page){
     window.location.href = `${urlHost}/${page}/?id=${id}`;
};

//Função que redireciona o contratante para determinada página, mantendo sua "sessão"
function redirectCont(page){
     window.location.href = `${urlHost}/${page}/?id=${idc}`;
};
