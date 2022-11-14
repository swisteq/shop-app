import { outputAst } from '@angular/compiler';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from '../../category-service/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

  @ViewChild('ref') child: ElementRef|any;

  @Input("categoryList") categoryList: Category[] = [];
  @Input("loadingList") loadingList: boolean = false;

  @Output() loadCategoriesEvent = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'name'
  ]

  category: Category;
  sendingCategory: boolean = false;
  notification: string | null = null;

  constructor(
    private renderer: Renderer2,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar,
  ) {
    this.category = categoryService.getDefaultCategory();
  }

  ngOnInit(): void {
    this.loadCategoriesEvent.emit()
  }

  loadCategories(event?: PageEvent){
    console.log(event)
    this.loadCategoriesEvent.emit(event)

  }
  sendCategory(): void {
    this.sendingCategory = true;

    this.categoryService.sendCategoryToBackend(this.category).subscribe({
      next: (data) => {
        this.sendingCategory = false;
        this.snackbar.open('Product has been added', undefined, {
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000,
        });
        console.log('dodanie produktu' + data);
        window.location.reload();
      },
      error: (error) => {
        this.sendingCategory = false;
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
    this.category = this.categoryService.getDefaultCategory();
  }
}
