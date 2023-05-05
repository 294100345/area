layui.use(['form','jquery','jquery_cookie'], function () {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.jquery,
        $ = layui.jquery_cookie($);

    /**
     * 表单submit提交
     *  form.on('submit(按钮的lay-filter属性值)', function(data){
     *      return false; //阻止表单跳转。
     *  })
     */
    form.on('submit(login)', function(data){

        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}

        /*发送ajax请求,传递用户姓名与密码，执行用户登录操作*/
        $.ajax({
            type:"post",
            url:ctx+"/user/login",
            data:{
                //data是ajax发送给服务端的数据
                //key要与controller方法中参数名字一致
                userName:data.field.username,
                userPwd:data.field.password
            },
            success:function (result){//result是回调函数，用来接受后端返回的数据
                console.log(result)
                console.log(data)

                //判断是否登录成功，如果code=200,则表示成功，否则表示失败
                if (result.code==200){
                    //登录成功
                    /**
                     * 设置用户是登录状态
                     * 1.利用session会话
                     * 保存用户信息，如果会话存在,则用户是登录状态:否则是非登录状态缺点:服务器关闭,会话则会失效
                     * 2．利用cookie
                     * 保存用户信息，cookie未失效,则用户是登录状态
                     */
                    layer.msg("登录成功",function (){

                            //将用户信息设置到cookie中
                            $.cookie("userId",result.result.userId);
                            $.cookie("userName",result.result.userName);
                            // $.cookie("trueName",result.result.trueName);


                        //登录成功后，跳转到首页
                        window.location.href=ctx+"/main";
                    });
                }else {
                    //登录失败
                    console.log(result.msg())
                    layer.msg(result.msg,{icon:5})
                }
            }
        })

        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    
});