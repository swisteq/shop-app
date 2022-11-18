package com.project.spring.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 3, max = 20)
    private String title;
    @NotBlank
    @NotNull
    @Size(min = 3, max = 100)
    private String description;
    @NotNull
    @Min(0)
    private Double price;
    @NotNull
    private ProductType productType;

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @NotNull
    private Category category;

    @OneToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @NotNull
    private ApplicationUser author;

}
