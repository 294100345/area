package com.liu.crm.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.liu.crm.base.BaseService;
import com.liu.crm.dao.SaleChanceMapper;
import com.liu.crm.query.SaleChanceQuery;
import com.liu.crm.utils.AssertUtil;
import com.liu.crm.vo.SaleChance;
import com.liu.crm.vo.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

@Service
public class SaleChanceService extends BaseService<SaleChance,Integer> {

    @Resource
    private SaleChanceMapper saleChanceMapper;

    /**
     * 多条件分页查询营销机会(返回的数据格式必须满足layui中数据表格要求的格式)
     * @param saleChanceQuery
     * @return
     */
    public Map<String,Object> querySaleChanceByParams(SaleChanceQuery saleChanceQuery){
        Map<String,Object> map =new HashMap<>();

        //开启分页
        PageHelper.startPage(saleChanceQuery.getPage(),saleChanceQuery.getLimit());
        //得到对应分页对象
        PageInfo<SaleChance> pageInfo =new PageInfo<>(saleChanceMapper.selectByParams(saleChanceQuery));

        //设置map对象
        map.put("code",0);
        map.put("msg","success");
        map.put("count",pageInfo.getTotal());
        //设置分页好的列表
        map.put("data",pageInfo.getList());

        return map;
    }


    /**
     * 添加营销机会
     * 1,参数校验
     *   customerName客户名称  非空
     *
     * 2。设置相关参数的默认值
     *   createMan创建人  当前登录用户名
     *
     *   createDate创建时间
     *      默认是系统当前时间
     *   updateDate
     *      默认是系统当前时间
     *
     *3.执行添加操作,判断受影响的行数
     * @param saleChance
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void addSaleChance(SaleChance saleChance){
        /*1.校验参数*/
        checkSaleChanceParam(saleChance.getCustomerName());

        /*2.设置相关参数的默认值*/
        //creatDate创建时间默认是系统当前时间
        saleChance.setCreatDate(new Date());
        //updateDate默认是系统当前时间
        saleChance.setUpdateDate(new Date());
        //is_valid默认值为1
        saleChance.setIsValid(1);

        //3.执行添加操作,判断受影响的行数
        AssertUtil.isTrue(saleChanceMapper.insertSelective(saleChance)!=1,"添加营销机会失败");
    }


    /**
     *更新营销机会
     * 1.参数校验
     *      营销机会ID  非空，数据库中对应的记录存在
     *      customerName客户名称        非空
     * 2，设置相关参数的默认值
     *      updateDate更新时间       设置为系统当前时间
     * 3.执行更新操作，判断受影响的行数
     */
    public void updateSaleChance(SaleChance saleChance){
        /* 1.参数校验*/
        //营销机会ID  非空，数据库中对应的记录存在
        AssertUtil.isTrue(null==saleChance.getId(),"待更新记录不存在");
        //通过主键查询对象
        SaleChance temp = saleChanceMapper.selectByPrimaryKey(saleChance.getId());
        //判断数据库中对应的记录存在
        AssertUtil.isTrue(null==temp,"待更新记录不存在");
        //参数校验
        checkSaleChanceParam(saleChance.getCustomerName());
        /*2，设置相关参数的默认值*/
        //updateDate更新时间       设置为系统当前时间
        saleChance.setUpdateDate(new Date());
        // assignMan指派人

        /*3.执行更新操作，判断受影响的行数*/
        AssertUtil.isTrue(saleChanceMapper.updateByPrimaryKeySelective(saleChance)!=1,"营销机会更新失败！");
    }


    /**
     *      参数校验
     *      customerName客户名称  非空
     * @param customerName
     *
     */
    private void checkSaleChanceParam(String customerName) {
        //customerName客户名称  非空
        AssertUtil.isTrue(StringUtils.isBlank(customerName),"客户姓名不能为空");

    }

    /**
     * 删除营销机会
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteSaleChance(Integer[] ids){
        //判断ID是否为空
        AssertUtil.isTrue(null==ids || ids.length<1,"请选择要删除的记录");
        //执行删除（更新）操作，判断受影响的行数
        AssertUtil.isTrue(saleChanceMapper.deleteBatch(ids)!=ids.length,"营销机会数据删除失败");

    }


    /**
     * 取营销机会和成功率
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public List<SaleChance> querySaleChanceData(){
        //取出SaleChance对象
        List saleChanceDataList= saleChanceMapper.selectSaleChanceData();
        return saleChanceDataList;
    }





}
