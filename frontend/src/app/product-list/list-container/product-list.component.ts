import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/authentication-service/authentication-service.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'identifier',
    'title',
    'category',
    'description',
    'price',
    'productType',
    'edit-button',
    'delete-button'
  ]

  @Input("productList") productList: Product[] = [];
  @Input("totalElements") totalElements: number = 0;
  @Input("loadingList") loadingList: boolean = false;

  @Output() loadProductsEvent = new EventEmitter<PageEvent>();
  @Output() productDeleteEvent = new EventEmitter<number>();

  constructor(
    private router: Router,
    public authService: AuthenticationServiceService
    ) { }

  ngOnInit(): void {
    this.loadProductsEvent.emit({
      pageSize: 5,
      pageIndex: 0,
      length: 0
    });
  }

  loadProducts(event?: PageEvent) {
    console.log(event)
    this.loadProductsEvent.emit(event);
  }

  deleteProduct(id: number): void{
    console.log('Product delete clicked' + id)
    this.productDeleteEvent.emit(id)
  }

  editProduct(id: number): void{
    console.log('Editing product')
    this.router.navigate([`/product/details/${id}`])
  }

}
