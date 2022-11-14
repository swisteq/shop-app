package com.project.spring.model;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private Double price;

    private ProductType productType;

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Category category;

    @OneToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private ApplicationUser author;

}
