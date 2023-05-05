layui.use(['table', 'layer',"form"], function () {
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table =layui.table,
        form = layui.form;


        //客户列表展示
        var tableIns = table.render({
            elem:'#customerList',
            url:ctx+'/customer/list',
            cellMinWidth : 95,
            page :true,
            height :"fuLl-125",
            limits:[10,15,20,25],
            limit:10,
            toolbar:"#toolbarDemo",
            tid:"customerListTable",
            cols : [[
                {type: "checkbox", fixed: "center"},
                {field: "id",title:'编号',fixed: "true"},
                {field: 'name', title:'客户名',align: "center"},
                {field: 'area', title:'地区',align:'center'},
                {field: 'level', title: '客户级别',align: 'center'},
                {field: 'adress', title: '详细地址',align: 'center'},
                {field: 'phone', title: '电话',align:'center'},
                {field: 'createDate', title:'创建时间',align:'center'},
                {field: 'updateDate', title:'更新时间',align:'center'},
                {title: '操作',templet: '#customerListBar',fixed:"right",align:"center" , minWidth:150}
            ]]
        });
    /*** 绑定搜索按钮的点击事件 */
    $(".search_btn").click(function () {
        tableIns.reload({
            //设置需要传递给后端的参数
            where: {//设定异步数据接口的额外参数，任意设
                //userName等要与query中的属性名一致
                customerName: $("input[name='name']").val(), // 客户名称
                level: $("#level").val()// 客户级别
            },page: {
                curr: 1 // 重新从第 1 页开始
            }
        }); // 只重载数据
    });

    /**
     * 监听头部工具栏
     */
    table.on('toolbar(customers)',function (data){
        if (data.event=="add"){//添加客户信息
            //打开添加/修改客户信息的对话框
            openAddOrUpdateCustomerDialog();
        } else if(data.event=="order"){//客户订单数据查看
            //获取被选中的数据的相关信息
            var checkStatus = table.checkStatus(data.config.id);
            //打开客户订单的对话框（传递选中的数据记录）
            openCustomerOrDialog(checkStatus.data);
        }
    });


    /**
     * 监听行工具栏
     */
    table.on('tool(customers)',function (data){
        if (data.event=="edit"){//更新客户信息
            //打开添加/修改客户信息的对话框
            openAddOrUpdateCustomerDialog(data.data.id);
        } else if(data.event=="del"){//删除客户信息
            //删除客户
            deleteCustomer(data.data.id);
        }
    });


    /**
     * 打开添加/修改客户信息的对话框
     */
    function openAddOrUpdateCustomerDialog(id){
        var title = "<h3>客户管理 - 添加客户</h3>";
        var url = ctx+"/customer/toAddOrUpdateCustomerPage";

        //判断id是否为空，（如果不为空，则为更新操作）
        if (id != null && id !=''){
            title = "<h3>客户管理 - 更新客户信息</h3>";
            url = ctx+"/customer/toAddOrUpdateCustomerPage?id="+id;
        }

        //iframe 层
        layui.layer.open({
            //弹出层的类型
            type: 2,
            //标题
            title: title,
            //宽高
            area: ['400px', '450px'],
            ///url地址
            content: url,
            maxmin: true //开启最大化最小化按钮
        });
    }

    /**
     * 删除指定的客户信息
     * @param id
     */
    function deleteCustomer(id){
        //删除操作
        //弹出确认框，询问用户是否确认删除
        layer.confirm('确定要删除记录吗？',{icon:3,title:"客户管理"},function (index){
            //关闭确认框
            layer.close(index);

            //发送ajax请求，删除记录
            $.ajax({
                type:"post",
                url: ctx+"/customer/delete",
                data:{
                    id:id
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
     * 打开指定客户的订单对话框
     * @param data
     */
    function openCustomerOrDialog(data){
        //判断用户是否选择客户
        if (data.length == 0){
            layer.msg("请选择想要查看订单的客户",{icon:5});
            return;
        }
        //判断用户是否多选
        if (data.length > 1){
            layer.msg("暂不支持批量查看！",{icon:5});
        }

        //打开对话框
        //iframe 层
        layui.layer.open({
            //弹出层的类型
            type: 2,
            //标题
            title: "<h3>客户管理 - 查看订单信息</h3>",
            //宽高
            area: ['700px', '500px'],
            ///url地址
            content: ctx + "/customer/toCustomerOrderPage?customerId="+data[0].id,
            maxmin: true //开启最大化最小化按钮
        });
    }
});


