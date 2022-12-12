let urlHost = window.location.origin;
id = url.searchParams.get("id");

function redirect(page){
     window.location.href = `${urlHost}/${page}`;
     console.log(`${urlHost}/${page}/?id=${id}`);
};
