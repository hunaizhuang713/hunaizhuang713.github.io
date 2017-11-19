$.post("../aut_getWebUrlSvt.hts",function(info){
	if(info.resultCode == '0'){
		if(info.data.substring(info.data.length-1,info.data.length) == "/"){
			var domainURL = info.data.substring(0,info.data.length-1);
		}else{
			var domainURL = info.data;
		}
		Cookies.set('domainURL', domainURL);
	}
},"json");
//跳转
$('a').click(function(){
	var href = $(this).attr('href');
	if(href == "../"){
		$(this).attr('href',Cookies('domainURL'));
	}else if(href =="../index.html"){
		$(this).attr('href',Cookies('domainURL'));
	}
});