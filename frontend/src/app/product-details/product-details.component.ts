import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductEditRequest } from '../model/productEditRequest';
import { ProductRequest } from '../model/productRequest';
import { ProductType } from '../model/productType';
import { ProductsService } from '../product-service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: ProductRequest;
  productEdit: ProductEditRequest;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.productDetails = this.productsService.getDefaultProduct()
    // this.productEdit = this.productsService.getDefaultProduct()
    this.productEdit = this.productsService.getDefaultProductToEdit()

    this.route.params.subscribe((params) => {
      const paramProductId = params['id']

      this.productsService.getProductDetails(paramProductId)
      .subscribe({
        next: (product) => {
          this.productDetails = product;
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  ngOnInit(): void {
  }

  sendEditedProduct(): void {
    this.route.params.subscribe((params) => {
      const paramProductId = params['id']

      this.productsService.sendEditedProductToBackend(paramProductId, this.productEdit)
      .subscribe({
        next: (data) => {
          this.snackbar.open('Product has been edited', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 3000
          })
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
    console.log('Edited product sent')
    console.log(this.productEdit)
  }

  clearForm(): void {
    this.productEdit = this.productsService.getDefaultProductToEdit()
  }

}
