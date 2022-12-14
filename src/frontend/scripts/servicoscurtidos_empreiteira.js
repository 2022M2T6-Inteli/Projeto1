url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id");

function listarMinhasObras(){    
    fetch(`./listar/?id=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        minhasobras = data;
        saida= '';
        minhasobras.map(function (element) {
            saida += `<tr>    
                <th id="value_table_titulo"> ${element.Titulo} </th>
                <th id="value_table_descricao"> ${element.Descricao} </th>
                <th id="value_table_servico"> ${element.Servico} </th>
                <th id="value_table_data-inicio"> ${element.Data_Inicio} </th>
                <th id="value_table_datafim"> ${element.Data_Fim} </th>
                <th id="value_table_cidade"> ${element.Cidade} </th>
                <th id="value_table_estado"> ${element.Estado} </th>
        </tr>`
        
        })
            document.getElementById("row-minhasobras").innerHTML= saida

    })
}


$(document).ready(function () {
    listarMinhasObras();
    console.log("Esse é o id: " +url)
    console.log("Parametros: "+id)

});