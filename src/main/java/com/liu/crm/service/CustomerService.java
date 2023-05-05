package com.liu.crm.service;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liu.crm.base.BaseService;
import com.liu.crm.dao.CustomerMapper;
import com.liu.crm.query.CustomerQuery;
import com.liu.crm.utils.AssertUtil;
import com.liu.crm.utils.PhoneUtil;
import com.liu.crm.vo.Customer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class CustomerService extends BaseService<Customer,Integer> {
    @Resource
    private CustomerMapper customerMapper;
    /**
     * 多条件分页查询客户(返回的数据格式必须满足layui中数据表格要求的格式)
     * @param customerQuery
     * @return
     */
    public Map<String,Object> queryCustomerByParams(CustomerQuery customerQuery){
        Map<String,Object> map =new HashMap<>();

        //开启分页
        PageHelper.startPage(customerQuery.getPage(),customerQuery.getLimit());
        //得到对应分页对象
        PageInfo<Customer> pageInfo =new PageInfo<>(customerMapper.selectByParams(customerQuery));

        //设置map对象
        map.put("code",0);
        map.put("msg","success");
        map.put("count",pageInfo.getTotal());
        //设置分页好的列表
        map.put("data",pageInfo.getList());

        return map;
    }

    /**
     * 添加客户
     * 1。参数校验
     *      客户名称    name
     *          非空,名称唯一
     *      手机号码    phone
     *          非空，格式正确
     * 2,设置参数的默认值
     *      是否有效    isValid1
     *      创建时间createDate  系统当前时间
     *      修改时间updateDate  系统当前时间
     * 3。执行添加操作,判断受影响的行数
     *
     * @param customer
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void addCustomer(Customer customer){
        /*1。参数校验*/
        checkCustomerParams(customer.getName(),customer.getPhone());
        //判断客户名的唯一性
        Customer temp = customerMapper.queryCustomerByName(customer.getName());
        //判断用户名称是否存在
        AssertUtil.isTrue(null != temp,"客户名称已存在，请重新输入！");
        /*2。设置参数的默认值*/
        customer.setIsValid(1);
        customer.setCreateDate(new Date());
        customer.setUpdateDate(new Date());

        /*3。执行添加操作,判断受影响的行数*/
        AssertUtil.isTrue(customerMapper.insertSelective(customer) < 1,"添加客户信息失败！");
    }


    /**
     * 参数校验
     *      客户名称    name
     *          非空
     *      法人代表    fr
     *          非空
     *      手机号码    phone
     *          非空，格式正确
     * @param name
     * @param phone
     */
    private void checkCustomerParams(String name, String phone) {
        //客户名称    name   非空
        AssertUtil.isTrue(StringUtils.isBlank(name),"客户名称不能为空！");
        //手机号码          非空
        AssertUtil.isTrue(StringUtils.isBlank(phone),"手机号码不能为空！");
        //手机号码          格式正确
        AssertUtil.isTrue(!PhoneUtil.isMobile(phone),"手机号码格式不正确！");

    }


    /**
     * 修改客户
     * 1。参数校验
     *      客户ID  id
     *          非空，数据存在
     *      客户名称    name
     *          非空,名称唯一
     *      手机号码    phone
     *          非空，格式正确
     * 2,设置参数的默认值
     *      修改时间updateDate  系统当前时间
     * 3。执行添加操作,判断受影响的行数
     * @param customer
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void updateCustomer(Customer customer){
        /*1。参数校验*/
        AssertUtil.isTrue(null == customer.getId(),"待更新记录不存在！");
        //通过客户ID查询客户记录
        Customer temp = customerMapper.selectByPrimaryKey(customer.getId());
        //判断客户记录是否存在
        AssertUtil.isTrue(null == temp,"待更新记录不存在！");
        //参数校验
        checkCustomerParams(customer.getName(),customer.getPhone());
        //通过客户名称查询客户记录
        temp = customerMapper.queryCustomerByName(customer.getName());
        //判断客户记录 是否存在，且客户id是否与更新记录的id一致
        AssertUtil.isTrue(null != temp && !(temp.getId()).equals(customer.getId()),"客户名称已存在，请重新输入！");
        /*2,设置参数的默认值*/
        customer.setUpdateDate(new Date());
        /*3。执行添加操作,判断受影响的行数*/
        AssertUtil.isTrue(customerMapper.updateByPrimaryKeySelective(customer) < 1,"修改客户信息失败！");
    }


    /**
     * 删除客户信息
     * 1，参数校验
     *      id
     *          非空，数据存在
     * 2。设置参数默认值
     *      isValid     0
     *      updateDate  系统当前时间
     * 3。执行删除(更新)操作，判断受影响的行数
     * @param id
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteCustomer(Integer id) {
        //判断id是否为空，数据是否存在
        AssertUtil.isTrue(null == id,"待删除记录不存在！");
        //通过id查询客户记录
        Customer customer = customerMapper.selectByPrimaryKey(id);
        AssertUtil.isTrue(null == customer,"待删除记录不存在！");

        //设置状态为失效
        customer.setIsValid(0);
        customer.setUpdateDate(new Date());

        //3。执行删除(更新)操作，判断受影响的行数
        AssertUtil.isTrue(customerMapper.updateByPrimaryKeySelective(customer) < 1,"删除客户信息失败！");
    }



}
