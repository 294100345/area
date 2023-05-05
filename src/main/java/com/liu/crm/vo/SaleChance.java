package com.liu.crm.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class SaleChance {
    private Integer id;

    private String chanceSource;

    private String customerName;

    private Integer cgjl;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private String creatman;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date creatDate;

    private Date updateDate;

    private Integer isValid;

    @Override
    public String toString() {
        return "SaleChance{" +
                "id=" + id +
                ", chanceSource='" + chanceSource + '\'' +
                ", customerName='" + customerName + '\'' +
                ", cgjl=" + cgjl +
                ", creatman='" + creatman + '\'' +
                ", creatDate=" + creatDate +
                ", updateDate=" + updateDate +
                ", isValid=" + isValid +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChanceSource() {
        return chanceSource;
    }

    public void setChanceSource(String chanceSource) {
        this.chanceSource = chanceSource == null ? null : chanceSource.trim();
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName == null ? null : customerName.trim();
    }

    public Integer getCgjl() {
        return cgjl;
    }

    public void setCgjl(Integer cgjl) {
        this.cgjl = cgjl;
    }

    public String getCreatman() {
        return creatman;
    }

    public void setCreatman(String creatman) {
        this.creatman = creatman == null ? null : creatman.trim();
    }

    public Date getCreatDate() {
        return creatDate;
    }

    public void setCreatDate(Date creatDate) {
        this.creatDate = creatDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Integer getIsValid() {
        return isValid;
    }

    public void setIsValid(Integer isValid) {
        this.isValid = isValid;
    }
}