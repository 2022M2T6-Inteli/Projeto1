let urlHost = window.location.origin;
let id = new URLSearchParams(document.location.search).get("id")

function redirect(page){
     window.location.href = `${urlHost}/${page}/?id=${id}`;
};
