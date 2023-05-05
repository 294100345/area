layui.use(['table','layer'],function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;

    /**
     * 营销机会列表展示
     */
    var  tableIns = table.render({
        id : "saleChanceListTable",
        elem: '#saleChanceList', // 表格绑定的ID
        url : ctx + '/sale_chance/list', // 访问数据的地址
        cellMinWidth : 95,//单元格最小宽度
        page : true, // 开启分页
        height : "full-125",//容器的高度 full-差值
        limits : [10,20,30,40,50],//每页页数的可选项
        limit : 5,//默认每页显示的数量
        toolbar: "#toolbarDemo",
        cols : [[
            // field:要求field属性值与返回的数据中对应的属性字段名一致
            // title:设置列的标题
            // sort:是否允许排序（默认:false)
            // fixed:固定列
            {type: "checkbox", fixed:"center"},
            {field: "id", title:'编号', sort:true, fixed:"left",},
            {field: 'chanceSource', title: '机会来源',align:"center"},
            {field: 'customerName', title: '客户名称',  align:'center'},
            {field: 'creatman', title: '创建人',  align:'center'},
            {field: 'cgjl', title: '成功几率%', align:'center'},
            {field: 'creatDate', title: '创建时间', align:'center'},
            {field: 'updateDate', title: '更新时间', align:'center'},
            {title: '操作', templet:'#saleChanceListBar',fixed:"right",align:"center", minWidth:150}
        ]]


    });




    /*** 绑定搜索按钮的点击事件 */
    $(".search_btn").click(function () {
        table.reload('saleChanceListTable', {
            where: {//设定异步数据接口的额外参数，任意设
                //userName等要与query中的属性名一致
                 customerName: $("input[name='customerName']").val(), // 客户名
                creatman: $("input[name='createMan']").val(), // 创建人
            },page: {
                curr: 1 // 重新从第 1 页开始
              }
        }); // 只重载数据
    });


    /*绑定头部工具栏*/
    //头工具栏事件
    /**
     * 监听头部工具栏事件
     * 格式
     * table.on('toolbar(数据表格的lay-filter属性)', function(obj){})
     */
    table.on('toolbar(saleChances)', function(data){
        //data.event:对应的元素上设置的lay-event属性值
        // console.log(data)
        //判断对应的事件类型
        if(data.event == "add"){
            //添加操作
            openSaleChanceDialog();
        } else if(data.event = "del"){
            //删除操作
            deleteSaleChance(data);
        }
    });

    /**
     * 打开添加/修改营销机会数据的窗口
     *      如果营销机会ID saleChanceId 为空,则为添加操作
     *      如果营销机会ID saleChanceId 不为空,则为修改操作
     */
    function openSaleChanceDialog(saleChanceId){
        //弹出层的标题
        var title = "<h2>营销机会管理 - 添加营销机会</h2>";
        var url = ctx + "/sale_chance/toSaleChancePage";

        //判断营销机会ID saleChanceId是否为空
        if (saleChanceId != null && saleChanceId !=''){
            //更新操作
            title = "<h2>营销机会管理 - 更新营销机会</h2>"
            //请求地址传递营销机会的ID
            url += '?saleChanceId='+saleChanceId;

        }

        //iframe 层
        layui.layer.open({
            //弹出层的类型
            type: 2,
            //标题
            title: title,
            //宽高
            area: ['500px', '300px'],
            ///url地址
            content: url,
            maxmin: true //开启最大化最小化按钮

        });

    }

    /**
     * 删除营销机会，删除多条记录
     * @param data
     */
    function deleteSaleChance(data){
        //获取数据表格选中的行数据   table.checkStatus("数据表格的id属性")
        var checkStatus = table.checkStatus("saleChanceListTable");
        console.log(checkStatus)
        // console.log(data)

        //获取所有被选中的记录对应的数据
        var saleChanceData = checkStatus.data;

        //判断用户是否选择的记录(选中行的数量大于0)
        if (saleChanceData.length<1){
            layer.msg("请选择要删除的记录！",{icon:5});
            return;
        }

        //询问用户是否确认删除
        layer.confirm('您确定要删除选中记录吗？',{icon:3,title:'营销机会管理'},function (index){
            //关闭确认框
            layer.close(index);
            //传递的参数是数组 ids=1&ids=2&ids=3
            var ids ="ids=";
            //循环选中的行记录的数据
            for (var i = 0; i < saleChanceData.length; i++) {
                if (i<saleChanceData.length-1){
                    ids=ids+saleChanceData[i].id+"&ids=";
                } else {
                    ids=ids+saleChanceData[i].id;
                }
            }
            // console.log(ids);

            //发送ajax请求，执行删除营销机会
            $.ajax({
               type:"post",
               url:ctx+"/sale_chance/delete",
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
     * 行工具栏监听事件
     * table.on('tool(数据表格的lay-filter属性)',function (data){
     *
     *     })
     */
    table.on('tool(saleChances)', function (data){
        // console.log(data)
        //判断对应的事件类型
        if(data.event == "edit"){//编辑操作
            //得到营销机会的ID
            var saleChanceId = data.data.id;
            //打开修改营销机会数据的窗口
            openSaleChanceDialog(saleChanceId);
        } else if(data.event == "del"){
            //删除操作
            //弹出确认框，询问用户是否确认删除
            layer.confirm('确定要删除记录吗？',{icon:3,title:"营销机会管理"},function (index){
                //关闭确认框
                layer.close(index);

                //发送ajax请求，删除记录
                $.ajax({
                    type:"post",
                    url: ctx+"/sale_chance/delete",
                    data:{
                        ids:data.data.id
                    },
                    success:function (result){
                        //判断删除结果
                        if (result.code==200){
                            //提示成功
                            layer.msg("删除成功！",{icon:6});





                            // console.log(tableIns.config.page)
                            // var countPageNow = tableIns.config.page.pages;
                            // if (countPageNow > 0){
                            //     //刷新表格
                            //     tableIns.reload();
                            // } else {
                            //     tableIns.reload({
                            //         page: {
                            //             curr: 0 //重新从第 1 页开始
                            //         },
                            //     });
                            //
                            // }
                            tableIns.reload();











                        } else {
                            //提示失败
                            layer.msg(result.msg,{icon:5});
                        }
                    }
                });
            });
        }
    });


});