//Variáveis para receber o id presente na url
url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id");

// Função fetch que cria dinâmicamente os serviços os quais a empreiteira foi aceita em uma tabela
function listarObrasAceitas(){    
    fetch(`./listar/?id=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        minhasobras = data;
        saida= '';
        saida1= '';
        
        minhasobras.map(function (element) {
            saida += `<tr>    
                <th id="value_table_titulo"> ${element.Titulo} </th>
                <th id="value_table_servico"> ${element.Servico} </th>
                <th id="value_table_data-inicio"> ${element.Data_Inicio} </th>
                <th id="value_table_data-fim"> ${element.Data_Fim} </th>
                <th id="value_table_nome"> ${element.Nome} </th>
                <th id="value_table_email"> ${element.Email} </th>
                <th id="value_table_regional"> ${element.Regional} </th>
                <th id="value_table_whatsapp"><button type="submit" id="button-zap" onclick="SendZAP(${element.Celular})"><img id="img-zap" src="/frontend/views/img/whatsapp.png"></img></button></th> 
        </tr>
        <input id="titulo" type="hidden" value="${element.Titulo}"></input>

        `
  
        })
            document.getElementById("row-minhasobras").innerHTML= saida
    })

}

// Função que recebe o celular da contratante e permite que, ao clicar no ícone de whatsapp, o empreiteiro seja redirecionado a uma conversa com a contratante de determinada oportunidade
function SendZAP(celular){
     let titulo_oportunidade= String(document.getElementById('titulo').value)
    let valor1= titulo_oportunidade.split()
     console.log("Returning do: " + valor1)
    let url= `https://wa.me/55${celular}?text=Ol%C3%A1%2C+obtive+seu+n%C3%BAmero+por+meio+do+Construmatch%2C+no+qual+manifestei+interesse+por+uma+oportunidade+e+fui+aceito+nela.+Poder%C3%ADamos+conversar+mais+para+prosseguir+com+a+negocia%C3%A7%C3%A3o%3F`
    window.location.href= url
}





$(document).ready(function () {
    listarObrasAceitas();
    console.log("Esse é o id: " + url)
    console.log("Parametros: "+ id)

});