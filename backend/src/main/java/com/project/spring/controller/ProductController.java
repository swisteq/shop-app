package com.project.spring.controller;

import com.project.spring.component.PrincipalComponent;
import com.project.spring.model.dto.ProductDTO;
import com.project.spring.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
@PreAuthorize("isAuthenticated()")
public class ProductController {
    private final ProductService productService;

    private final PrincipalComponent principalComponent;

    @PostMapping("/{id}")
    public ProductDTO addProduct(
            @Valid
            @RequestBody ProductDTO productDTO,
            @PathVariable(name = "id") Long userId,
            UsernamePasswordAuthenticationToken principal) {

        return productService.addProduct(productDTO , principalComponent.getUser(principal, userId).getId());
    }

    @GetMapping()
    public Page<ProductDTO> getAllProducts(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
            return productService.getAllProducts(PageRequest.of(page, size));

    }

    @GetMapping("/{id}")
    public ProductDTO getProductDetails(@PathVariable Long id){
        return productService.getProductDetails(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        boolean result = productService.deleteProduct(id);
        if (result) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @PutMapping("/{id}")
    public ProductDTO modifyProduct(
            @RequestBody ProductDTO productDTO,
            @PathVariable(name = "id") Long productId) {
        return productService.modifyProduct(productId, productDTO);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
