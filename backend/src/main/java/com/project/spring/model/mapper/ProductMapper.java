package com.project.spring.model.mapper;

import com.project.spring.model.ApplicationUser;
//import com.project.spring.model.Category;
import com.project.spring.model.Category;
import com.project.spring.model.Product;
import com.project.spring.model.dto.ProductDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mappings(value = {
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "title", source = "title"),
            @Mapping(target = "description", source = "description"),
            @Mapping(target = "price", source = "price"),
            @Mapping(target = "productType", source = "productType"),
            @Mapping(target = "categoryName", source = "category.name"),
            @Mapping(target = "authorId", source = "author.id")
    })
    ProductDTO mapProductToDTO(Product product);

    @Mappings(value = {
            @Mapping(target = "id", source = "productDTO.id"),
            @Mapping(target = "title", source = "productDTO.title"),
            @Mapping(target = "description", source = "productDTO.description"),
            @Mapping(target = "price", source = "productDTO.price"),
            @Mapping(target = "productType", source = "productDTO.productType"),
            @Mapping(target = "category", source = "category"),
            @Mapping(target = "author.id", source = "author.id")
    })
    Product mapCreateProductRequestToProduct(Category category, ProductDTO productDTO, ApplicationUser author);
}
