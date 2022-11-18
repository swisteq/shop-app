package com.project.spring.service;

import com.project.spring.model.ApplicationUser;
//import com.project.spring.model.Category;
import com.project.spring.model.Category;
import com.project.spring.model.Product;
import com.project.spring.model.ProductType;
import com.project.spring.model.dto.ProductDTO;
import com.project.spring.model.mapper.ApplicationUserMapper;
import com.project.spring.model.mapper.ProductMapper;
import com.project.spring.repository.ApplicationUserRepository;
//import com.project.spring.repository.CategoryRepository;
import com.project.spring.repository.CategoryRepository;
import com.project.spring.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ApplicationUserRepository applicationUserRepository;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final ApplicationUserMapper applicationUserMapper;

    private final ProductMapper productMapper;

    @Override
    public ProductDTO addProduct(ProductDTO productDTO, Long userId) {
        ApplicationUser author = applicationUserRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User does not exist!"));

        if(productRepository.findByTitle(productDTO.getTitle()) != null){
            throw new IllegalArgumentException("Product with this title already exists!");
        } else {
            Category productCategory = categoryRepository.findByName(productDTO.getCategoryName());

            Product product = productMapper.mapCreateProductRequestToProduct(productCategory, productDTO, author);

            return productMapper.mapProductToDTO(productRepository.save(product));
        }
    }

    @Override
    public Page<ProductDTO> getAllProducts(PageRequest request) {
        Page<Product> productsPage = productRepository.findAll(request);
        List<ProductDTO> productDTOList = productsPage.getContent().stream()
                .map(productMapper::mapProductToDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(productDTOList, productsPage.getPageable(), productsPage.getTotalElements());
    }

    @Override
    public ProductDTO getProductDetails(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Can't get details of not existing product"));
        return productMapper.mapProductToDTO(product);
    }

    @Override
    public boolean deleteProduct(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()){
            return false;
        }
        productRepository.deleteById(productId);
        return true;
    }

    @Override
    public ProductDTO modifyProduct(Long productId, ProductDTO productDTO) {
        final String updatedTitle = productDTO.getTitle();
        final Category updatedCategory = categoryRepository.findByName(productDTO.getCategoryName());
        final String updatedDescription = productDTO.getDescription();
        final Double updatedPrice = productDTO.getPrice();
        final ProductType updatedProductType = productDTO.getProductType();

        Product productToEdit = productRepository.findById(productId)
                .map(p -> {
                    p.setTitle(updatedTitle != null ? updatedTitle : p.getTitle());
                    p.setCategory(updatedCategory != null ? updatedCategory : p.getCategory());
                    p.setDescription(updatedDescription != null ? updatedDescription : p.getDescription());
                    p.setPrice(updatedPrice != null ? updatedPrice : p.getPrice());
                    p.setProductType(updatedProductType != null ? updatedProductType : p.getProductType());
                    return p;
                })
                .orElseThrow(() -> new NoSuchElementException("Can't modify not existing product"));
        return productMapper.mapProductToDTO(productRepository.save(productToEdit));
    }
}