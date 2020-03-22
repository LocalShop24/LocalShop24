import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './cart/cart.component';
import {StoreViewComponent} from './store-view/store-view.component';


const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'store/:id', component: StoreViewComponent},
  {path: '**', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
