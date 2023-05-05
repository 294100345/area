<!DOCTYPE html>
<html>
<head>
    <title>客户管理</title>
    <#include "../common.ftl">
</head>
<body class="childrenBody">

<form class="layui-form">
    <blockquote class="layui-elem-quote quoteBox">
        <form class="layui-form">

            <#--两个查询条件的div 外层只能加行内的div不能加普通的div-->
            <div class="layui-inline">
                    <div class="layui-input-inline">
                        <input type="text" name="name"
                               class="layui-input
                        searchVal" placeholder="客户名"/>
                    </div>

                    <div class="layui-input-inline">
                        <select name="level" id="level">
                            <option value="">客户级别 请选择..</option>
                            <option value="普通客户">普通客户</option>
                            <option value="战略合作伙伴">战略合作伙伴</option>
                            <option value="大客户">大客户</option>
                            <option value="重点开发客户">重点开发客户</option>
                        </select>
                    </div>
                    <a class="layui-btn search_btn" data-type="reload"><i
                                class="layui-icon">&#xe615;</i>搜索</a>
            </div>




                <#--<div class="layui-input-inline">
                    <input type="text" name="name"
                           class="layui-input
                            searchVal" placeholder="客户名"/>
                </div>
                <div class="layui-input-inline">
                    <select name="level" id="level">
                        <option value="">请选择...</option>
                        <option value="普通客户">普通客户</option>
                        <option value="战略合作伙伴">战略合作伙伴</option>
                        <option value="大客户">大客户</option>
                        <option value="重点开发客户">重点开发客户</option>
                    </select>
                </div>
                <a class="layui-btn search_btn" data-type="reload"><i
                            class="layui-icon">&#xe615;</i>搜索</a>-->


        </form>
    </blockquote>
    <table id="customerList" class="layui-table" lay-filter="customers"></table>
    <script type="text/html" id="toolbarDemo">
        <div class="layui-btn-container">
            <a class="layui-btn layui-btn-normal addNews_btn" lay-event="add">
                <i class="layui-icon">&#xe608;</i>
                添加
            </a>

        </div>
    </script>
    <!--操作-->
    <script id="customerListBar" type="text/html">
        <a class="layui-btn layui-btn-xs" id="edit" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>
    </script>
</form>
<script type="text/javascript" src="${ctx}/js/customer/customer.js"></script>

</body>
</html>