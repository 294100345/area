package com.liu.crm.query;

import com.liu.crm.base.BaseQuery;

public class CustomerQuery extends BaseQuery {
    private String customerName;//客户名称
    private String level;//客户级别

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
