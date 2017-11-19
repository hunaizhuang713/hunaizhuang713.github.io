/**
 * 我的足迹
 */
var accTra_path = 'acc_browseHis.htm',
	broList_method ='r_browseHis_list',
	acc_his_tIndex = [1],
	baseInfo_method = 'r_browseHis_user';
	
/*获取我的足迹基础信息*/
var initMyTract = function(){
	var successFunc = function(data){
		if(data.resultCode=='0'){
			var roleNameList = data.data.roleNameList,
				userNameList = data.data.userNameList,
				html1 = '',
				html2 = '';
			/*填充操作用户*/
			$.each(userNameList,function(i,d){
				html1 += '<option>'+userNameList[i]+'</option>';
				$('#userName').find('option:not(:first-child)').remove();
				$('#userName').append(html1);
			});
			/*填充操作角色*/
			$.each(roleNameList,function(i,d){
				html2 += '<option>'+roleNameList[i]+'</option>';
				$('#roleName').find('option:not(:first-child)').remove();
				$('#roleName').append(html2);
			});
		}else{
			warning.say(data.errInfo);
		}
	};
	loadData(accTra_path, baseInfo_method,true,{}, successFunc);
}();

$(document).ready(function(){
    /*渲染  我的足迹列表*/
	var rend_accMytra = function(){
		var userName = ($('#userName option:selected').val()=='操作用户选择') ? '':$('#userName option:selected').val(),
			roleName = ($('#roleName option:selected').val()=='操作角色选择') ? '':$('#roleName option:selected').val(),
			opContent =$('.acc_tra_opCnt').val(),
			successFunc = function(data){
				if(data.resultCode=='0'){
					var html = '',
						dataList = data.dataList,
						cnt= $('.acc_tra_listTable'),
						pageInfo = data.pageInfo;
					/*渲染列表*/
					$.each(dataList,function(i,d){
						html+='<tr>'+
							'<td></td>'+
							'<td>'+dataList[i].createTime+'</td>'+
							'<td>'+dataList[i].userName+'</td>'+
							'<td>'+dataList[i].roleName+'</td>'+
							'<td>'+dataList[i].opMenu+'</td>'+
							'<td><xmp style="font-family:Microsoft Yahei;">'+dataList[i].opContent+'</xmp></td>'+
						'</tr>';
					});
					cnt.find('tr:not(:first-child)').remove();
					cnt.append(html);
					/*渲染分页器*/
					$('.acc_his_tTotal').text(pageInfo.totalRec);
					$('.acc_his_tIndex').text(pageInfo.pageIndex);
					$('.acc_his_tTotalPage').text(pageInfo.totalPage);
				}else{
					warning.say("请求列表数据失败！");
				}
			};
		
		loadData(accTra_path, broList_method,true,{userName:userName,roleName:roleName,opContent:opContent,pageIndex:acc_his_tIndex[0]}, successFunc);
	};
	
	/*默认加载一次数据*/
	var initPage = function(){
		rend_accMytra();
	}();
    /*绑定分页器的点击事件 pre_cName,global_index,rend_func*/
	js_page('acc_his_t',acc_his_tIndex,rend_accMytra);
	/*点击查询*/
	$('.acc_tra_sBtn').click(function(){
		acc_his_tIndex[0]=1;
		rend_accMytra();
	});
});

	


