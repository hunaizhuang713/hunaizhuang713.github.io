/**
 * ajax 加载头部尾部
 */

var baidu_count1 = function(){
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?a479654f32e870aeaebcc9d0866cc491";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
}();

//付费百度统计
var baidu_count = function(){
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?403a0a40d9c899b4635a33dd68ddf3dc";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();
}();


var identification = Cookies('identification');
if(!identification){
	var datas = {
		signId:""
	};
	signId(datas);
}
//}
/* 统计推广链接 */
$(document).ready(function(){
	var cookurl = Cookies('popularId'); 
	if(location.search.indexOf('id=')!=-1){ /* 如果有推广id */
		var handler = location.search.replace(/\?id=(.+)/g,'$1');
		Cookies.set('tVersion', 1);
		Cookies.set('popularId', handler);
		CountPopularId(handler,"newExCount");
	}else if(location.href.indexOf('?')!=-1){  /* 升级推广 */
		var handler = location.search.replace(/\?(.+)/g,'$1');
		Cookies.set('tVersion', 2); 
		Cookies.set('popularId', handler); 
		CountPopularId(handler,"newExCount");
	}else if(cookurl){
		CountPopularId(Cookies('popularId'),"newExCount");
	}else{
		CountPopularId("","newExCount");
	}
	/*添加导航条active*/
	var addActive = function(){
		var page = $('body').attr("data-page");
		$('.js-mark-navUl li').each(function(i,d){
			$(d).attr("data-page") == page && $(d).addClass('active');
		});
	}();

	function CountPopularId(handler,method){
		var signIdes = "";
		if (typeof(Cookies('identification')) == "undefined"){
			signIdes = time();
			Cookies.set('identification',signIdes);
		}else{
			signIdes = Cookies('identification');
		}
		$.ajax({
			type:"POST",
			url:domainURL + '/area_mgr_exCount.hts?method='+method,
			dataType:"json",
			async:false,
			data:{proKey:handler,signId:signIdes},
			success:function(data){ 
				if(data.resultCode=='0'){ 
				}
			}
		});
	}
});


function signId(datas){
	$.ajax({
		url:domainURL + "/mgr_generateKey.hts",
		async:false,
		type:"POST",
		dataType:"json",
		data:datas,
		success:function(data){
			if(data.resultCode == "0"){ 
				Cookies.set('identification',data.signId);
			}
		}
	});
}


/*1.加载公共部分*/
loadCommonSec('common.html');
/*2.绑定fix事件*/
$(window).resize(fix_position);  
$(window).scroll(fix_position); 

/*回顶部*/
$('.js-gotoTop').click(function(){
	$('body,html').animate({scrollTop:0},{queue:false,duration:300});
});

/*加载动画*/
if($('body').hasClass('js-index-animate')){  /*如果是首页*/
	$('.js-experience').click(function(){
		window.location.href="./portalpage/ser_transition.html";
	});
	$('.view-quick1').click(function(){
		window.location.href = "./account/new_activity.html";
	});
	$('#experience').mouseover(function(){
		var _this =$(this);
		_this.addClass('hoverShadow').one('mouseout',function(){
			_this.removeClass('hoverShadow');
		});
	});
	
}
/*公用方法*/
function loadCommonSec(fileName){
	var host = document.domain; 
	var pName = window.location.pathname,
		dynamic = Math.random(),
		p_prefix = pName.indexOf('p_page')!=-1?'/p_page': 
				   pName.indexOf('web')!=-1?'/web':
		 		   pName.indexOf('mwytx')!=-1?'/mwytx':
			       pName.indexOf('p_mgmt')!=-1?'/p_mgmt':
			       ''; 
	$.ajax({
		url: p_prefix + '/portalpage/' + fileName + '?dynamic=' + dynamic,
		type: 'GET',
		timeout: 60000,
		async: false,
		dataType: 'html',
		success: function(data){
			var _data = $(data);
			_data.find('.js-addPrefix').each(function(){/*添加前缀*/
				var _this = $(this);
				if(!_this.hasClass('done')){
					_this.addClass('done').find('a:not(.js-external)').each(function(i,d){
						if(d.tagName == 'A'){
							if($(d).attr('href').substring(0,4) == "http"){
								$(d).attr('href',$(d).attr('href'));
							}else{
								$(d).attr('href',p_prefix + $(d).attr('href'));
							}
						}
					});
				}
			});
			$('.common_header').html(_data.find('#com-header').html());
			$('.common_footer').html(_data.find('#com-footer').html());
			$('body').append(_data.find('#common-overlays').html());
		}
	});
}



function fix_position(){
	var target=$('#site-header .contain');
	target.css('left', - $(window).scrollLeft() + 'px'); 
}


$('a').on('click',function(){
	var href = $(this).attr('href');
	//登录注册跳转
	if(href.indexOf('acc_login.html') >= 0){
		var handler = Cookies('popularId');
		if(handler){ /* 如果有推广id */
			window.open(domainURL + '/account/acc_login.html' + "?prs=" + handler + "&iden=" + Cookies('identification'));
			return false;
		} else {
			window.open(domainURL + '/account/acc_login.html' + "?iden=" + Cookies('identification'));
			return false;
		}
	}else if(href.indexOf('acc_register.html') >= 0){
		var handler = Cookies('popularId');
		if(handler){ /* 如果有推广id */
			window.open(domainURL + '/account/acc_register.html' + "?prs=" + handler + "&iden=" + Cookies('identification'));
			return false;
		}else{
			window.open(domainURL + '/account/acc_register.html' + "?iden=" + Cookies('identification'));
			return false;
		}
	}

	//开发者中心跳转
	if(href.indexOf('developer_Center') > -1){
		var handler = Cookies('popularId');
		if(handler){
			if(href.substring(0,2) == ".."){
				window.open(domainURL + href.substring(2,href.length)+ "&prs=" + handler + "&iden=" + Cookies('identification'));
				return false;
			}else if(href.substring(0,1) == "."){
				window.open(domainURL + href.substring(1,href.length)+ "&prs=" + handler + "&iden=" + Cookies('identification'));
				return false;
			}else{
				if(href.substring(0,4) != "http"){
					window.open(domainURL + href+ "&prs=" + handler + "&iden=" + Cookies('identification'));
					return false;
				}else{
					window.open(href+ "&prs=" + handler + "&iden=" + Cookies('identification'));
					return false;
				}
			}
		}else{
			if(href.substring(0,2) == ".."){
				window.open(domainURL + href.substring(2,href.length) + "&iden=" + Cookies('identification'));
				return false;
			}else if(href.substring(0,1) == "."){
				window.open(domainURL + href.substring(1,href.length) + "&iden=" + Cookies('identification'));
				return false;
			}else{
				if(href.indexOf("http") > -1){
					window.open(domainURL +'/'+ href.substring(href.indexOf('developer_Center'),href.length) + "&iden=" + Cookies('identification'));
					//window.open(href + "&iden=" + Cookies('identification'));
					return false;
				}else{
					window.open(domainURL + href + "&iden=" + Cookies('identification'));
					return false;
				}
			}
		}
	}

	//免费体验跳转
	if(href.indexOf('por_experience.html') >= 0){
		var handler = Cookies('popularId');
		if(handler){
			window.open(domainURL + '/portalpage/por_experience.html'+ "?prs=" + handler + "&iden=" + Cookies('identification'));
			return false;
		}else{
			window.open(domainURL + '/portalpage/por_experience.html' + "?iden=" + Cookies('identification'));
			return false;
		}
	}

	//FAQ跳转
	if(href.indexOf('por_faq.html') >= 0){
		var handler = Cookies('popularId');
		if(handler){
			window.open(domainURL + '/portalpage/por_faq.html'+ + "?prs=" + handler + "&iden=" + Cookies('identification'));
			return false;
		}else{
			window.open(domainURL + '/portalpage/por_faq.html' + "?iden=" + Cookies('identification'));
			return false;
		}
	}
});


//时间
function time(){
  	var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    if (String(month).length == 1) {
        month = "0" + month;
    }
    if (String(strDate).length == 1) {
        strDate = "0" + strDate;
    }
    if (String(hours).length == 1) {
        hours = "0" + hours;
    }
    if (String(minutes).length == 1) {
        minutes = "0" + minutes;
    }
    if (String(seconds).length == 1) {
        seconds = "0" + seconds;
    }
    if(String(milliseconds).length == 1){
    	milliseconds = "00" + milliseconds;
    }else if(String(milliseconds).length == 2){
    	milliseconds = "0" + milliseconds;
    }
    var rnd = "";
	for(var i = 1; i < 4; i ++){
	    rnd += String(Math.floor(Math.random()*9));
	}
    var currentdate = "8" + String(date.getFullYear()).substring(2,4) + month  + strDate + hours + minutes + seconds + milliseconds + rnd;
    return currentdate;
}
