layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;


    /**
     * 监听表单的submit事件
     * form.on("submit(按钮元素的lay-filter属性值)",function(data){
     *
     * })；
     */                                       //data形参接收监听的数据
    form.on("submit(addOrUpdateSaleChance)",function(data){
        console.log(data.field);
        //提交的加载层
        var index=layer.msg("数据提交中，请稍后...",{
            icon:16,
            time:false,
            shade:0.8
        });
        //提交数据url
        var url=ctx+"/sale_chance/add";

        //通过营销机会的ID来判断当前需要执行添加操作还是修改操作
        //如果营销机会的ID为空，则表示执行添加操作;如果ID不为空，则表示执行更新操作
        //通过获取隐藏域(在add_update.ftl文件中)中的ID
        var saleChanceId =$("[name='id']").val();
        //判断ID是否为空
        if (saleChanceId != null && saleChanceId !=''){
            console.log(saleChanceId);
            //更新操作
            var url=ctx+"/sale_chance/update";

        }



        //发送ajax添加，data形参接收监听的数据， field是包含所有字段
       $.post(url,data.field,function(result){
           if(result.code==200){
                //添加成功了
               // console.log(data.field)
               layer.msg("操作成功",{icon:6});
               //关闭加载层
               layer.close(index);
               //iframe
               layer.closeAll("iframe");
               //刷新父窗口，重新加载数据
               parent.location.reload();
           }else{
               //失败了
               layer.msg(result.msg,{icon: 5});
           }
       });

        //阻止表单提交跳转
        return false;
    });



    /**
     * 关闭弹出层
     */
    $("#closeBtn").click(function (){
        //当你在iframe页面关闭自身时
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    });






});