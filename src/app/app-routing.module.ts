import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/products/1/vehicles', pathMatch: 'full' },
  { path: 'products/:page/:category', component: ProductListComponent },
  { path: 'detail/:url/:origin', component: ProductDetailsComponent },
  { path: 'mycart/:origin', component: CartDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
