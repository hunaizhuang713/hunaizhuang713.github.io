//上部banner点击效果
banner()
function banner(){
    //    弹出遮罩层
$('.sy-container .banner').click(function(){
    $('.banner-mask,.mask').addClass('show');
    $(document.body).css({
        "overflow-y":"hidden"
    });
})

    //   关闭遮罩层
    $('.sy-container .banner-mask .close').click(function(){
        $('.banner-mask,.mask').removeClass('show');
        $(document.body).css({
            "overflow-y":"auto"
        });
    })
}

//加载新闻
loadNew('memorabilia.json')
function loadNew(fileName){
    var   p_prefix =getPrefix();

    $(function(){
        $.ajax({
            type: "GET",
            url: p_prefix + '/js/' + fileName,
            dataType: "json",
            success: function(result){
                addBox(result);

            }
        });
    });

    function addBox(result){
        var newResult=result.dataList.reverse();//翻转数组，从最后开始取
        var newResultFive= newResult.splice(0,4)  //截取5个

        $.each(newResultFive,function(index,obj){
            var names=obj.names;
            var imges=obj.img;

            $(".sy-container .mw_headlines ul").append('<li>'+
                '<div class="left">'+
                '<p>'+names+'</p>'+
                '</div>'+
                '<div class="right">'+
                '<img src="'+imges+'" alt=""/>'+
                '</div>'+
                '</li>');
        });
    }
}

// 返回顶部
toTop()
function toTop(){
    $('.sy-container .toTop').click(function () {
        $('html,body').animate({scrollTop:0});
    })
}
//合作案例导航栏



navTable()
function navTable(){
    // 点击nav制动到对应位置
    $('.sy-container .nav li:nth-child(1)').click(function () {
        $('html,body').animate({scrollTop:$('.product_introduction').offset().top});

    });
    $('.sy-container .nav li:nth-child(2)').click(function () {
        $('html,body').animate({scrollTop:$('.mw_headlines').offset().top});

    })
    $('.sy-container .nav li:nth-child(3)').click(function () {
        $('html,body').animate({scrollTop:$('.cooperation_case').offset().top});

    })


//swiper js
    var classSwiper = new Swiper('.class-swiper-container', {
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
    });
//给第一个li添加样式
//   $(".class-swiper-slide li").first().addClass("current");


    //固定小窗口的高度
    var trans = $(".class-swiper-container").width();//滑动的宽度
    //ul内容的宽度
    var ulWidth = $(".class-swiper-slide ul").width();
    //默认是划到最右边的位置，我们人为要让他滑回来
    classSwiper.setWrapperTranslate(-ulWidth+trans);
    //
    //$(".sy-container  .cooperation_case .container .class-swiper-slide ").on("click", "ul li", function () {
    //    $(".class-swiper-slide li").removeClass("current");
    //    $(this).addClass("current");
    //})


    //点击合作案例nav切换下方内容
    $('.sy-container  .cooperation_case .container ul ').on('click','li', function () {
        var _index =$(this).index();
        $(this).css("color","#02a4ff");
        $(this).siblings().css("color","#333");
        $(this).css("border-bottom","4px solid #02a4ff");
        $(this).siblings().css("border-bottom","none");
        if(_index===0){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase11.png");
        }else if(_index===1){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase22.png");
        }else if(_index===2){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase33.png");
        }else if(_index===3){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase44.png");
        }else if(_index===4){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase55.png");
        }else if(_index===5){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase66.png");
        }else if(_index===6){
            $('.sy-container .cooperation_case .partners .partners-box img').attr("src","./images/Image_Cooperationcase77.png");
        }
    })


}



//点击底部电话
tophone()
function tophone(){
    //点击弹出
    $(".sy-container .footer ul li:nth-child(2)").on("click", function () {
        if($('.sy-container .footer-phone').css('display')=='none'){
            $('.sy-container .footer-phone').css('display','block') ;
            //使用banner的遮罩层，把弹出的红包取消
            $('.banner-mask,.mask').addClass('show');
            $('.banner-mask .use').css('display','none');

            $(document.body).css({
                "overflow-y":"hidden"
            });
        }else{};
    });
    //点击取消
    $('.sy-container .footer-phone .close').on('click', function () {
        $('.sy-container .footer-phone').css('display', 'none');
        $('.banner-mask,.mask').removeClass('show');
        //把去掉的红包加回去
        $('.banner-mask .use').css('display','block');
        $(document.body).css({
            "overflow-y": "auto"
        })
    })
}