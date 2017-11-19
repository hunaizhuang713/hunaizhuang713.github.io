var custom = function(){
	if (!Array.prototype.indexOf){
		 Array.prototype.indexOf = function(elt /*, from*/)  
		 {  
		   var len = this.length >>> 0;  
		   var from = Number(arguments[1]) || 0;  
		   from = (from < 0)  
		        ? Math.ceil(from)  
		        : Math.floor(from);  
		   if (from < 0)  
		     from += len;  
		   for (; from < len; from++)  
		   {  
		     if (from in this &&  
		         this[from] === elt)  
		       return from;  
		   }  
		   return -1;  
		 }; 
	}
	window.modToken = '?tkn='+Cookies('tkn');
	window.certState = Cookies('certState');
	/*全局属性或验证*/
	window.Global = {
		reg_money : /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
		reg_tel :  /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/,
		reg_uName : /.{4,8}/,
		reg_pwd : /.{6,16}/,
		reg_mixPwd :/^(?![0-9]+$)[0-9A-Za-z]{6,16}$/,
		reg_yzm : /^[0-9]{6}$/,
		err_tel:'请输入正确的手机号！',
		err_yzm:'请输入正确的验证码！',
		err_pwd:'请输入6-16位数字、字母组合的密码！',
		err_money:'请输入合法的金额！'
	};
    /* 加载页面 */
	loadPage = function(module,htmlName,container){
		var dynamic = Math.random(),
			url= '../'+ module+'/' + htmlName + ".html?dynamic="+dynamic;
		$.ajax({
			type:"GET",
			url:url,
			async:true,
			dataType:'html',
			success:function(data){  
				/*添加版本号*/
				if($('body').hasClass('ie8')){
					container.html(data); 
				}else{
					var _data = $(data),
						_wrap ;
					_data.wrapAll('<div class="tempContainer"></div>');
					_wrap = _data.parent();
					_wrap.find('.js-addVersion').each(function(i,d){
						var _d= $(d);
						if(d.tagName=='LINK'){
							_d.attr('href',_d.attr('href')+'?dynamic='+dynamic);
						}else if(d.tagName=='SCRIPT'){
							_d.attr('src',_d.attr('src')+'?dynamic='+dynamic);
						}
					});
					container.html(_wrap.html());
				}
				
				/*每次加载新页面,执行类名函数*/
				$('[class*=_js-]:not(.haveDone)').each(fn.execute).addClass('haveDone');
			}
		});
	};
	/*附加subpage属性 data-port*/
	attachPort = function(port){
		var target = $('.subPage');
		target.length>0 && target.attr("data-port",port);
	};
	/*加载页面后，附加data-port*/
	load_attach = function(module,htmlName,container,port){
		loadPage(module,htmlName,container);
		$(document).on('ajaxSuccess ',function(){
			clearTimeout(handler);
			var handler = setTimeout(function(){attachPort(port);},10);	
		});
	};
	/*判断是否输入为数字*/
	numberCheck = function (obj) {
		obj.on('contextmenu' ,function (){
			return false;
		});
		obj.on('keyup', function () {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+$/,'')
		});
		obj.on('keypaste', function () {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+$/,'')
		});
		obj.on('input', function() {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+/g,'')
		});
	};
	/*限制输入数字*/
	phoneNum = function (num) {
		num.on('contextmenu' ,function (){
			return false;
		});
		num.on('keyup', function() {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+/g,'')
		});
		num.on('keypaste', function() {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+/g,'')
		});
		num.on('input', function() {
			this.value=this.value.replace(/[\u4e00-\u9fa5_a-zA-Z\*@!#$%^&￥)(\-+~`·,<>?/=《》，。.、？‘’''"“”；;:：{}【】\[\] ]+/g,'')
		});
	};
   /* 加载数据*/
	loadData = function(port, port_method, isAsync,data, successFunc) {
		var localToken=modToken,
			url =("../") + ( port.match(/\?/g) ? (port + localToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); 
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
				}else if(data.resultCode == "-1"){
					if(data.errInfo){ /*加入容错  后台最少应该返回一个errCode*/
						if(data.errCode == "S100005"){  /*session失效*/
							warning.say(data.errInfo);
							setTimeout(function(){window.location.assign("../")},3000);
						}else if(data.errCode == "S100094"){  /*tkn失效*/
							warning.say(data.errInfo);
							setTimeout(function(){window.location.assign("../")},3000);
						}else{  /*其他错误*/
							warning.say(data.errInfo);
						}
					}else{
						warning.say(data.errCode);
					}
				}
			},
			error:function(){
				warning.say("请求失败");
				clearTimeout(handler);
				var handler = setTimeout(function(){$('.js-loading').hide();},0);
			},
			beforeSend: function(){
		      $('.js-loading').show();
		   },
		   complete: function(){
			   clearTimeout(handler);
			   var handler = setTimeout(function(){$('.js-loading').hide();},0);
		   }
		});
	};
	/*发送数据*/
	sendData = function(url,data, successFunc) {
		$.ajax({
			url:("../") + url,
			type: 'POST',
			timeout: 60000,
			async: true,
			dataType: 'json',
			data: data,
			success: successFunc,
			error:function(){
				window.location.assign("../");
			}
		});
	};
	//提示弹窗
	warning = function(){
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
	//点击反馈
	clickFeedback = function(e){
		var x = e.pageX, y = e.pageY;
		$('<div class=clickFB></div>')
		.appendTo($(this))
		.offset({top:y-15,left:x-15}).show().addClass("clickFeedback").one("webkitAnimationEnd animationend",function(){ $(this).removeClass('clickFeedback').offset({top:0,left:0}).hide();});
	};
	
	var fn = {};
	//调整窗口高度
	fn.adjustWindow = function(){
		var minHeight = $(window).height() - 102;
		$('.main-content').css("minHeight",minHeight+'px');
	};fn.adjustWindow();
	$(window).resize(function(){
		fn.adjustWindow();
	});
	/* 处理页面脚本元素*/
	fn.execute = function(i, d) {
		$.each(d.className.match(/\_js\-[a-zA-Z]+/gi), function (k, v) {
			(fn[v.slice(4)] || function() {
			}).call($(d));
		});
	};
	//选项卡
	fn.tab = function(){
		var _this = this;
		$(document).on('click','.tabHead button',function(e){
			var index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			_this.find('.tabContain .section').eq(index).css('display')=='none' && 
			(_this.find('.tabContain .section').eq(index).show().siblings().hide());
		});
	};
	/*在需要加分页器的<table>上加class ='_js-pagination'*/
	fn.pagination = function(){
		var controller = '<div class="pageControl" style="margin:0 auto;margin-top:30px;width:420px;">'+
			'<label style="margin-bottom:0;">共<span class="total"></span>条，第<span class="index">1</span>/<span class="totalPage">2</span>页，<span class="pagesize">15</span>条/页</label>'+
			'<button class="page-icon icon-first pageBtn" data-action="first"></button>'+
			'<button class="page-icon icon-up pageBtn" data-action="up"></button>'+
			'<button class="page-icon icon-down pageBtn" data-action="down"></button>'+
			'<button class="page-icon icon-end pageBtn" data-action="end"></button>'+
			'<label class="search"><input maxlength="6" class="inputIndex" type="text" /><button class="page-icon icon-go pageBtn" data-action="go"></button></label>'+
		'</div>';
		this.after(controller);
	};
	/* 中英转换   菜单id = html配置表 */
	fn.translate = function(arg){
		var result= '', arg = $.trim(arg);
		switch (arg) {
			case "控制台":
				result = "console";break;
			case "业务中心":
			case "管理中心":
				result = "management";break;
			case "信安中心":
				result = "security";break;
			case "财务中心":
				result = "finance";break;
			case "开发者中心":
			case "开发者文档":
				result = "document";break;
			case "系统管理":
			case "账号管理":
				result = "account";break;
			case "console":
				result = "控制台";break;
			case "management":
				result = "管理中心";break;
			case "safe":
				result = "信息安全";break;
			case "finance":
				result = "财务中心";break;
			case "document":
				result = "开发者文档";break;
			case "account":
				result = "账号管理";break;
			default :
				break;
		};
		return result;
	};
	/*获取url里面的   模块信息*/
	function getMode(){
		var hashValue = location.href.split("#"); //  hashValue[1] = mode/page.html?obj=123
		var hashArr = hashValue[1].split('/');   //   hashArr[0] = mode  hashArr[1]= page.html
		return hashArr[0];
	}
	/*获取url里面的   页面信息*/
	function getPage(){
		var hashValue = location.href.split("#"); //  hashValue[1] = mode/page.html
		var hashArr = hashValue[1].split('/');   //   hashArr[0] = mode  hashArr[1]= page.html
		var page  = hashArr[1].replace(/(.+)\.html(.*)/g,'$1');
		return page;
	}
	/*检查路径*/
	function checkURL() {
	    var arr = location.href.split("#"),	 /*arr = [http://localhost:8080/p_page/frame/,console/console.html]*/	    	
	    	hash = '';
	    if (arr.length > 1) {
	        hash = arr[1];   /*hash = 'console/console.html'*/
	    }
	    if (hash != '') {
	        loadURL(hash);
	    }else {
	    	$('.navbar-items li').eq(0).trigger('click');/*触发第一个模块的点击事件*/
	    	$(document).one('ajaxSuccess',function(){
	    		setTimeout(function(){
	    			$('.ul li').eq(1).trigger('click');
	    		},30);
	    	});
	    }
	}
	/*根据url加载数据*/	
	function loadURL(url) {   /* url='console/console.html?obj'*/
		if(url){
			var arr = url.split('/'),
				modClass = '.'+arr[0], 
		   		pageClass = '.'+arr[1].replace(/(.+)\.html(.*)/,'$1'),
		   		searchClass = '';
				if(!(url.indexOf('obj')==-1)){/*如果带有search*/
					searchClass = '.'+arr[1].replace(/(.+)\?obj=(.+)/g,'$2');
				}
		    $(modClass).trigger('click'); 
		    $(document).one('ajaxSuccess',function(){  /*点击模块，请求数据渲染后，再模拟点击子菜单*/
		    	var trigger= function(pageClass){
		    		clearTimeout(handler);
		    		var handler = setTimeout(function(){
		    			if(!(url.indexOf('obj')==-1)){/*如果带有search*/
		    				$(document).one('ajaxSuccess',function(){
		    					setTimeout(function(){$(searchClass).trigger('click'); },1);
			    			});
						}
		    			$(pageClass).trigger('click');
		    		},1);
		    	};
		    	!($(pageClass).hasClass('console')) && trigger(pageClass);  /*不是控制台才点击子菜单*/
		    })
		}
	}
	/* 首次进入  获取模块信息 */
	fn.getModFace = function(){
		var modFace = $('body').attr('data-port'),
			port = modFace,
			successFunc = function(data){  
				if(data.resultCode==0){
					var data = data.dataList ,html = '';
					$.each(data,function(k,v){
						var icon = '';
						icon = fn.translate(data[k].modName);
						html += '<li data-modId="'+data[k].modId+'" class="'+icon+'"><a href="'+icon+'"><span class="nav-icon icon-'+icon+'"></span>'+data[k].modName+' </a></li>';
					});
					$('.navbar-items').append(html);      /*渲染模块信息*/
					/* 	初始化   或   刷新   */
					fn.init = function(){
						checkURL();
					}();
				}else if(data.resultCode == "-1"){  //token前后验证不过，异常处理跳转回首页重新登录
					warning.say("验证失效返回重新登录");
					clearTimeout(handler);
					var handler = setTimeout(function(){
						window.location.assign("../");
					},1700);
				};
			};
			
		loadData(port,"r_load",true,{},successFunc);
	}();
	/*禁用a默认事件*/
	$(document).on('click','.navbar-items li a,.nav-aside a',function(e){
		e.preventDefault();
	});
	/*点击模块*/
	$(document).on('click','.navbar-items li',function(e){
		var content = $('.main-content'),
			port = 'loadModMenu.htm?modId=' + $(this).attr('data-modId'),
			title = $(this).text(),
			eTitle = fn.translate(title),
			_this = $(this),
			successFunc= function(data){
				if(data.resultCode == "0"){
					var data = data.dataList,
						list = '',
						modSection = '<section class="'+eTitle+'-section section">'+
				    	'<aside class="nav-aside" style="height:100%">'+
				    		'<nav style="height:100%">'+
				    			'<ul class = "ul" style="height:100%">'+
				    				'<li class="gray-title fs16">'+title+'<span class="icon-arrow"></span></li>'+
				    				
				    			'</ul>'+
				    		'</nav>'+
				    	'</aside>'+
				    	'<section class="showContent bg-white">'+
								'<!--插入页面-->'+
								'<section id="insertSection" class="insert">'+
								'</section>'+
				    	'</section>'+
				    '</section>';
					
					$.each(data,function(i,d){
						var port = data[i].menuPath+'.htm';
						list += '<li data-module="'+eTitle+'" data-menuId="'+data[i].menuId+'" data-menuName="'+data[i].menuName+'" data-html="'+data[i].menuPath+'" data-port="'+port+'" class="listItem '+data[i].menuPath+'"><a href="#'+eTitle+'/'+data[i].menuPath+'.html">	'+data[i].menuName+'</a></li>';
					});
					content.find('.section').remove();
					content.append(modSection).find('.ul').append(list); /* 点击模块，查询子菜单并渲染*/
					/*判定是否需要点击第一个li: 
					 * 1.如果是刷新，点击模块  = 当前模块;
					 * 2.点击自己：不做处理;
					 * 3.点击其他模块，触发第一个li的点击
					 *  */
					if((getMode())!=(_this.find('a').attr('href'))){
						$('.nav-aside ul li').eq(1).trigger('click');
					}
				}else if(data.resultCode == "-1"){
					warning.say(data.errInfo);
					clearTimeout(handler);
					var handler = setTimeout(function(){
						window.location.assign("../");
					},2000);
				}
		};
		
		if(_this.find('span').hasClass('icon-document')){/*如果点击开发者文档，打开一个新窗口*/
			window.open('../portalpage/developerCenter.html');
		}else if(!(_this.hasClass('active'))){ /* 如果点击非激活状态的li才响应处理*/
			_this.addClass('active').siblings().removeClass('active');
			if(_this.find('span').hasClass('icon-console')){ 
				$('.section').remove();
				$('<section class="console-section section"></section>').appendTo(content);
				load_attach('console','console',$('.console-section'),'mwh_homePage');
				window.location.hash = '#console/console.html';
			}else {
				loadData(port,'r_load', false,{}, successFunc);
			}
		}
	});
	
	/*点击 菜单*/
 	$(document).on("click",'.listItem',function(){
		var container = $('.insert'),
			_this = $(this),
		    htmlName = _this.attr('data-html'),
			modName = _this.attr('data-module'),
			port = _this.attr('data-port'),
			url = _this.find('a').attr('href');
		_this.addClass('active').siblings().removeClass('active');
		load_attach(modName,htmlName,container,port);
		window.location.hash = url;
	});
	
	/*退出登录*/
	$('.logoutConfirm').on('click',function(){
		var successFunc = function(data){
				if(data.resultCode=="0"){
					Cookies.remove('tkn');
					Cookies.remove('vis_Psw');
					clearTimeout(handler);
					var handler = setTimeout(function(){
						window.location.assign("../");
						Cookies.remove('newhref' ,{path : ' / ' });
					},100);
				}
			};
		
		sendData('logout.hts',{},successFunc);
	});
	/*查询 文件版本号：不一致的直接修改版本号，重新加载文件*/
	fn.checkVersion = function(){
		var _this = this;
		if(_this.attr('href')){  /*如果是样式文件*/
			var oldHref = _this.attr('href');
			var newHref= oldHref.replace(/version=(.+)/,'version='+fileVersion);
			var handler = (oldHref==newHref) ? '':_this.attr('href',newHref);
		}else if(_this.attr('src')){  /*如果是脚本文件*/
			var oldSrc = _this.attr('src');
			var newSrc= oldSrc.replace(/version=(.+)/,'version='+fileVersion);
			var handler = (oldSrc==newSrc) ? '':_this.attr('src',newSrc);	
		}
	};
	
	/*执行入口:循环遍历类名函数*/
	$('[class*=_js-]:not(.haveDone)').each(fn.execute).addClass('haveDone');
	/*每次刷新请求下certState*/
	var sucFuc = function(data){
		window.certState = data.certState;
		window.globe_guideState = data.guideState;
	};
	loadData('aut_getCertState.htm','getState',false,{},sucFuc);
	
	/*关闭指引浮层按钮*/
	$('.js-guide-closeBtn,.js-quick-confBtn').click(function(){
		var sucFuc = function(data){
			globe_guideState='1';
			$('#js-modal-guide .modal-body').empty();
			setTimeout(function(){  /*消除回显跳跃动画*/
				$('#js-modal-guide').modal('hide');
				location.reload();
			},1);
		};
		loadData('aut_getCertState.htm','setGuideState',false,{guideState:1},sucFuc);
	});
	/*1.开发者下一步*/
	$('.js-dev-nextstepBtn').click(function(){
		$('.js-one-develop').hide().siblings('.js-two-finance').show();
	});
	/*2.财务上一步*/
	$('.js-fin-upstep').click(function(){
		$('.js-two-finance').hide().siblings('.js-one-develop').show();
	});
	/*2.2财务下一步*/
	$('.js-fin-nextBtn').click(function(){
		$('.js-two-finance').hide().siblings('.js-three-quick').show();
	});
	/*新手指引触发*/
	$(document).one('ajaxComplete',function(){
		if(globe_guideState=='0' && $('.console-section').length==1){
			$('#js-modal-guide').modal();
		}
	});
	/*限制特殊字符*/
	$(document).on('input','.js-limitSpecialChar',function(){
		cleanSpelChar(this);
	});
	/*限制标签*/
	$(document).on('input','.js-limitTag',function(){
		limitTag(this);
	});
};
$(document).ready(function(){
	custom();
});

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
		if(global_index[0]<=0){
			warning.say("已经是第一页");
			global_index[0] = 1;
		}else{
			rend_func();
		}
	});
	$('.'+pre_cName+'Down').click(function(){ 
		var totalpage = $('.'+pre_cName+'TotalPage').text(); 
		if(global_index[0]>=totalpage){
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
/*支付方式*/
function switchPayWay(num){
	switch(num){
		case '1':
			return '银联';
			break;
		case '2':
			return '微信';
			break;
		case '3':
			return '支付宝';
			break;
		case '4':
			return '赠送';
			break;
	}
}
/*支付跳转新窗口，返回html*/
function loadData_charge(port, port_method, isAsync,data, successFunc) {
	var url =("../") + ( port.match(/\?/g) ? (port + modToken.replace(/\?/,'&')):(port + modToken)) + ("&method="+port_method); 
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: isAsync,
		dataType: 'html',
		data: data,
		success: successFunc,
		error:function(){
			warning.say("请求失败");
			clearTimeout(handler);
			var handler = setTimeout(function(){$('.js-loading').hide();},0);
		},
		beforeSend: function(){
		  $('.js-loading').show();
		},
		complete: function(){
		   clearTimeout(handler);
		   var handler = setTimeout(function(){$('.js-loading').hide();},0);
		}
	});
};
/*检查datalist是否显示分页器*/
function isEmptyData(totalRec){
	if(totalRec==0){
		$('.pageControl').hide().after('<p class="mt20 mb20 text-center fs12 color8">暂无数据~</p>');
	}
}
function jumpBetween(module,page,search){
	if(search){
		location.assign('#'+module+'/'+page+'.html?obj='+search);
		location.reload();
	}else{
		location.assign('#'+module+'/'+page+'.html');
		location.reload();
	}
}
/*价格显示调整*/
function fix4(str){
	return parseFloat(str).toFixed(4);
}
/*限制 sql注入 输入特殊字符*/
function limitSpecialChar(obj){
	obj.on('keyup', function () {
		this.value=this.value.replace(/[%&\*\|\_]+/g,'');
	});
	obj.on('keypaste', function () {
		this.value=this.value.replace(/[%&\*\|\_]+/g,'');
	});
	obj.on('input', function() {
		this.value=this.value.replace(/[%&\*\|\_]+/g,'');
	});
}
/*限制输入标签 输入特殊字符*/
function limitTag(obj){
	if(/iframe|script|\<|\>/.test(obj.value)){           
    	$(obj).val(obj.value.replace(/iframe|script|\<|\>/,""));     
    } 
}
function cleanSpelChar(obj){     
    if(/[%&\*\|\_]/.test(obj.value)){           
    	$(obj).val(obj.value.replace(/[%&\*\|\_]/,""));     
    } 
}







