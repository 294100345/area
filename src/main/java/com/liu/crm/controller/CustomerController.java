package com.liu.crm.controller;

import com.liu.crm.base.BaseController;
import com.liu.crm.base.ResultInfo;
import com.liu.crm.query.CustomerQuery;
import com.liu.crm.service.CustomerService;
import com.liu.crm.vo.Customer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
@RequestMapping("customer")
public class CustomerController extends BaseController {
    @Resource
    private CustomerService customerService;
    /**
     * 分页查询客户列表
     * @param customerQuery
     * @return
     */
    @RequestMapping("list")
    @ResponseBody
    public Map<String,Object> querySaleChanceByParams(CustomerQuery customerQuery){
        return customerService.queryCustomerByParams(customerQuery);
    }


    /**
     * 进入客户信息管理页面
     * @return
     */
    @RequestMapping("index")
    public String index(){
        return "customer/customer";
    }


    /**
     * 打开添加/修改客户信息的对话框
     * @return
     */
    @RequestMapping("toAddOrUpdateCustomerPage")
    public String toAddOrUpdateCustomerPage(Integer id, HttpServletRequest request){
        //如果id不为空，则查询客户记录
        if (null != id){
            //通过id查询客户记录
            Customer customer = customerService.selectByPrimaryKey(id);
            //将客户记录存在作用域
            request.setAttribute("customer",customer);
        }
        return "customer/add_update";
    }


    /**
     * 添加客户信息
     * @param customer
     * @return
     */
    @RequestMapping("add")
    @ResponseBody
    public ResultInfo addCustomer(Customer customer){
        customerService.addCustomer(customer);
        return success("添加客户信息成功！");
    }


    /**
     * 修改客户信息
     * @param customer
     * @return
     */
    @RequestMapping("update")
    @ResponseBody
    public ResultInfo updateCustomer(Customer customer){
        customerService.updateCustomer(customer);
        return success("修改客户信息成功！");
    }


    /**
     * 删除客户信息
     * @param id
     * @return
     */
    @RequestMapping("delete")
    @ResponseBody
    public ResultInfo deleteCustomer(Integer id){
        customerService.deleteCustomer(id);
        return success("删除客户信息成功！");
    }

}
