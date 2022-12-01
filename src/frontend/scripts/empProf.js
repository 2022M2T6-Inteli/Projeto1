/* CRUD database */
function showCNAE() {
    $.ajax({
        type: "get",
        url: "url",
        data: "data",
        dataType: "dataType",
        success: function (response) {
            
        }
    });
    
    
    
    // $.ajax({
    //     type: "get",
    //     url: "/empreiteira/perfil",
    //     success: data => {
    //         var tx = '';
    //         data.forEach(element => {
    //             tx += `<div id="CNPJ-Show">${element.CNPJ}</div>`
    //             tx += `<div id="CNAE-Show">${element.CNAE}</div>`
    //         })
    //         $('#persona').html(tx);
    //     }
    // });
};

$(document).ready(function () {
    showCNAE();
});