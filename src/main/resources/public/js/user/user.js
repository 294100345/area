layui.use(['table', 'layer'], function () {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;



    /**
     * 营销机会列表展示
     */
    var  tableIns = table.render({
        id : "userTable",
        elem: '#userList', // 表格绑定的ID
        url : ctx + '/user/list', // 访问数据的地址
        cellMinWidth : 95,//单元格最小宽度
        page : true, // 开启分页
        height : "full-125",//容器的高度 full-差值
        limits : [10,20,30,40,50],//每页页数的可选项
        limit : 10,//默认每页显示的数量
        toolbar: "#toolbarDemo",
        cols : [[
            // field:要求field属性值与返回的数据中对应的属性字段名一致
            // title:设置列的标题
            // sort:是否允许排序（默认:false)
            // fixed:固定列
            {type: "checkbox", fixed:"center"},
            {field: "id", title:'编号', sort:true, fixed:"left",},
            {field: 'userName', title: '用户名称',align:"center"},
            {title: '操作', templet:'#userListBar',fixed:"right",align:"center", minWidth:150}
        ]]
    });



    /*** 绑定搜索按钮的点击事件 */
    $(".search_btn").click(function () {
        tableIns.reload({
            //设置需要传递给后端的参数
            where: {//设定异步数据接口的额外参数，任意设
                //userName等要与query中的属性名一致
                userName: $("input[name='userName']").val(), // 用户名称
            },page: {
                curr: 1 // 重新从第 1 页开始
            }
        }); // 只重载数据
    });


    /**
     * 监听头部工具栏
     */
    table.on('toolbar(users)',function (data){
        if (data.event=="add"){//添加用户
            //打开添加/修改用户的对话框
            openAddOrUpdateDialog();
        } else if (data.event=="del"){//删除用户
            //获取被选中的数据的信息
            var checkStatus = table.checkStatus(data.config.id);
            console.log(checkStatus)
            //删除多个用户
            deleteUsers(checkStatus.data);
        }
    });


    /**
     * 删除多条用户记录
     * @param userData
     */
    function deleteUsers(userData){
        //判断用户是否选择了要删除的记录
        if (userData.length==0){
            layer.msg("请选择要删除的记录！",{icon:5});
            return;
        }

        //询问用户是否确认删除
        layer.confirm('您确定要删除选中记录吗？',{icon:3,title:'用户管理'},function (index){
            //关闭确认框
            layer.close(index);
            //传递的参数是数组 ids=1&ids=2&ids=3
            var ids ="ids=";
            //循环选中的行记录的数据
            for (var i = 0; i < userData.length; i++) {
                if (i<userData.length-1){
                    ids=ids+userData[i].id+"&ids=";
                } else {
                    ids=ids+userData[i].id;
                }
            }
            // console.log(ids);

            //发送ajax请求，执行删除用户
            $.ajax({
                type:"post",
                url:ctx+"/user/delete",
                data:ids, //传递的参数是数组     ids=1&ids=2&ids=3
                success:function (result) {
                    //判断删除结果
                    if (result.code==200){
                        //提示成功
                        layer.msg("删除成功！",{icon:6});
                        //刷新表格
                        tableIns.reload();
                    } else {
                        //提示失败
                        layer.msg(result.msg,{icon:5});
                    }
                }
            });


        });
    }

    /**
     * 监听行工具栏
     */
    table.on('tool(users)',function (data){
        if (data.event=="edit"){//更新用户
            //打开添加/修改用户的对话框
            openAddOrUpdateDialog(data.data.id);
        } else if (data.event == "del"){//删除用户
            //删除单条用户记录
            deleteUser(data.data.id);
        }
    });

    /**
     * 删除单条记录
     * @param id
     */
    function deleteUser(id){
        //删除操作
        //弹出确认框，询问用户是否确认删除
        layer.confirm('确定要删除记录吗？',{icon:3,title:"用户管理"},function (index){
            //关闭确认框
            layer.close(index);

            //发送ajax请求，删除记录
            $.ajax({
                type:"post",
                url: ctx+"/user/delete",
                data:{
                    ids:id
                },
                success:function (result){
                    //判断删除结果
                    if (result.code==200){
                        //提示成功
                        layer.msg("删除成功！",{icon:6});
                        //刷新表格
                        tableIns.reload();
                    } else {
                        //提示失败
                        layer.msg(result.msg,{icon:5});
                    }
                }
            });
        });
    }


    /**
     * 打开添加/修改用户的对话框
     */
    function openAddOrUpdateDialog(id){
        var title = "<h3>用户管理 - 添加用户</h3>";
        var url = ctx+"/user/toAddOrUpdateUserPage";
        //判断id是否为空，如果为空，则为添加操作，否则是修改操作
        if (id != null && id !=''){
            title = "<h3>用户管理 - 更新用户</h3>"
            url += "?id="+id; //传递主键，查询数据

        }
        //iframe 层
        layui.layer.open({
            //弹出层的类型
            type: 2,
            //标题
            title: title,
            //宽高
            area: ['650px', '400px'],
            ///url地址
            content: url,
            maxmin: true //开启最大化最小化按钮
        });
    }


});