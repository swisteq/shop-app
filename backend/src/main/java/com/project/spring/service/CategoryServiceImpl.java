package com.project.spring.service;

import com.project.spring.model.Category;
import com.project.spring.model.dto.CategoryDTO;
import com.project.spring.model.mapper.CategoryMapper;
import com.project.spring.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        Category category = categoryMapper.mapCategoryDTOToCategory(categoryDTO);

        return categoryMapper.mapCategoryToDTO(categoryRepository.save(category));
    }

    @Override
    public List<CategoryDTO> getAllCategories() {

        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDTO> productDTOList = categoryList.stream()
                .map(categoryMapper::mapCategoryToDTO)
                .collect(Collectors.toList());
        return productDTOList;
    }

}
