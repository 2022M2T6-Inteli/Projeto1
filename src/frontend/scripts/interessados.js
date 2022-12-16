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
                <th id="button_table_check"><button type="submit" id="button-check" onclick="SubmitLike(${element.ID_Proposta});"><img id="img-check" src="/frontend/views/img/check-button.png"></img></button></th>
                <th id="button_table_review"><a href="#modal_avaliar"><button type="submit" id="button-review" onclick="pegarIDs(${element.ID_Contratante_Proposta}, ${element.ID_Empreiteira_Proposta}, ${element.ID_Oportunidade});"><img id="img-review" src="/frontend/views/img/comment.png"></img></button></a></th>
                <input type="hidden" name="id_proposta" id="id_proposta" value=""> 
        </tr>`
        console.log("Contratante" + element.ID_Contratante)
        })
            document.getElementById("row-interessados").innerHTML= saida

    })
}

function pegarIDs(ID_Contratante_value, ID_Empreiteira_value, ID_Oportunidade_value){
    url = new URL(window.location.href);
    params = url.searchParams;
    document.getElementById('id_contrat').value= ID_Contratante_value
    document.getElementById('id_emp').value= ID_Empreiteira_value
    document.getElementById('id_oport').value= ID_Oportunidade_value
    console.log("Valorzin ID Contratante: " + ID_Contratante_value)
    console.log("Valorzin ID Oportunidade: " + ID_Oportunidade_value)
    console.log("Valorzin ID Empreiteira: " + ID_Empreiteira_value)


}

function SubmitLike(id_proposta){
    console.log(id_proposta)
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

function SubmitRate(){
    $.ajax({
        type: "POST",
        url: `./avaliar`,
        data: {
            id_oport: $('#id_oport').val(),
            id_emp: $('#id_emp').val(),
            id_contrat: $('#id_contrat').val(),
            organizacao_avaliacao: $('#organizacao_avaliacao').val(),
            produtividade_avaliacao: $('#produtividade_avaliacao').val(),
            documentacao_avaliacao: $('#documentacao_avaliacao').val(),
            limpeza_avaliacao: $('#limpeza_avaliacao').val(),
            escopo_avaliacao: $('#escopo_avaliacao').val(),

        }
    }).done(function(){
        console.log('done');
        alert('Avaliação enviada com sucesso!!!')
    }).fail(function(){
        alert('Falha, avaliação não enviada!!')
        console.log('failed');
    }).always(function(){
        console.log('always');
    });
}


$(document).ready(function () {
    listarInteressados();
    console.log("é o id " + id)

});