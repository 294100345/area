package com.liu.crm.query;

import com.liu.crm.base.BaseQuery;

public class SaleChanceQuery extends BaseQuery {
    //营销机会管理 条件查询
    private String customerName;//客户名
    private String creatman;//创建人

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCreatman() {
        return creatman;
    }

    public void setCreatman(String creatman) {
        this.creatman = creatman;
    }
}
