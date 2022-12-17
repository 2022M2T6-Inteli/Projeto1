//Variáveis para indentificar o id da empreiteira
url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id");

var cnpj;

//Função ajax que associa a base de perfil com as informações recebidas no endpoint /info
function list() {
    $.ajax({
        url: `./info/?id=${id}`,
        type: 'GET',
        success: data => {
            console.log(data)
            data.forEach(element => {
                $('#name_empreiteira').text(element.Nome_Fantasia);  

                // Checa o número de serviços e os adiciona na página
                if(element.Servico_2 != null){ 
                    $('#service_empreiteira').text(`${element.Servico_1}, ${element.Servico_2}`);
                }
                else{
                    $('#service_empreiteira').text(element.Servico_1);
                }

                $('#empreiteira_email').text(element.Email); // Set Email address
                $('#empreiteira_data_abertura').text(element.Data_Abertura) // Set Opening date
                $('#icon_user').attr('src', element.Foto); // Set Profile picture
                $('#empreiteira_funcionarios').text(`${element.Numero_Funcionarios} Funcionários`) // Set number of employees
                $('#empreiteira_cnpj').text(element.CNPJ);
                $('#empreiteira_cnae').text(element.CNAE);
                $('#empreiteira_razao_social').text(element.Razao_Social);
                $('#empreiteira_cidade').text(element.Cidade);
                $('#empreiteira_estado').text(element.Estado);

                $('#responsavel_cpf').text(element.CPF);
                $('#responsavel_email').text(element.Email_Responsavel);
                $('#responsavel_nome').text(element.Nome);
                $('#responsavel_celular').text(element.Celular);
                
                



            });
            
        }
    });
    console.log(cnpj);
}



// Função que recebe as informações da empreiteira para facilitar a atualização de dados
function ShowdataInput(){
    $.ajax({
        url: '/perfil/empreiteira/atualizar?id='+url.searchParams.get("id"),
        type: "get",
        success: data => {
            data.forEach(element => {
                    console.log(element.CNPJ)
                  document.getElementById('cnpj_empreiteira').value= element.CNPJ
                  document.getElementById('nome_fantasia_empreiteira').value= element.Nome_Fantasia
                  document.getElementById('razao_social_empreiteira').value= element.Razao_Social
                  document.getElementById('email_empreiteira').value= element.Email
                  document.getElementById('cnae_empreiteira').value= element.CNAE
                  document.getElementById('data_abertura_empreiteira').value= element.Data_Abertura
                  document.getElementById('numero_funcionarios').value= element.Numero_Funcionarios
                  document.getElementById('servico_primario_empreiteira').value= element.Servico_1
                  document.getElementById('servico_secundario_empreiteira').value= element.Servico_2
                  document.getElementById('id').value= element.ID_Empreiteira
                  console.log(element.ID_Empreiteira)
                  
            })
        }
    })
}

// Função que recebe as informações do responsável da empreiteira para facilitar a atualização de dados
function ShowdataInput_Responsavel(){
    $.ajax({
        url: '/perfil/responsavel/atualizar?id='+url.searchParams.get("id"),
        type: "get",
        success: data => {
            data.forEach(element => {
                  document.getElementById('cpf_editar_responsavel').value= element.CPF
                  document.getElementById('nome_editar_responsavel').value= element.Nome
                  document.getElementById('email_editar_responsavel').value= element.Email_Responsavel
                  document.getElementById('celular_editar_responsavel').value= element.Celular
                  document.getElementById('id_responsavel').value= element.ID_Responsavel
                console.log("O valor do ID_Responsavel é de:" + element.ID_Responsavel)
                  
            })
        }
    })
}

// Função que cria as avaliações na página conforme as presentes no banco de dados
function listarAvaliacoes(){    
    fetch(`/perfil/avaliacao/?id=${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        avaliacao = data;
        saida= ''
        avaliacao.map(function (element) {
            saida += `<tr>    
                <th id="value_table_titulo"> ${element.Titulo} </th>
                <th id="value_table_escopo"> ${element.Escopo_Avaliacao} </th>
                <th id="value_table_organizacao"> ${element.Organizacao} </th>
                <th id="value_table_produtividade"> ${element.Produtividade} </th>
                <th id="value_table_documentacao"> ${element.Documentacao} </th>
                <th id="value_table_limpeza"> ${element.Limpeza} </th>
             
        </tr>`
        console.log("Contratante" + element.ID_Contratante)
        })
            document.getElementById("row-avaliar").innerHTML= saida

    })
}

$(document).ready(function () {
    list();
    listarAvaliacoes();

});


