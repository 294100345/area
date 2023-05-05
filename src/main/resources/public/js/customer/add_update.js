layui.use(['form', 'layer'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;

    /**
     * 表单submit的监听
     */
    form.on('submit(addOrUpdateCustomer)',function (data){

        //提交的加载层
        var index=top.layer.msg("数据提交中，请稍后...",{
            icon:16,
            time:false,
            shade:0.8
        });

        //得到所有的表单元素的值
        var formData = data.field;
        //请求的地址
        var url = ctx+"/customer/add";//添加操作

        //获取隐藏域中的id
        var id = $("[name='id']").val();
        if (id != null && id != ''){
            var url = ctx+"/customer/update";//更新操作
        }

        //发送ajax添加
        $.post(url,formData,function(result){
            if(result.code==200){
                //添加成功了
                // console.log(data.field)
                top.layer.msg("操作成功",{icon:6});
                //关闭加载层
                top.layer.close(index);
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