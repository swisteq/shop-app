package com.project.spring.service;

import com.project.spring.model.Category;
import com.project.spring.model.dto.CategoryDTO;

import java.util.List;

public interface CategoryService{
    CategoryDTO addCategory(CategoryDTO categoryDTO);

    List<CategoryDTO> getAllCategories();
}
