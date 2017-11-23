

//获取url传过来的值方法
function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}


//根据传过来的值 执行一次
apiLoadOneTimes()
function apiLoadOneTimes(){
    //获取参数
    var valueOldOne = getQueryString('valueOne')
    var valueOldTwo = getQueryString('valueTwo')
    $('.API-common-details-container .title-top span:nth-child(3)').html(valueOldOne);
    $('.API-common-details-container .title-top span:nth-child(1)').html(valueOldTwo);

    if( $('.API-common-details-container .title-top span:nth-child(3)').html()=='语音'){
        $('.API-common-details-container .type .type-msg').css('display','none');
        $('.API-common-details-container .type .type-voi').css('display','block');
    }
}

//请求json数据方法
//单条发送接口,相同内容群发接口,查询余额,模版发送接口
function apiLoadCommonJson(fileName){

    $(function(){
        $.ajax({
            type: "GET",
            url:fileName,
            dataType: "json",
            success: function(result){

                addBox(result);

            }
        });
    });

    function addBox(result){
        $('.API-common-details-container .title-one').css('display','block')
        $('.API-common-details-container .cont-twoOne').css('display','none')
        $('.API-common-details-container .titleTwoOne').css('display','none')
        $('.API-common-details-container .titleThreeOne').css('display','none')
        $('.API-common-details-container .cont-ThreeOne').css('display','none')
        $('.API-common-details-container .title-first').html(result.title)


        //01
        $('.API-common-details-container .cont-one p').html(result.jkdefine)
        //02
        //清空内容 然后填充
        $(".API-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

        $(".API-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
        $.each(result.reqparam,function(index,obj){
            $(".API-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

            $(".API-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

        });
        //03
        //清空内容 然后填充
        $(".API-common-details-container .cont-three .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')
        $(".API-common-details-container .cont-three .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')

        $.each(result.respdesc,function(index,obj){
            $(".API-common-details-container .cont-three .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>...</td>');

            $(".API-common-details-container .cont-three .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_desc+'</td>');

        });
    }
}
//个性化群发接口专用,
function loadGxhJson(fileName){
    $(function(){
        $.ajax({
            type: "GET",
            url:fileName,
            dataType: "json",
            success: function(result){

                addBox(result);

            }
        });
    });

    function addBox(result){
        $('.API-common-details-container .title-one').css('display','block')
        $('.API-common-details-container .title-first').html(result.title)
        $('.API-common-details-container .titleThreeOne').css('display','none')
        $('.API-common-details-container .cont-ThreeOne').css('display','none')
        $('.API-common-details-container .cont-twoOne').css('display','block')
        $('.API-common-details-container .titleTwoOne').css('display','block')


        //01
        $('.API-common-details-container .cont-one p').html(result.jkdefine)
        //02
        //清空内容 然后填充
        $(".API-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

        $(".API-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
        $.each(result.reqparam,function(index,obj){
            $(".API-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

            $(".API-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

        });
        //1.2.1
        //清空内容 然后填充
        $(".API-common-details-container .cont-twoOne .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

        $(".API-common-details-container .cont-twoOne .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')

        $.each(result.reqotherparam,function(index,obj){

            $(".API-common-details-container .cont-twoOne .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

            $(".API-common-details-container .cont-twoOne .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

        });
        $(".API-common-details-container .cont-two .tableOne tbody").append()
        //03
        //清空内容 然后填充
        $(".API-common-details-container .cont-three .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')
        $(".API-common-details-container .cont-three .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')

        $.each(result.respdesc,function(index,obj){
            $(".API-common-details-container .cont-three .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>...</td>');

            $(".API-common-details-container .cont-three .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_desc+'</td>');

        });
    }

}
// 获取上行接口,获取状态报告接口专用
function loadGetMoJson(fileName){
    $(function(){
        $.ajax({
            type: "GET",
            url:fileName,
            dataType: "json",
            success: function(result){
                addBox(result);
            }
        });
    });

    function addBox(result){

        $('.API-common-details-container .title-one').css('display','block')
        $('.API-common-details-container .title-first').html(result.title)
        $('.API-common-details-container .titleTwoOne').css('display','none')
        $('.API-common-details-container .cont-twoOne').css('display','none')
        $('.API-common-details-container .titleThreeOne').css('display','block')
        $('.API-common-details-container .cont-ThreeOne').css('display','block')


        //1.1
        $('.API-common-details-container .cont-one p').html(result.jkdefine)
        //1.2
        //清空内容 然后填充
        $(".API-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

        $(".API-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
        $.each(result.reqparam,function(index,obj){
            $(".API-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');


            $(".API-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

        });

        $(".API-common-details-container .cont-two .tableOne tbody").append()
        //1.3
        //清空内容 然后填充
        $(".API-common-details-container .cont-three .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')
        $(".API-common-details-container .cont-three .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')

        $.each(result.respdesc,function(index,obj){
            $(".API-common-details-container .cont-three .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>...</td>');

            $(".API-common-details-container .cont-three .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_desc+'</td>');

        });
        //1.3.1
        $('.API-common-details-container .titleThreeOne').html(result.respotherdesc)
        $(".API-common-details-container .cont-ThreeOne .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

        $(".API-common-details-container .cont-ThreeOne .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')

        $.each(result.respotherparam,function(index,obj){

            $(".API-common-details-container .cont-ThreeOne .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');


            $(".API-common-details-container .cont-ThreeOne .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

        });
    }

}
//点击弹出选择框
apiDetailsShow()
function apiDetailsShow() {
    var flagOne =true;
    $('.API-common-details-container .title-top span:nth-child(3)').on('click', function () {
        if(flagOne){
            $('.API-common-details-container .msg-voi').css('display','block')
            flagOne =false;
        }else{
            $('.API-common-details-container .msg-voi').css('display','none');
            flagOne =true;
        }
        //点击时隐藏另外一个弹出框
        if($('.API-common-details-container .type').css('display')==='block'){
            $('.API-common-details-container .title-top span:nth-child(1)').trigger('click');
        }
    })
    var flagTwo =true;

    $('.API-common-details-container .title-top span:first-child').on('click', function () {
        if(flagTwo){
            $('.API-common-details-container .type').css('display','block')
            //点击时隐藏另外一个弹出框
            if($('.API-common-details-container .msg-voi').css('display')==='block'){
                $('.API-common-details-container .title-top span:nth-child(3)').trigger('click');
            }
            flagTwo =false;
        }else{
            $('.API-common-details-container .type').css('display','none');
            flagTwo =true;
        }


    })
}
//点击弹出选择框结束

//API点击并选择
apiDetailsChoose()
function apiDetailsChoose(){
    var valueOne =$('.API-common-details-container .title-top span:nth-child(3)').html();
    var valueTwo =$('.API-common-details-container .title-top span:nth-child(1)').html();
    //点击，选择
    $('.API-common-details-container .msg-voi ul').on('click','li', function () {
       // 当选择语音时，显示type-voi
       var _index= $(this).index()
        if(_index===1){
            $('.API-common-details-container .type .type-msg').css('display','none');
            $('.API-common-details-container .type .type-voi').css('display','block');
            $('.API-common-details-container .title-top span:nth-child(1)').html('接口类型');
        }else{
            $('.API-common-details-container .type .type-msg').css('display','block');
            $('.API-common-details-container .type .type-voi').css('display','none');
        }
        //点击短信时隐藏模版发送接口
        if(_index===0){
            $('.API-common-details-container .type .type-msg .Jk-template').css('display','none');
        }

        //点击赋值

        $('.API-common-details-container .title-top span:nth-child(3)').html($(this).html());
        //隐藏弹出框
        $('.API-common-details-container .msg-voi').css('display','none');


        // 从新获取span标签里的值
        valueOne = $(this).html();
        valueTwo =$('.API-common-details-container .title-top span:nth-child(1)').html();

        //模拟点击一次，消除隐藏小BUG
        $('.API-common-details-container .title-top span:nth-child(3)').trigger('click');

        //当值为'设置长/短连接单条发送'时定位有偏差，判断更正
        if(valueTwo==='相同内容群发接口'||valueTwo==='获取状态报告接口'){
            $('.API-common-details-container .msg-voi').css('left','4.2rem')
        }else{
            $('.API-common-details-container .msg-voi').css('left','3.6rem')
        };

        toDetails()
    });
    //点击短信语音选择结束


    //点击接口类型，选择
    $('.API-common-details-container .type ul').on('click','li', function () {

        //点击赋值
        $('.API-common-details-container .title-top span:nth-child(1)').html($(this).html());
        //隐藏弹出框
        $('.API-common-details-container .type').css('display','none');

        // 从新获取span标签里的值
        valueTwo = $(this).html();
        valueOne =$('.API-common-details-container .title-top span:nth-child(3)').html();

        //模拟点击一次，消除隐藏小BUG
        $('.API-common-details-container .title-top span:nth-child(1)').trigger('click');

        //当值为'设置长/短连接单条发送'时定位有偏差，判断更正
        if(valueTwo==='相同内容群发接口'||valueTwo==='获取状态报告接口'){
            $('.API-common-details-container .msg-voi').css('left','4.2rem')
        }else{
            $('.API-common-details-container .msg-voi').css('left','3.6rem')
        }

        toDetails()


    });
    //按钮点击跳转
    toDetails()
    function toDetails(){

        var arrOne =['短信','语音'];
        var arrTwo =['单条发送接口','相同内容群发接口','个性化群发接口','获取上行接口','模板发送接口','获取状态报告接口','查询余额'];

        if(valueOne==arrOne[0]&&valueTwo==arrTwo[0]){

            apiLoadCommonJson('./js/sms/api_sms_single_send.json')


        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[1]){
            apiLoadCommonJson('./js/sms/api_sms_batch_send.json')

        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[2]){

            loadGxhJson('./js/sms/api_sms_multi_send.json')

        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[3]){

            loadGetMoJson('./js/sms/api_sms_get_mo.json')

        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[4]){

            $('.API-common-details-container .title-top span:nth-child(3)').html('短信/语音');

        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[5]){
            loadGetMoJson('./js/sms/api_sms_get_rpt.json')

        }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[6]){

            apiLoadCommonJson('./js/sms/api_sms_get_balance.json')


        }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[4]){

            apiLoadCommonJson('./js/voice/api_voice_template_send.json')


        }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[5]){
            loadGetMoJson('./js/voice/api_voice_get_rpt.json')


        }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[6]){
            apiLoadCommonJson('./js/voice/api_voice_get_balance.json')

        }
    }

}



//点击表格中展开收起
detailsLook()
function detailsLook(){

    //cont-two第一次点击
    $('.API-common-details-container .cont-two .tableOne').on('click','.details-look-one', function () {
        $('.API-common-details-container .cont-two .tableTwo ').css('display','block')
        $('.API-common-details-container .cont-two .tableOne ').css('display','none')

    });

    //cont-two再次点击
    $('.API-common-details-container .cont-two .tableTwo').on('click','.details-look-two', function () {
        $('.API-common-details-container .cont-two .tableOne ').css('display','block')
        $('.API-common-details-container .cont-two .tableTwo').css('display','none');
    })

    //cont-twoOne第一次点击
    $('.API-common-details-container .cont-twoOne .tableOne').on('click','.details-look-one', function () {
        $('.API-common-details-container .cont-twoOne .tableTwo ').css('display','block')
        $('.API-common-details-container .cont-twoOne .tableOne ').css('display','none')

    });

    //cont-twoOne再次点击
    $('.API-common-details-container .cont-twoOne .tableTwo').on('click','.details-look-two', function () {
        $('.API-common-details-container .cont-twoOne .tableOne ').css('display','block')
        $('.API-common-details-container .cont-twoOne .tableTwo').css('display','none');
    })

    //.cont-three第一次点击
    $('.API-common-details-container .cont-three .tableOne').on('click','.details-look-one', function () {
        $('.API-common-details-container .cont-three .tableTwo ').css('display','block')
        $('.API-common-details-container .cont-three .tableOne ').css('display','none')

    });

    //.cont-three再次点击
    $('.API-common-details-container .cont-three .tableTwo').on('click','.details-look-two', function () {
        $('.API-common-details-container .cont-three .tableOne ').css('display','block')
        $('.API-common-details-container .cont-three .tableTwo').css('display','none');
    });
    //.cont-ThreeOne第一次点击
    $('.API-common-details-container .cont-ThreeOne .tableOne').on('click','.details-look-one', function () {
        $('.API-common-details-container .cont-ThreeOne .tableTwo ').css('display','block')
        $('.API-common-details-container .cont-ThreeOne .tableOne ').css('display','none')

    });

    //.cont-ThreeOne再次点击
    $('.API-common-details-container .cont-ThreeOne .tableTwo').on('click','.details-look-two', function () {
        $('.API-common-details-container .cont-ThreeOne .tableOne ').css('display','block')
        $('.API-common-details-container .cont-ThreeOne .tableTwo').css('display','none');
    });

}