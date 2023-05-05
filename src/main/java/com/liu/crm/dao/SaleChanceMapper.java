package com.liu.crm.dao;

import com.liu.crm.base.BaseMapper;
import com.liu.crm.query.SaleChanceQuery;
import com.liu.crm.vo.SaleChance;

import java.util.List;


public interface SaleChanceMapper extends BaseMapper<SaleChance,Integer> {
    //查询营销机会和成功率
    public List<SaleChance> selectSaleChanceData();


}