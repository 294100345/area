package com.liu.crm.controller;

import com.liu.crm.base.BaseController;
import com.liu.crm.service.UserService;
import com.liu.crm.utils.LoginUserUtil;
import com.liu.crm.vo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
public class IndexController extends BaseController {
    @Resource
    private UserService userService;

    /**
     * 系统登录⻚
     * @return
     */
    @RequestMapping("index")
    public String index(){

        return "index";
    }

    // 系统界⾯欢迎⻚
    @RequestMapping("welcome")
    public String welcome(){
        return "welcome";
    }
    /**
     * 后端管理主⻚⾯
     * @return
     */
    @RequestMapping("main")
    public String main(HttpServletRequest request){
        //获取cookie中的用户id
        Integer userId = LoginUserUtil.releaseUserIdFromCookie(request);
        //查询用户对象，设置session作用域
        User user = userService.selectByPrimaryKey(userId);
        request.getSession().setAttribute("user",user);

        return "main";
    }
}
