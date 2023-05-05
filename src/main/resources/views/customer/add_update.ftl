<!DOCTYPE html>
<html>
<head>
    <#include "../common.ftl">
</head>
<body class="childrenBody">
<form class="layui-form" style="width:80%;">
    <#-- 设置营销机会ID的隐藏域 -->
    <input type="hidden" name="id" value="${(customer.id)!}">

    <div class="layui-form-item layui-row layui-col-xs12">
            <label class="layui-form-label">客户名称</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input"
                       name="name" id="name" lay-verify="required" value="${(customer.name)!}" placeholder="请输入客户名称">
            </div>
    </div>



    <div class="layui-form-item layui-row layui-col-xs12">
            <label class="layui-form-label">区域</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input"
                       name="area" value="${(customer.area)!}" placeholder="请输入区域">
            </div>
    </div>

    <div class="layui-form-item layui-row layui-col-xs12">
            <label class="layui-form-label">客户级别</label>
            <div class="layui-input-block">
                <select name="level" id="level" >
                    <option value="">请选择</option>
                    <option value="普通客户">普通客户</option>
                    <option value="重点开发客户">重点开发客户</option>
                    <option value="大客户">大客户</option>
                    <option value="战略合作伙伴">战略合作伙伴</option>
                </select>
            </div>
    </div>


    <div class="layui-form-item layui-row layui-col-xs12" >
            <label class="layui-form-label">联系电话</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input"
                       name="phone" value="${(customer.phone)!}" placeholder="请输入客户联系电话">
            </div>
    </div>

    <div class="layui-form-item layui-row layui-col-xs12">
            <label class="layui-form-label">客户地址</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input"
                       name="adress" value="${(customer.adress)!}" placeholder="请输入客户地址">
            </div>
    </div>



    <br/>
    <div class="layui-form-item layui-row layui-col-xs12">
        <div class="layui-input-block">
            <button class="layui-btn layui-btn-lg" lay-submit=""
                    lay-filter="addOrUpdateCustomer">确认
            </button>
            <button class="layui-btn layui-btn-lg layui-btn-normal" id="closeBtn">取消</button>
        </div>
    </div>
</form>
<script type="text/javascript" src="${ctx}/js/customer/add_update.js"></script>
</body>
</html>