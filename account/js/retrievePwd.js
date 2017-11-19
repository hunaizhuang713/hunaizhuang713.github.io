//找回密码
(function() {
	var retiviewPwd_uName = '',retiviewPwd_tPhone = '';
	var retrievePassword = {
		//初始化
		init: function() {
			var self = this;
			self.bindEvent();
			self.imgCode();
			self.validation();

		},
		//加载图片验证码
		imgCode: function() {
			common.imgCode();
		},
		//点击事件
		bindEvent: function() {
			//用户名失去焦点
			$('.retiviewPwd_uName').blur(function(){	
				var _this = $(this).val();
				if(retiviewPwd_uName !=''){
					 if(retiviewPwd_uName!=_this){
						retiviewPwd_uName = _this;
					    retrievePassword.imgCode();
					 }	
				}else{
					if(_this!=''){
						retiviewPwd_uName = _this;
					    retrievePassword.imgCode();
					}
				}
			});
			//手机号码失去焦点
			$('.retiviewPwd_tPhone').blur(function(){
				var _this = $(this).val();
				if(retiviewPwd_tPhone !=''){
					 if(retiviewPwd_tPhone!=_this){
						retiviewPwd_tPhone = _this;
					    retrievePassword.imgCode();
					 }	
				}else{
					if(_this!=''){
						retiviewPwd_tPhone = _this;
					    retrievePassword.imgCode();
					}
				}
			})
			//点击验证码切换
			$(".ptc").on("click", function() {
				retrievePassword.imgCode();
			});
			//点击确定重新登录
			$("#login").on("click", function() {
				location.href = "../account/acc_login.html";
			});
			//点击获取短信验证码
			$(".gainMsgCode").on("click", function() {
				var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
				var mobile = $("#mobile").val();
				var un = $('#userName').val();
				var data2 ={
						mobile:$('#mobile').val(),
						checkCode:$('#imgCode').val(),
						un :$('#userName').val()
				};
				if(mobile == "") {
					$(".errInfo").text("请输入手机号！");
					$('#myModal').modal({});
				} else if(regPhone.test(mobile) == false) {
					$(".errInfo").text("请输入正确的11位中国大陆手机号！");
					$('#myModal').modal({});
				} else if(un == "" || un == null) {
					$(".errInfo").text("请输入用户名！");
					$('#myModal').modal({});
				} else {
					$.ajax({
						url:"../findPass.hts?method=sendCode",
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
								retrievePassword.imgCode();
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
			})
		},
		//表单验证加交互
		validation: function() {
			//验证手机号
			$('#resetInfo').validate({
					debug: true,
					rules: {
						un:{
							required:true,
						},
						mobile: {
							required: true,
							regPhone: true
						},
						imgCode: {
							required: true
						},
						msgCode: {
							required: true,
							minlength:6
						}
					},
					messages: {
						un:{
							required: '请输入用户名',
						},
						mobile: {
							required: '请输入手机号',
							regPhone: '请输入11位中国大陆手机号'
						},
						imgCode: {
							required: '请输入图片验证码'
						},
						msgCode: {
							required: '请输入短信验证码',
							minlength:'请输入6位短信验证码'
						}
					},
					errorPlacement: function(error, element) {
						error.appendTo(element.parent().children("span:last"));
					},
					submitHandler: function() {
						var data = {
							un:$('#userName').val(),
							method: "checkPhone",
							mobile: $("#mobile").val(),
							checkCode: $("#imgCode").val(),
							smsCheckCode: $("#msgCode").val()
						}
						common.ajax("../findPass.hts", data, function(res) {
							if(res.resultCode == "0") {
								$(".retPsw_resetInfo").addClass("none");
								$(".retPsw_resetPsd").removeClass("none");
								$(".ltwo").addClass("blue");
								$(".step2").addClass("bl");
							} else {
								retrievePassword.imgCode();
								$(".errInfo").text(res.errInfo);
								$('#myModal').modal({});
							}

						});
					}
				})
			
				//重设密码
			$('#resetPsd').validate({
				debug: true,
				rules: {
					newPassword: {
						required: true,
						rangelength: [6, 16],
						regNum:true
					},
					affirmPassword: {
						required: true,
						equalTo: '#newPassword',
						rangelength: [6, 16],
						regNum:true

					}
				},
				messages: {
					newPassword: {
						required: '请设置一个密码',
						rangelength: '密码位数为6到16位',
						regNum:'密码不能为纯数字'
					},
					affirmPassword: {
						required: '请再次输入密码',
						equalTo: '两次输入密码不一致',
						rangelength: '密码位数为6到16位',
						regNum:'密码不能为纯数字'
					}
				},
				errorPlacement: function(error, element) {
					error.appendTo(element.parent().children("p:last"));
				},
				submitHandler: function() {
					var passWord = Base64.encode($("#newPassword").val());
					var confirmPass = Base64.encode($("#affirmPassword").val());
					var data = {
						method: "resetPass",
						pd: passWord,
						confirm: confirmPass
					}
					
					common.ajax("../findPass.hts", data, function(res) {
						if(res.resultCode == "0") {
							$(".retPsw_resetPsd").addClass("none")
							$("#resetSuccess").removeClass("none");
							$(".lthree").addClass("blue");
							$(".step3").addClass("bl");
						} else {
							$(".errInfo").text(res.errInfo);
							$('#myModal').modal({});
						}
					})
				}
			})
			$.validator.addMethod("regPhone", function(value, element, params) {
				var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
				return this.optional(element) || (regPhone.test(value));
			}, "填写正确的手机号格式！");
			$.validator.addMethod("regUserName", function(value, element, params) {
				var regUserName = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;
				return this.optional(element) || (regUserName.test(value));
			}, "填写英文大小写、数字或两者组合，最长为10位，不能为纯数字");
			$.validator.addMethod("regNum", function(value, element, params) {
				var regNum = /^[0-9]{6,16}$/;
				return this.optional(element) || (!regNum.test(value));
			}, "不能为纯数字"); 
		}
	}
	retrievePassword.init();
})()
