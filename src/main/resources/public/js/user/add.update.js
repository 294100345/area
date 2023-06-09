layui.use(['form', 'layer','formSelects'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
        var formSelects = layui.formSelects;


    /**
     * 表单submit的监听
     */
    form.on('submit(addOrUpdateUser)',function (data){

        //提交的加载层
        var index=top.layer.msg("数据提交中，请稍后...",{
            icon:16,
            time:false,
            shade:0.8
        });

        //得到所有的表单元素的值
        var formData = data.field;
        //请求的地址
        var url = ctx+"/user/add";//添加操作

        //判断用户ID是否为空，如果不为空则为更新操作
        if($("[name='id']").val()){
            //更新操作
            var url = ctx+"/user/update";
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


    /**
     * 加载角色下拉框
     * 1.配置远程搜索,请求头,请求参数,请求类型等
     *
     * formSelects.config(ID,Options, isJson);
     *
     * @param ID        xm-select的值
     * @param Options   配置项
     * @param isJson    是否传输json数据，true将添加请求头Content-Type: application/json; charset=UTF-8
     */
    var userId =$("[name='id']").val();
    formSelects.config("selectId",{
        type:"post",//请求方式
        searchUrl: ctx + "/role/queryAllRoles?userId="+userId,//请求地址
        keyName:'roleName',//下拉框中的文本内容，要与返回的数据中对应的key一致
        keyVal:'id'
    },true);




});