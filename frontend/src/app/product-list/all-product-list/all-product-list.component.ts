import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageResponse } from 'src/app/model/pagination';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/product-service/products.service';

@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-product-list.component.html',
  styleUrls: ['./all-product-list.component.css']
})
export class AllProductListComponent implements OnInit {
  pageResponse: PageResponse<Product> = {
    content: [],
    totalElements: 0
  };

  loadingList: boolean = false;
  pageEvent?: PageEvent;

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar){
    }

  getProductsFromBackend(page?: number, size?: number){
    this.productsService.getProductsFromBackend(page, size)
    .subscribe({
      next: (data) =>{
        console.log(data)

        this.pageResponse = data;
      },
      error: (error) => {
        console.log(error)

      }
    })
  }

  loadChangedPage(pageEvent?: PageEvent): void{
    this.getProductsFromBackend(pageEvent?.pageIndex, pageEvent?.pageSize)
  }

  deleteProduct(deletedProductId: number): void {
    this.productsService.deleteProductFromBackend(deletedProductId)
      .subscribe({
        next: (_) => {
          this.snackBar.open('Product has been deleted', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000
          })
          this.loadChangedPage(this.pageEvent);
        },
        error: (error) => {
          this.snackBar.open(`Error: ${error.message}`, undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000,
            panelClass: "error-snackbar",
          })
          console.log(error)
        }
      })
  }

  ngOnInit(): void {
  }

}
