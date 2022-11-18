package com.project.spring.service;

import com.project.spring.model.ApplicationUser;
//import com.project.spring.model.Category;
import com.project.spring.model.Product;
import com.project.spring.model.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ProductService {
    ProductDTO addProduct(ProductDTO productDTO, Long userId);

    Page<ProductDTO> getAllProducts(PageRequest request);

    ProductDTO getProductDetails(Long productId);

    boolean deleteProduct(Long productId);

    ProductDTO modifyProduct(Long productId, ProductDTO productDTO);
}
