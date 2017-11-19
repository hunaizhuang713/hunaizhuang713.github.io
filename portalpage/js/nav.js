$(function() {
	var line = $(".line");
	var li = $(".li");
	li.hover(function() {
		var left = 0;
		var index = li.index($(this));
		var width = $(this).outerWidth();
		for(var i = 0; i < index; i++) {
			left += li.eq(i).outerWidth() + parseInt(li.eq(i).css("margin-right"));
		};
		line.width(width);
		line.stop().animate({
			"left": left
		}, 400);
		$(this).find("ul").stop().slideDown(400);
	}, function() { /* 失去hover事件函数*/
		$(this).find("ul").stop().slideUp(400);
		goLocation();
	});
	/*默认位置*/
	function location(){
		var flat=1;
		if($('body').hasClass('js-mark1')){
			flat=1;
			return flat;
		}else if($('body').hasClass('js-mark2')){
			flat=2;
			return flat;
		}else if($('body').hasClass('js-mark3')){
			flat=3;
			return flat;
		}else if($('body').hasClass('js-mark4')){
			flat=4;
			return flat;
		}else if($('body').hasClass('js-mark5')){
			flat=5;
			return flat;
		}
	}
	function goLocation(isDefault){
		var liIndex = location()-1;
		var _li = $('.ul .li');
		var widthValue = _li.eq(liIndex).outerWidth();
		var leftValue = function(){
				var lValue = 0;
				if(liIndex==0){lValue=0;}
				for(var i = 0; i < liIndex; i++) {
					lValue += _li.eq(i).outerWidth() + parseInt(_li.eq(i).css("margin-right"));
				};
				return lValue;
			}();
		if(isDefault){
			line.width(widthValue).css('left',leftValue);
		}else{
			line.width(widthValue).stop().animate({
				"left": leftValue
			}, 400);
		}
	}
	goLocation(true);
});