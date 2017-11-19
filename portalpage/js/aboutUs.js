/**
 * 关于我们
 */
$(document).ready(function(){
	var initPage = function(){
		if(location.href.indexOf('#') >= 0){
			var pageName  = location.hash.replace(/#/,'');
			ajaxPage(pageName);
			$('[data-src='+pageName+']').addClass("active").siblings().removeClass("active");
		}else{
			location.hash = "#yun_introduce";
			ajaxPage('yun_introduce');
			$('[data-src=yun_introduce]').addClass("active").siblings().removeClass("active");
		}
	};
	
	$('.js-about-nav li').on("click",function(){
		var _this = $(this),pageName = _this.attr('data-src');
		ajaxPage(pageName);
		$(this).addClass("active").siblings().removeClass("active");
	});
	/*初始化页面*/
	initPage();
	/*绑定事件*/
	$(window).on('hashchange', function () {
		initPage();
	});
	/*调整页面*/
	adjust();
	$(window).on('resize', function () {
		adjust();
	});
});

function ajaxPage(pageName){
	$.ajax({
		url: pageName +  ".html?dynamic=" + Math.random(),
		type: 'GET',
		async: true,
		dataType:'html',
		success: function(data){
			$('.js-ajax-html').empty().html(data);
		}
	});
}
function adjust(){
	var wHeight = $(window).height(),
		fixHeight = 88 + 338 +2;
	if(wHeight-fixHeight>200){
		$('.js-main-cnt').css("minHeight",wHeight-fixHeight);
	}
}
