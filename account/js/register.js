jQuery.extend(jQuery.validator.messages, {
	required: "必填字段",
	remote: "请指定一个不重复的值",
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的日期 (ISO).",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "请再次输入相同的值",
	accept: "请输入拥有合法后缀名的字符串",
	maxlength: jQuery.validator.format("允许的最大长度为 {0} 个字符"),
	minlength: jQuery.validator.format("允许的最小长度为 {0} 个字符"),
	rangelength: jQuery.validator.format("允许的长度为{0}和{1}之间"),
	range: jQuery.validator.format("请输入介于 {0} 和 {1} 之间的值"),
	max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
	min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});
(function() {
	var register = {
		//初始化
		init: function() {
			var self = this;
			self.bindEvent();
			self.verify();
			common.imgCode();

		},
		//点击事件
		bindEvent: function() {
			var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
			var regUserName = /^[a-zA-Z][a-zA-Z0-9\_]{5,19}$/;
			var regUseremail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			//点击验证码切换
			$(".ptc").on("click", function() {
				$('.icd').attr('src', "");
				common.imgCode();
			});
			$(".icd").on("click", function() {
				$(this).attr("src","");
				common.imgCode();
			});
			//点击弹出用户协议
			$(".argument-cli").on("click", function() {
				$("#click-agreement").modal('show');
			});
			//点击获取短信验证码
			$(".gainMsgCode").on("click", function() {
				var data2 ={
					mobile:$('#mobile').val(),
					checkCode:$('#imgCode').val(),
					smsType : 2
				};
				var mbExamine = $(".mb").text();
				var mobile = $("#mobile").val();
				if(mobile == "") {
					$(".errInfo").text("请输入手机号码");
					$('#myModal').modal({});
				} else if(regPhone.test(mobile) == true) {
					if(mbExamine == "此手机号已注册") {
						$(".errInfo").text("您的手机号已注册，请更换手机号码");
						$('#myModal').modal({});
						$(".gainMsgCode").attr("disabled", true);
						return false;
					}else if($.trim($('#imgCode').val())==''){
						$(".errInfo").text("请输入图形验证码");
						$('#myModal').modal({});
					}else if($.trim($('#imgCode').val()).length!=4){
						$(".errInfo").text("请输入正确的图形验证码");
						$('#myModal').modal({});
					}else {
						/*common.msmCode();*/
						$.ajax({
							url:"../aut_smsCode.hts",
							data:data2,
							async:true,
							dataType:'json',
							type:"POST",
							success:function(res){
								if(res.resultCode == "0") {
									$(".errInfo").text("短信验证码发送成功");
									$('#myModal').modal({});
									c = setInterval(countDown, 1000)
									$(".gainMsgCode").attr("disabled", true);
								} else {
									$(".errInfo").text(res.errInfo);
									$('#myModal').modal({});
								}
								
							}
						});
						var b = 60;
						function countDown() {
							$(".gainMsgCode").css("background","#b9b9b9")
							$(".gainMsgCode").val(b + 's后重新发送');
							b--;
							if(b < 0) {
								clearInterval(c);
								$(".gainMsgCode").css("background","#1599e5")
								$(".gainMsgCode").removeAttr("disabled");
								$(".gainMsgCode").val("点击重新发送");
								b = 60;
							}
						}
						
					}
				} else {
					$(".errInfo").text("请输入正确的中国大陆手机号！");
					$('#myModal').modal({});
				}
			});
			//点击注册
			$("#agree").on("click", function() {
				var data='',handler = '';
				if(location.search.indexOf('id=') != -1){  /*如果有推广id*/
					handler = location.search.replace(/\?id=(.+)/g, '$1'); /* id值 */
					if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){ 
						if ($("#email").val() != '' && $("#email").val() != '输入邮箱') {
							data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
						} else {
							data= $("#info .form-control:not(.encode)").not("#email").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
						}
					} else {
						data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
					}
					register.ajax(data);
				}else if(location.href.indexOf('?')!=-1){
					handler = location.search.replace(/\?(.+)/g,'$1');
					if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){ 
						if ($("#email").val() != '' && $("#email").val() != '输入邮箱') {
							data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
						} else {
							data= $("#info .form-control:not(.encode)").not("#email").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
						}
					} else {
						data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val()) + '&proKey=' + handler;
					}
					register.ajax(data);
				}else{
					if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){ 
						if ($("#email").val() != '' && $("#email").val() != '输入邮箱') {
							data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val());
						} else {
							data= $("#info .form-control:not(.encode)").not("#email").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val());
						}
					} else {
						data= $("#info .form-control:not(.encode)").serialize() + '&pd=' + Base64.encode($("#password").val()) + '&confirm=' + Base64.encode($("#confirmPass").val());
					}
					register.ajax(data);
				}
			});
			//点击查看详情
//			$(".view-more").on("click", function() {
//				location.href = "acc_login.html"
//			})
			//验证用户名是否唯一
			$("#username").blur(function() {
				$(".un").text("");
				var username = $(this).val();
				if($(this).val() == "") {
					return false;
				} else if(regUserName.test(username) == true) {
					$(".un").text("");
					var data = {
						method: "checkUserName",
						un: $(this).val()
					}
					common.ajax("../aut_checkOnlySvt.hts", data, function(res) {
						if(res.resultCode == "0") {
							$(".un").text("该用户名可用");
							$(".un").css("color", "#00B83F");
						} 
						else if(res.errCode == "S100019")
						{
							
						}
						else {
							$(".un").text("此用户名已注册");
							$(".un").css("color", "#ff0000");
						}
					});
				}
			});
			//验证邮箱是否唯一
			$("#email").blur(function() {
				$(".em").text("");
				var email = $(this).val();
				if($(this).val() == "") {
					$(".um").empty();
					return false;
				} else if(regUseremail.test(email) == true) {
					$(".em").text("");
					$(".um").empty();
					var data = {
						method: "checkEmail",
						email: $(this).val()
					}
					common.ajax("../aut_checkOnlySvt.hts ", data, function(res) {
						if(res.resultCode == "0") {
							$(".em").text("该邮箱可用");
							$(".em").css("color", "#00B83F");
						} else {
							$(".em").text("此邮箱已注册");
							$(".em").css("color", "#ff0000");
						}
					});
				}
			});
			$("#email").on('keydown',function() {
				var regUseremail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
				if ($(this).val() != '') {
					if (!regUseremail.test($(this).val())){
						$(".um").empty();
						var html = '<label id="confirmPass-error" class="error" for="confirmPass">请填写正确邮箱格式</label>';
						$(".um").append(html);
					} else {
						$(".um").empty();
					}
				}
			});
			//验证手机号是否唯一
//			$("#mobile").blur(function() {
//				$(".mb").text("");
//				var mobile = $(this).val();
//				if(regPhone.test(mobile) == true) {
//					var data = {
//						method: "checkMobile",
//						mobile: $(this).val()
//					}
//				} else {
//					return false;
//				}
//				common.ajax("../aut_checkOnlySvt.hts ", data, function(res) {
//					if(res.resultCode == "0") {
//						$(".mb").text("该手机号可用");
//						$(".mb").css("color", "#00B83F");
//						var gainMsgCode = $(".gainMsgCode").val();
//						if(gainMsgCode == "获取短信验证码" || gainMsgCode == "点击重新发送") {
//							$(".gainMsgCode").removeAttr("disabled");
//						}
//					} else {
//						$(".mb").text("此手机号已注册");
//						$(".mb").css("color", "#ff0000");
//					}
//				});
//			});
			//密码框失去焦点提示字消失
			$("input[type='password']").on("blur",function(){
				$(".capsLockTip").css("display","none");
			});
		},
		//交互
		ajax: function(data) {
			common.ajax("../aut_register.hts", data, function(res) {
				if(res.resultCode == "0") {
					$("#info").addClass("none");
					$(".register-suc").removeClass("none");
					$("#info").addClass("none");
					$(".register-suc").removeClass("none");
//					$('#account').modal('show');
					$('.accot').text(res.spUser);
					$('.passw').text(res.spPass);
					$(".reg-suc-tg").on("click", function() {
						Cookies.set('tkn', res.tkn);
						Cookies.set('certState', res.certState);
						location = "../frame/"; //#设定跳转的链接地址 
					});
					var t = 5;
					setInterval(refer, 1000);
					function refer() {
						if(t == 0) {
							Cookies.set('tkn', res.tkn);
							Cookies.set('certState', res.certState);
							location = "../frame/"; //#设定跳转的链接地址 
						}
						$(".num").text(t);
						t--;
					};
				}else {
					$(".errInfo").text(res.errInfo);
					$('#myModal').modal({});
				} 
			})
		},
		//校验
		verify: function() {
			$('#info').validate({
				debug: true,
				rules: {
					un: {
						required: true,
						regUserName: true
					},
					firmName: {
						required: true,
						regFirmName: true,
						rangelength: [2, 50]
					},
					mobile: {
						required: true,
						regPhone: true
					},
					pd: {
						required: true,
						regNum:true,
						rangelength: [6, 16]
					},
					confirm:{
						required: true,
						regNum:true,
						equalTo: '#password',
						rangelength: [6, 16]
					},
					checkCode: {
						required: true
					},
					smsCheckCode: {
						required: true,
						minlength:6
					}
				},
				messages: {
					un: {
						required: '请输入用户名',
						regUserName: '6-20位，支持英文、数字和下划线；不支持纯数字、数字开头和特殊字符'
					},
					firmName: {
						required: '请填写公司全称或者团队名称',
						regFirmName: '2-50位的中文、英文；支持下划线、括弧；',
						rangelength: '长度为2到50个字符'
					},
					mobile: {
						required: '请输入手机号',
						regPhone: '输入正确的中国大陆手机号码'
					},
					pd: {
						required: '请设置一个密码',
						rangelength: '密码位数为6到16位',
						regNum:'密码不能为纯数字'
					},
					confirm: {
						required: '请确认密码',
						equalTo: '两次输入密码不一致',
						rangelength: '密码位数为6到16位',
						regNum:'密码不能为纯数字'
					},
					checkCode: {
						required: '请输入图形验证码'
					},
					smsCheckCode: {
						required: '请输入短信验证码',
						minlength:'请输入6位短信验证码'
					}
				},
				errorPlacement: function(error, element) {
					error.appendTo(element.parent().children("span:last"));
				},
				submitHandler: function(form) {
					var unhint=$(".un").text();
					var mbhint=$(".mb").text();
					var emhint=$(".em").text();
					var umhint=$(".um").text();
					var data1 ={
						method: "checkCode",
						mobile:$('#mobile').val(),
						checkCode:$('#imgCode').val(),
						smsCheckCode:$('#msgCode').val(),
						email: $('#email').val()
					};
					var v_checkCode = check(data1);
					var regUseremail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
					if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){ 
						if ($("#email").val() != '' && $("#email").val() != '输入邮箱') {
							if (!regUseremail.test($("#email").val())){
								$('.errInfo').text("邮箱格式不正确");
								$('#myModal').modal();
								return;
							};
						}
					} else {
						if ($("#email").val() != '') {
							if (!regUseremail.test($("#email").val())){
								$('.errInfo').text("邮箱格式不正确");
								$('#myModal').modal();
								return;
							};
						}
					}
					if(unhint=="此用户名已注册"){
						return;
					}else if(mbhint=="此手机号已注册"){
						return;
					}else if(umhint =="请填写正确邮箱格式"){
						return;
					}else if(!v_checkCode){
						$('.icd').attr('src', "");
						$('.errInfo').text("短信验证码或图形验证码错误");
						$('#myModal').modal();
						common.imgCode();
						return;
					}else if(emhint == "此邮箱已注册"){
						$('.errInfo').text("此邮箱已被注册");
						$('#myModal').modal();
						return;
					}else{
						$("#rt").click();
					}
				}
			})
			$.validator.addMethod("regPhone", function(value, element, params) {
				var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
				return this.optional(element) || (regPhone.test(value));
			}, "填写正确的手机号格式！");
			$.validator.addMethod("regUserName", function(value, element, params) {
				var regUserName = /^[a-zA-Z][a-zA-Z0-9\_]{5,19}$/;
				return this.optional(element) || (regUserName.test(value));
			}, "填写英文大小写、数字或两者组合，最长为20位，不能为纯数字");
			$.validator.addMethod("regFirmName", function(value, element, params) {
				var regFirmName = /^[a-zA-Z\u4e00-\u9fa5\(\)\_]+$/;
				return this.optional(element) || (regFirmName.test(value));
			}, "公司或团队名称为中文或者英文");
			$.validator.addMethod("regNum", function(value, element, params) {
				var regNum = /^[0-9]{6,16}$/;
				return this.optional(element) || (!regNum.test(value));
			}, "不能为纯数字");

		},
	}
	register.init();
	function check(data){
		var flag=false;
		$.ajax({
			type:"POST",
			async:false,
			data:data,
			dataType:'json',
			url:"../aut_checkOnlySvt.hts",
			success:function(data){
				if(data.resultCode=='0'){
					flag=true;
				}
			}							
		});
		return flag;
	}
	
})();