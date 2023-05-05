<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <meta charset="utf-8">
    <#include "common.ftl">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${ctx}/css/login.css" media="all">
</head>
<body>
<h1>crm管理系统</h1>
<div class="login-container">

    <h1>Login</h1>
    <div class="layui-form login-form">
        <form action="">
            <div>
                <label class="layui-icon layui-icon-username" for="username">Username:</label>
                <input type="text" name="username" lay-verify="required|account" autocomplete="off" class="layui-input" >
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" lay-verify="required|password"  autocomplete="off" class="layui-input" >
            </div>
            <div>
                <button type="submit" lay-submit="" lay-filter="login">Login</button>
            </div>
        </form>
    </div>

</div>
<script src="${ctx}/js/index.js" charset="utf-8"></script>
</body>
</html>
