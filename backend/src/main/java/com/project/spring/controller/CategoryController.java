package com.project.spring.controller;

import com.project.spring.component.PrincipalComponent;
import com.project.spring.model.dto.CategoryDTO;
import com.project.spring.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
@PreAuthorize("isAuthenticated()")
public class CategoryController {
    private final CategoryService categoryService;

    private final PrincipalComponent principalComponent;

    @PostMapping()
    public CategoryDTO addCategory(
            @RequestBody CategoryDTO categoryDTO){

        return categoryService.addCategory(categoryDTO);
    }

    @GetMapping()
    public List<CategoryDTO> getAllCategories(){
        return categoryService.getAllCategories();
    }

}
