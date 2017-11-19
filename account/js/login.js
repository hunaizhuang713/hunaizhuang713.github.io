jQuery.extend(jQuery.validator.messages, {
	required: "必填字段",
	remote: "请指定一个不重复的值",
	email: "请输入正确格式的电子邮件",
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
//登录页面
(function() {
	var retiviewPwd_uName = '',retiviewPwd_tPhone = '';
	 if(!isSupportPlaceholder()) {
		    // 遍历所有input对象, 除了密码框
		    $('input').not("input[type='password']").each(
		      function() {
		        var self = $(this);
		        var val = self.attr("placeholder");
		        input(self, val);
		      });
		    $('input[type="password"]').each(
		      function() {
		        var pwdField    = $(this);  
		        var pwdVal      = pwdField.attr('placeholder');  
		        var pwdId       = pwdField.attr('id');  
		        // 重命名该input的id为原id后跟1
		        pwdField.after('<input id="' + pwdId +'1" type="text" value='+pwdVal+' style="padding-left:40px;height:40px;margin-top:14px;margin-bottom:-15px;" autocomplete="new-password" class="form-control icon-log icon-psw" maxlength="16"/>');  
		        var pwdPlaceholder = $('#' + pwdId + '1');  
		        pwdPlaceholder.show();  
		        pwdField.hide();  
		          
		        pwdPlaceholder.focus(function(){  
		          pwdPlaceholder.hide();  
		          pwdField.show();  
		          pwdField.focus();  
		        });  
		          
		        pwdField.blur(function(){  
		          if(pwdField.val() == '') {  
		            pwdPlaceholder.show();  
		            pwdField.hide();  
		          }  
		        });  
		      }
		    );
			 };
			// 判断浏览器是否支持placeholder属性
			 function isSupportPlaceholder() {
			   var input = document.createElement('input');
			   return 'placeholder' in input;
			 }

			 // jQuery替换placeholder的处理
			 function input(obj, val) {
			   var $input = obj;
			   var val = val;
			   $input.attr({value:val});
			   $input.focus(function() {
			     if ($input.val() == val) {
			       $(this).attr({value:""});
			     }
			   }).blur(function() {
			     if ($input.val() == "") {
			             $(this).attr({value:val});
			     }
			   });
			 }
	var login = {
		//初始化
		init: function() {
			var self = this;
			self.bindEvent();
			common.imgCode();
			self.validate();
			var userInfo = common.getData("userInfo");
			if(userInfo) {
				$("#username").val(userInfo.un);
				$("#password").val(Base64.decode(userInfo.pd));
				$("#rememberpsw").prop("checked", true);
			}
		},
		//点击事件
		bindEvent: function() {
			//点击验证码切换
			$(".ptc").on("click", function() {
				$(".icd").attr("src","");
				common.imgCode();
			});
			$(".icd").on("click", function() {
				$(this).attr("src","");
				common.imgCode();
			});
			//用户名失去焦点
			$('.icon-account').blur(function(){	
				var _this = $(this).val();
				if(retiviewPwd_uName !=''){
					 if(retiviewPwd_uName!=_this){
						retiviewPwd_uName = _this;
					    common.imgCode();
					 }	
				}else{
					if(_this!=''){
						retiviewPwd_uName = _this;
						common.imgCode();
					}
				}
			});
			//密码失去焦点
			$('.icon-psw').blur(function(){
				var _this = $(this).val();
				if(retiviewPwd_tPhone !=''){
					 if(retiviewPwd_tPhone!=_this){
						retiviewPwd_tPhone = _this;
					    common.imgCode();
					 }	
				}else{
					if(_this!=''){
						retiviewPwd_tPhone = _this;
						common.imgCode();
					}
				}
			})
		},
		//校验
		validate: function() {
			$('#loginInfo').validate({
				debug: true,
				rules: {
					un: {
						required: true,
						regUserName: true
					},
					pd: {
						required: true,
						rangelength: [6, 16]
					},
					imgCode: {
						required: true
					}

				},
				messages: {
					un: {
						required: '请输入用户名',
						regUserName: '不存在该用户'
					},
					pd: {
						required: '请输入密码',
						rangelength: '输入密码错误'
					},
					imgCode: {
						required: '请输入图片验证码'
					}
				},
				errorPlacement: function(error, element) {
					var errorObj = error.appendTo(element.parent().children("span:last"));
					$(errorObj).css({
						'font-weight':'500',
						'display':'inline-block',
						'max-width':'none'
					});
				},
				submitHandler: function() {
					$(".loginImg").show();
					$("#login").val("正在登录...")
					var username = $("#username").val();
					var password = Base64.encode($("#password").val());
					var checkCode = $("#imgCode").val();
					var data = {
						method: "login",
						un: username,
						pd: password,
						checkCode: checkCode
					}
					login.ajax(data);
				}
			})
			$.validator.addMethod("regUserName", function(value, element, params) {
				var regPhone = /^((13[0-9])|(14[5|7])|(15[^4,\D])|(17[0-9])|(18[0-9]))\d{8}$/;
				var regUserName = /^[a-zA-Z][a-zA-Z0-9\_]{0,19}$/;
				return this.optional(element) || (regUserName.test(value) || regPhone.test(value));
			}, "用户名格式错误"); 
		},
		//交互
		ajax: function(data) {
			common.ajax("../login.hts", data, function(res) {
				if(res.resultCode == "0") {
					if($("#rememberpsw").prop("checked")) {
						common.setData("userInfo", data);
					} else {
						common.removeStorage("userInfo");
					}
					Cookies.set('tkn', res.tkn);
					Cookies.set('certState', res.certState);
					
					//判断是否有从开发者中心传值过来
					if(typeof(Cookies('newhref')) == "undefined"){
						location.href = "../frame/";
					}else{
						location.href = Cookies('newhref');
					}
				} else {
					common.imgCode();
					$(".errInfo").text(res.errInfo);
					$('#myModal').modal({});
					$("#login").val("立即登录")
				}
			})
		}
	}
	login.init();

})()
