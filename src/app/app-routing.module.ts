import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CartComponent} from './cart/cart.component';
import {StoreViewComponent} from './store-view/store-view.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {CheckoutComponent} from './checkout/checkout.component';


const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'store/:id', component: StoreViewComponent},
  {path: 'products/:search', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
