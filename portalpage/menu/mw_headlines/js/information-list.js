/**
 * Created by Administrator on 2017/11/14.
 */
//��������

loadNew('memorabilia.json')
function loadNew(fileName){
    var pName = window.location.pathname,
        p_prefix = pName.indexOf('p_page')!=-1?'/p_page':
            pName.indexOf('web')!=-1?'/web':
                pName.indexOf('app')!=-1?'/app':
                    pName.indexOf('mwytx_wap')!=-1?'/mwytx_wap':
                        '';
    $(function(){
        $.ajax({
            type: "GET",
            url: p_prefix + '/js/' + fileName,
            dataType: "json",
            success: function(result){
                addBox(result);

            }
        });
    });

    function addBox(result){
        var newResult=result.dataList.reverse();//��ת���飬�����ʼȡ
        var newResultFive= newResult.splice(0,5)  //��ȡ5��
        $.each(newResultFive,function(index,obj){
            var names=obj.names;
            var imges=obj.img;
            var times =obj.times;

            $(".information-list-container .mw-list ul").append('<li><div class="left"><img src="'+imges+'" alt=""/></div><div class="right"><p>'+names+'</p><p>'+times+'</p></div></li>');
        });
    }
}