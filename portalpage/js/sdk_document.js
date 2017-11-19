
 $(function(){	
 	
	//$('#rightContent').css('min-height',$('#catalogue').height());
	
	$('.scrollHeight').css('height',window.screen.availHeight - $('#site-header').height() - 	$('.headerCon').height());
	$('#catalogue').css('min-height',$('#rightContent').height());
		
			$('#catalogue li a').each(function(){
				$(this).click(function(){
					var currentID = $('.catalogueCurrent').parent().parent().attr('data-id');
					$('#'+currentID).css('display','none');		
					
					var futureID = $(this).parent().parent().attr('data-id');
					$('#'+futureID).css('display','block');
					
					$('#catalogue li a').removeClass('catalogueCurrent');
					$(this).addClass('catalogueCurrent');
					setTimeout(function(){
						$(document).scrollTop($(document).scrollTop() - $('#site-header').height());
						setScroll();
					},10);
					
				});
			});
			
			$('a[href="#Appendix"],a[href="#error"]').each(function(index,e){
				$(this).click(function(){
					
					$('#interfacesContent').css('display','none');
					$('#appendixContent').css('display','block');
					$('#catalogue li a').removeClass('catalogueCurrent');
					
					var ID = $(this).attr('href');
					$('#AppendixCatalogue').find('[href="' + ID + '"]').addClass('catalogueCurrent');
					
					
					setTimeout(function(){
						$(document).scrollTop($(document).scrollTop() - $('#site-header').height());
					},10);

				});
			});

	
	
	//设置拖动改变DIV大小开始
	var draggle = false;
	var startX = 0;
	var endX = 0;
	var marginLeft = 0;
	var divWidth = $('#mainContentRight').width();
	var lDivWidth = $('#mainContentLeft').width();
	var minWidth = 300;
	var maxWidth = 480;
	$('#scrollBar').mousedown(function(e){
		draggle = true;
		startX = e.pageX;
		divWidth = $('#mainContentRight').width();
		lDivWidth = $('#mainContentLeft').width();
		marginLeft = parseInt($('#mainContentRight').css('margin-left'));
	});
	$(document).mousemove(function(e) {
	    if(draggle){	    		
	    	var a = parseInt($('#mainContentRight').width()) > maxWidth;
	    	var b = parseInt($('#mainContentRight').width()) < minWidth;
	    	var c = e.pageX > startX;
	    	var d = e.pageX < startX;
	    	
	    	if(!((a&&d)||(b&&c))){
	    		$('#mainContentRight').width( divWidth - (e.pageX - startX));
	    		$('#mainContentLeft').width( lDivWidth + (e.pageX - startX));
	    	}	    				    	
	    }
	})
	
	$(document).mouseup(function(e) {
	    draggle = false;
	    //e.cancelBubble = true;
	    
	})
	
//设置拖动改变DIV大小结束
//滚动事件
	/*$(window).scroll(function(){
		if ($(document).height()-($(document).scrollTop()+$(window).height()) <= 402) {
			var bot = -($(document).height()-($(document).scrollTop()+$(window).height())) + 'px';
			$('.catalogue').css({
				'bottom' :''+ bot,
				'margin-bottom':'402px'
			});
		} else{
			$('.catalogue').css('position','fixed');
			$('.catalogue').css('bottom','');
		}
	});*/
	
	//说明文档和代码联动
	function setScroll(){
		if($('#interfacesContent').css('display') == 'block'){
			$('#mainContentLeft .conSession').each(function(index,element){
				$(this).attr('data-position',$(this).position().top);
			});	
		}	
	}
	setScroll();
	
	/*function getPosition(selector){
		var positionTop = 0;
		$(selector).parent().children().each(function(index,element){
			if($(selector).parent().children().length > index -2 ){
				positionTop += $(this).height();	
			}else{
				return positionTop;
			}
		});
	}*/
	
	$('#mainContentLeft').scroll(function(){
		setScroll();
		var currentID = $('#mainContentLeft .conSession:first').attr('id');
		$('#mainContentLeft .conSession').each(function(index,element){
			var position = $(this).attr('data-position');
			if( position < -55){
				currentID = $(this).attr('id');				
				currentID = $('#' + currentID).next().attr('id');	
				var demoObj = $('#'+currentID+'Demo');
				if(demoObj){
					var positionTop = demoObj.position().top;
					$('#mainContentRight').scrollTop(positionTop);
				}
			}
		});
	});
})





















