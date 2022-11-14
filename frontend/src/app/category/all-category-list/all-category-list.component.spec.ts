import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoryListComponent } from './all-category-list.component';

describe('AllCategoryListComponent', () => {
  let component: AllCategoryListComponent;
  let fixture: ComponentFixture<AllCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
