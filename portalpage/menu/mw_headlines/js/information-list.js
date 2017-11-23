/**
 * Created by Administrator on 2017/11/14.
 */
//加载新闻

loadNew('memorabilia.json')
function loadNew(fileName){
    var   p_prefix =getPrefix();
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
        var newResult=result.dataList.reverse();//翻转数组，从最后开始取
        var newResultFive= newResult.splice(0,5)  //截取5个
        $.each(newResultFive,function(index,obj){
            var names=obj.names;
            var imges=obj.img;
            var times =obj.times;

            $(".information-list-container .mw-list ul").append('<li><div class="left"><img src="'+imges+'" alt=""/></div><div class="right"><p>'+names+'</p><p>'+times+'</p></div></li>');
        });
    }
}