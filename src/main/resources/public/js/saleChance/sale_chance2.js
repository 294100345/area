layui.use(['element', 'echarts', 'carousel'], function () {
    var element = layui.element,
        $ = layui.jquery,
        carousel = layui.carousel,
        echarts = layui.echarts;


    var shopping = echarts.init(document.getElementById('shopping'));

    // 指定图表的配置项和数据
    var optionShopping = {
        url : ctx + '/sale_chance/list2', // 访问数据的地址
        title: {
            text: '营销机会柱状图'
        },
        tooltip: {},
        legend: {
            data: ['成功几率']
        },
        xAxis: {
            data: []
        },
        yAxis: {
            axisLabel: {formatter: '{value} %'},
        },
        series: [
            {
                name: '成功几率',
                type: 'bar',//柱状
                data: [],
                itemStyle: {
                    normal: {//柱子颜色
                        color: '#FF44AA'
                    }

                }

            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    shopping.setOption(optionShopping);



    var names=[];
    var cgjls=[];
    $.ajax({
        type : "post",
        async : true,
        url : ctx + '/sale_chance/list2',
        data : {},
        dataType : "json",
        success : function(result) {
            if (result) {
                for(var i=0;i<result.length;i++){
                    names.push(result[i].customerName);
                    console.log(result[i].name)
                }
                for(var i=0;i<result.length;i++){
                    cgjls.push(result[i].cgjl);
                    console.log(result[i].cgjl)

                }
                shopping.hideLoading();
                shopping.setOption({
                    xAxis:{data:names},
                    series:[{
                        name:'成功几率',
                        data: cgjls
                    }]
                })
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            shopping.hideLoading();
        }

    });


});

















