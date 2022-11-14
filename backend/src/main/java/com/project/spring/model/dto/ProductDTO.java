package com.project.spring.model.dto;

import com.project.spring.model.ApplicationUser;
import com.project.spring.model.Category;
import com.project.spring.model.ProductType;
import lombok.*;

import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private ProductType productType;

    private String categoryName;
    private Long authorId;
}
