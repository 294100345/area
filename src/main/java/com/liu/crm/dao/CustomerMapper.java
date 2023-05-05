package com.liu.crm.dao;

import com.liu.crm.base.BaseMapper;
import com.liu.crm.vo.Customer;

public interface CustomerMapper extends BaseMapper<Customer,Integer> {
    //通过用户名称查询客户对象
    Customer queryCustomerByName(String name);
}