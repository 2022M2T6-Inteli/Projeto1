let url = new URL(window.location.href);
let params = url.searchParams;
var id = url.searchParams.get("id");

function read(){
    $.ajax({
        url: '/feed/info',
        type: 'GET',
        success: data => {
            var tx = '';
            data.forEach(element => {

                tx+=`<div class="grid-item">`;
                    tx+=`<div class="post-box">`;
                        tx+=`<strong id="title">${element.Titulo}</strong>`;
                        tx+=`<div id="desc">${element.Descricao}</div>`;
                        tx+=`<div class="info">`;
                            tx+=`Cidade, Estado:<br>${element.Cidade}, ${element.Estado}<br><br>`;
                            tx+=`Serviço:<br>${element.Servico}`;
                        tx+=`</div>`;
                        tx+=`<div class="info">`;
                            tx+=`Data de início:<br>${element.Data_Inicio}<br><br>`;
                            tx+=`Data de término:<br>${element.Data_Fim}`;
                        tx+=`</div>`;
                        tx+=`<div class="buttons">`;
                            tx+=`<button onclick="like(${element.ID_Oportunidade})" class="like"><i class="fa-regular fa-thumbs-up"></i></button>`;
                        tx+=`</div>`;
                        tx+=`<div id="prop${element.ID_Oportunidade}" class="prop">`;
                            tx+=`<form>`;
                                tx+=`<textarea value="Digite sua proposta" id="proposta"></textarea>`;
                                tx+=`<button id="enviar">Enviar</button>`;
                            tx+=`</form>`;
                        tx+=`</div>`;
                    tx+=`</div>`;
                tx+=`</div>`;
                // `  
            })
            $('#resultado').html(tx);
        }
    })
    
}
$(document).ready(function () {
    read();
});

/* 
    var users = {
        
        list() {
            $.ajax({
                url: api + '/users',
                type: 'GET',
                success: data => {
                    var tx = '';
                    tx += '<div class="insert" onclick="user.insert()">Inserir</div>';
                    data.forEach(element => {
                        tx += '<div class="user">';
                            tx += '<div class="title">' + `${element.nome} - ${element.email} - ${element.telefone} ` + '</div>';
                            tx += '<div class="actions">';
                                tx += '<div class="action" onclick="user.update(' + element.userId + ',\'' + element.nome + '\')">Editar</div>';
                                tx += '<div class="action" onclick="user.delete(' + element.userId + ')">Excluir</div>';
                            tx += '</div>';
                        tx += '</div>';
                    });
                    $('#main').html(tx);
                }
            });
            
        }
        
    };
*/