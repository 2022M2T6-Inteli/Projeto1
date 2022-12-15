url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id_contratante");
id_proposta_url= url.searchParams.get("id_proposta")

function listarInteressados(){    
    fetch(`./listar/?id_contratante=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        interessados = data;
        saida= ''
        interessados.map(function (element) {
            saida += `<tr>    
                <th id="value_table_empreiteira"> ${element.Nome_Fantasia} </th>
                <th id="value_table_responsavel"> ${element.Nome} </th>
                <th id="value_table_oportunidade"> ${element.Titulo} </th>
                <th id="value_table_escopo"> ${element.Escopo} </th>
                <th id="value_table_proposta"> ${element.Valor_Proposta} </th>
                <th><button type="submit" id="button-check" onclick="SubmitLike(${element.ID_Proposta});"><img id="img-check" src="/frontend/views/img/check-button.png"></img></button></th>
                <!-- <input type="hidden" name="id_proposta" id="id_proposta" value="${element.ID_Proposta}"> -->
                
        </tr>`
        
        })
            document.getElementById("row-interessados").innerHTML= saida

    })
}

function SubmitLike(id_proposta){
    $.ajax({
        type: "POST",
        url: `./like/?id_contratante=${id}&id_proposta=${id_proposta_url}`,
        data: {
            id_proposta: id_proposta

        }
    }).done(function(){
        console.log('done');
        alert('Match alterado com sucesso')
    }).fail(function(){
        alert('Falha, o match não foi alterado')
        console.log('failed');
    }).always(function(){
        console.log('always');
    });
}


$(document).ready(function () {
    listarInteressados();
    console.log("é o id " + id)

});