$(function() {
	var experience = {
		init: function() {
			experience.bindEvent();
			experience.render();
		},
		bindEvent: function() {
			//				体验短信验证码
			$(".msgCodeBox-btn").on("click", function() {
				common.imgCode();
//				$("#mobile").text("");
//				$("#checkCode").text("");
				$(".exp-popUp-box").removeClass("none");
				$(".barrierBed").removeClass("none");
				$(".codeType").text("短信");
				$("#mobile").val("");
				$("#checkCode").val("");
				$(".hint").text("");
			});
			//				体验语音验证码
			$(".voiceCodeBox-btn").on("click", function() {
				common.imgCode();
				$(".exp-popUp-box").removeClass("none");
				$(".barrierBed").removeClass("none");
				$(".codeType").text("语音");
				$("#mobile").val("");
				$("#checkCode").val("");
				$(".hint").text("");
			});
			//				关闭按钮
			$(".close").on("click", function() {
				$(".exp-popUp-box").addClass("none");
				$(".exe-exing-box").addClass("none");
				$(".exe-join-box").addClass("none");
				$(".barrierBed").addClass("none");
			});
			$(".exSuc").on("click", function() {
				$(".exe-join-box").removeClass("none");
				$(".barrierBed").removeClass("none");
				$(".join-type").text($(".exing-type").text());
			});
			$(".join").on("click", function() {
				location.href = "../account/acc_register.html"
			});
			//点击体验
			$('#exInfo').validate({
				debug: true,
				rules: {
					mobile: {
						required: true,
						regPhone: true
					},
					checkCode: {
						required: true,
					},

				},
				messages: {
					mobile: {
						required: '请输入手机号',
						regPhone: '输入正确的中国大陆手机号码'

					},
					checkCode: {
						required: '请输入验证码'
					},
				},
				errorPlacement: function(error, element) {
					error.appendTo(element.parent().children("span:last"));
				},
				submitHandler: function() {
					var type = $(".codeType").text();
					var method = (type == "短信") ? "smsCodeExp" : "voiceCodeExp";
					var mobile = $("#mobile").val();
					var checkCode = $("#checkCode").val();
					var data = {
						method: method,
						mobile: mobile,
						checkCode: checkCode
					}
					$(".exing-type").text($(".codeType").text());
					common.ajax(domainURL + "/area_aut_freeExpSvt.hts ", data, function(res) {
						if(res.resultCode == "0") {
							$(".exp-popUp-box").addClass("none");
							$(".exe-exing-box").removeClass("none");/*显示体验中*/
							$('.exe-exing-box .js-toggle-show').show().siblings('.js-show-flower').hide();
							countDownAnim();
							$(".exingSuccess").removeClass("none");
						} else {
							$(".icd").attr("src","");
							common.imgCode();
							$(".errInfo").text(res.errInfo);
							$('#myModal').modal({});
						}
					});
				}
			});
			$.validator.addMethod("regPhone", function(value, element, params) {
				var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
				return this.optional(element) || (regPhone.test(value));
			}, "填写正确的手机号格式！");

			//				我要反馈
			$(".feedback").on("click", function() {
				$(".exe-exing-box").removeClass("none");
				$(".exingSuccess").addClass("none");
				$(".exingErro").removeClass("none");
			});
			//				再试一次
			$(".exAgain").on("click", function() {
				$(".exingErro").addClass("none");
				$(".exe-exing-box").addClass("none");
				$(".exingSuccess").addClass("none");
				$(".codeType").text($(".exing-type").text());
				$(".exp-popUp-box").removeClass("none");
				common.imgCode();
			});
			$(".close").on("click", function() {
				common.ajax(domainURL + "/area_aut_getExpNumSvt.hts", {origin:"10.10.202.154"}, function(res) {
					if(res.resultCode == "0") {
						var msgCount = res.dataList[0].expCount;
						var voCount = res.dataList[1].expCount;
						$("#msgExpCount").text(msgCount);
						$("#vocExpCount").text(voCount);
					} else {
						$(".errInfo").text(res.errInfo);
						$('#myModal').modal({});
					}
					//语音加“，”
					var qwe1 = $("#msgExpCount").text();
					var dasa1 = "";
					var wer1 = new Array();
					if(qwe1.length > 3){
						var gs2 = parseInt(qwe1.length/3);
						if(gs2 == 0){
							var gs = parseInt(qwe1.length/3);
						}else{
							var gs = parseInt(qwe1.length/3)+1;
						}
						for (var i = 0; i < gs; i++) {
							wer1[i] = (qwe1.substring(qwe1.length-(3*i+3),qwe1.length-(3*i)));	
						}
						for (var j = gs-1; j >= 0; j--) {
							dasa1 += wer1[j]+",";
						}
						if(qwe1.length%3 == 0){
							$("#msgExpCount").text(dasa1.substring(1,dasa1.length-1));
						}else{
							$("#msgExpCount").text(dasa1.substring(0,dasa1.length-1));
						}
					}
					//短信加“，”
					var qwe2 = $("#vocExpCount").text();
					var dasa2 = "";
					var wer2 = new Array();
					if(qwe2.length > 3){
						var gs3 = parseInt(qwe2.length/3);
						if(gs3 == 0){
							var gs = parseInt(qwe2.length/3);
						}else{
							var gs = parseInt(qwe2.length/3)+1;
						}
						for (var i = 0; i < gs; i++) {
							wer2[i] = (qwe2.substring(qwe2.length-(3*i+3),qwe2.length-(3*i)));	
						}
						for (var j = gs-1; j >= 0; j--) {
							dasa2 += wer2[j]+",";
						}
						if(qwe2.length%3 == 0){
							$("#vocExpCount").text(dasa2.substring(1,dasa2.length-1));
						}else{
							$("#vocExpCount").text(dasa2.substring(0,dasa2.length-1));
						}
					}
				});
			});

			//输入框获得焦点清空hint
			$("#moblie").change(function() {
				$(".hint").text('');
			});
			$("#checkCode").change(function() {
				$(".hint").text('');
			});

			//点击切换验证码
			$(".icd").on("click", function() {
				$(this).attr("src","");
				common.imgCode();	
			});
		},
		render: function() {
			//调取体验人数
			common.ajax(domainURL + "/area_aut_getExpNumSvt.hts", {origin:"10.10.202.154"}, function(res) {
				if(res.resultCode == "0") {
					//三个数字加逗号
					$("#msgExpCount").text(res.dataList[0].expCount);
					var qwe = $("#msgExpCount").text();
					var dasa = "";
					var wer = new Array();
					if(qwe.length > 3){
						var gs2 = parseInt(qwe.length/3);
						if(gs2 == 0){
							var gs = parseInt(qwe.length/3);
						}else{
							var gs = parseInt(qwe.length/3)+1;
						}
						for (var i = 0; i < gs; i++) {
							wer[i] = (qwe.substring(qwe.length-(3*i+3),qwe.length-(3*i)));	
						}
						for (var j = gs-1; j >= 0; j--) {
							dasa += wer[j]+",";
						}
						if(qwe.length%3 == 0){
							$("#msgExpCount").text(dasa.substring(1,dasa.length-1));
						}else{
							$("#msgExpCount").text(dasa.substring(0,dasa.length-1));
						}
					}
					$("#vocExpCount").text(res.dataList[1].expCount);
					var qwe1 = $("#vocExpCount").text();
					var dasa1 = "";
					var wer1 = new Array();
					if(qwe1.length > 3){
						var gs2 = parseInt(qwe1.length/3);
						if(gs2 == 0){
							var gs = parseInt(qwe1.length/3);
						}else{
							var gs = parseInt(qwe1.length/3)+1;
						}
						for (var i = 0; i < gs; i++) {
							wer1[i] = (qwe1.substring(qwe1.length-(3*i+3),qwe1.length-(3*i)));	
						}
						for (var j = gs-1; j >= 0; j--) {
							dasa1 += wer1[j]+",";
						}
						if(qwe1.length%3 == 0){
							$("#vocExpCount").text(dasa1.substring(1,dasa1.length-1));
						}else{
							$("#vocExpCount").text(dasa1.substring(0,dasa1.length-1));
						}
					}
//					$("#msgExpCount").text(msgCount);
//					$("#vocExpCount").text(voCount);
					
				} else {
					$(".errInfo").text(res.errInfo);
					$('#myModal').modal({});
				}
			});	
		}
		
	};
	experience.init();
});

//点击短信体验
$(".msgCodeExp-num img").one("click",function(){
	$.post(domainURL + "/area_aut_addCount.hts?method=smsExp",function(data){
		if(data.resultCode == 0){
			var qwe1 = (parseInt($("#msgExpCount").text().replace(/,/g, ""))+1).toString();
			var dasa1 = "";
			var wer1 = new Array();
			if(qwe1.length > 3){
				var gs2 = parseInt(qwe1.length/3);
				if(gs2 == 0){
					var gs = parseInt(qwe1.length/3);
				}else{
					var gs = parseInt(qwe1.length/3)+1;
				}
				for (var i = 0; i < gs; i++) {
					wer1[i] = (qwe1.substring(qwe1.length-(3*i+3),qwe1.length-(3*i)));	
				}
				for (var j = gs-1; j >= 0; j--) {
					dasa1 += wer1[j]+",";
				}
				if(qwe1.length%3 == 0){
					$("#msgExpCount").text(dasa1.substring(1,dasa1.length-1));
				}else{
					$("#msgExpCount").text(dasa1.substring(0,dasa1.length-1));
				}
			}
		}else{
			$(".Voice-SMS").removeClass("none");
			$(".barrierBed").removeClass("none");
		}
	},"json");
});

//点击语音体验
$(".vocieCodeExp-num img").one("click",function(){
	$.post(domainURL + "/area_aut_addCount.hts?method=voiceExp",function(data){
		if(data.resultCode == 0){
			var qwe1 = (parseInt($("#vocExpCount").text().replace(/,/g, ""))+1).toString();
			var dasa1 = "";
			var wer1 = new Array();
			if(qwe1.length > 3){
				var gs2 = parseInt(qwe1.length/3);
				if(gs2 == 0){
					var gs = parseInt(qwe1.length/3);
				}else{
					var gs = parseInt(qwe1.length/3)+1;
				}
				for (var i = 0; i < gs; i++) {
					wer1[i] = (qwe1.substring(qwe1.length-(3*i+3),qwe1.length-(3*i)));	
				}
				for (var j = gs-1; j >= 0; j--) {
					dasa1 += wer1[j]+",";
				}
				if(qwe1.length%3 == 0){
					$("#vocExpCount").text(dasa1.substring(1,dasa1.length-1));
				}else{
					$("#vocExpCount").text(dasa1.substring(0,dasa1.length-1));
				}
			}
		}else{
			$(".Voice-SMS").removeClass("none");
			$(".barrierBed").removeClass("none");
		}
	},"json");
});

//关闭弹窗
$(".Voice-SMS .close").click(function(){
	$(".Voice-SMS").addClass("none");
	$(".barrierBed").addClass("none");
});