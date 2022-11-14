package com.project.spring.model.mapper;

import com.project.spring.model.Category;
import com.project.spring.model.dto.CategoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mappings(value = {
//            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name")
    })
    CategoryDTO mapCategoryToDTO(Category category);

    @Mappings(value = {
//            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name")
    })
    Category mapCategoryDTOToCategory(CategoryDTO categoryDTO);
}
