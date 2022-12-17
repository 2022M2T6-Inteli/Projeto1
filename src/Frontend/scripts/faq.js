//Este código deixa o faq escondido até chamado e depois permite escondê-lo

$(document).ready(function () {
    $('#faq').css('visibility', 'hidden');
    $('#bg').click(function (e) { 
        e.preventDefault();
        $('#faq').css('visibility', 'hidden');
        
    });
    $('#help').click(function (e) { 
        e.preventDefault();
        $('#faq').css('visibility', '');
    });
});