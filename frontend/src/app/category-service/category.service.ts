import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getDefaultCategory(): Category{
    return {
      name: ''
    }
  }

  sendCategoryToBackend(request: Category): Observable<Object>{
    return this.http.post('http://localhost:8080/api/category/' , request);
  }

  getAllCategories(): Observable<Object>{
    return this.http.get('http://localhost:8080/api/category/');
  }
}
