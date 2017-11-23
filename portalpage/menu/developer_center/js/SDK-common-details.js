

//获取url传过来的值方法
function getQueryString(key){
  var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result?decodeURIComponent(result[2]):null;
}


//根据传过来的值 执行一次
sdkLoadOneTimes()
function sdkLoadOneTimes(){
  //获取参数
  var valueOldOne = getQueryString('valueOne')
  var valueOldTwo = getQueryString('valueTwo')
  $('.SDK-common-details-container .title-top span:nth-child(3)').html(valueOldOne);
  $('.SDK-common-details-container .title-top span:nth-child(1)').html(valueOldTwo);

  if( $('.SDK-common-details-container .title-top span:nth-child(3)').html()=='PHP'){
    $('.SDK-common-details-container .type ul li:nth-child(4)').html('设置长/短连接单条发送')

  }
}

//请求json数据方法
function loadCommonJson(fileName){

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
    //隐藏没有的元素  显示需要的元素

    $('.SDK-common-details-container .title-one').css('display','block')
    $('.SDK-common-details-container .titleTwoOne').css('display','none')
    $('.SDK-common-details-container .cont-ThreeOne').css('display','none')
    $('.SDK-common-details-container .cont-twoOne').css('display','none')
    $('.SDK-common-details-container .titleThreeNew').css('display','none')


    //01
    $('.SDK-common-details-container .titleTwo').html('2.请求参数说明')

    $('.SDK-common-details-container .cont-one p').html(result.jkdefine)
    //02
    //清空内容 然后填充

    //判断单条发送
    if(result.reqdesc!=[]){
      $('.SDK-common-details-container .titleTwoNew').html(result.reqdesc)

    }else{
      $('.SDK-common-details-container .titleTwoNew').css('display','none')
    }
    $(".SDK-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.reqparam,function(index,obj){
      $(".SDK-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //03
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-three").html('')
    $.each(result.respdesc,function(index,obj){

      $(".SDK-common-details-container .cont-three").append('<p>'+obj.resp_desc+'</p>')

    });
  }
}
//接口列表专用
function loadJkListjson(fileName){

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
       //隐藏没有的元素  显示需要的元素

    $('.SDK-common-details-container .titleTwoOne').css('display','none')
    $('.SDK-common-details-container .cont-ThreeOne').css('display','none')
    $('.SDK-common-details-container .cont-twoOne').css('display','none')
    $('.SDK-common-details-container .titleTwoNew').css('display','none')
    $('.SDK-common-details-container .titleThreeNew').css('display','none')

    $('.SDK-common-details-container .titleThree,.titleOne').css('display','none')
    //01
    $('.SDK-common-details-container .titleTwo').html('1.接口列表')


    $('.SDK-common-details-container .cont-one p').html('')
    //02
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-two .tableOne tbody").html('<tr><td>接口名称</td><td>接口定义</td><td>接口说明</td></tr>')

    $.each(result.dataList,function(index,obj){
      $(".SDK-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.jkname+'</td><td>'+obj.jkdefine+'</td><td>'+obj.jkdesc+'</td>');


    });
    //03
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-three").html('')
    $.each(result.respdesc,function(index,obj){

    });
  }
}
//查询剩余金额模板 方法
function loadBalanceJson(fileName){
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
    //隐藏没有的元素  显示需要的元素

    $('.SDK-common-details-container .title-one').css('display','block')
    $('.SDK-common-details-container .titleTwoOne').css('display','none')
    $('.SDK-common-details-container .cont-twoOne').css('display','none')
    $('.SDK-common-details-container .titleTwoNew').css('display','none')
    $('.SDK-common-details-container .titleThreeNew').css('display','none')

    $('.SDK-common-details-container .cont-ThreeOne').css('display','block')


    //01
    $('.SDK-common-details-container .titleTwo').html('2.请求参数说明')

    $('.SDK-common-details-container .cont-one p').html(result.jkdefine)
    //02
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.reqparam,function(index,obj){
      $(".SDK-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //03
    //3.1

    //清空内容 然后填充
    $(".SDK-common-details-container .cont-ThreeOne .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-ThreeOne .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.respparam,function(index,obj){
      $(".SDK-common-details-container .cont-ThreeOne .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-ThreeOne .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-three").html('')
    $.each(result.respdesc,function(index,obj){

      $(".SDK-common-details-container .cont-three").append('<p>'+obj.resp_desc+'</p>')

    });
  }
}

//php .net 获取上行 获取状态报告
function loadPHPgetMoJson(fileName){
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
    //隐藏没有的元素  显示需要的元素

    $('.SDK-common-details-container .title-one').css('display','block')
    $('.SDK-common-details-container .titleTwoOne').css('display','none')
    $('.SDK-common-details-container .cont-twoOne').css('display','none')
    $('.SDK-common-details-container .titleTwoNew').css('display','none')

    $('.SDK-common-details-container .cont-ThreeOne').css('display','block')


    //01
    $('.SDK-common-details-container .titleTwo').html('2.请求参数说明')

    $('.SDK-common-details-container .cont-one p').html(result.jkdefine)
    //02
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.reqparam,function(index,obj){
      $(".SDK-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //03
    //3.1
    if(result.respparamdesc!=[]){

      $('.SDK-common-details-container .titleThreeNew').html(result.respparamdesc)
    }else{
      $('.SDK-common-details-container .titleThreeNew').css('display','none')

    }
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-ThreeOne .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-ThreeOne .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.respparam,function(index,obj){
      $(".SDK-common-details-container .cont-ThreeOne .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-ThreeOne .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-three").html('')
    $.each(result.respdesc,function(index,obj){

      $(".SDK-common-details-container .cont-three").append('<p>'+obj.resp_desc+'</p>')

    });
  }
}


//java个性化群发模板,获取上行 ,获取状态报告 方法

function loadMultiSendJson(fileName){
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
    //隐藏没有的元素  显示需要的元素
    $('.SDK-common-details-container .title-one').css('display','block')
    $('.SDK-common-details-container .titleTwoOne').css('display','bolck')
    $('.SDK-common-details-container .cont-twoOne').css('display','block')
    $('.SDK-common-details-container .cont-ThreeOne').css('display','none')
    $('.SDK-common-details-container .titleThreeNew').css('display','none')


    //01
    $('.SDK-common-details-container .titleTwo').html('2.请求参数说明')
    if(result.reqdesc!=[]){
      $('.SDK-common-details-container .titleTwoNew').html(result.reqdesc)

    }else{
      $('.SDK-common-details-container .titleTwoNew').css('display','none')
    }
    $('.SDK-common-details-container .cont-one p').html(result.jkdefine)
    //02
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-two .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-two .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.reqparam,function(index,obj){
      $(".SDK-common-details-container .cont-two .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-two .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });

    //2.1
    $('.SDK-common-details-container .titleTwoOne').html(result.reqotherdesc)

    //清空内容 然后填充
    $(".SDK-common-details-container .cont-twoOne .tableOne tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-one">展开描述 <span  class="icon-gray "></span></td></tr>')

    $(".SDK-common-details-container .cont-twoOne .tableTwo tbody").html('<tr><td>参数</td><td>类型</td><td>是否必须</td><td class="details-look-two" >收起描述 <span  class="icon-gray "></span></td></tr>')
    $.each(result.reqotherparam,function(index,obj){
      $(".SDK-common-details-container .cont-twoOne .tableOne tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>...</td>');

      $(".SDK-common-details-container .cont-twoOne .tableTwo tbody").append('<tr><td>'+obj.param_key+'</td><td>'+obj.param_type+'</td><td>'+obj.param_need+'</td><td>'+obj.param_desc+'</td>');

    });
    //03
    //清空内容 然后填充
    $(".SDK-common-details-container .cont-three").html('')
    $.each(result.respdesc,function(index,obj){

      $(".SDK-common-details-container .cont-three").append('<p>'+obj.resp_desc+'</p>')

    });
  }
}

//点击弹出选择框
sdkDetailsShow()
function sdkDetailsShow() {
  var flagOne =true;
  $('.SDK-common-details-container .title-top span:nth-child(3)').on('click', function () {
    if(flagOne){
      $('.SDK-common-details-container .msg-voi').css('display','block')
      flagOne =false;
    }else{
      $('.SDK-common-details-container .msg-voi').css('display','none');
      flagOne =true;
    }
    //点击时隐藏另外一个弹出框
    if($('.SDK-common-details-container .type').css('display')==='block'){
      $('.SDK-common-details-container .title-top span:nth-child(1)').trigger('click');
    }
  })
  var flagTwo =true;

  $('.SDK-common-details-container .title-top span:first-child').on('click', function () {
    if(flagTwo){
      $('.SDK-common-details-container .type').css('display','block')
      //点击时隐藏另外一个弹出框
      if($('.SDK-common-details-container .msg-voi').css('display')==='block'){
        $('.SDK-common-details-container .title-top span:nth-child(3)').trigger('click');
      }
      flagTwo =false;
    }else{
      $('.SDK-common-details-container .type').css('display','none');
      flagTwo =true;
    }


  })
}
//点击弹出选择框结束

//sdk点击并选择
sdkDetailsChoose()
function sdkDetailsChoose(){
  var valueOne =$('.SDK-common-details-container .title-top span:nth-child(3)').html();
  var valueTwo =$('.SDK-common-details-container .title-top span:nth-child(1)').html();
  //点击，选择
  $('.SDK-common-details-container .msg-voi ul').on('click','li', function () {

    var _index= $(this).index()
    //恢复类型按钮初始值
    if($('.SDK-common-details-container .title-top span:nth-child(1)').html()==='设置长/短连接单条发送'){
      $('.SDK-common-details-container .title-top span:nth-child(1)').html('接口类型')
    }
    //点击赋值

    $('.SDK-common-details-container .title-top span:nth-child(3)').html($(this).html());
    //隐藏弹出框
    $('.SDK-common-details-container .msg-voi').css('display','none');
    //判断改变列表值
    if(_index===1){
      $('.SDK-common-details-container .type ul li:nth-child(4)').html('设置长/短连接单条发送')
    }else{
      $('.SDK-common-details-container .type ul li:nth-child(4)').html('实例化短信对象')
    };
    if(valueTwo==='实例化短信对象'&&_index===1){
      $('.SDK-common-details-container .title-top span:nth-child(1)').html('接口类型')

    }
    // 从新获取span标签里的值
    valueOne = $(this).html();
    valueTwo =$('.SDK-common-details-container .title-top span:nth-child(1)').html();

    //模拟点击一次，消除隐藏小BUG
    $('.SDK-common-details-container .title-top span:nth-child(3)').trigger('click');

    //当值为'设置长/短连接单条发送'时定位有偏差，判断更正
    if(valueTwo==='设置长/短连接单条发送'){
      $('.SDK-common-details-container .msg-voi').css('left','4.6rem')
    }else{
      $('.SDK-common-details-container .msg-voi').css('left','3.6rem')
    };
    toDetails()
  });
  //点击短信语音选择结束


  //点击接口类型，选择
  $('.SDK-common-details-container .type ul').on('click','li', function () {

    //点击赋值
    $('.SDK-common-details-container .title-top span:nth-child(1)').html($(this).html());
    //隐藏弹出框
    $('.SDK-common-details-container .type').css('display','none');

    // 从新获取span标签里的值
    valueTwo = $(this).html();
    valueOne =$('.SDK-common-details-container .title-top span:nth-child(3)').html();

    //模拟点击一次，消除隐藏小BUG
    $('.SDK-common-details-container .title-top span:nth-child(1)').trigger('click');

    //当值为'设置长/短连接单条发送'时定位有偏差，判断更正
    if(valueTwo==='设置长/短连接单条发送'){
      $('.SDK-common-details-container .msg-voi').css('left','4.6rem')
    }else{
      $('.SDK-common-details-container .msg-voi').css('left','3.6rem')
    }
    toDetails()


  });
  //查看按钮点击跳转
  toDetails()
  function toDetails(){

    var arrOne =['JAVA','PHP','.NET'];
    var arrTwo =['接口列表','设置全局参数','设置账号信息','实例化短信对象','单条发送','相同内容群发','个性化群发','查询余额','获取上行','获取状态报告','移除帐号','设置长/短连接单条发送'];

      if(valueOne==arrOne[0]&&valueTwo==arrTwo[0]){

        loadJkListjson('./js/java/sdk_java_jk_list.json')


      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[1]){
        loadCommonJson('./js/java/sdk_java_setGlobalParams.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[2]){
        loadCommonJson('./js/java/sdk_java_setAccountInfo.json')

      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[3]){

        loadCommonJson('./js/java/sdk_java_SmsSendConn.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[4]){
        loadCommonJson('./js/java/sdk_java_singleSend.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[5]){

        loadCommonJson('./js/java/sdk_java_batchSend.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[6]){
        loadMultiSendJson('./js/java/sdk_java_multiSend.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[7]){
        loadBalanceJson('./js/java/sdk_java_getRemains.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[8]){
        loadMultiSendJson('./js/java/sdk_java_getMo.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[9]){
        loadMultiSendJson('./js/java/sdk_java_getRpt.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[10]){
        loadCommonJson('./js/java/sdk_java_removeAccount.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[0]){
        loadJkListjson('./js/php/sdk_php_jk_list.json')

      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[1]){
        loadCommonJson('./js/php/sdk_php_setGlobalParams.json')

      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[2]){

        loadCommonJson('./js/php/sdk_php_setAccountInfo.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[3]){


      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[4]){
        loadCommonJson('./js/php/sdk_php_singleSend.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[5]){
        loadCommonJson('./js/php/sdk_php_batchSend.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[6]){
        loadMultiSendJson('./js/php/sdk_php_multiSend.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[7]){
        loadBalanceJson('./js/php/sdk_php_getRemains.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[8]){
        loadPHPgetMoJson('./js/php/sdk_php_getMo.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[9]){
        loadPHPgetMoJson('./js/php/sdk_php_getRpt.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[10]){
        loadCommonJson('./js/php/sdk_php_removeAccount.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[11]){
        loadCommonJson('./js/php/sdk_php_SmsSendConn.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[0]){
        loadJkListjson('./js/net/sdk_net_jk_list.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[1]){
        loadCommonJson('./js/net/sdk_net_setRequestPath .json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[2]){
        loadCommonJson('./js/net/sdk_net_setAccountInfo.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[3]){
        loadCommonJson('./js/net/sdk_net_SmsSendConn.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[4]){
        loadCommonJson('./js/net/sdk_net_singleSend.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[5]){
        loadCommonJson('./js/net/sdk_net_batchSend.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[6]){
        loadMultiSendJson('./js/net/sdk_net_multiSend.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[7]){
        loadBalanceJson('./js/net/sdk_net_getRemains.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[8]){
        loadBalanceJson('./js/net/sdk_net_getMo.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[9]){
        loadBalanceJson('./js/net/sdk_net_getRpt.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[10]){

        loadCommonJson('./js/net/sdk_net_removeAccount.json')

      }

  }


}




//点击表格中展开收起
  detailsLook()
function detailsLook(){

  //cont-two第一次点击
  $('.SDK-common-details-container .cont-two .tableOne').on('click','.details-look-one', function () {
    $('.SDK-common-details-container .cont-two .tableTwo ').css('display','block')
    $('.SDK-common-details-container .cont-two .tableOne ').css('display','none')

  });

  //cont-two再次点击
  $('.SDK-common-details-container .cont-two .tableTwo').on('click','.details-look-two', function () {
    $('.SDK-common-details-container .cont-two .tableOne ').css('display','block')
    $('.SDK-common-details-container .cont-two .tableTwo').css('display','none');
  })
  //cont-twoOne第一次点击
  $('.SDK-common-details-container .cont-twoOne .tableOne').on('click','.details-look-one', function () {
    $('.SDK-common-details-container .cont-twoOne .tableTwo ').css('display','block')
    $('.SDK-common-details-container .cont-twoOne .tableOne ').css('display','none')

  });

  //cont-twoOne再次点击
  $('.SDK-common-details-container .cont-twoOne .tableTwo').on('click','.details-look-two', function () {
    $('.SDK-common-details-container .cont-twoOne .tableOne ').css('display','block')
    $('.SDK-common-details-container .cont-twoOne .tableTwo').css('display','none');
  })
  //cont-ThreeOne第一次点击
  $('.SDK-common-details-container .cont-ThreeOne .tableOne').on('click','.details-look-one', function () {
    $('.SDK-common-details-container .cont-ThreeOne .tableTwo ').css('display','block')
    $('.SDK-common-details-container .cont-ThreeOne .tableOne ').css('display','none')

  });

  //cont-ThreeOne再次点击
  $('.SDK-common-details-container .cont-ThreeOne .tableTwo').on('click','.details-look-two', function () {
    $('.SDK-common-details-container .cont-ThreeOne .tableOne ').css('display','block')
    $('.SDK-common-details-container .cont-ThreeOne .tableTwo').css('display','none');
  })
}