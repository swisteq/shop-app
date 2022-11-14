import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
import { PageResponse } from '../model/pagination';
import { Product } from '../model/product';
import { ProductEditRequest } from '../model/productEditRequest';
import { ProductRequest } from '../model/productRequest';
import { ProductType } from '../model/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList: Product[] = [];
  loadingList: boolean = false;

  constructor(
    private authService: AuthenticationServiceService,
    private http: HttpClient
  ) { }

  getDefaultProduct(): ProductRequest{
    return {
      title: '',
      description: '',
      price: 0,
      categoryName: '',
      productType: ProductType.SOLID,
      authorId: 0
    }
  }

  getDefaultProductToEdit(): ProductEditRequest{
    return {
      title: null,
      description: null,
      price: null,
      categoryName: null,
      productType: null
    }
  }

  getProductsFromBackend(page?: number | null, size?: number | null): Observable<PageResponse<Product>>{
    const params = {
      page: (page /* !== undefined */ ? page : 0),
      size: (size /* !== undefined */ ? size : 10),
    }

    return this.http.get<PageResponse<Product>>('http://localhost:8080/api/product', {
      params: params
    });
  }

  deleteProductFromBackend(productId: number): Observable<Object> {
    return this.http.delete('http://localhost:8080/api/product/' + productId)
  }

  sendProductToBackend(request: ProductRequest): Observable<Object>{
    return this.http.post('http://localhost:8080/api/product/' + this.authService.loggedInUser?.id!, request)
  }

  sendEditedProductToBackend(productId: number, request: ProductEditRequest): Observable<Object>{
    return this.http.put('http://localhost:8080/api/product/' + productId, request)
  }

  getProductDetails(productId: number): Observable<ProductRequest> {
    return this.http.get<ProductRequest>('http://localhost:8080/api/product/' + productId);
  }
}
