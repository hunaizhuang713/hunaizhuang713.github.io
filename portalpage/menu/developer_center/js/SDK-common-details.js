
//请求json数据方法

//var a = $.getUrlParam('valueOne');
//var b = $.getUrlParam('valueTwo');

//console.log(a);
//console.log(b);
function loadCommonJson(fileName){

  $(function(){
    $.ajax({
      type: "POST",
      url:fileName,
      dataType: "json",
      success: function(result){
        addBox(result);
      }
    });
  });

  function addBox(result){
    $('.SDK-common-details-container .title-one').css('display','block')


    //01
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
      type: "POST",
      url:fileName,
      dataType: "json",
      success: function(result){
        addBox(result);
      }
    });
  });

  function addBox(result){
    //01

    $('.SDK-common-details-container .titleThree,.titleOne').css('display','none')
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
  })
  var flagTwo =true;

  $('.SDK-common-details-container .title-top span:first-child').on('click', function () {
    if(flagTwo){
      $('.SDK-common-details-container .type').css('display','block')
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
  //点击短信语音，选择
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

    if(_index===1){
      $('.SDK-common-details-container .type ul li:nth-child(4)').html('设置长/短连接单条发送')
    }else{
      $('.SDK-common-details-container .type ul li:nth-child(4)').html('实例化短信对象')
    }
    // 从新获取span标签里的值
    valueOne = $(this).html();
    valueTwo =$('.SDK-common-details-container .title-top span:nth-child(1)').html();

    //模拟点击一次，消除隐藏小BUG
    $('.SDK-common-details-container .title-top span:nth-child(3)').trigger('click');
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
        loadCommonJson('./js/java/sdk_java_multiSend.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[7]){
        loadCommonJson('./js/java/sdk_java_getRemains.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[8]){
        loadCommonJson('./js/java/sdk_java_getMo.json')
      }else if(valueOne==arrOne[0]&&valueTwo==arrTwo[9]){
        loadCommonJson('./js/java/sdk_java_getRpt.json')
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
        loadCommonJson('./js/php/sdk_php_multiSend.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[7]){
        loadCommonJson('./js/php/sdk_php_getRemains.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[8]){
        loadCommonJson('./js/php/sdk_php_getMo.json')
      }else if(valueOne==arrOne[1]&&valueTwo==arrTwo[9]){
        loadCommonJson('./js/php/sdk_php_getRpt.json')
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
        loadCommonJson('./js/net/sdk_net_multiSend.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[7]){
        loadCommonJson('./js/net/sdk_net_getRemains.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[8]){
        loadCommonJson('./js/net/sdk_net_getMo.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[9]){
        loadCommonJson('./js/net/sdk_net_getRpt.json')

      }else if(valueOne==arrOne[2]&&valueTwo==arrTwo[10]){

        loadCommonJson('./js/net/sdk_net_removeAccount.json')

      }

  }


}




//点击表格中展开收起
  detailsLook()
function detailsLook(){

  //第一次点击
  $('.SDK-common-details-container .cont-two .tableOne').on('click','.details-look-one', function () {
    $('.SDK-common-details-container .tableTwo ').css('display','block')
    $('.SDK-common-details-container .tableOne ').css('display','none')

  });

  //再次点击
  $('.SDK-common-details-container .cont-two .tableTwo').on('click','.details-look-two', function () {
    $('.SDK-common-details-container .tableOne ').css('display','block')
    $('.SDK-common-details-container .tableTwo').css('display','none');
  })
}