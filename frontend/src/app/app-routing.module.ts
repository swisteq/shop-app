import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminRoleGuard } from './authentication-service/admin-role.guard';
import { AuthenticationGuard } from './authentication-service/authentication.guard';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AllProductListComponent } from './product-list/all-product-list/all-product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AllCategoryListComponent } from './category/all-category-list/all-category-list.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "test", component: TestComponent },
  { path: "home", component: HomeComponent },
  { path: "basket", component: BasketComponent, canActivate: [AuthenticationGuard] },
  { path: "categories", component: AllCategoryListComponent, canActivate: [AuthenticationGuard] },
  { path: "products", component: AllProductListComponent, canActivate: [AuthenticationGuard] },
  { path: "product/add", component: ProductFormComponent, canActivate: [AuthenticationGuard, AdminRoleGuard] },
  { path: "product/details/:id", component: ProductDetailsComponent, canActivate: [AuthenticationGuard, AdminRoleGuard] },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegistrationFormComponent },
  { path: "users", component: UserListComponent, canActivate: [AuthenticationGuard, AdminRoleGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
