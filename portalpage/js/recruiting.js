$('.rec_add').on('click',function() {
    $('.jion_now input').val("");
    $('.jion_now').show(100);
    $('.jion_now').attr('show','1');
    if($('.contact_me').attr('show') == "1"){
        $('.contact_me').hide(50);
    }
});

$('.rec_contact').on('click',function() {
    $('.contact_me').show(100);
    $('.contact_me').attr('show','1');
    if($('.jion_now').attr('show') == "1"){
        $('.jion_now').hide(50);
    }
});
$('.close_door').on('click',function(){
    $(this).parent().hide(50);
     $(this).parent().attr('show','0');
});