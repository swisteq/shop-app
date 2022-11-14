import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from '../category-service/category.service';
import { Category } from '../model/category';
import { Product } from '../model/product';
import { ProductRequest } from '../model/productRequest';
import { ProductsService } from '../product-service/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild('ref') child: ElementRef | any;

  product: ProductRequest;
  sendingProduct: boolean = false;
  notification: string | null = null;
  categoryList: Category[] = [];

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar
  ) {
    this.product = productsService.getDefaultProduct();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  sendProduct(): void {
    this.sendingProduct = true;

    this.productsService.sendProductToBackend(this.product).subscribe({
      next: (data) => {
        this.sendingProduct = false;
        this.snackbar.open('Product has been added', undefined, {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000,
        });
        // this.router.navigate(['/products'])
        console.log(data);
      },
      error: (error) => {
        this.sendingProduct = false;
        this.notification = error.message;

        setTimeout(() => {
          this.renderer.addClass(this.child.nativeElement, 'hidden');
          setTimeout(() => {
            this.notification = null;
          }, 1000);
        }, 3000);
      },
    });
  }

  clearForm(): void {
    this.product = this.productsService.getDefaultProduct();
  }

  getAllCategories(){
    this.categoryService.getAllCategories()
    .subscribe({
      next: (data) => {
        let receivedCategories = data as Category[];
        this.categoryList = receivedCategories;
        // console.log(this.categoryList);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
