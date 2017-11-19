var warning = function(){
	var fn = {},
		layer = $('<div class="layer">'+
			'<h3>提示</h3>'+
			'<p></p>'+
		'</div>');
	fn.say = function(tips){
		clearTimeout(delay);
		var delay = setTimeout(function(){
			layer.detach().find('p').text(tips).parent().appendTo($('body'));
			clearTimeout(handle);
			var handle = setTimeout(function(){
				layer.detach();
			},1700);
		},500);
	};
	return fn;
}();
var por_faq_Page = [1],
	question ='',
	port = 'mgr_faqManage.hts',
	port_m = 'mgr_quesManage.htm';
var rend_acc_myqst = function(){
	var data = {pageIndex : por_faq_Page[0],question:question},
	successFunc = function(data){
		var pageInfo = data.pageInfo,
			dataList = data.dataList,
			html = '',
			table = $('.por_qst_list');
		/*渲染列表*/
		$.each(dataList,function(i,d){
			var isView = d.isPublic=='0'?'':'icon-reveal-s';
			var ispublic = d.isPublic =='0'?d.viewCount+'人浏览':'仅自己可见';
			var question = d.question.replace(/iframe|script|<|>/g,'');
			html+='<tr>'+
					'<td>'+
						'<div data-id="'+d.id+'" class=" border-bottom paddBot20 pos-rel mb20 js_acc_qMark js_goDTL">'+
							'<div class="acc_question pnt js-gotoDtl" style="line-height:20px;height:40px;word-break:break-all;">'+
								'<p class="pos-rel" style="word-break:break-all;">'+question+'</p>'+
							'</div>'+
							'<p class="fs12 middle">'+
								'<span class="icon-reveal"></span>'+
								'<span class="mr50 color8">'+d.viewCount+'人浏览</span>'+
								'<span class=" color8">用户：'+d.user+'</span>'+
								'<span class="color8 fr">'+d.qCreateTime+'</span>'+
							'</p>'+
						'</div>'+
					'</td>'+
				'</tr>';
		});
		table.empty().append(html);
		/*溢出省略号*/
		$(".acc_question").dotdotdot({
			 wrap: 'letter',
			 watch:true,
			 ellipsis	: '........................',
			 after:$('.js_toDetail'),
			 callback	: function( is, cnt ) {
				 if(is){
					 $(this).find('p').append('<span class="css-toDetail blue js_toDetail pnt">【查看更多】</span>');
				 }
			 }
		});
		/*渲染分页器*/
		$('.por_qst_lTotal').text(pageInfo.totalRec);
		$('.por_qst_lIndex').text(pageInfo.pageIndex);
		$('.por_qst_lTotalPage').text(pageInfo.totalPage);
		$('.por_qst_lPagesize').text(pageInfo.pageSize);
	};
	loadData(port,"r_faq_publicList",true,data,successFunc);
};

/*ready 入口*/
$(function(){
	var hot_success = function(data){
		var dataList = data.dataList,
			html='',
			ul = $('.por-hotqst-ul');
		$.each(dataList,function(i,d){
			html+='<li data-id="'+d.id+'" class="js-ellipsis3 pos-rel js_goDTL">'+
				'<a class="hot_question"  href="javascript:void(0);">'+
					'<p>'+(i+1)+'.'+d.question+'<span class="blue js_todtl pnt">【查看更多】</span></p>'+
				'</a>'+
			'</li>';
		});
		ul.empty().append(html);
		$(".hot_question").dotdotdot({
			 after:'span.js_todtl',
			 callback:function(isTruncated, orgContent){
				 if(!isTruncated){
					 $(this).find('.js_todtl').remove();
				 }
			 }
		});
	};
	if(/askQuestion/g.test(location.search)){/* 1."去提问题"*/
		(isLog() == true)?($(".por_faq_loginArea").show()):('false');
		$('.js-qst-describ').val('');
		$('.por-pic-area .js-spanbox').remove();
		$('#isOpen').prop("checked",false); /*清空checkbox*/
		$('#isAnonymous').prop("checked",false)
		$('.por-qst-type option').eq(0).prop('selected','selected');
		$('.por_ask_question').show().siblings().hide();
	}else if(/id/g.test(location.search)){  /*2.如果是查看详情*/
		var id = location.search.replace(/.+(id=)(.+)/,'$2');
		checkDetails(id);
	}else{/*默认渲染一次*/
		$('.por_qst_listDiv').show().siblings().hide();
		rend_acc_myqst();
	}
	
	/*绑定分页器的点击事件 */
	js_page('por_qst_l',por_faq_Page,rend_acc_myqst);
	/*加载热点问题*/
	loadData(port,'r_faq_hotSpotList',true,{pageSize:10},hot_success);
	/*搜索*/
	$('.faq_find_problem_btn').click(function(){
		question = $.trim($('.faq_find_problem_text').val());
		rend_acc_myqst();
		$('.por_qst_listDiv').show().siblings().hide();/*隐藏不活动的div*/
	});
	/*返回列表*/
	$('.por_back_list').click(function(){
		if(location.search.match(/login=true/gi)){
			location.search='';
		}
		rend_acc_myqst();
		$('.por_qst_listDiv').show().siblings().hide();/*隐藏不活动的div*/
	});
	$('.por_back_list2').click(function(){  /* 放弃提问，返回列表*/
		if(location.search.match(/login=true/gi)){
			location.search='';
		}
		rend_acc_myqst();
		$('.por_qst_listDiv').show().siblings().hide();/*隐藏不活动的div*/
	});
	/*点击进入详情*/
	$(document).off('click','.js_goDTL').on('click','.js_goDTL',function(){
		var id= $(this).attr('data-id');
		checkDetails(id);
	});
	/*删除问题*/
	$('.por_qst_delete').click(function(){
		var id = $(this).attr('data-id');
		$('.comfDelQstBtn').attr('data-id',id).parents('#confirm-delete-qst').modal();
	});
	/*确认删除问题*/
	$('.comfDelQstBtn').click(function(){
		var id = $(this).attr('data-id'),
			successFunc = function(data){
				if(data.resultCode=='0'){
					rend_acc_myqst();
					$('.por_qst_details').hide().siblings('.por_qst_listDiv').show();
					warning.say("删除成功！");
					setTimeout(function(){
						window.location.search='';
					},1)
				}
			};
		loadData("mgr_quesManage.htm","d_myQuestion",true,{id:id},successFunc,true);
	});
	/*编辑 我的问题*/
	$('.por_qst_editBtn').click(function(){
		$('#pop-editQst-modal').modal({backdrop: 'static', keyboard: false});
		$('.comfReEditQstBtn').attr('data-id',$(this).attr('data-id'));
	});
	/*提交编辑过的问题*/
	$('.comfReEditQstBtn').click(function(){
		var	id = $(this).attr('data-id'), 
			question = $.trim($('.js-reQst-describ').val()),
			imageUrl = getUrl2($('.por-rePic-area')),
			data = {
					id:id,
					question:question,
					imageUrl:imageUrl
			},
			successFunc = function(data){
				if(data.resultCode=='0'){
					warning.say("修改成功！");
					$('#pop-editQst-modal').modal('hide');
					checkDetails(id);
				}
			};
		
		if(question==''){
			warnign.say("请输入问题描述");
		}else{
			loadData("mgr_quesManage.htm","u_myQuestion",true,data,successFunc,true);
		}
	});
	/*去提问题*/
	$('.goToAskQuestion').click(function(){/*提问前先清空输入框*/
		/*如果登录用户，展示权限区域*/
		(isLog() == true)?($(".por_faq_loginArea").show()):('false');
		$('.js-qst-describ').val('');
		$('.por-pic-area .js-spanbox').remove();
		$('#isOpen').prop("checked",false); /*清空checkbox*/
		$('#isAnonymous').prop("checked",false)
		$('.por-qst-type option').eq(0).prop('selected','selected');
		$('.por_ask_question').show().siblings().hide();
	});
	/*提交问题*/
    $('.js_submit_question').click(function(){
    	var question = $.trim($('.js-qst-describ').val()),
    		type = $('.por-qst-type option:selected').val(),
    		data1 = $('.js-qst-describ,.por-qst-type').serialize(),
    		isOpen = $('#isOpen').prop("checked")==false?'0':'1',
    		isAnonymous = $('#isAnonymous').prop("checked")==false?'1':'0',
    		imageUrl = getUrl2($('.por-pic-area')),		
    		data2 = '&isOpen='+isOpen+'&isAnonymous='+isAnonymous,
    		data3 = getUrl($('.por-pic-area')),
    		data = data1+data2+data3,
    		jsonData = {
				question:question,
				type:type,
				isOpen:isOpen,
				isAnonymous:isAnonymous,
				imageUrl:imageUrl
    		},
    		success = function(data){
	    		if(data.resultCode=='0'){
	    			warning.say("提交成功！");
	    			rend_acc_myqst();
	    			$('.por_qst_listDiv').show().siblings().hide();/*隐藏不活动的div*/
	    		}else{
	    			warning.say(data.errInfo);
	    		}
	    	};
    	if(question==''){
    		warning.say("请输入您的问题！")
    	}else if(type==''){
    		warning.say("请选择问题类型！")
    	}else{
    		loadData(port,'c_faq_question',false,jsonData,success);
    	}
    });
    
	/*删除图片   界面上用户删除已经上传的图片 d_faq_Picture  参数  img_url  图片url*/
	$(document).off('click','.js-dltimg').on('click','.js-dltimg',function(){
          $(this).closest('.css-spanbox').remove();
	});
/*ready 结束*/	
});
/*提交问题上传图片*/
$('#uploadInput').on("change", function() {
	var _this = $(this),
		uploadNum = _this.closest('.add-img').siblings('.js-spanbox').length;
	if(uploadNum<10){
		var val = _this.val();
		if(val.length > 0) {
			var id = _this.attr("name"),
				successFunc = function(data, textStatus) {
					if(data.resultCode == "0") {
						var html ='<span class="pos-rel css-spanbox js-spanbox"><img data-imgurlSee ='+data.imgurl+' style = "width:88px;height:88px;float:left;margin-right:10px;" src='+"../" + data.imgurl+' /><span class="css-dtlimg js-dltimg"></span></span>'	;
						$('.por-pic-area .add-img').before(html);
					} else {
						warning.say(data.errInfo);
					}
				},
				errorFun = function(data, status, e) {
					warning.say("上传图片失败！");
				};
			upload(id, port, "c_faq_uploadPicture", successFunc, errorFun);
		}else {} 
	}else{
		warning.say("上传数量已达上限（10张）");
		resetfileinput('#uploadInput');
	}
});
/*重复编辑上传图片*/
$('#uploadInput-re').on("change", function() {
	var _this = $(this),
		uploadNum = _this.closest('.add-img-re').siblings('.js-spanbox').length;
	if(uploadNum<10){
		var val = _this.val();
		if(val.length > 0) {
			var id = _this.attr("name"),
				successFunc = function(data, textStatus) {
					if(data.resultCode == "0") {
						var html ='<span class="pos-rel css-spanbox js-spanbox"><img data-imgurlSee ='+data.imgurl+' style = "width:88px;height:88px;float:left;margin-right:10px;" src='+"../" + data.imgurl+' /><span class="css-dtlimg js-dltimg"></span></span>'	;
						$('.por-rePic-area .add-img-re').before(html);
					} else {
						warning.say(data.errInfo);
					}
				},
				errorFun = function(data, status, e) {
					warning.say("上传图片失败！");
				};
			upload(id, port, "c_faq_uploadPicture", successFunc, errorFun);
		}else {}
	}else{
		warning.say("上传数量已达上限（10张）");
		resetfileinput('#uploadInput-re');
	}
});
/*查看详情*/
function checkDetails(id){
	var html='',html2='',html3='';
	var success = function(data){
		var dataList = data.dataList[0],
			qCreateTime = dataList.qCreateTime.substr(0,11),
			aCreateTime = dataList.aCreateTime.substr(0,19),
			qst = dataList.question.replace(/iframe|script|<|>/g,'');
		$('.por_qst_dtlQUser').text(dataList.user);
		$('.por_qst_dtlQTime').text(qCreateTime);
		$('.por_qst_dtlQTime').text();
		$('.por_qst_dtlQContent').text(qst);
		$('.por-reQst-describ').val(qst);//填充编辑问题弹窗的textarea
		$('.por_ans_content').text(dataList.answer);
		$('.por_ans_dtlATime').text(aCreateTime);
		$('.por_qst_dtlQviewCount').text(dataList.viewCount);
		if(dataList.qImgUrl!=''){/*有图片的时候显示图片*/
			$('.add-img-re').siblings().remove();/*清空编辑区域图片*/
			$.each(dataList.qImgUrl.split(','),function(i,d){
				html+='<img src="..'+d+'"/>';
				html2 +='<span class="pos-rel css-spanbox js-spanbox"><img data-imgurlsee="'+d+'" style = "width:88px;height:88px;float:left;margin-right:10px;" src='+"../" + d+' /><span class="css-dtlimg js-dltimg"></span></span>';
			});
			$('.por-showimg-box').html(html);
			$('.por-rePic-area').prepend(html2);
		}else{
			$('.por-showimg-box').empty();
		}
		$('.por_qst_details').show().siblings().hide();/*隐藏不活动的div*/
		$('html,body').animate({scrollTop:0},{queue:false,duration:0});/*回到页面顶部*/
		if(dataList.answer==''){ /*没有回复，就隐藏回复框*/
			$('.por_qst_dtlAnswer').hide();
		}else{
			if(dataList.aImgUrl!=''){/* 有回复图片*/
				$.each(dataList.aImgUrl.split(','),function(i,d){
					html3+='<img src="..'+d+'"/>';
				});
				$('.js-porAns-content').html(html3).show();
			}else{
				$('.js-porAns-content').empty().hide();
			}
			$('.por_qst_dtlAnswer').show();
		}
		if(dataList.auth=='0'){ /*0表示有权限修改*/
			$('.por_qst_delete').show().attr('data-id',id);
			if(dataList.answer==''){
				$('.por-qst-editArea').show().find('.por_qst_editBtn').attr('data-id',id);
			}else{
				$('.por-qst-editArea').hide();
			}
		}else{
			$('.por_qst_delete').hide();
			$('.por-qst-editArea').hide();
		}
	};
	if(isLog()==true){ /*如果登录用户，用port_m接口 ， 方法：r_myQuestion ,带tkn*/
		loadData(port_m,'r_myQuestion',true,{id:id},success,true);
	}else{
		loadData(port,'r_faq_detailList',true,{id:id},success);
	}
	
}
/*获取图片路径*/
function getUrl(contain){
	var url = '';
	contain.find('.js-spanbox').each(function(i,d){
		if(i==0){
			url+= ($(d).find('img').attr('data-imgurlsee'));
		}else{
			url+= (','+$(d).find('img').attr('data-imgurlsee'));
		}
	});
	return '&imageUrl='+url;
}
function getUrl2(contain){
	var url = '';
	contain.find('.js-spanbox').each(function(i,d){
		if(i==0){
			url+= ($(d).find('img').attr('data-imgurlsee'));
		}else{
			url+= (','+$(d).find('img').attr('data-imgurlsee'));
		}
	});
	return url;
}
/*加载数据公用方法*/
function loadData(port, port_method, isAsync,data, successFunc,tkn) {
	/*var url =("../") + ( port.match(/\?/g) ? (port + modToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); */
	var url ='',
		token = Cookies('tkn');
	if(tkn){
		url =("../") + (port) + '?tkn=' + token + ("&method="+port_method);
	}else{
		url =("../") + (port) + ("?method="+port_method);
	}
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: isAsync,
		dataType: 'json',
		data: data,
		success: function(data){
			if(data.resultCode == "0"){
				successFunc(data);
			}else{
				warning.say(data.errInfo);
			}
		}
	});
};
/*分页 抽象函数  使用实例：js_page('acc_mytra_h','acc_mytra_hIndex',rend_accMytra); global_index需要预先定义全局index */
function js_page(pre_cName,global_index,rend_func){
	$('.'+pre_cName+'First').click(function(){
		if(global_index[0] == 1){
		}else{
			global_index[0]=1;
			rend_func();
		}
	});
	$('.'+pre_cName+'Up').click(function(){
		global_index[0]--;
		if(global_index[0]==0){
			warning.say("已经是第一页");
			global_index[0] = 1;
		}else{
			rend_func();
		}
	});
	$('.'+pre_cName+'Down').click(function(){ 
		var totalpage = $('.'+pre_cName+'TotalPage').text(); 
		if(global_index[0]==totalpage){
			warning.say("已经是最后一页");
		}else{
			global_index[0]++;
			rend_func();
		}
	});
	$('.'+pre_cName+'End').click(function(){
		var totalpage = $('.'+pre_cName+'TotalPage').text();
		if(global_index[0] == totalpage){}else{
			global_index[0] = totalpage;
			rend_func();
		}
	});
	$('.'+pre_cName+'Go').click(function(){
		var inputIndex = ($('.'+pre_cName+'InputIndex').val());/*获取输入数值*/
		var totalpage = parseInt($('.'+pre_cName+'TotalPage').text()); /*获取总共页数*/
		/*输入的页数 = 当前页数 :不加载*/
		if(inputIndex!=global_index[0]){
			if(inputIndex.match(/[1-9]\d*/) && parseInt(inputIndex) < totalpage + 1){
				global_index[0] = inputIndex;
				rend_func();
			}else{
				warning.say("输入有误，请重新输入！");
				$('.'+pre_cName+'InputIndex').val('');
			}
		}else{}
	});
}

/*上传图片*/
function upload(id,port, port_method,successFunc,errorFun){
		var imgtem=$("#"+id).val();
		if(imgtem.length<1){
			return ;	
		}else{
			var c = ".jpg|.jpeg|.png|";
		    var b = imgtem.substring(imgtem.lastIndexOf("."),imgtem.length).toLowerCase();
		    if(c.indexOf(b)<0){
		        warning.say("请上传.jpg、.jpeg、.png类型的图片！");
		        resetfileinput('#'+id);
		        return;
		    }
		}
		
		var size=1*1024*1024;
		var index=0;
		   /*url =("../") + ( port.match(/\?/g) ? (port + localToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method);*/
		var	url =("../") + (port) + ("?method="+port_method);
		   $.ajaxFileUpload({
		       url:url, //需要链接到服务器地址
		       secureuri: false,
		       fileElementId: id,
		       data:{'fname':id,'size':size},
		       dataType:'json',
		       success: successFunc,
		       error: errorFun,
		       complete: function(){
		    	   resetfileinput('#'+id);
		       }
		   });
		   $("#"+id).val("");
}

function resetfileinput(obj){
	 $(obj).wrap("<form></form>");
    var $form = $(obj).parent();
    $form[0].reset();
    $(obj).unwrap();
}

function isLog(){
	var islog  = $('.js-login-mark').length>0;
	return islog;
}



