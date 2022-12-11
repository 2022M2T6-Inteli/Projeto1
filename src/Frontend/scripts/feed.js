// let url = new URL(window.location.href);
// let params = url.searchParams;
// var id = url.searchParams.get("id");

function like(i) {
    var x = document.getElementById("prop" + `${i}`);
    
    if (x.style.display === "none") {
      x.style.display = "block";
    }
    else if (x.style.display === "block") {
      x.style.display = "none";
    }
    else {
      x.style.display = "block";
    }
};

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
                        tx+=`<div id="desc">${element.Escopo}</div>`;
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
                            tx+=`<form id=${element.ID_Oportunidade}>`;
                                tx+=`<textarea value="Digite sua proposta" id="proposta"></textarea>`;
                                tx+=`<input type="text" value="Digite o valor da sua proposta" id="valor">`;
                                tx+=`<input type="hidden" value="${element.ID_Oportunidade}"`
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


// Criar um modal em que quando clica no like, o modal abre com uma função que deixa em uma div hidden o id do post




// $(document).ready(function () {
//     read();
//     $("form").submit(function (event) {
//       var formData = {
//         name: $("#name").val(),
//         email: $("#email").val(),
//         superheroAlias: $("#superheroAlias").val(),
//       };
  
//       $.ajax({
//         type: "POST",
//         url: "process.php",
//         data: formData,
//         dataType: "json",
//         encode: true,
//       }).done(function (data) {
//         console.log(data);
//       });
  
//       event.preventDefault();
//     });
//   });

// function post(){
//     $.ajax({
//         url: '/feed/proposta',
//         type: 'POST',
//         headers: {"Content-Type": "application/json"},
//         data: JSON.stringify({
//             ID_Oportunidade: 
//         }),

//     })
// }


// $("#formoid").submit(function(event) {

//     /* stop form from submitting normally */
//     event.preventDefault();
  
//     /* get the action attribute from the <form action=""> element */
//     var $form = $(this),
//       url = $form.attr('action');
  
//     /* Send the data using post with element id name and name2*/
//     var posting = $.post(url, {
//       name: $('#name').val(),
//       name2: $('#name2').val()
//     });
  
//     /* Alerts the results */
//     posting.done(function(data) {
//       $('#result').text('success');
//     });
//     posting.fail(function() {
//       $('#result').text('failed');
//     });
//   });