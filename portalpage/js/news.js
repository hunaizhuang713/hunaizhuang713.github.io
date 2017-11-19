/*
* @Author: Administrator
* @Date:   2017-05-03 14:14:47
* @Last Modified time: 2017-05-27 11:45:20
*/

var pName = window.location.pathname,
    p_prefix = pName.indexOf('p_page')!=-1?'/p_page': 
               pName.indexOf('web')!=-1?'/web':
               pName.indexOf('mwytx')!=-1?'/mwytx':
               pName.indexOf('p_mgmt')!=-1?'/p_mgmt':
               ''; 

//首页获取梦网大事记列表
function Data_course() {
    var html = '';
    $.get(p_prefix + '/portalpage/js/memorabilia.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1; i > da.length-6; i--) {
            html += '<li class="engie-cont-li">' + 
                        '<a class="engie-cont-menu" cont="' + da[i].modId + '" href= "'+da[i].href+'">' + 
                            '<span class="engie-cont-img"><img src="' + da[i].img + '"/></span>' + 
                            '<div></div>' + 
                            '<div class="engie-cont-p">' + 
                                '<p class="engie-cont-pname">' + da[i].names + '</p>' + 
                                '<p class="engie-cont-ptime">' + da[i].times + '</p>' + 
                                '<p class="engie-cont-plink">了解详情</p>' + 
                            '</div>' + 
                        '</a>' + 
                    '</li>';
            $('#mw_course').empty().append(html);
        }
    }, 'json');
}
//首页云资讯
function Data_news() {
    var html = '';
    $.get(p_prefix + '/portalpage/js/cloudInformation.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1; i > da.length-6; i--) {
            html += '<li class="engie-cont-li">' + 
                        '<a class="engie-cont-menu" cont="' + da[i].modId + '" href="'+ da[i].href + '" >' + 
                            '<span class="engie-cont-img"><img src="' + da[i].img + '"/></span>' + 
                            '<div></div>' + 
                            '<div class="engie-cont-p">' + 
                                '<p class="engie-cont-pname">' + da[i].names + '</p>' + 
                                '<p class="engie-cont-ptime">' + da[i].times + '</p>' + 
                                '<p class="engie-cont-plink">了解详情</p>' + 
                            '</div>' + 
                        '</a>' + 
                    '</li>';
            $('#mw_news').empty().append(html);
        }
    }, 'json');
}


//梦网大事记列表（单独页面）
function News_data(pagesize,pageno) {
    var html = '';
    $.get(p_prefix + '/portalpage/js/memorabilia.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1-((pageno-1)*pagesize); i >= da.length-(pageno*pagesize) &&i>=0; i--) {
                html += '<li a-id="' + da[i].modId + '">' +
                            '<span class="list_pic"><img src="' + da[i].img + '" alt=""></span>' +
                            '<div class="list_sun_ri">' +
                                '<h3>' + da[i].names + '<span>' + da[i].times + '</span></h3>' +
                                '<p>' + da[i].titles + '</p>' +
                            '</div>' +
                            '<div class="clear"></div>' +
                            '<span class="ind_list_url"><a href="'+ da[i].href + '" title="">查看全文>></a></span>'+
                        '</li>';
                $('#mw_course_list').empty().append(html);
        }
    }, 'json');
}

//梦网云资讯列表
function Adata(pagesize,pageno) {
    var html = '';
    
    $.get(p_prefix + '/portalpage/js/cloudInformation.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1-((pageno-1)*pagesize); i >= da.length-(pageno*pagesize) &&i>=0; i--) {
              html += '<li a-id="' + da[i].modId + '">' +
                        '<span class="list_pic"><img src="' + da[i].img + '" alt=""></span>' +
                        '<div class="list_sun_ri">' +
                            '<h3>' + da[i].names + '<span>' + da[i].times + '</span></h3>' +
                            '<p>' + da[i].titles + '</p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '<span class="ind_list_url"><a href="'+da[i].href+'" title="">查看全文>></a></span>'+
                    '</li>';
            $('#information_cont').empty().append(html);
        }
    }, 'json');
}
//云资讯详情页
function Icontent(cid) {
//  var cid = Cookies('articleId');
    var html = '';
    $.get(p_prefix + '/portalpage/js/cloudInformation.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1; i > -1; i--) {
            /*if (da[i].modId == cid) {
                html = '<h3 class="Nspeak_name">' + da[i].names + '</h1>' + 
                       '<p class="Nspeak_time">发布时间：' + da[i].times + '</p>' + 
                       '<div class="Nspeak_content">' + da[i].Ctitle + '</div>';
                $('.news_speak').empty().append(html);
            }*/
			
			if (da[i].modId == (cid)) {
				//下一篇
				if(i - 1 >= 0){
					 $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"'href='"+da[i-1].href+"'>"+ da[i-1].names +"</a>");	
				}else{
                 $('.down_strip').html("没有了")
            	}
				//上一篇
				if (i + 1< da.length){
					$('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"'href='"+da[i+1].href+"'>"+ da[i+1].names +"</a>");
				}else{
                	$('.up_strip').html("没有了")
            	}
	        }
			
			/*//下一篇
            if ((Number(cid) - 1) > 0){
                if (da[i].modId == (cid-1)) {
                    $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"'href='"+da[i].href+"'>"+ da[i].names +"</a>")
                }
            }else{
                 $('.down_strip').html("没有了")
            }

            //上一篇
            if (i + 1<= da.length-1){
                if(da[i].modId == (Number(cid) + 1)){
                    $('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"'href='"+da[i+1].href+"'>"+ da[i+1].names +"</a>")
                }
            }else{
                $('.up_strip').html("没有了")
            }*/ 
        }

    }, 'json');
}
//新闻详情页
function Ccontent(cid) {
//  var cid = Cookies('articleId');
    var html = '';
    $.get(p_prefix + '/portalpage/js/memorabilia.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1; i > -1; i--) {
            /*if (da[i].modId == cid) {
                var time = da[i].times.substring(0, 4);
                html = '<h3 class="Nspeak_name">' + da[i].names + '</h1>' + 
                       '<p class="Nspeak_time">发布时间：' + da[i].times + '</p>' + 
                       '<div class="Nspeak_content">' + da[i].Ctitle + '</div>';
                $('.news_speak').empty().append(html);
                $('.back_newsmenu').attr('data-time', time);
            }*/
			if (da[i].modId == (cid)) {
				//下一篇
				if(i - 1 >= 0){
					 $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"'href='"+da[i-1].href+"'>"+ da[i-1].names +"</a>");	
				}else{
                 $('.down_strip').html("没有了")
            	}
				//上一篇
				if (i + 1< da.length){
					$('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"'href='"+da[i+1].href+"'>"+ da[i+1].names +"</a>");
				}else{
                	$('.up_strip').html("没有了")
            	}
	        }
            /*//下一篇
            if ((Number(cid) - 1) > 0){
                if (da[i].modId == (cid-1)) {
                    $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"'href='"+da[i].href+"'>"+ da[i].names +"</a>")
                }
            }else{
                 $('.down_strip').html("没有了")
            }

            //上一篇
            if ((Number(cid) + 1) <= da.length){
                if(da[i].modId == (Number(cid) + 1)){
                    $('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"'href='"+da[i].href+"'>"+ da[i].names +"</a>")
                }
            }else{
                $('.up_strip').html("没有了")
            }*/
        }

    }, 'json');
}

//行业动态列表
function Industry_data(pagesize,pageno) {
    var html = '';
    $.getJSON(p_prefix + '/portalpage/js/industryTrends.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1-((pageno-1)*pagesize); i >= da.length-(pageno*pagesize) &&i>=0; i--) {
            html += '<li a-id="' + da[i].modId + '">' +
                        '<span class="list_pic"><img src="' + da[i].img + '" alt=""></span>' +
                        '<div class="list_sun_ri">' +
                            '<h3>' + da[i].names + '<span>' + da[i].times + '</span></h3>' +
                            '<p>' + da[i].titles + '</p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '<span class="ind_list_url"><a href="'+da[i].href+'" title="">查看全文>></a></span>'+
                    '</li>';
            $('#mw_course_ind').empty().append(html);
        }
    });
}
//行业动态详情
function Industry(cid) {
//  var cid = Cookies('articleId');
    var html = '';
    $.get(p_prefix + '/portalpage/js/industryTrends.json', function(data) {
        var da = data.dataList;
        for (var i = da.length-1; i > -1; i--) {
            /*if (da[i].modId == cid) {
                html = '<h3 class="Nspeak_name">' + da[i].names + '</h1>' + 
                       '<p class="Nspeak_time">发布时间：' + da[i].times + '</p>' + 
                       '<div class="Nspeak_content">' + da[i].Ctitle + '</div>';
                $('.news_speak').empty().append(html);
            }*/

            /*//下一篇
            if ((Number(cid) - 1) > 0){
                if (da[i].modId == (cid-1)) {
                    $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"' href='"+da[i-1].href+"'>"+ da[i-1].names +"</a>")
                }
            }else{
                 $('.down_strip').html("没有了")
            }

            //上一篇
            if ((Number(cid) + 1) <= da.length){
                if(da[i].modId == (Number(cid) + 1)){
                    $('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"' href='"+da[i+1].href+"'>"+ da[i+1].names +"</a>")
                }
            }else{
                $('.up_strip').html("没有了")
            }*/
           if (da[i].modId == (cid)) {
				//下一篇
				if(i - 1 >= 0){
					 $('.down_strip').html("<a a_id='"+ (Number(cid) - 1) +"'href='"+da[i-1].href+"'>"+ da[i-1].names +"</a>");	
				}else{
                 $('.down_strip').html("没有了")
            	}
				//上一篇
				if (i + 1< da.length){
					$('.up_strip').html("<a a_id='"+ (Number(cid) + 1) +"'href='"+da[i+1].href+"'>"+ da[i+1].names +"</a>");
				}else{
                	$('.up_strip').html("没有了")
            	}
	        }
        }

    }, 'json');
}

//获取地址栏参数
function GetRequest() {
    var url = location.search;
    //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//首页大事记查看更多
$('#course_more').click(function(){
    var articleId = $(this).parent().parent().attr('a-id');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/news.html";
})
//大事记列表跳转文章
$('#mw_course_list').on('click', '.ind_list_url a', function() {
    var articleId = $(this).parent().parent().attr('a-id');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/news_speak.html";
});

//首页大事记跳转文章
$('#mw_course').on('click', '.engie-cont-plink', function() {
    var articleId = $(this).parent().parent().attr('cont');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/news_speak.html";
});


//云资讯详情页
$('#mw_news').on('click', '.engie-cont-li', function() {
    var articleId = $(this).children('a').attr('cont');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/information_speak.html";
});

//梦网云资讯单独页面文章跳转
$('#information_cont').on('click', '.ind_list_url a', function() {
    var articleId = $(this).parent().parent().attr('a-id');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/information_speak.html"
});


//行业动态列表跳转文章
$('#mw_course_ind').on('click', '.ind_list_url a', function() {
    var articleId = $(this).parent().parent().attr('a-id');
    Cookies.set('articleId', articleId);
    window.location.href = p_prefix + "/portalpage/industry_speak.html";
});
