//配置url方法
function getPrefix(){
    var pName = window.location.pathname;

     var  p_prefix = pName.indexOf('p_page')!=-1?'/p_page':
            pName.indexOf('/wap/')!=-1?'/wap':
                pName.indexOf('/app/')!=-1?'/app':
                    pName.indexOf('/m/')!=-1?'/m':
                        pName.indexOf('/mwytx_wap/')!=-1?'/mwytx_wap':
                            '';
    return p_prefix ;
};
/*公用方法*/
loadCommon('common.html')
function loadCommon(fileName){
    var host = document.domain;

  var   p_prefix =getPrefix();

    $.ajax({
         url: p_prefix + '/common/' + fileName,
         type: 'GET',
         success: function(data){
             var _data = $(data);
             $('.common-one-header').html(_data.find('#common-one-header').html());
             $('.common-one-header-menu').html(_data.find('#common-one-header-menu').html());
             $('.common-footer').html(_data.find('#common-footer').html());
             $('.pro-footer-phone').html(_data.find('#pro-footer-phone').html());

         }
     })

};

//点击头部返回首页
$('.common-one-header').on('click','span',function () {
    jump('index.html')
})
//点击跳转页面方法
function jump(jump){
    var  p_prefix =getPrefix();
   //判断非当前页面就执行跳转
    if(window.location.pathname!==p_prefix + '/' + jump){
        $(location).attr('href', p_prefix+'/'+jump);
    }
};
//头部点击个人中心事件
personCenter()
function personCenter(){
    //点击显示隐藏
    var flag =true;
    $('.common-one-header').on('click','div .a-one',function () {
        if(flag){
            $('.common-one-header-person').html('<div class="mask"></div>'+'<div class="person-info-one">'+'<i></i>'+'<div class="register">'+'注册'+'</div>'+'<div class="login">'+'登录'+'</div>'+'</div>');
            //锁定滚动条
            $(document.body).css({
                "overflow-y":"hidden"
            });

            flag=false
        }else{
            $('.common-one-header-person').html('');
            //解锁滚动条
            $(document.body).css({
                "overflow-y":"auto"
            });

            flag =true
        }
    })

    //点击注册 登录跳转
    $('.common-one-header-person').on('click','.person-info-one .register',function () {
        jump('portalpage/personal_center/register/register.html')

    });
    $('.common-one-header-person').on('click','.person-info-one .login',function () {
        jump('portalpage/personal_center/login/login.html')

    });

}

//头部点击菜单事件
menu()
function menu(){
    //if($('.menu-box').css('height')>'400'){
    //    $('html,body').animate({scrollTop:100});
    //}else{
    //    $('html,body').animate({scrollTop:0});
    //}
    //点击显示隐藏
    $('.common-one-header').on('click','div .a-two',function () {


        if( $('.common-one-header-menu').css('display')==='none' ){
            $('.common-one-header-menu').css('display','block');

            //判断再次点击菜单时恢复原始状态
            if($('.menu-box-pro-ul ul li').css('display')==='none'){
                $('.menu-box-pro-ul ul li').css('display','block');
                $('.menu-box-pro .menu-box-pro-right').removeClass('current')
            }
            if($('.menu-box-dev-ul ul li').css('display')==='block'){
                $('.menu-box-dev-ul ul li').css('display','none');
                $('.menu-box-dev .menu-box-dev-right').removeClass('current')
            }

            //锁定滚动条
                $(document.body).css({
                    "overflow-y":"hidden"
                });


        }else{
            $('.common-one-header-menu').css('display','none');
            //解锁滚动条

            $(document.body).css({
                "overflow-y":"auto"
            })
        };
    });

    //点击遮罩层隐藏menu
    $('body').on('click','.common-one-header-menu .mask',function () {
        $('.common-one-header-menu').css('display','none');
        //解锁滚动条

        $(document.body).css({
            "overflow-y":"auto"
        })
    });
    //点击实现抽屉效果
        //1
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro',function () {
            if($('.menu-box-pro-ul ul li').css('display')==='none' ){
                $('.menu-box-pro-ul ul li').css('display','block');
                $('.menu-box-pro .menu-box-pro-right').removeClass('current')

            }else{
                $('.menu-box-pro-ul ul li').css('display','none');
               $('.menu-box-pro .menu-box-pro-right').addClass('current')
            }
    });
         //2
    $('.common-one-header-menu').on('click','.menu-box .menu-box-dev',function () {
        if($('.menu-box-dev-ul ul li').css('display')==='none' ){
            $('.menu-box-dev-ul ul li').css('display','block');
            $('.menu-box-dev .menu-box-dev-right').addClass('current');
            if(!$('.menu-box-pro .menu-box-pro-right').hasClass('current')){
                $('html,body').animate({scrollTop:100});
            }else{
            }


        }else{
            $('.menu-box-dev-ul ul li').css('display','none');
            $('.menu-box-dev .menu-box-dev-right').removeClass('current')
            $('html,body').animate({scrollTop:0});

        }
    });
    //点击实现抽屉效果结束

    //点击产品中心各个按钮跳转页面，， 点击调用jump方法
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(1)',function () {
        jump('portalpage/menu/product_center/ser-msgVerify.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(2)',function () {
        jump('portalpage/menu/product_center/ser-msgNotice.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(3)',function () {
        jump('portalpage/menu/product_center/ser-voiVerify.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(4)',function () {
        jump('portalpage/menu/product_center/ser-internationalMsg.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(5)',function () {
        jump('portalpage/menu/product_center/ser-voiNotice.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-pro-ul li:nth-child(6)',function () {
        jump('portalpage/menu/product_center/ser-pageSend.html')

    });
    //点击产品中心各个按钮跳转页面结束
    //点击免费体验
    $('.common-one-header-menu').on('click','.menu-box .menu-box-free',function () {
        jump('portalpage/menu/free_experience/free_experience.html')
    });
    //点击开发者中心各个按钮跳转页面
    $('.common-one-header-menu').on('click','.menu-box .menu-box-dev-ul li:nth-child(1)',function () {
        jump('portalpage/menu/developer_center/dev-center.html')
    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-dev-ul li:nth-child(2)',function () {
        jump('portalpage/menu/developer_center/SDK.html')

    });
    $('.common-one-header-menu').on('click','.menu-box .menu-box-dev-ul li:nth-child(3)',function () {
        jump('portalpage/menu/developer_center/API.html')
    });
    //点击梦网头条
    $('.common-one-header-menu').on('click','.menu-box .menu-box-mon',function () {
        jump('portalpage/menu/mw_headlines/information-list.html')
    });
}
//menu方法结束

//产品中心公共底部
productFoot()
function productFoot(){
    //点击弹出
    $('.common-footer').on('click','ul li:first-child',function () {

        $('.pro-footer-phone').css('display','block');
        $('.pro-common-mask').css('display','block');
        $(document.body).css({
            "overflow-y":"hidden"
        });
    });
    //点击取消
    $('.pro-footer-phone').on('click','.phone-bottom .close',function () {

        $('.pro-footer-phone').css('display','none');
        $('.pro-common-mask').css('display','none');
        $(document.body).css({
            "overflow-y":"auto"
        });
    });
}




