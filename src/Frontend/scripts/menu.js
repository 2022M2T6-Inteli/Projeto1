let urlHost = window.location.origin;
let id = new URLSearchParams(document.location.search).get("id")
let idc = new URLSearchParams(document.location.search).get("id_contratante")

function redirect(page){
     window.location.href = `${urlHost}/${page}/?id=${id}`;
};

function redirectCont(page){
     window.location.href = `${urlHost}/${page}/?id_contratante=${idc}`;
};
