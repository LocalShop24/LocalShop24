import {Component, OnInit} from '@angular/core';
import {CartItem, CartStore, StoresService} from '../stores.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: BehaviorSubject<CartStore[]> = new BehaviorSubject([]);
  sum$ = new BehaviorSubject(0);

  constructor(private storesService: StoresService) {
    storesService.cart$.subscribe(cart => {
      this.cart$.next(cart);
      this.calculateSum(cart);
    });
  }

  ngOnInit(): void {
  }

  private calculateSum(cart: CartStore[]) {
    let sum = 0;
    cart.forEach(store => sum += this.calculateStoreSum(store));
    this.sum$.next(sum);
  }

  private calculateStoreSum(store: CartStore) {
    let sum = 0;
    Object.values(store.items).forEach(item => {
      sum += item.storeItem.priceNumber * item.qty;
    });
    return sum;
  }

  removeItem(store: CartStore, item: CartItem) {
    this.storesService.removeFromCart(store, item);
  }

  getStoreItems(store: CartStore) {
    return Object.values(store.items);
  }

  removeQty(store: CartStore, item: CartItem) {
    this.storesService.removeQty(store, item);
  }

  addQty(store: CartStore, item: CartItem) {
    this.storesService.addQty(store, item);
  }
}
