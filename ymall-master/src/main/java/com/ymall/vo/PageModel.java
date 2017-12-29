package com.ymall.vo;

import com.github.pagehelper.PageInfo;
import com.ymall.common.exception.IllegalException;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;


public class PageModel<T> {
/*
分页模型
* */
    @NotNull
    @AssertTrue(message = "分页参数错误(paging)")
    private boolean paging=true;

    //请求页码
    @NotNull(message = "分页参数错误(pageNum)")
    private Integer pageNum;

    //每页多少条
    @NotNull(message = "分页参数错误(limit)")
    private Integer limit;

    //分页总数
    private int pageCount;


    //总记录数
    private long total;


    //数据
    private List<T> results=new ArrayList<T>();


    public PageModel() {
    }


    public static PageModel convertToPageModel(PageInfo pageResult) throws IllegalException {
        PageModel pageModel=new PageModel();
        if(pageResult.getSize()==0&&pageResult.getPageNum()>1){throw new IllegalException("没有更多了");}
        pageModel.setPageNum(pageResult.getPageNum());
        pageModel.setLimit(pageResult.getPageSize());
        pageModel.setPageCount(pageResult.getPages());
        pageModel.setTotal(pageResult.getTotal());
        pageModel.setResults(pageResult.getList());
        return pageModel;
    }

    public boolean isPaging() {
        return paging;
    }

    public void setPaging(boolean paging) {
        this.paging = paging;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }
}
