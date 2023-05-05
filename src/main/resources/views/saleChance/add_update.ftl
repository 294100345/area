<!DOCTYPE html>
<html>
<head>
    <#include "../common.ftl">
</head>
<body class="childrenBody">
<form class="layui-form" style="width:80%;">
    <#-- 设置营销机会ID的隐藏域 -->
    <input type="hidden" name="id" value="${(saleChance.id)!}">
    <#--设置指派人的隐藏域ID-->
    <input type="hidden" id="assignManId" value="${(saleChance.assignMan)!}">
    <div class="layui-form-item layui-row layui-col-xs12">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" lay-verify="required"
                   name="customerName" id="customerName"  value="${(saleChance.customerName)!}" placeholder="请输入客户名称">
        </div>
    </div>
    <div class="layui-form-item layui-row layui-col-xs12">
        <label class="layui-form-label">机会来源</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input"  name="chanceSource"
                   id="chanceSource" value="${(saleChance.chanceSource)!}" placeholder="请输入机会来源">
        </div>
    </div>




    <div class="layui-form-item layui-row layui-col-xs12">
        <label class="layui-form-label">成功几率(%)</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" name="cgjl" value="${(saleChance.cgjl)!}" placeholder="请输入成功几率">
        </div>
    </div>


    <br/>
    <div class="layui-form-item layui-row layui-col-xs12">
        <div class="layui-input-block">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="addOrUpdateSaleChance">
                确认
            </button>
            <button class="layui-btn layui-btn-lg layui-btn-normal" id="closeBtn">取消</button>
        </div>
    </div>
</form>
<script type="text/javascript" src="${ctx}/js/saleChance/add_update.js"></script>
</body>
</html>