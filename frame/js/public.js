var hrefs = "http://10.10.202.154:8088/mwytx";
(function() {
	var commonView = {
		init: function() {
			this.ajaxSetting(); //调用ajaxSettings全局设置
			this.loadingFinish(); //结束加载
			this.bindEvent();
			/*this.resize($('footer'),900);*/
		},
		//存储
		setData: function(name, obj) {
			if(typeof obj === "object") {
				obj = JSON.stringify(obj); //将Obj对象转化成STRING类型对象
			}
			localStorage.setItem(name, obj)
		},
		//获取
		getData: function(key) {
			var data;
			try {
				var obj = localStorage.getItem(key)
				data = JSON.parse(obj); //将string类型的obj对象转为JSON格式，以为localstorage只能存储字符串；
			} catch(e) {
				data = obj;
			}
			return data;
		},
		removeStorage: function(key) {
			localStorage.removeItem(key) //删除存储里的key数据
				//localStorage.clear(); //清除所有的存储
		},
		//公共调用ajax方法
		ajax: function(url, data, callback) {
			data.sessionId = common.getData("sessionId");
			$.ajax({
				url: url,
				data: data,
				type: "post",
				dataType: "json",
				success: function(res) {
					callback(res);
				},
				error: function(e) {
					$(".errInfo").text(e.errInfo+e.errCode);
					$('#myModal').modal({});
				},
				beforeSend: function() {
					$('.js-loading').show();
				},
				complete: function() {
					clearTimeout(handler);
					var handler = setTimeout(function() {
						$('.js-loading').hide();
					}, 0);
				}
			})
		},
		//获取图片验证码
		imgCode: function() {
			var url = hrefs + "/area_aut_checkCode.hts";
			$.ajax({
				url: url,
				type: "post",
				dataType: "html",
				success: function(res) {
					$('.icd').attr('src', url+"?="+Math.random());
				},
				error: function(e) {
				},
				beforeSend: function() {
					$('.js-loading').show();
				},
				complete: function() {
					clearTimeout(handler);
					var handler = setTimeout(function() {
						$('.js-loading').hide();
					}, 0);
				}
			})
		},
		//获取短信验证码
		msmCode: function() {
			if($("#mobile").val() == "") {
				$(".errInfo").text("请输入手机号码");
				$('#myModal').modal({});
				return false;
			} else {
				var mobile = $("#mobile").val();
				var data = {
					mobile: mobile
				}
				common.ajax("../aut_smsCode.hts", data, function(res) {
					if(res.resultCode == "0") {
						$(".errInfo").text("短信验证码发送成功");
						$('#myModal').modal({});
						c = setInterval(countDown, 1000)
						$(".gainMsgCode").attr("disabled", true);
					} else {
						$(".errInfo").text(res.errInfo+res.errCode);
						$('#myModal').modal({});
					}
				})
			}
			var b = 60;
			function countDown() {
				$(".gainMsgCode").css("color","grey")
				$(".gainMsgCode").val(b + 's后重新发送');
				b--;
				if(b < 0) {
					clearInterval(c);
					$(".gainMsgCode").css("color","#1599e5")
					$(".gainMsgCode").removeAttr("disabled");
					$(".gainMsgCode").val("点击重新发送");
					b = 60;
				}
			}
		},
		//开始加载
		loadingStart: function() {
			$(".js-loading").show();
		},
		//结束加载
		loadingFinish: function() {
			$(".js-loading").hide();
		},
		//ajax公共全局设置
		ajaxSetting: function() {
			//发送ajax之前操作
			$.ajaxSettings.beforeSend = function() {
					commonView.loadingStart();
				}
				//网络异常
			$.ajaxSettings.error = function() {
					commonView.loadingFinish();
				}
				//完成
			$.ajaxSettings.complete = function() {
				commonView.loadingFinish();
			}
		},
		//绑定事件
		bindEvent: function(data, callback) {
			//点击logo跳转到首页
			$("#logo").on("click", function() {
				location.href = "../index.html"
			});
			//点击回车关闭弹框
			$(document).keydown(function(event) {
				if(event.keyCode == 13)
					$(".modal-confirm").click();
			});
		},
		//错误代码转中文弹框提示
		errCode: function(arg) {
			var result = '',
				arg = $.trim(arg);
			switch(arg) {
				case "S100003":
					result = "图形验证码错误";
					break;
				case "S100029":
					result = "用户名或密码错误";
					break;
				case "S100004":
					result = "短信验证码错误";
					break;
				case "S100087":
					result = "短信验证码失效";
					break;
				case "S100090":
					result = "用户已被禁用";
					break;	
				case "S100006":
					result = "请勿重复请求短信验证码";
					break;
				case "S100095":
					result = "请勿频繁请求";
					break;	
				case "S100005":
					result = "会话失效";
					break;
				case "S100148 ":
					result = "用户所在企业已被禁用";
					break;
				default:
					result="请求失败,请判断输入信息是否有误"
			};
			$(".errInfo").text(result);
			$('#myModal').modal({});
		}
		 /*resize:function(obj,height){
			var high=obj.height();
		   $(window).resize(function() {
				if($(window).height()<height){
					obj.css({'bottom':'','top':(height-15-high)+'px'});
				    $('body').css('overflow','auto');
				    $('#content').css('height','840px');
				}else{
					obj.css({'bottom':15+'px','top':''});
					$('body').css('overflow','hidden')
					$('#content').css('height','1080px');
				}
	       });  
		}*/
	};
	commonView.init();
	window.common = commonView;
})()


  function lrFixFooter(obj,height) {
		
			var footer = $(obj),
				doc = $(document);

			function fixFooter() {
				if($(window).height()>height) {
					footer.css({
						width: "100%",
						position: "absolute",
						left: 0,
						bottom: 10,
						paddingTop:0,
						background:""
					});
					$('#content').height($(window).height()-58);
				} else {
					footer.css({
						width:"1200px",
						margin:"0px auto",
						background:"#ffffff",
						position: "static",
						paddingTop:180
					});
				}
			};
			fixFooter();
			$(window).on('resize', function() {
				fixFooter();
			});
			$(window).on('scroll', function() {
				fixFooter();
			});
		}
/*function lrFixFooter(obj,height) {
		
			var footer = $(obj),
				doc = $(document);

			function fixFooter() {
				if($(window).height()>height) {
					footer.css({
						width: "100%",
						position: "absolute",
						left: 0,
						bottom: 10
					});
					$('#content').height($(window).height()-58);
				} else {
					footer.css({
						width:"1200px",
						margin:"0px auto",
						background:"#ffffff",
						position: "static",
						paddingTop:40
					});
				}
			};
			fixFooter();
			$(window).on('resize', function() {
				fixFooter();
			});
			$(window).on('scroll', function() {
				fixFooter();
			});
		}
*/