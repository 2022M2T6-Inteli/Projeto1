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