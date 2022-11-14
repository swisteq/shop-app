import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/category-service/category.service';
import { Category } from 'src/app/model/category';
import { PageResponse } from 'src/app/model/pagination';

@Component({
  selector: 'app-all-category-list',
  templateUrl: './all-category-list.component.html',
  styleUrls: ['./all-category-list.component.css']
})
export class AllCategoryListComponent implements OnInit {
  pageResponse: PageResponse<Category> = {
    content: [],
    totalElements: 0
  }

  categoryList: Category[] = [];
  loadingList: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
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


  loadPage(pageEvent?: PageEvent): void{
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

}
