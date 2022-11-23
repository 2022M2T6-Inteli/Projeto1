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

//  Código Open Modal Editar Perfil Empreiteira

// let open = document.getElementById('openModal');
// let close = document.getElementById('close');
// let fade = document.getElementById('fade');
// let cntModal = document.getElementById('ctnModal');

// $('#openModal').on("click", function(){
//     $('#fade').css({'display': 'flex'})
// });

// $('#openModal').on("click", function(){
//     $('#fade').css({'display': 'flex'})
// });

// close.onclick = function() {fade.style.display = "none"}

// fade.onclick = function() {fade.style.display = "none"}

// cntModal.onclick = function(event) {event.stopPropagation()}

// $('.close').click(function(){
//     $('.modal').hide();
// });

$("#fade").modal({
    fadeDuration: 500
  });