$(function(){
	$.fn.extend({
	    animateCss: function (animationName) {
	        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	        this.addClass('animated ' + animationName).one(animationEnd, function() {
	            $(this).removeClass('animated ' + animationName);
	        });
	    }
	});
	$('.js-add-animal').show().animateCss("rotateInUpRight");
	var section = $('.section');
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
	//梦网大事记
	Data_course(); 
	//梦网云资讯
	Data_news();
  /* 关闭广告浮窗 */
	$('.js-close-ads').click(function(){
		$('.js-ads_fltWnd').hide();
	});
		/* 关公告 */
	$('.noc_colse').click(function(){
		$(this).closest('.banner_notice').hide();
	});
  $('.js-page-swiper').eq(0).find('div').eq(0).addClass('active');
 /* 0.banner */
 var isIE8 = $('body').hasClass('ie8'),banner;
 if(isIE8){
	 banner = new Swiper ('.swiper-container-banner', {
      direction: 'horizontal',
      autoplay:5000, 
      speed:500,
      loop: true,
      pagination: '.swiper-pagination-banner'
    });
    $('.js-forIe8-bnPrev').on('click',function(){
      	banner.swipePrev();
      });
      $('.js-forIe8-bnNext').on('click',function(){
      	banner.swipeNext();
      });
 }else{
 	banner = new Swiper ('.swiper-container-banner', {
      direction: 'horizontal',
      autoplay:5000,
      speed:500,
      loop: true,
      pagination: '.swiper-pagination-banner',
      paginationClickable :true,
      nextButton: '.swiper-button-next-bn',
      prevButton: '.swiper-button-prev-bn',
    });
 }
  /* 1.场景轮播 */
var mySwiperScene;  
if (Modernizr.csstransitions) {
  mySwiperScene = new Swiper ('.js-swiper-container0', {
      simulateTouch :false,
      effect : 'fade', 
      direction: 'horizontal'
    });
} else {
  mySwiperScene = new Swiper ('.js-swiper-container0', {
      simulateTouch :false,
      direction: 'horizontal'
    });
} 
$('.js-page-swiper').on('click','div',function(){
  var _this = $(this),
      index = _this.index('.js-page-swiper div');
  $('.js-page-swiper div').removeClass('active');   
  _this.addClass('active');
      if(isIE8){
      	mySwiperScene.swipeTo(index, 500, false);
      }else{
      	mySwiperScene.slideTo(index, 500, false);
      }
    }); 
  /* 2.产品轮播 */
  var mySwiper0 ;
  if(isIE8){
  	mySwiper0 = new Swiper ('.swiper-container0', {
  simulateTouch : false,
  direction: 'horizontal'
});
$('.js-ps-swiper li').eq(0).addClass("active");
  }else{
  	mySwiper0 = new Swiper ('.swiper-container0', {
  direction: 'horizontal',
  loop: true,
  pagination: '.js-ps-swiper', 
  paginationClickable :true,
  paginationType : 'custom',
  //设置自定义分页器的内容
  paginationCustomRender: function (swiper, current, total) {
      $('.js-ps-swiper').find('li').eq(current-1).addClass('active').siblings('li').removeClass('active');
      }
    });
  }
  $('.js-ps-swiper').on('click','li',function(){
  var index = $(this).index();
  if(isIE8){
  	mySwiper0.swipeTo(index, 500, false);
  	$(this).addClass("active").siblings().removeClass("active");
  }else{
  	mySwiper0.slideTo(index+1, 500, false);
  }
});  
/* 3.合作伙伴轮播 */  
 var mySwiper;
 if(isIE8){
 	mySwiper = new Swiper ('.swiper-container3', {
 		onSlideChangeEnd:function(swiper){
 			var i = mySwiper.activeIndex;
	      	$('.js-cop-swiper span').eq(i).addClass("active").siblings().removeClass("active");
 		},
        direction: 'horizontal'
      });
  $('.js-forIe8-prev').on('click',function(){
  	mySwiper.swipePrev();
  });
  $('.js-forIe8-next').on('click',function(){
  	mySwiper.swipeNext();
  });
  $('.js-cop-swiper span').eq(0).addClass("active");
 }else{
 	mySwiper = new Swiper ('.swiper-container3', {
    direction: 'horizontal',
    loop: true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next-coop',
    prevButton: '.swiper-button-prev-coop',
    paginationClickable :true,
    paginationType : 'custom',
    paginationCustomRender: function (swiper, current, total) {
        $('.js-cop-swiper').find('span').eq(current-1).addClass('active').siblings('span').removeClass('active');
    }
  });
 
 }   
$('.js-swp-cnt').on('click','.js-cop-swiper span',function(){
  var index = $(this).index();
  if(isIE8){
  	mySwiper.swipeTo(index, 500, false);
  	$(this).addClass("active").siblings().removeClass("active");
  }else{
 	 mySwiper.slideTo(index+1, 500, false);
  }
  //切换到第一个slide，速度为1秒
}); 

$(window).scroll(function(){
    var windowTop = $(window).scrollTop(),
        windowH = $(window).height();
        
	$.each(section,function(i,d){
		_d = $(d);
		var offsetTop = _d.offset().top;
		if(!_d.hasClass('done')){
			if((windowH + windowTop) > offsetTop){
				_d.addClass("animalIn done");
			}
		}
	});
});
$(window).scroll();
});