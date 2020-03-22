import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './cart/cart.component';


const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: '**', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
