//var head = document.getElementsByTagName('head')[0],
//	link = document.createElement('link');
//link.href = './css/index.css?=' + Math.random();
//link.rel = 'stylesheet';
//link.type = 'text/css';
//head.appendChild(link);


//倒计时按钮
//var head = document.getElementsByTagName('head')[0],
//	link = document.createElement('link');
//link.href = './css/index.css?=' + Math.random();
//link.rel = 'stylesheet';
//link.type = 'text/css';
//head.appendChild(link);


//倒计时按钮
var countdown = 60;
var countDownID;
var emailTitle = "";
//获取基础信息
$(document).ready(function() {
	var port = "acc_accInfo.htm";
	successFunc = function(data) {
		if(data.resultCode == "0") {
			if(data.dataList.length > 0) {
				var dataListDetail = data.dataList[0];
				refreshData(dataListDetail);
			} else {

			}
		} else {
			warning.say(data.errInfo+data.errCode);;
		}
	};
	loadData(port, "r_accInfo", true, {}, successFunc);
	successFunc = function(data) {
		var urlRest = data.dataList;
		var urlObj = urlRest[0];
		if(data.resultCode == "0") {
			if(urlObj.devCertify=="1") {
				$(".sureId").html("个人认证");
				$(".quickSure").addClass("none");
				$(".sureId").addClass("already");
			}else if(urlObj.devCertify=="2"){
				$(".sureId").html("企业认证");
				$(".quickSure").addClass("none");
				$(".sureId").addClass("already");
			}else{
				$(".sureId").html("未认证");
				$(".quickSure").removeClass("none");
				$(".sureId").removeClass("already");
			}
			var html = '';
			var num = 0;
			var urlArr = urlObj.restUrlList;
			var chang = urlArr.length;
			var more = '';
			if (urlArr == null || urlArr == "") {
				$('.urlList').empty();
				var html = '';
				html += '<li>' + 
					'<h2 style="text-align:center;font-size:14px;line-height:30px;">没有URL<h2>' +
					'</li>'
				$('.urlList').append(html);
				$('.moreData').css('display','none');
			} else {
				$('.urlList').empty();
				if (chang>5) {
//					$('.moreData').css('display','inline-block');
					chang = 5;
					for (var i=0; i < chang; i++) {
						num ++;
						html += '<li>'+'<span class="urlNum">Rest URL' + num + ':</span>'+'<span class="urlAddress">' + urlArr[i].url + '</span>'+'<span class="adressName">' + urlArr[i].nodeName + '</span>'+'</li>'
					}
					$('.urlList').append(html);
					more = '<p style="text-align:right;line-height:"><a class="moreData">更多</a></p>';
					$('.urlList').append(more);
				}else {
					for (var i=0; i < chang; i++) {
						num ++;
						html += '<li>'+'<span class="urlNum">Rest URL' + num + ':</span>'+'<span class="urlAddress">' + urlArr[i].url + '</span>'+'<span class="adressName">' + urlArr[i].nodeName + '</span>'+'</li>'
					};
					$('.urlList').append(html);
//					$('.moreData').css('display','none');
				}
			}
			if (urlObj.corpName == '') {
				$('.company').text('--');
			}
			if (urlObj.email == '') {
				$('.iemail').text('--');
			}
			if (urlObj.mobile == '') {
				$('.imobile').text('--');
			}
			$('.company').text(urlObj.corpName);
			$('.iemail').text(urlObj.email);
			$('.imobile').text(urlObj.mobile);
			$(document).off('click','.moreData').on('click','.moreData',function(){
				$('#urlRest').modal('show');
				successFunc = function(data) {
					var urlRest = data.dataList;
					var urlObj = urlRest[0];
					var urlArr = urlObj.restUrlList;
					if(data.resultCode == "0") {
						$('.motai').empty()
						var urlRest = data.restUrlList;
						var html = '';
						var num = 0;
						for (var i=0; i < urlArr.length; i++) {
							num ++;
							html += '<li>'+'<span class="urlNum">Rest URL' + num + ':</span>'+'<span class="urlAddress">' + urlArr[i].url + '</span>'+'<span class="adressName">' + urlArr[i].nodeName + '</span>'+'</li>'
						}
						$('.motai').append(html);
					}
				};
				loadData("acc_accInfo.htm", "r_accInfo", true, {}, successFunc);
			});
		}
	};
	loadData("acc_accInfo.htm", "r_accInfo", true, {}, successFunc);
	$(".quickSure").on("click", function() {
		jumpBetween('security','sec_cert');
	});
});

//手机限制为数字输入
var input1 = $('.phoneInput1');
var input2 = $('.phoneInput2');
var input3 = $('.phoneInput3');
phoneNum(input1);
phoneNum(input2);
phoneNum(input3);
//刷新UI页面
function refreshData(data) {
	var strTrueName = data.userName;
	var strDevCertify = data.devCertify;
	var strMobile = data.mobile;
	var strEmail = data.email;
	var strPwd = data.pwd;
	var strProvice = data.accAddress.addrProvince;
	var strCity = data.accAddress.addrCity;
	var strDistrict = data.accAddress.addrDistrict;
	var strTown = data.accAddress.addrTown;
	var strDes = data.accAddress.addrDes;
	var phoneList = data.contactsList;
	var strResUrl = data.restUrl;
	
	var strEmailChange = "";
	

	
	$(".login-name").text(strTrueName);
	
	if(data.devCertify == "2"){
		$(".approveType").text("企业认证");
		$(".must-Approve").hide();
	}
	else if(data.devCertify == "1") {

		$(".approveType").text("个人认证");
		$(".must-Approve").hide();

	} else {
		$(".approveType").text("未认证");
		$(".must-Approve").show();
	}
	
	if(strEmail.length > 0) {
		$('.update-email').text("更换邮箱");
		emailTitle = "更换邮箱";
	} else {
		$('.update-email').text("绑定邮箱");
		emailTitle = "绑定邮箱";
	}

	$(".login-Phone").text(strMobile); 
	$(".approve-email").text(strEmail);
	$(".rest-URL").text(strResUrl);
	
	$("#distpicker3").distpicker({
   		 province: strProvice,
			city: strCity,
   		 district: strDistrict
	});

	//省 
	var addrTown = "";
	//详细地址
	var addrDes = $('.addrDetail').val(strDes);

	for(var i = 0; i < phoneList.length; i++) {
		var type = phoneList[i].ctctSerial; //1：联系人1；2：联系人2；3：联系人3；
		var check = phoneList[i].ctctType; //0:手机号码 ；1：固定号码
		if(type == "1") {
			if(check == "0") {
				// 号码1
				$('.phoneOne1').attr('checked', true);
				$('.phoneOne2').attr('checked', false);
				$('.phoneInput1').val(phoneList[i].ctctPhone);

			} else {
				$('.phoneOne1').attr('checked', false);
				$('.phoneOne2').attr('checked', true);
				$('.phoneInput1').val(phoneList[i].ctctTel);
			}
		} else if(type == "2") {
			if(check == "0") {
				// 号码1
				$('.phoneTwo1').attr('checked', true);
				$('.phoneTwo2').attr('checked', false);
				$('.phoneInput2').val(phoneList[i].ctctPhone);

			} else {

				$('.phoneTwo1').attr('checked', false);
				$('.phoneTwo2').attr('checked', true);
				$('.phoneInput2').val(phoneList[i].ctctTel);
			}

		} else if(type == "3") {
			if(check == "0") {
				// 号码1

				$('.phoneThree1').attr('checked', true);
				$('.phoneThree2').attr('checked', false);
				$('.phoneInput3').val(phoneList[i].ctctPhone);
			} else {
				$('.phoneThree1').attr('checked', false);
				$('.phoneThree2').attr('checked', true);
				$('.phoneInput3').val(phoneList[i].ctctTel);
			}
		}
	}
}

//*******修改密码网络请求*******
/*
 * data : 所传的参数；
 */
function requestData(data, type) {
	var mothed = "";
	var port = "";
	if(type == "2") {
		//修改密码
		port = "acc_accInfo.htm";
		mothed = "u_accPwd";
	} else if(type == "3") {
		//更换邮箱
		port = "acc_accInfo.htm";
		mothed = "u_accEmail";
	} else if(type == "4") {
		//修改手机号码
		port = "acc_accInfo.htm";
		mothed = "u_accGetCode";
	} else if(type == "5") {
		//获取短信验证码
		port = "acc_accInfo.htm";
		mothed = "u_accSendSMS";
	} else if(type == "6") {
		port = "acc_accInfo.htm";
		mothed = "u_accInfo";
	} else {
		return;
	}

	successFunc = function(data) {
	
		if(data.resultCode == "0") {
			didLoadRespond(data, type);
		}else {
			warning.say(data.errInfo+data.errCode);
		}
		
	};
	loadData(port, mothed, true, data, successFunc);
}
// 判断输入是否数字
var phone = $('#modalEnterPhone');
numberCheck(phone);
var code = $('#modalEnterCode');
numberCheck(code);
//其它网络请求数据解析处理
function didLoadRespond(data, type) {

	if(type == "2") {
		//修改密码					
		$(".changePwdShow").hide();
		$(".loginPwdShow").show();
		$("#OldPassword").val("");
		$("#newPwd").val("");
		$("#againPwd").val("");
		$(".pwdHide").text("");
		warning.say("密码修改成功!");
	} else if(type == "3") {

		//更换邮箱
		$('.modal-Email').hide();
		$("#newEmail .emailDetail").text(strEmailChange);

		$("#newEmail .emailDetail2").text(emailTitle);
		strEmailChange = "";
		$(".modal-EmaiSuccess").show();
	} else if(type == "4") {
	
		//修改手机号码
		$(".login-Phone").text($("#modalEnterPhone").val());
		$("#modal-Phone").modal('hide');
		$("#modalEnterPhone").val("");
		$("#modalEnterCode").val("");
		$(".textShow").text("");
		clearSettime(countDownID);
	} else if(type == "5") {
		//获取短信验证码
		
		settime();
	} else if(type == "6") {

		warning.say("保存成功!");
		window.location.reload();
	}
}

function settime() {
	if(countdown == 0) {
		$(".modalGetCode").removeAttr("disabled");
		$(".modalGetCode").text("获取短信验证码");
		countdown = 60;
		return;
	} else {
		$(".modalGetCode").attr({
			"disabled": "disabled"
		});
		$(".modalGetCode").text("重新发送(" + countdown + ")");
		countdown--;

	}
	countDownID = setTimeout(function() {
		settime()
	}, 1000)
}

function clearSettime(settimeID) {
	clearTimeout(settimeID);
	$(".modalGetCode").text("获取短信验证码");
	$(".modalGetCode").removeAttr("disabled");
	countdown = 60;
	return;
}

//clickEvent:点击事件处理
//更换手机号码-->逻辑
$(".update-phone").on("click", function() {
	$("#modal-Phone").modal('show');
//	$('.modal-content').show();
//	$(".modal-EmaiSuccess").hide();
});

//获取手机短信验证码
$(".modalGetCode").on("click", function() {
	var newPhone = $("#modalEnterPhone").val();
	if (newPhone != $('.imobile').text()) {
		if(newPhone == "") {
			warning.say("请输入手机号码!");
		} else if(isPhone(newPhone) == false) {
	
			warning.say("请输入正确手机号码!");
		} else {
	
			var data = {
				"mobile": newPhone
			}
			requestData(data, "5");
	
		}
	} else {
		var data = {
				"mobile": newPhone
			}
		successFunc = function (data) {
			if(data.resultCode != "0") {
				warning.say(data.errInfo+data.errCode);
			}
		};
		loadData('aut_checkOnlySvt.hts', 'checkMobile', true, data, successFunc);
		warning.say('请填写新号码');
	}
});

function isPhone(phoneNumber) {
	var strPhone = /^1[34578]\d{9}$/;
	if(strPhone.test(phoneNumber)) {
		return true;
	} else {
		return false;
	}
}

function isHomeNumber1(homeNumber) {
	var strPhone = /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;	
//	var strPhone = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;

	if(strPhone.test(homeNumber)) {
		return true;
	} else {
		return false;
	}
}
//修改手机号码取消
$(".modalPhoneCancle").on("click", function() {
	clearPhone();
});

$("#modal-Phone").on("click", ".close", function() {
	clearPhone();
});

function clearPhone() {
	$("#modal-Phone").modal('hide');
	$("#modalEnterPhone").val("");
	$("#modalEnterCode").val("");
	$(".textShow").text("");
	clearSettime(countDownID);
}

//立即认证-->逻辑
$(".must-Approve").on("click", function() {

	$('.security').trigger('click');
				$(document).one('ajaxComplete', function() {
				$('.listItem.sec_cert').trigger('click');
			});

});

//更换邮箱-->逻辑
$(".update-email").on("click", function() {

	var strEmail = $(".iemail").text();

	if(strEmail == "") {
		$('.emailNameType').text("绑定邮箱");

	} else {
		$('.emailNameType').text("更换邮箱");
	
	}

	$('#modal-change-Email').modal('show');
	$('.modal-Email').show();
	$(".modal-EmaiSuccess").hide();
});
//$(".modal-EmailSend").on('click',function () {
//	if ($('.iemail').val() == $('#modalEnterEmail').val()) {
//		warning.say('请重新输入邮箱账号');
//	}
//});
$("#modalEnterEmail").on('blur',function () {
	if ($('#modalEnterEmail').val() != '') {
		if ($('.iemail').val() == $('#modalEnterEmail').val()) {
			warning.say('邮箱账号不能与原邮箱相同');
		}
	}
});
$("#modal-change-Email").on("click", ".close", function() {
	clearEmail();
});

function clearEmail() {
	$("#modalEnterEmail").val("");
	$(".emailHide").text("");
};

// 检查邮件
$(".modal-EmailCheck").on("click", function() {
	var strEmail = $(".modal-EnterEmail").val();
	$(".approve-email").text(strEmail);
	$(".modal-EnterEmail").val("");
	$("#modal-change-Email").modal('hide');
	$('.acc_accInfo').trigger('click');
});

//修改密码-->逻辑
$(".pwd-Change").on("click", function() {
	$(".changePwdShow").show();
	$(".loginPwdShow").hide();
});

//修改密码保存
function changePwd() {
	var oldPwd = $("#OldPassword").val();
	var newPwd = $("#newPwd").val();
	var againPwd = $("#againPwd").val();
	var data = {
		"prePassword": oldPwd,
		"curPassword": newPwd,
		"conPassword": againPwd
	}
	requestData(data, "2");
}
//修改密码取消
$(".pwdCancle").on("click", function() {
	$(".changePwdShow").hide();
	$(".loginPwdShow").show();
	$("#OldPassword").val("");
	$("#newPwd").val("");
	$("#againPwd").val("");
	$(".pwdHide").text("");
});

//紧急联系人处理-->逻辑
//紧急联系人保存
$(".last-Save").unbind("click").on("click", function() {
	//省 
	var addrProvince = $("#distpicker3 .sel1").val();
	//市
	var addrCity = $('#distpicker3 .sel2').val();
	//区、县
	var addrDistrict = $('#distpicker3 .sel3').val();
	//乡、镇
	var addrTown = "";
	//详细地址
	var addrDes = $('.addrDetail').val();
	// 号码类型1 

	var ctctType1 = $('input[name="phoneOne"]:checked').val();
	// 号码1
	var ctctPhone1 = $('.phoneInput1').val();
	// 号码类型2
	var ctctType2 = $('input[name="phoneTwo"]:checked').val();
	// 号码2 
	var ctctPhone2 = $('.phoneInput2').val();
	// 号码类型3
	var ctctType3 = $('input[name="phoneThree"]:checked').val();
	// 号码3
	var ctctPhone3 = $('.phoneInput3').val();
	
	 var longinPhone = $('.login-Phone').text();


	$('.phoneOneShow').text("");
	$('.phoneTwoShow').text("");
	$('.phoneThreeShow').text("");
	
	

	if(ctctPhone1.length > 0) {

		if(ctctType1 == "0") {
			if(isPhone(ctctPhone1) == false) {
				$('.phoneOneShow').text("请输入正确手机号码!");
				return;
			}
			if (ctctPhone1 == $(".login-Phone").text()) {
				$('.phoneOneShow').text("紧急手机号码与认证手机号码相同，请重新输入!");
				return;
			}

		} else {
			if(isHomeNumber1(ctctPhone1) == false) {
				$('.phoneOneShow').text("请输入正确电话号码!");
				return;
			}
		}
		if (ctctPhone1==ctctPhone3||ctctPhone1==ctctPhone2) {
			$('.phoneOneShow').text("紧急联系方式存在相同，请重新输入!");
			return;
		}
	}
	if(ctctPhone2.length > 0) {
		if(ctctType2 == "0") {
			if(isPhone(ctctPhone2) == false) {
				$('.phoneTwoShow').text("请输入正确手机号码!");
				return;
			}
			
			if (ctctPhone2 == $(".login-Phone").text()) {
				$('.phoneTwoShow').text("紧急手机号码与认证手机号码相同，请重新输入!");
				return;
			}
			
		} else {
			if(isHomeNumber1(ctctPhone2) == false) {
				$('.phoneTwoShow').text("请输入正确电话号码!");
				return;
			}
		}
		if (ctctPhone2==ctctPhone3||ctctPhone2==ctctPhone1) {
			$('.phoneTwoShow').text("紧急联系方式存在相同，请重新输入!");
			return;
		}
	}

	if(ctctPhone3.length > 0) {
		if(ctctType3 == "0") {
			if(isPhone(ctctPhone3) == false) {
				$('.phoneThreeShow').text("请输入正确手机号码!");
				return;
			}
			
			if (ctctPhone3 == $(".login-Phone").text()) {
				$('.phoneThreeShow').text("紧急手机号码与认证手机号码相同，请重新输入!");
				return;
			}

		} else {
			if(isHomeNumber1(ctctPhone3) == false) {
				$('.phoneThreeShow').text("请输入正确电话号码!");
				return;
			}
		}
		if (ctctPhone3==ctctPhone2||ctctPhone3==ctctPhone1) {
			$('.phoneThreeShow').text("紧急联系方式存在相同，请重新输入!");
			return;
		}
	}	
	
	if(addrDes.length >64){
		warning.say("详细地址过长，请重新填写!");
		return;
	}

	var data = {
		"addrProvince": addrProvince,
		"addrCity": addrCity,
		"addrDistrict": addrDistrict,
		"addrTown": addrTown,
		"addrDes": addrDes,
		"ctctType1": ctctType1,
		"ctctPhone1": ctctPhone1,
		"ctctType2": ctctType2,
		"ctctPhone2": ctctPhone2,
		"ctctType3": ctctType3,
		"ctctPhone3": ctctPhone3
	}

	requestData(data, '6');

	$('.phoneOneShow').text("");
	$('.phoneTwoShow').text("");
	$('.phoneThreeShow').text("");
});

//紧急联系人取消
//$(".last-Cancle").on("click", function() {
//	$('.acc_accInfo').trigger('click');
//});
//$(".last-Cancle").on("click", function() {
//	$('.account-section').hide();
//	warning.say('a');
//	$('#container').show();
//});

$().ready(function() {
	// 在键盘按下并释放及提交后验证提交表单
	$("#changePwdForm").validate({
		rules: {
			OldPassword: {
				required: true
			},
			newPwd: {
				required: true,
				rangelength: [6, 16],
				regPasword: true
			},
			againPwd: {
				required: true,
				rangelength: [6, 16],
				regPasword: true,
				equalTo: "#newPwd"
			}
		},
		messages: {
			OldPassword: {
				required: "请输入原密码!"
			},
			newPwd: {
				required: "请输入新密码!",
				rangelength: "密码格式为的6-16位非纯数字，请重新输入!",
				regPasword: "密码格式为的6-16位非纯数字，请重新输入!"
			},
			againPwd: {
				required: "请输入确认密码!",
				rangelength: "密码格式为的6-16位非纯数字，请重新输入!",
				regPasword: "密码格式为的6-16位非纯数字，请重新输入!",
				equalTo: "新密码与确认密码输入不一致!"
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().children("span:last"));
		},
		submitHandler: function() {
			changePwd();
		},

	});

	$("#newPhone").validate({
		rules: {
			modalEnterPhone: {
				required: true,
				regPhone: true
			},
			modalEnterCode: {
				required: true,
				regCode: true
			},
		},
		messages: {
			modalEnterPhone: {
				required: "请输入手机号码!",
				regPhone: "请输入正确手机号码!"
			},
			modalEnterCode: {
				required: "请输入验证码!",
				regCode: "验证码格式不正确!"
			},
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().children("span:last"));
		},
		submitHandler: function() {
			var data = {
				"mobile": $("#modalEnterPhone").val(),
				"smsCheckCode": $("#modalEnterCode").val()
			}
			requestData(data, "4");
		},
	});

	$("#newEmail").validate({
		rules: {
			modalEnterEmail: {
				required: true,
				regEmail: true
			},
		},
		messages: {
			modalEnterEmail: {
				required: "请输入邮箱地址!",
				regEmail: "请输入正确的邮箱地址!"
			},
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().children("span:last"));
		},
		submitHandler: function() {
			var data = {
				"email": $("#modalEnterEmail").val(),
			}
			
			strEmailChange =  $("#modalEnterEmail").val();
			requestData(data, "3");
		},
	});

	$.validator.addMethod("regPasword", function(value, element, params) {
//		var regPasword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
		var regPasword = /^[0-9]{6,16}$/;
		return this.optional(element) || !(regPasword.test(value));
	}, "密码格式为的6-16位非纯数字，请重新输入!");

	$.validator.addMethod("regPhone", function(value, element, params) {
		var regPhone = /^1[34578]\d{9}$/;
		return this.optional(element) || (regPhone.test(value));
	}, "请输入正确手机号码!");

	$.validator.addMethod("regCode", function(value, element, params) {
		var regCode = /^[0-9]{6}$/;
		return this.optional(element) || (regCode.test(value));
	}, "验证码格式不正确!");

	$.validator.addMethod("regEmail", function(value, element, params) {
		var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return this.optional(element) || (regEmail.test(value));
	}, "请输入正确的邮箱地址!");

});

GetLength = function(str) {
	var realLength = 0;
	for(var i = 0; i < str.length; i++) {
		charCode = str.charCodeAt(i);
		if(charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
}