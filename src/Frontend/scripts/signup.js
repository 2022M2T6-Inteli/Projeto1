const url = `http://${new URL(window.location.href).hostname}:${new URL(window.location.href).port}`;

// Função ajax que recebe os inputs no frontend e envia para um endpoint que insere as informações da conta na tabela "Empreiteira"
function submitProfile(){
    $.ajax({
        type: "POST",
        url: "/cadastrar",
        data: {
            cnpj: $('#cnpj').val(),
            razaoSoc: $('#razaoSoc').val(),
            nomeFant: $('#nomeFant').val(),
            cnae: $('#cnae').val(),
            dataAbert: $('#dataAbert').val(), 
            email: $('#email').val(),
            func: $('#func').val(),
            cidades: $('#cidades').val(),
            senha: $('#senha').val(),
            estados: $('#estados').val(), 
            serv1: $('#serv1').val(), 
            serv2: $('#serv2').val(),
            cpf_responsavel: $('#cpf_responsavel').val(),
            nome_responsavel: $('#nome_responsavel').val(),
            email_responsavel: $('#email_responsavel').val(),
            celular_responsavel: $('#celular_responsavel').val(),
            id_empreiteira_fk: $('#id_empreiteira_fk').val()
        }
    }).done(function(){
        console.log('done');
        alert('Usuário cadastrado com sucesso')
        window.location.href = (url)
    }).fail(function(){
        alert('Falha no cadastro, tente novamente')
        console.log('failed');
    }).always(function(){
        console.log('always');
    });
};


// Função que coloca dinâmicamente as cidades e estados brasileiros ao receber a informação por um json
function cityState(){
    $.getJSON('frontend/scripts/json/cidades-estados.json', function(data) {
        var options = '<option value="">Escolha um estado</option>';	

        $.each(data, function (key, val) {
            options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
        });					
        $("#estados").html(options);				
        $("#estados").change(function () {				
        
            var options_cidades = '<option value="">Escolha uma cidade</option>';
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
};

$(document).ready(function () {
    cityState();

    $('#signup').click(function (e) { 
        e.preventDefault();
        submitProfile();
        submitProfileResponsavel();
    });
});