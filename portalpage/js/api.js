$(document).ready(function(){
	$('.left').css({
			'height' : $(window).height()-120 + 'px',			
		});
	$('.main-left').height(48 + $('.left').height());
	$('.main-right').height(61 + $('.left').height());
	//短信
	// 点击接入说明
	$('.jierushuoming').on('click',function(){
		$('.start').removeClass('none');
		$('.center').addClass('none');
		$('.down').addClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : $(window).height()-120 + 'px',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
		$('.main-right').height(61 + $('.left').height());
	});
	// 点击接口说明
	$('.jiekou').on('click',function(){
		$('.center').removeClass('none');
		$('.start').addClass('none');
		$('.down').addClass('none');
		$('.ims').removeClass('none');
		var he = $(window).height()-120 + 'px';
		$('.left').css({
			'height' : ''+he,
			/*'overflow' : 'auto',*/
			'width' : '70%'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
		$('.daima-ims').css({
			'height' : ''+he,
			'overflow' : 'auto'
		});
	});
	//点击左侧
	$('.sms-ru dd').on('click',function(){
		$('.center').addClass('none');
		$('.start').removeClass('none');
		$('.down').addClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : $(window).height()-120 + 'px',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	$('.JSON').on('click',function (){
		$(this).attr('class','');
		$(this).next().attr('class','');
		$(this).next().addClass('selectno');
		$(this).addClass('select');
	});
	$('.XML').on('click',function (){
		$(this).attr('class','');
		$(this).prev().attr('class','');
		$(this).prev().addClass('selectno');
		$(this).addClass('select');
	})
	$('.sms-kou dd').on('click',function(){
		$('.center').removeClass('none');
		$('.start').addClass('none');
		$('.down').addClass('none');
		$('.ims').removeClass('none');
		var he = $(window).height()-120 + 'px';
		$('.left').css({
			'height' : ''+he,
			'overflow' : 'auto',
			'width' : '70%'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
		$('.daima-ims').css({
			'height' : ''+he,
			'overflow' : 'auto'
		});
	});
	$('.sms-fu dd').on('click',function(){
		$('.center').addClass('none');
		$('.start').addClass('none');
		$('.down').removeClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	
	$('.voc-ru dd').on('click',function(){
		$('.voice-cont').removeClass('none');
		$('.voice-jiekou').addClass('none');
		$('.voice-fulu').addClass('none');
		$('.daima-voc').addClass('none');
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	$('.voc-kou dd').on('click',function(){
		$('.voice-cont').addClass('none');
		$('.voice-jiekou').removeClass('none');
		$('.voice-fulu').addClass('none');
		$('.daima-voc').removeClass('none');
		var he = $(window).height()-120 + 'px';
		$('.left').css({
			'height' : '' +he,
			'overflow' : 'auto',
			/*'width' : '70%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
		$('.daima-ims').css({
			'height' : ''+he,
			'overflow' : 'auto'
		});
		$('.daima-voc').css('width','30%');
	});
	$('.voc-fu dd').on('click',function(){
		$('.voice-cont').addClass('none');
		$('.voice-jiekou').addClass('none');
		$('.voice-fulu').removeClass('none');
		$('.daima-voc').addClass('none');
		/*$('.main-right').css('width','100%');*/
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	// 点击附录
	$('.sms-fu dd').each(function(){
		$(this).click(function(){
			$('.left').css({
				'width' : '1032px'
			});
		})
	});
	$('.fulu').on('click',function(){
		$('.down').removeClass('none');
		$('.center').addClass('none');
		$('.start').addClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	//点击短信
	$('.duanx').on('click',function(){
		$('.sms dd').removeClass('dianji');
		$('.start').removeClass('none');
		$('.center').addClass('none');
		$('.down').addClass('none');
		$('.sms').removeClass('none');
		$('.sms-model').removeClass('none');
		$('.voice-model').addClass('none');
		$('.voice').addClass('none');
		$('.daima-voc').addClass('none');
		$('.left').css({
			'height' : '100%',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	// 点击语音
	$('.yuyin').on('click',function(){
		$('.voice dd').removeClass('dianji');
		$('.voice-model').removeClass('none');
		$('.voice').removeClass('none');
		$('.sms').addClass('none');
		$('.sms-model').addClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	
	
	//语音
	$('.voice-jieru,.voc-ru dd').on('click',function(){
		$('.voice-cont').addClass('none');
		$('.voice-jiekou').removeClass('none');
		$('.voice-fulu').addClass('none');
		$('.voice-cont').removeClass('none');
		$('.voice-jiekou').addClass('none');
		$('.voice-fulu').addClass('none');
		$('.daima-voc').addClass('none');
		$('.left').css({
			'height' : '100%',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	// 点击接口说明
	$('.voice-jie,.voc-kou dd').on('click',function(){
		$('.voice-cont').addClass('none');
		$('.voice-jiekou').removeClass('none');
		$('.voice-fulu').addClass('none');
		$('.daima-voc').removeClass('none');
		var he = $(window).height()-120 + 'px';
		$('.left').css({
			'height' : '' +he,
			'overflow' : 'auto',
			'width' : '70%'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
		$('.daima-ims').css({
			'height' : ''+he,
			'overflow' : 'auto'
		});
		$('.daima-voc').css('width','30%');
	});
	// 点击附录
	$('.voice-fu,.voc-fu dd').on('click',function(){
		$('.voice-cont').addClass('none');
		$('.voice-jiekou').addClass('none');
		$('.voice-fulu').removeClass('none');
		$('.daima-voc').addClass('none');
		/*$('.main-right').css('width','100%');*/
		$('.left').css({
			'height' : '100%',
			'width' : '1032px'
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	});
	// 点击效果
	$('.sms dd a').on('click',function(){
		$('.sms dd').removeClass('dianji');
		$(this).parent().addClass('dianji');
	});
	$('.voice dd a').on('click',function(){
		$('.voice dd').removeClass('dianji');
		$(this).parent().addClass('dianji');
	})
	// 点击切换语音和短信
	$('.nav-con li').on('click',function(){
		$('.nav-con li').removeClass('choice');
		$(this).addClass('choice');
	});
	//滚动事件
	/*$(window).scroll(function(){
		if ($(document).height()-($(document).scrollTop()+$(window).height()) <= 402) {
			var bot = -($(document).height()-($(document).scrollTop()+$(window).height())) + 'px';
			$('.main-left').css({
				'bottom' :''+ bot,
				'margin-bottom':'402px'
			});
		} else{
			$('.main-left').css('position','fixed');
			$('.main-left').css('z-index','0');
			$('.eig-module').css({
				'position': 'relative',
				'z-index':'10'
			});
			$('.main-left').css('bottom','');
		}
	});*/
	
	//点击鉴权规则
	$('.jian').on('click',function(){
		$('.center').addClass('none');
		$('.start').addClass('none');
		$('.down').removeClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	})
	$('.cuo').on('click',function(){
		$('.center').addClass('none');
		$('.start').addClass('none');
		$('.down').removeClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	})
	$('.iphone').on('click',function(){
		$('.center').addClass('none');
		$('.start').addClass('none');
		$('.down').removeClass('none');
		$('.ims').addClass('none');
		$('.left').css({
			'height' : '100%',
			/*'width' : '100%'*/
		});
		$('.main-left').height(48 + $('.left').height());
$('.main-right').height(61 + $('.left').height());
	})
	//切换xml JSon
	$('.sl1 .JSON').on('click',function(){
		$('.sl1 .json-cont').html('');
		var html = '';
		html = '<div class="json-cont"><h3>JSON</h3><div class="sastyle">{"userid":"J10003","pwd":"26dad7f364507df18f3841cc9c4ff94d","mobile":"13800138000","content":"%b2%e2%ca%d4%b6%cc%d0%c5","timestamp":"0803192020","svrtype":" SMS001","exno":"0006","custid":"b3d0a2783d31b21b8573","exdata":"exdata000002"}</div><p class="succ">发送成功</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":0,</span></p><p><span>"msgid":9223372036854775808,</span></p><p><span>"custid":"b3d0a2783d31b21b8573"</span></p><p><span>}</span></p></div><p class="succ">发送失败</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":-100999,</span></p><p><span>"msgid":0,</span></p><p><span>"custid":""</span></p><p><span>}</span></p></div></div>'
		$('.sl1 .json-cont').append(html);
	});
	$('.sl1 .XML').on('click',function(){
		$('.sl1 .json-cont').html('');
		var html = '';
		html = '<h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtreq&gt;</span></p><p><span>&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d&lt;/pwd&gt;</span></p><p><span>&lt;mobile&gt;13800138000&lt;/mobile&gt;</span></p><p><span>&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;svrtype&gt;SMS001&lt;/svrtype&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;exdata&gt;exdata000002&lt;/exdata&gt;</span></p><p><span>&lt;/mtreq&gt;</span></p></div><p class="succ">发送成功</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtrsp&gt;</span></p><p><span>&lt;result&gt;0&lt;/result&gt;</span></p><p><span>&lt;msgid&gt;9223372036854775808&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;/mtrsp&gt;</span></p></div><p class="succ">发送失败</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtrsp&gt;</span></p><p><span>&lt;result&gt;-100999&lt;/result&gt;</span></p><p><span>&lt;msgid&gt;0&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;&lt;/custid&gt;</span></p><p><span>&lt;/mtrsp&gt;</span></p></div>'
		$('.sl1 .json-cont').append(html);
	});
	
	$('.sl2 .XML').on('click',function(){
		$('.sl2 .json-cont').html('');
		var html = '';
		html = '<div class="json-cont"><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtreq&gt;</span></p><p><span>&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d &lt;/pwd&gt;</span></p><p><span>&lt;mobile&gt;13800138000,13000130000,18000180000&lt;/mobile&gt;</span></p><p><span>&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;svrtype&gt;SMS001&lt;/svrtype&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;exdata&gt;exdata000002&lt;/exdata&gt;</span></p><p><span>&lt;/mtreq&gt;</span></p></div><p class="succ">发送成功</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtreq&gt;</span></p><p><span>&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d &lt;/pwd&gt;</span></p><p><span>&lt;mobile&gt;13800138000,13000130000,18000180000&lt;/mobile&gt;</span></p><p><span>&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;svrtype&gt;SMS001&lt;/svrtype&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;exdata&gt;exdata000002&lt;/exdata&gt;</span></p><p><span>&lt;/mtreq&gt;</span></p></div><p class="succ">发送失败</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtrsp&gt;</span></p><p><span>&lt;result&gt;-100999&lt;/result&gt;</span></p><p><span>&lt;msgid&gt;0&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;&lt;/custid&gt;</span></p><p><span>&lt;/mtrsp&gt;</span></p></div></div>'
		$('.sl2 .json-cont').append(html);
	});
	$('.sl2 .JSON').on('click',function(){
		$('.sl2 .json-cont').html('');
		var html = '';
		html = '<h3>JSON</h3><div class="sastyle">{"userid":"J10003","pwd":"26dad7f364507df18f3841cc9c4ff94d","mobile":"13800138000,13000130000,18000180000","content":"%b2%e2%ca%d4%b6%cc%d0%c5","timestamp":"0803192020","svrtype":"SMS001","exno":"0006","custid":"b3d0a2783d31b21b8573","exdata":"exdata000002"}</div><p class="succ">发送成功</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":0,</span></p><p><span>"msgid":9223372036854775808,</span></p><p><span>"custid":"b3d0a2783d31b21b8573"</span></p><p><span>}</span></p></div><p class="succ">发送失败</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":-100999,</span></p><p><span>"msgid":0,</span></p><p><span>"custid":""</span></p><p><span>}</span></p></div>'
		$('.sl2 .json-cont').append(html);
	})
	
	$('.sl3 .JSON').on('click',function(){
		$('.sl3 .json-cont').html('');
		var html = '';
		html = '<div class="json-cont"><h3>JSON</h3><div class="sastyle">{"userid":"J10003","pwd":"26dad7f364507df18f3841cc9c4ff94d","mobile":"13800138000","content":"%b2%e2%ca%d4%b6%cc%d0%c5","timestamp":"0803192020","svrtype":" SMS001","exno":"0006","custid":"b3d0a2783d31b21b8573","exdata":"exdata000002"}</div><p class="succ">发送成功</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":0,</span></p><p><span>"msgid":9223372036854775808,</span></p><p><span>"custid":"b3d0a2783d31b21b8573"</span></p><p><span>}</span></p></div><p class="succ">发送失败</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":-100999,</span></p><p><span>"msgid":0,</span></p><p><span>"custid":""</span></p><p><span>}</span></p></div></div>';
		$('.sl3 .json-cont').append(html);
	});
	$('.sl3 .XML').on('click',function(){
		$('.sl3 .json-cont').html('');
		var html = '';
		html = '<h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtreq&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d&lt;/pwd&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;multimt&gt;</span></p><p><span>&nbsp;&lt;mt&gt;</span></p><p><span>&nbsp;&lt;mobile&gt;13800138000&lt;/mobile&gt;</span></p><p><span>&nbsp;&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;svrtype&gt;SMS001&lt;/svrtype&gt;</span></p><p><span>&nbsp;&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&nbsp;&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&nbsp;&lt;exdata&gt;exdata000002&lt;/exdata&gt;</span></p><p><span>&lt;/mt&gt;</span></p><p><span>&lt;mt&gt;</span></p><p><span>&nbsp;&lt;mobile&gt;13100131000&lt;/mobile&gt;</span></p><p><span>&nbsp;&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;svrtype&gt;SMS002&lt;/svrtype&gt;</span></p><p><span>&nbsp;&lt;exno&gt;0007&lt;/exno&gt;</span></p><p><span>&nbsp;&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&nbsp;&lt;exdata&gt;exdata000002&lt;/exdata&gt;</span></p><p><span>&lt;/mt&gt;</span></p><p><span>&lt;/multimt&gt;</span></p><p><span>&lt;/mtreq&gt;</span></p></div><p class="succ">发送成功</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtrsp&gt;</span></p><p><span>&lt;result&gt;0&lt;/result&gt;</span></p><p><span>&lt;msgid&gt;9223372036854775808&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;9223372036854775808&lt;/custid&gt;</span></p><p><span>&lt;/mtrsp&gt;</span></p></div><p class="succ">发送失败</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;mtrsp&gt;</span></p><p><span>&lt;result&gt;-100999&lt;/result&gt;</span></p><p><span>&lt;msgid&gt;0&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;&lt;/custid&gt;</span></p><p><span>&lt;/mtrsp&gt;</span></p></div>';
		$('.sl3 .json-cont').append(html);
	})
	
	$('.sl4 .JSON').on('click',function(){
		$('.sl4 .json-cont').html('');
		var html = '';
		html = '<div class="json-cont"><h3>JSON</h3><div class="sastyle">{"userid":"J10003","pwd":"26dad7f364507df18f3841cc9c4ff94d","timestamp":"0803192020","retsize":300}</div><p class="succ">发送成功</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":0,</span></p><p><span>"mos":[</span></p><p><span>{</span></p><p><span>"msgid":9223372045854775808,</span></p><p><span>"mobile":"13800138000",</span></p><p><span>"spno":"1000457890006",</span></p><p><span>"exno":"0006",</span></p><p><span>"rtime":"2016-08-04 17:38:59",</span></p><p><span>"content":"%b2%e2%ca%d4%b6%cc%d0%c5"</span></p><p><span>},</span></p><p><span>{</span></p><p><span>"msgid":9223372045854895808,</span></p><p><span>"mobile":"13100131000",</span></p><p><span>"spno":"1000357890006",</span></p><p><span>"exno":"0006",</span></p><p><span>"rtime":"2016-08-04 17:39:50",</span></p><p><span>"content":"%b2%e2%ca%d4%b6%cc%d0%c5"</span></p><p><span>}</span></p><p><span>]</span></p><p><span>}</span></p></div><p class="succ">发送失败</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":-100999,</span></p><p><span>"mos":""</span></p><p><span>}</span></p></div></div>';
		$('.sl4 .json-cont').append(html);
	});
	$('.sl4 .XML').on('click',function(){
		$('.sl4 .json-cont').html('');
		var html = '';
		html = '<h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;moreq&gt;</span></p><p><span>&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d&lt;/pwd&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;retsize&gt;300&lt;/retsize&gt;</span></p><p><span>&lt;/moreq&gt;</span></p></div><p class="succ">获取成功返回示例</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;morsp&gt;</span></p><p><span>&lt;result&gt;0&lt;/result&gt;</span></p><p><span>&lt;mos&gt;</span></p><p><span>&lt;mo&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;msgid&gt;9223372045854775808&lt;/msgid&gt;</span></p><p><span>&lt;mobile&gt;13800138000&lt;/mobile&gt;</span></p><p><span>&lt;spno&gt;1000457890006&lt;/spno&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;rtime&gt;2016-08-04 17:38:59&lt;/rtime&gt;</span></p><p><span>&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;/mo&gt;</span></p><p><span>&lt;mo&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;msgid&gt;9223372045854895808&lt;/msgid&gt;</span></p><p><span>&lt;mobile&gt;13100131000&lt;/mobile&gt;</span></p><p><span>&lt;spno&gt;1000357890006&lt;/spno&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;rtime&gt;2016-08-04 17:39:50&lt;/rtime&gt;</span></p><p><span>&lt;content&gt;%b2%e2%ca%d4%b6%cc%d0%c5&lt;/content&gt;</span></p><p><span>&lt;/mo&gt;</span></p><p><span>&lt;/mos&gt;</span></p><p><span>&lt;/morsp&gt;</span></p></div><p class="succ">获取失败返回示例</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;morsp&gt;</span></p><p><span>&lt;result&gt;-100999&lt;/result&gt;</span></p><p><span>&lt;mos&gt;&lt;/mos&gt;</span></p><p><span>&lt;/morsp&gt;</span></p></div>';
		$('.sl4 .json-cont').append(html);
	})
	
	$('.sl5 .JSON').on('click',function(){
		$('.sl5 .json-cont').html('');
		var html = '';
		html = '<div class="json-cont"><h3>JSON</h3><div class="sastyle">{"userid":"J10003","pwd":"26dad7f364507df18f3841cc9c4ff94d","timestamp":"0803192020","retsize":300}</div><p class="succ">获取成功返回示例</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":0,</span></p><p><span>"rpts":[</span></p><p><span>{</span></p><p><span>"msgid":9223372045854775808,</span></p><p><span>"custid":"b3d0a2783d31b21b8573",</span></p><p><span>"pknum":1,</span></p><p><span>"pktotal":2,</span></p><p><span>"mobile":"13800138000",</span></p><p><span>"spno":"1000457890006",</span></p><p><span>"exno":"0006",</span></p><p><span>"stime":"2016-08-04 17:38:55",</span></p><p><span>"rtime":"2016-08-04 17:38:59",</span></p><p><span>"status":0,</span></p><p><span>"errcode":"DELIVRD",</span></p><p><span>"errdesc":"success",</span></p><p><span>"exdata":"exdata0002"</span></p><p><span>},</span></p><p><span>{</span></p><p><span>"msgid":9223372045854875808,</span></p><p><span>"custid":"b3d0a2783d31b21b8573",</span></p><p><span>"pknum":2,</span></p><p><span>"pktotal":2,</span></p><p><span>"mobile":"13800138000",</span></p><p><span>"spno":"1000457890006",</span></p><p><span>"exno":"0006",</span></p><p><span>"stime":"2016-08-04 17:38:55",</span></p><p><span>"rtime":"2016-08-04 17:38:59",</span></p><p><span>"status":0,</span></p><p><span>"errcode":"DELIVRD",</span></p><p><span>"errdesc":"success",</span></p><p><span>"exdata":"exdata0002"</span></p><p><span>}</span></p><p><span>]</span></p><p><span>}</span></p></div><p class="succ">获取失败返回示例</p><h3>JSON</h3><div class="sastyle"><p><span>{</span></p><p><span>"result":-100999,</span></p><p><span>"rpts":""</span></p><p><span>}</span></p></div></div>';
		$('.sl5 .json-cont').append(html);
	});
	$('.sl5 .XML').on('click',function(){
		$('.sl5 .json-cont').html('');
		var html = '';
		html = '<h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;rptreq&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;userid&gt;J10003&lt;/userid&gt;</span></p><p><span>&lt;pwd&gt;26dad7f364507df18f3841cc9c4ff94d&lt;/pwd&gt;</span></p><p><span>&lt;timestamp&gt;0803192020&lt;/timestamp&gt;</span></p><p><span>&lt;retsize&gt;300&lt;/retsize&gt;</span></p><p><span>&lt;/rptreq&gt;</span></p></div><p class="succ">获取成功返回示例</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;rptrsp&gt;</span></p><p><span>&lt;result&gt;0&lt;/result&gt;</span></p><p><span>&lt;rpts&gt;</span></p><p><span>&nbsp;&lt;rpt&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;msgid&gt;9223372045854775808&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;pknum&gt;1&lt;/pknum&gt;</span></p><p><span>&lt;pktotal&gt;2&lt;/pktotal&gt;</span></p><p><span>&lt;mobile&gt;13800138000&lt;/mobile&gt;</span></p><p><span>&lt;spno&gt;1000457890006&lt;/spno&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;stime&gt;2016-08-04 17:38:55&lt;/stime&gt;</span></p><p><span>&lt;rtime&gt;2016-08-04 17:38:59&lt;/rtime&gt;</span></p><p><span>&lt;status&gt;0&lt;/status&gt;</span></p><p><span>&lt;errcode&gt;DELIVRD&lt;/errcode&gt;</span></p><p><span>&lt;errdesc&gt;success&lt;/errdesc&gt;</span></p><p><span>&lt;exdata&gt;exdata0002&lt;/exdata&gt;</span></p><p><span>&lt;/rpt&gt;</span></p><p><span>&lt;rpt&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;msgid&gt;9223372045854875808&lt;/msgid&gt;</span></p><p><span>&lt;custid&gt;b3d0a2783d31b21b8573&lt;/custid&gt;</span></p><p><span>&lt;pknum&gt;2&lt;/pknum&gt;</span></p><p><span>&lt;pktotal&gt;2&lt;/pktotal&gt;</span></p><p><span>&lt;mobile&gt;13800138000&lt;/mobile&gt;</span></p><p><span>&lt;spno&gt;1000457890006&lt;/spno&gt;</span></p><p><span>&lt;exno&gt;0006&lt;/exno&gt;</span></p><p><span>&lt;stime&gt;2016-08-04 17:38:55&lt;/stime&gt;</span></p><p><span>&lt;rtime&gt;2016-08-04 17:38:59&lt;/rtime&gt;</span></p><p><span>&lt;status&gt;0&lt;/status&gt;</span></p><p><span>&lt;errcode&gt;DELIVRD&lt;/errcode&gt;</span></p><p><span>&lt;errdesc&gt;success&lt;/errdesc&gt;</span></p><p><span>&lt;exdata&gt;exdata0002&lt;/exdata&gt;</span></p><p><span>&nbsp;&nbsp;&nbsp;&lt;/rpt&gt;</span></p><p><span>&lt;/rpts&gt;</span></p><p><span>&lt;/rptrsp&gt;</span></p></div><p class="succ">获取失败返回示例</p><h3>XML</h3><div class="sastyle"><p><span>&lt;?xml version=1.0 encoding=utf-8?&gt;</span></p><p><span>&lt;rptrsp&gt;</span></p><p><span>&nbsp;&nbsp;&lt;result&gt;-100999&lt;/result&gt;</span></p><p><span>&nbsp;&nbsp;&lt;rpts&gt;&lt;/rpts&gt;</span></p><p><span>&lt;/rptrsp&gt;</span></p></div>';
		$('.sl5 .json-cont').append(html);
	});
	
	
	
	 $(function(){
		var draggle = false;
		var startX = 0;
		var endX = 0;
		var marginLeft = 0;
		var divWidth = $('.ims').width();
		var lDivWidth = $('.left').width();
		var minWidth = 300;
		var maxWidth = 470;
		$('.resizeL').mousedown(function(e){
			draggle = true;
			startX = e.pageX;
			divWidth = $('.ims').width();
			lDivWidth = $('.left').width();
			marginLeft = parseInt($('.ims').css('margin-left'));
		});
		$(document).mousemove(function(e) {
		    if(draggle){	    		
		    	var a = parseInt($('.ims').width()) > maxWidth;
		    	var b = parseInt($('.ims').width()) < minWidth;
		    	var c = e.pageX > startX;
		    	var d = e.pageX < startX;
		    	
		    	if(!((a&&d)||(b&&c))){
		    		$('.ims').width( divWidth - (e.pageX - startX));
		    		$('.left').width( lDivWidth + (e.pageX - startX));
		    	}
		    	
				
		    	
		    }
		})
		
		$(document).mouseup(function(e) {
		    draggle = false;
		    //e.cancelBubble = true;
		    
		})
	});
	$(function(){
		var draggle = false;
		var startX = 0;
		var endX = 0;
		var marginLeft = 0;
		var divWidth = $('.daima-voc').width();
		var lDivWidth = $('.left').width();
		var minWidth = 300;
		var maxWidth = 470;
		$('.resize').mousedown(function(e){
			draggle = true;
			startX = e.pageX;
			divWidth = $('.daima-voc').width();
			lDivWidth = $('.left').width();
			marginLeft = parseInt($('.daima-voc').css('margin-left'));
		});
		$(document).mousemove(function(e) {
		    if(draggle){	    		
		    	var a = parseInt($('.daima-voc').width()) > maxWidth;
		    	var b = parseInt($('.daima-voc').width()) < minWidth;
		    	var c = e.pageX > startX;
		    	var d = e.pageX < startX;
		    	
		    	if(!((a&&d)||(b&&c))){
		    		$('.daima-voc').width( divWidth - (e.pageX - startX));
		    		$('.left').width( lDivWidth + (e.pageX - startX));
		    	}
		    }
		})
		
		$(document).mouseup(function(e) {
		    draggle = false;
		    //e.cancelBubble = true;
		    
		})
	});
})
