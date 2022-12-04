/* CRUD database */

let url = new URL(window.location.href);
let params = url.searchParams;
var id = url.searchParams.get("id");

function list() {
    // Get from table 'empreiteira'
    $.ajax({
        url: `./info/?id=${id}`,
        type: 'GET',
        success: data => {
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
            });
            
        }
    });
    // $.ajax({
    //     url: `./infoResp/?id=${id}`,
    //     type: 'GET',
    //     success: data => {
    //         data.forEach(element => {
    //             $('#cpf_resp').text(element.CPF);  // Set CPF
    //             $('#email_resp').text(element.Email);  // Set Responsible Email
    //             $('#name_resp').text(element.Nome);  // Set Responsible Name
    //             $('#cel_resp').text(element.Celular);  // Set Responsible Email
                

    //             // Check number of services to set them
    //             if(element.Servico_2 != null){ 
    //                 $('#service_empreiteira').text(`${element.Servico_1}, ${element.Servico_2}`);
    //             }
    //             else{
    //                 $('#service_empreiteira').text(element.Servico_1);
    //             }

    //             $('#email').text(element.Email); // Set Email address
    //             $('#open_date_value').text(element.Data_Abertura) // Set Opening date
    //             $('#icon_user').attr('src', element.Foto); // Set Profile picture
    //             $('#funcionarios_empreiteira_value').text(`${element.Numero_Funcionarios} Funcionários`) // Set number of employees
    //         });
    //     }
    // });
    
}

// function criarpostagem(){
//     let servico = $('#servico').val();
//     let titulo = $('#titulo').val();
//     let descricao = $('#descricao').val();
//     let data_inicio = $('#data_inicio').val();
//     let data_fim = $('#data_fim').val();
//     let cidade = $('#cidadePost').val();
//     let estado = $('#estado').val();
//     $.ajax({
//         type: "POST",
//         url: "/cadastrar",
//         data: {
//             servico: servico, 
//             titulo: titulo, 
//             descricao: descricao,
//             data_inicio: data_inicio,      
//             data_fim: data_fim, 
//             estado: estado, 
//             cidade: cidade
//         }
//     }).done(function(){
//         console.log('done');
//         alert('Postagem criada com sucesso')
//     }).fail(function(){
//         alert('Falha ao criar a postagem, tente novamente')
//         console.log('failed');
//     }).always(function(){
//         console.log('always');
//     });
// };

$(document).ready(function () {
    list();
});