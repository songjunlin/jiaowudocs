package com.ymall.controller.portal;

import com.ymall.common.ServerResponse;
import com.ymall.common.exception.IllegalException;
import com.ymall.pojo.Category;
import com.ymall.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/category")
public class CategoryController
{
    @Autowired
    private CategoryService categoryService;
    //获取平级子分类
    @RequestMapping(value = "sub_list",method = RequestMethod.GET)
    public ServerResponse<List<Category>> getChildrenParallelCategory(
            @RequestParam(defaultValue = "0") Integer parentId) throws IllegalException {
        return categoryService.getChildrenParallelCategory(parentId);
    }

    //获取当前节点的所有递归子节点 传0是根节点列表
    @RequestMapping(value = "sub_deep_list",method = RequestMethod.GET)
    public ServerResponse<Set<Category>> selectCategoryAndChildrenById(
            @RequestParam(defaultValue = "0") Integer parentId) throws IllegalException {
        return categoryService.selectAllChildren(parentId);
    }



}
