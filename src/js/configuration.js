//配置网址
var domainURL = "http://con.monyun.cn:9960";    /*不能写成 "www.monyun.cn" 或者" http://www.monyun.cn/" */
/*检查代码中的阿里云链接，本地环境进行替换，枚举开发环境http://localhost*/
$(function(){
	if(location.host=='localhost:8000'||location.host=='192.169.1.40:8080'){
		console.log("1")
		var js_check_link = function(){
			$('img').each(function(i,d){
				if(d.src.indexOf('monyun-cn-file')){
					var reg = new RegExp("http://monyun-cn-file.oss-cn-shanghai.aliyuncs.com/pic/mwytx_web");
					d.src = d.src.replace(reg,'./');
				}else{}
			});
			$('i,a,span,div,em,li,nav').each(function(i,d){
				var bi = $(d).css('background-image');
				if(bi && bi.indexOf('monyun-cn-file')){
					var reg = new RegExp("http://monyun-cn-file.oss-cn-shanghai.aliyuncs.com/pic/mwytx_web");
					d.style.backgroundImage = bi.replace(reg,'./');
				}else{}
			});
		}();
	}else{
		console.log("no"+location.host)
	}
});