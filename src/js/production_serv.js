/**
 * 产品服务 第二区域，不是文档section2的区域，要折成中间以下，算第三区域
 */
$(document).ready(function() {
	/*侧边栏滚动动画*/
	$('.navAside_menu li').on('click',function(e){
		$(this).addClass("curr").siblings('li').removeClass("curr");
	});
	$(window).scroll(function(){
		var w = $(window).width(),
			leftW = (w-1200)/2 - 145,
			cH = 250,
			section1 = $('#section1').offset().top,
			section2 = $('#section2').offset().top,
			section3 = $('#section3').offset().top,
			section4 = $('#section4').offset().top,
			section5 = $('#section5').offset().top,
			section6 = $('#section6').offset().top,
			windowTop = $(window).scrollTop();
		(w<1500) && (leftW = 0);
		if(windowTop > 600 &&  windowTop < section6){
			$(".nav_aside").animate({top:windowTop-500,left:leftW},{queue:false,duration:200});
			if(windowTop <= section1){
				$('.navAside_menu li').eq(0).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop>section1&&windowTop<=section2-cH){
				$('.navAside_menu li').eq(0).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop+cH>section2&&windowTop<=section3-cH){
				$('.navAside_menu li').eq(1).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop+cH>section3&&windowTop<=section4-cH){
				$('.navAside_menu li').eq(2).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop+cH>section4&&windowTop<=section5-cH){
				$('.navAside_menu li').eq(3).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop+cH>section5&&windowTop<=section6-cH){
				$('.navAside_menu li').eq(4).addClass("curr").siblings('li').removeClass("curr");
			}else if(windowTop+cH>section6){
				$('.navAside_menu li').eq(5).addClass("curr").siblings('li').removeClass("curr");
			}
		}else if($(window).scrollTop()<600){
			$(".nav_aside").animate({top:100,left:20},{queue:false,duration:200});
		}
	});
	$(window).scroll();
	/*合作用户轮播*/
	var isIE8 = $('body').hasClass('ie8'),mySwiperScene;
	if(isIE8){
		mySwiperScene = new Swiper ('.js-user-swiper', {
	        direction: 'horizontal'
	     });
		$('.js-prev').on('click',function(){
			mySwiperScene.swipePrev();
	      });
	      $('.js-next').on('click',function(){
	    	mySwiperScene.swipeNext();
	      });
	}else{
		mySwiperScene = new Swiper ('.js-user-swiper', {
	        direction: 'horizontal',
	        nextButton: '.js-next',
	        prevButton: '.js-prev'
	      });
	}
	  
	/*应用场景轮播*/
	$('.js-scene-swiper').on('click',function(){
		var _this = $(this),
			index = _this.index(),
			type = _this.closest('ul').attr('data-type');
			
		$(this).addClass('active').siblings().removeClass('active');
		if(type=='msgNotice'){
			$('.js-toggle-msg')[0].className = 'css-scenesp-msg js-toggle-msg css-scenesp-msg0'+index;
		}else if(type=='msgSecurity'){/*短信验证*/
			$('.js-toggle-msg')[0].className = 'css-scenesp-msg js-toggle-msg css-scenesp-msg1'+index;
		}
	});
	$(window).resize(function(){
		$(window).scroll();
	});
	/*section进入可视范围内，载入渐入动画*/
	/*$.each(section,function(i,d){
		_d = $(d);
		var offsetTop = _d.offset().top;
		if(!_d.hasClass('done')){
			if((windowH + windowTop) > offsetTop){
				_d.addClass("animalIn done");
			}
		}
	});*/
	/*修改字体颜色*/
	$('.js-alter-color tr').each(function(i,d){
		i!=0 && $(d).find('td').eq(3).css("color","#f00");
	});
});







