$(document).ready(function(){
    
    const All_Details = document.querySelectorAll('details');

    All_Details.forEach(deet=>{
        deet.addEventListener('toggle', toggleOpenOneOnly)
})

    function toggleOpenOneOnly(e) {
    if (this.open) {
        All_Details.forEach(deet=>{
        if (deet!=this && deet.open) deet.open = false
        });
}
}

    // Login AJAX
    $('.right').click(function(){
        var current = $('.page');
        var next = current.next();
        if(next.length){
            current.addClass('inactive');
            current.removeClass('page');
            next.addClass('page');
            next.removeClass('inactive');
        };
    });
    $('.left').click(function(){
        var current = $('.page');
        var prev = current.prev();
        if(prev.length){
            current.addClass('inactive');
            current.removeClass('page');
            prev.addClass('page');
            prev.removeClass('inactive');
        };
    });
});


