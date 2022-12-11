/* CRUD database */

// const { data } = require("jquery");

// const { data } = require("jquery");
// const { type } = require("os");

// const { response } = require("express");

url = new URL(window.location.href);
params = url.searchParams;
id = url.searchParams.get("id");

var cnpj;
function list() {

    // Get from table 'empreiteira'
    $.ajax({
        url: `./info/?id=${id}`,
        type: 'GET',
        success: data => {
            console.log(data)
            data.forEach(element => {
                $('#name_empreiteira').text(element.Nome_Fantasia);  // Set 'Nome fantasia'

                // Check number of services to set them
                if(element.Servico_2 != null){ 
                    $('#service_empreiteira').text(`${element.Servico_1}, ${element.Servico_2}`);
                }
                else{
                    $('#service_empreiteira').text(element.Servico_1);
                }

                $('#email').text(element.Email); // Set Email address
                $('#open_date_value').text(element.Data_Abertura) // Set Opening date
                $('#icon_user').attr('src', element.Foto); // Set Profile picture
                $('#funcionarios_empreiteira_value').text(`${element.Numero_Funcionarios} Funcionários`) // Set number of employees
                $('#cnpj').text(element.CNPJ);
                

                // $('#cnpj_empreiteira').html(element.CNPJ);

            });
            
        }
    });
    console.log(cnpj);
    $.ajax({
        url: `./infoResp/?id=${id}`,
        type: 'GET',
        success: data => {
            data.forEach(element => {
                $('#cpf_resp').text(element.CPF);  // Set CPF
                $('#email_resp').text(element.Email);  // Set Responsible Email
                $('#name_resp').text(element.Nome);  // Set Responsible Name
                $('#cel_resp').text(element.Celular);  // Set Responsible Email
                

                // Check number of services to set them
                if(element.Servico_2 != null){ 
                    $('#service_empreiteira').text(`${element.Servico_1}, ${element.Servico_2}`);
                }
                else{
                    $('#service_empreiteira').text(element.Servico_1);
                }

                $('#email').text(element.Email); // Set Email address
                $('#open_date_value').text(element.Data_Abertura) // Set Opening date
                $('#icon_user').attr('src', element.Foto); // Set Profile picture
                $('#funcionarios_empreiteira_value').text(`${element.Numero_Funcionarios} Funcionários`) // Set number of employees
            });
        }
    });
    
}

$(document).ready(function () {
    list();
    // ShowdataInput();
    
});

// var get_url_empreiteira= new URL(window.location.href);
// var get_url_empreiteira= `/empreiteira/atualizar?id=${url.searchParams.get("id")}`
// console.log(url.searchParams.get("id"))

// var takejson;

// fetch(get_url_empreiteira).then((response) => {
//     takejson= response.clone();
//     return response.json();
// })
//     .then(function(response) {
//         console.log(response)
//         let empreiteiras= response
//         let saida= '';
//         empreiteiras.map(function(empreiteira) {
//             saida += empreiteira.CNPJ
//     }, function(rejectionReason){
//         console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
//         textjson.text();
//     }, function(bodyText){
//         console.log('Received the following instead of valid JSON:', bodyText); // 6
//     })
//         document.getElementById('cnpj_empreiteira').innerHTML= saida;
// })
//     .catch(function(error) {
//         console.log(error);
//     });


function ShowdataInput(){
    // let takejson;

    $.ajax({
        url: '/perfil/empreiteira/atualizar?id='+url.searchParams.get("id"),
        type: "get",
        success: data => {
            // console.log(data)
            
            // data= JSON.parse(data);
            // console.log(data)
            data.forEach(element => {
                // $('#cnpj_empreiteira').text(element.CNPJ);
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

// function SendeDataEmpreiteira(){
//     $.post
// }

// $.post({
//     url: '/perfil/empreiteira/atualizar?id='+url.searchParams.get("id"),
//     type: "post",
//     success: data => {
//         // console.log(data)
        
//         // data= JSON.parse(data);
//         // console.log(data)
//         data.forEach(element => {
//             // $('#cnpj_empreiteira').text(element.CNPJ);
//             console.log(element.CNPJ)
//               document.getElementById('cnpj_empreiteira').value= element.CNPJ
//               document.getElementById('nome_fantasia_empreiteira').value= element.Nome_Fantasia
//               document.getElementById('razao_social_empreiteira').value= element.Razao_Social
//               document.getElementById('email_empreiteira').value= element.Email
//               document.getElementById('cnae_empreiteira').value= element.CNAE
//               document.getElementById('data_abertura_empreiteira').value= element.Data_Abertura
//               document.getElementById('numero_funcionarios').value= element.Numero_Funcionarios
//               document.getElementById('servico_primario_empreiteira').value= element.Servico_1
//               document.getElementById('servico_secundario_empreiteira').value= element.Servico_2
              
//         })
//     }
// })
// }

