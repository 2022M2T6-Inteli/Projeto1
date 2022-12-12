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
                $('#responsavel_cpf').text(element.CPF);
                $('#responsavel_email').text(element.Email_Responsavel);
                $('#responsavel_nome').text(element.Nome);
                $('#responsavel_celular').text(element.Celular);
                
                

                // $('#cnpj_empreiteira').html(element.CNPJ);

            });
            
        }
    });
    console.log(cnpj);
   
    
}

$(document).ready(function () {
    list();
    
});


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

function ShowdataInput_Responsavel(){
    // let takejson;
    $.ajax({
        url: '/perfil/responsavel/atualizar?id='+url.searchParams.get("id"),
        type: "get",
        success: data => {
            // console.log(data)
            
            // data= JSON.parse(data);
            // console.log(data)
            data.forEach(element => {
                // $('#cnpj_empreiteira').text(element.CNPJ);
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

