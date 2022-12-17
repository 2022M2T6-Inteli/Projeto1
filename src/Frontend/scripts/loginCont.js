// Função ajax que chama o endpoint de banco para comparar as informações e fazer o login
function read(){
    $.ajax({
        url: '/loginCont/banco',
        type: 'GET',
        success: data => {
            console.log(data + "oi");
        } 
    })
}
$(document).ready(function () {
    read();
});

console.log(login);