package com.liu.crm.controller;

import com.liu.crm.base.BaseController;
import com.liu.crm.base.ResultInfo;
import com.liu.crm.query.SaleChanceQuery;
import com.liu.crm.service.SaleChanceService;
import com.liu.crm.utils.CookieUtil;
import com.liu.crm.vo.SaleChance;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("sale_chance")
public class SaleChanceController extends BaseController {
    @Resource
    private SaleChanceService saleChanceService;

    /**
     * 营销机会数据查询（分页多条件查询）
     * @param saleChanceQuery
     * @return
     */

    @RequestMapping("list")
    @ResponseBody
    public Map<String,Object> querySaleChanceByParams(SaleChanceQuery saleChanceQuery){

        return saleChanceService.querySaleChanceByParams(saleChanceQuery);
    }

    /**
     * 营销机会数据查询（分页多条件查询）
     * @return
     */

    @RequestMapping("list2")
    @ResponseBody
    public List<SaleChance> querySaleChanceData(){
        return saleChanceService.querySaleChanceData();
    }

    /**
     * 进入营销机会管理页面
     * @return
     */
    @RequestMapping("index")
    public String index(){
        return "saleChance/sale_chance";
    }


    /**
     * 进入营销机会图页面
     * @return
     */
    @RequestMapping("index2")
    public String index2(){
        return "saleChance/sale_chance2";
    }


    /**
     * 进入添加或者修改营销机会页面
     * @return
     */
    @RequestMapping("toSaleChancePage")
    public String toSaleChancePage(Integer saleChanceId,HttpServletRequest request){
        //判断saleChanceId是否为空
        if (saleChanceId != null){
            //通过ID查询营销机会数据
            SaleChance saleChance =saleChanceService.selectByPrimaryKey(saleChanceId);
            //将数据设置到请求域中
            request.setAttribute("saleChance",saleChance);
        }

        return "saleChance/add_update";
    }



    /**
     * 添加营销机会
     * @param saleChance
     * @param request
     * @return
     */
    @PostMapping("add")
    @ResponseBody
    public ResultInfo addSaleChance(SaleChance saleChance, HttpServletRequest request){
        //从cookie中获取当前登录的用户名
        String userName = CookieUtil.getCookieValue(request,"userName");
        //设置用户名到营销机会对象
        saleChance.setCreatman(userName);
        //调用Service层的添加方法
        saleChanceService.addSaleChance(saleChance);
        return success("营销机会数据添加成功");
    }


    /**
     * 更新营销机会
     * @param saleChance
     * @return
     */
    @PostMapping("update")
    @ResponseBody
    public ResultInfo updateSaleChance(SaleChance saleChance){
        //调用Service层的添加方法
        saleChanceService.updateSaleChance(saleChance);
        return success("营销机会数据更新成功");
    }


    /**
     * 删除营销机会
     */
    @RequestMapping("delete")
    @ResponseBody
    public ResultInfo deleteSaleChance(Integer[] ids){
        //调用Service层的删除方法
        saleChanceService.deleteBatch(ids);
        return success("营销机会删除成功");
    }


}
