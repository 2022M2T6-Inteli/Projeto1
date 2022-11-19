$( document ).ready(function() {
    
    // Hide/Show Sidebar
    let sidebarStatus = true
    $("#toggle-sidebar").click(function(){
        if(sidebarStatus){
            $(".sidebar").hide();
            $('.header.normal-shadow').css('box-shadow','0px 5px 20px gray');
            $('.footer.normal-shadow').css('box-shadow','0px -5px 20px gray');
            $('.post-container').css('width','100%')
            $('.post-container').css('left','0')
            sidebarStatus = false;
        }
        else{
            $(".sidebar").show();
            sidebarStatus = true;
            $('.header.normal-shadow').css('box-shadow','160px 5px 20px gray');
            $('.footer.normal-shadow').css('box-shadow','160px -5px 20px gray');
            $('.post-container').css('width','calc(100% - 150px)')
            $('.post-container').css('left','150px')
        }
    });
});
