
//点击显示隐藏
apiShow()
function apiShow() {
    var flagOne =true;
    $('.api-container .top .text p span:first-child').on('click', function () {
       if(flagOne){
           $('.api-container .msg-voi').css('display','block')
           flagOne =false;
       }else{
           $('.api-container .msg-voi').css('display','none');
           flagOne =true;
       }
    })
    var flagTwo =true;

    $('.api-container .top .text p span:nth-child(3)').on('click', function () {
        if(flagTwo){
            $('.api-container .type').css('display','block')
            flagTwo =false;
        }else{
            $('.api-container .type').css('display','none');
            flagTwo =true;
        }
    })
}

sdkShow()
function sdkShow() {
    var flagOne =true;
    $('.sdk-container .top .text p span:first-child').on('click', function () {
        if(flagOne){
            $('.sdk-container .msg-voi').css('display','block')
            flagOne =false;
        }else{
            $('.sdk-container .msg-voi').css('display','none');
            flagOne =true;
        }
    })
    var flagTwo =true;

    $('.sdk-container .top .text p span:nth-child(3)').on('click', function () {
        if(flagTwo){
            $('.sdk-container .type').css('display','block')
            flagTwo =false;
        }else{
            $('.sdk-container .type').css('display','none');
            flagTwo =true;
        }
    })
}
//点击显示隐藏结束

//api点击并选择
apiChoose()
function apiChoose(){

    var valueOne =$('.api-container .top .text p span:nth-child(1)').html();
    var valueTwo =$('.api-container .top .text p span:nth-child(3)').html();
    //点击短信语音，选择
    $('.api-container .msg-voi ul').on('click','li', function () {

            //点击赋值
        $('.api-container .top .text p span:first-child').html($(this).html());
        //隐藏弹出框
        $('.api-container .msg-voi').css('display','none');
        // 从新获取span标签里的值
        valueOne = $(this).html();
        valueTwo =$('.api-container .top .text p span:nth-child(3)').html();
        //判断改变颜色
        if(valueOne!=='短信语音'&&valueTwo!=='接口类型'){
            $('.api-container .top .look').css('background-color','#f9a830')

        }else{
            $('.api-container .top .look').css('background-color','#bbb')
        }
        //模拟点击一次，消除隐藏小BUG
        $('.api-container .top .text p span:first-child').trigger('click');
    });

    //点击接口类型，选择
     $('.api-container .type ul').on('click','li', function () {

        //点击赋值
        $('.api-container .top .text p span:nth-child(3)').html($(this).html());
        //隐藏弹出框
        $('.api-container .type').css('display','none');
        // 从新获取span标签里的值
         valueTwo = $(this).html();
         valueOne =$('.api-container .top .text p span:nth-child(1)').html();

         //判断改变颜色
         if(valueOne!=='短信语音'&&valueTwo!=='接口类型'){
             $('.api-container .top .look').css('background-color','#f9a830');

         }else{
             $('.api-container .top .look').css('background-color','#bbb')
         }
        //模拟点击一次，消除隐藏小BUG
        $('.api-container .top .text p span:nth-child(3)').trigger('click');
    });

    //查看按钮点击跳转
    apiToDetails()
    function apiToDetails(){
        //跳转并传真方法
        function jumpVal(){
            var  url = "SDK-common-details.html?valueOne="+valueOne+"&valueTwo="+valueTwo;//此处拼接内容传值
            window.location.href = url;
        }
        $('.api-container .top .look').click(function () {
            var lookBgc=$('.api-container .top .look').css('background-color');

            if(lookBgc==='rgb(249, 168, 48)'){
                jumpVal()
            }
        });

    }
}

//sdk点击并选择
sdkChoose()
function sdkChoose(){
    var valueOne =$('.sdk-container .top .text p span:nth-child(1)').html();
    var valueTwo =$('.sdk-container .top .text p span:nth-child(3)').html();

    //点击短信语音，选择
    $('.sdk-container .msg-voi ul').on('click','li', function () {

        var _index= $(this).index()
        //恢复第二个按钮初始值
        if($('.sdk-container .top .text p span:nth-child(3)').html()==='设置长/短连接单条发送'){
            $('.sdk-container .top .text p span:nth-child(3)').html('接口类型')
        }
        //点击赋值
        $('.sdk-container .top .text p span:first-child').html($(this).html());
        //隐藏弹出框
        $('.sdk-container .msg-voi').css('display','none');

        if(_index===1){
            $('.sdk-container .type ul li:nth-child(4)').html('设置长/短连接单条发送')
        }else{
            $('.sdk-container .type ul li:nth-child(4)').html('实例化短信对象')
        }
        // 从新获取span标签里的值
        valueOne = $(this).html();
        valueTwo =$('.sdk-container .top .text p span:nth-child(3)').html();
        //判断改变颜色
        if(valueOne!=='编程语言'&&valueTwo!=='接口类型'){
            $('.sdk-container .top .look').css('background-color','#f9a830')

        }else{
            $('.sdk-container .top .look').css('background-color','#bbb')
        }

        //模拟点击一次，消除隐藏小BUG
        $('.sdk-container .top .text p span:first-child').trigger('click');

    });

    //点击接口类型，选择
    $('.sdk-container .type ul').on('click','li', function () {

        //点击赋值
        $('.sdk-container .top .text p span:nth-child(3)').html($(this).html());
        //隐藏弹出框
        $('.sdk-container .type').css('display','none');

        // 从新获取span标签里的值
        valueTwo = $(this).html();
        valueOne =$('.sdk-container .top .text p span:nth-child(1)').html();

        //判断改变颜色

        if(valueOne!=='编程语言'&&valueTwo!=='接口类型'){
            $('.sdk-container .top .look').css('background-color','#f9a830');

        }else{
            $('.sdk-container .top .look').css('background-color','#bbb')
        }

        //模拟点击一次，消除隐藏小BUG
        $('.sdk-container .top .text p span:nth-child(3)').trigger('click');

    });
    //查看按钮点击跳转
    sdkToDetails()
    function sdkToDetails(){
        //跳转并传真方法
        function jumpVal(){
            var  url = "SDK-common-details.html?valueOne="+valueOne+"&valueTwo="+valueTwo;//此处拼接内容传值
            window.location.href = url;
        }
        $('.sdk-container .top .look').click(function () {
            var lookBgc=$('.sdk-container .top .look').css('background-color');

            if(lookBgc==='rgb(249, 168, 48)'){
                jumpVal()
            }
        });

    }

}

