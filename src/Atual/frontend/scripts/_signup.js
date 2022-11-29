alert('oi')

function submitProfile(){
    let cnpj = $('#cnpj').val();
    let razaoSoc = $('#razaoSoc').val();
    let nomeFant = $('#nomeFant').val();
    let cnae = $('#cnae').val();
    let insc = $('#insc').val();
    let dataAbert = $('#dataAbert').val();
    let email = $('#email').val();
    let rua = $('#rua').val();
    let n = $('#n').val();
    let bairro = $('#bairro').val();
    let estados = $('#estados').val();
    let cidades = $('#cidades').val();
    let func = $('#func').val();
    let serv1 = $('#serv1').val();
    let serv2 = $('#serv2').val();
    $.ajax({
        type: "POST",
        url: "/cadastrar",
        data: {
            cnpj: cnpj, 
            razaoSoc: razaoSoc, 
            nomeFant: nomeFant, 
            cnae: cnae, 
            insc: insc, 
            dataAbert: dataAbert, 
            email: email, 
            rua: rua, 
            n: n, 
            bairro: bairro, 
            estados: estados, 
            cidades: cidades, 
            func: func, 
            serv1: serv1, 
            serv2: serv2
        }
    }).done(function(){
        console.log('done');
    }).fail(function(){
        console.log('failed');
    }).always(function(){
        console.log('always');
    });
};
$(document).ready(function () {
// Run states and cities function (Shoutout to ografael)
$.getJSON('https://gist.githubusercontent.com/ografael/2037135/raw/5d31e7baaddd0d599b64c3ec04827fc244333447/estados_cidades.json', function (data) {
    var items = [];
    var options = '<option value="">Escolha um estado</option>';	

    $.each(data, function (key, val) {
        options += '<option value="' + val.nome + '">' + val.nome + '</option>';
    });					
    $("#estados").html(options);				
    
    $("#estados").change(function () {				
    
        var options_cidades = '';
        var str = "";					
        
        $("#estados option:selected").each(function () {
            str += $(this).text();
        });
        
        $.each(data, function (key, val) {
            if(val.nome == str) {							
                $.each(val.cidades, function (key_city, val_city) {
                    options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                });							
            }
        });

        $("#cidades").html(options_cidades);
        
    }).change();		
});
});