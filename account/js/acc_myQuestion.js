/**
 * 我的提问
 */
$('.acc_for_question').click(function(){
	window.open('http://con.monyun.cn:9960/portalpage/por_faq.html?method=askQuestion');
});

var acc_qst_iPage = [1];
var rend_acc_myqst = function(){
	var data = {
		pageIndex : acc_qst_iPage[0]
	},
	successFunc = function(data){
		var pageInfo = data.pageInfo,
			dataList = data.dataList,
			html = '',
			table = $('.acc_qst_list');
		/*渲染列表*/
		$.each(dataList,function(i,d){
			var releaseTime = d.releaseTime.substr(0,16);
			var isSolve = d.recoveryTime == ''?'':'icon-qst-solved';
			var ispublic = d.isPublic =='0'?d.viewCount+'人浏览':'仅自己可见';
			var isView = d.isPublic=='0'?'':'icon-reveal-s';
			var qst = d.question.replace(/iframe|script|<|>/g,'');
			html+='<tr>'+
					'<td>'+
						'<div data-id="'+d.id+'" class=" border padding30 paddR42 pos-rel mb20 js_acc_qMark">'+
							'<span class="icon-qst-status '+isSolve+'"></span>'+
							'<div class="pnt acc_question js-acc_toQuestionDetail" style="line-height:20px;height:40px;word-break:break-all;">'+
								'<p class="pos-rel" style="word-break:break-all;">'+qst+'</p>'+
							'</div>'+
							'<p class="fs12 middle">'+
								'<span class="icon-reveal '+isView+'"></span>'+
								'<span class="mr20 color8">'+ispublic+'</span>'+
								'<span class="color8">发布时间</span>'+
								'<span class="color8">'+releaseTime+'</span>'+
							'</p>'+
						'</div>'+
					'</td>'+
				'</tr>';
		});
		table.empty().append(html);
		/*溢出省略号*/
		//<span class="js_toDetail pnt">【查看更多】</span>
		$(".acc_question").dotdotdot({
			 wrap: 'letter',
			 watch:true,
			 ellipsis	: '........................',
			 after:$('.js_toDetail'),
			 callback	: function( is, cnt ) {
				 if(is){
					 $(this).find('p').append('<span class="css-toDetail js_toDetail pnt">【查看更多】</span>');
				 }
			 }
		});
		/*渲染分页器*/
		$('.acc_qst_lTotal').text(pageInfo.totalRec);
		$('.acc_qst_lIndex').text(pageInfo.pageIndex);
		$('.acc_qst_lTotalPage').text(pageInfo.totalPage);
		$('.acc_qst_lPagesize').text(pageInfo.pageSize);
		isEmptyData(pageInfo.totalRec);
	};
	loadData("mgr_quesManage.htm","r_myQuestion_list",true,data,successFunc);
};
$(function(){
	rend_acc_myqst();
	js_page('acc_qst_l',acc_qst_iPage,rend_acc_myqst);
	/*查看详情1 查看更多*/
	/*$(document).off('click','.js_toDetail').on('click','.js_toDetail',function(){
		var id = $(this).closest('.js_acc_qMark').attr('data-id');
		window.open('../portalpage/por_faq.html?id='+id+'');
	});*/
	/*查看详情2*/
	$(document).off('click','.js-acc_toQuestionDetail').on('click','.js-acc_toQuestionDetail',function(){
		var id = $(this).closest('.js_acc_qMark').attr('data-id');
		window.open('http://con.monyun.cn:9960/portalpage/por_faq.html?id='+id);
	});
	
});








