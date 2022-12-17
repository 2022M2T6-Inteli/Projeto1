url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id");

//Esta função recebe o id da oportunidade, o id da empreiteira e o id do contratante para colocar em uma <div> escondida na tela de criar proposta
function like(i, contratante) {
    url = new URL(window.location.href);
    params = url.searchParams;
    id = url.searchParams.get("id");
    document.getElementById("id_post").value = i;
    document.getElementById("id_emp").value = id;
    document.getElementById("id_contrat").value = contratante;
}

// Esta função ajax cria os elementos de oportunidade no front recebendo os elementos solicitados no endpoint correspondente ao feed
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
                            tx+=`<a href="#modal" class="btn"><button onclick="like(${element.ID_Oportunidade}, ${element.ID_Contratante})" class="like"><i class="fa-regular fa-thumbs-up"></i></button></a>`;
                        tx+=`</div>`;
                    tx+=`</div>`;
                tx+=`</div>`; 
            })
            $('#resultado').html(tx);
        } 
    })
}
$(document).ready(function () {
    read();
});

