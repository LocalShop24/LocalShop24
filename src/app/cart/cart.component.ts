import { Component, OnInit } from '@angular/core';
import {Store, StoresService} from '../stores.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: BehaviorSubject<Store[]> = new BehaviorSubject([]);
  sum$ = new BehaviorSubject(0);

  constructor(private storesService: StoresService) {
    storesService.cart$.subscribe(cart => {
      this.cart$.next(cart);
      this.calculateSum(cart);
    });
  }

  ngOnInit(): void {
  }

  private calculateSum(cart: Store[]) {
    let sum = 0;
    cart.forEach(store => sum += this.calculateStoreSum(store));
    this.sum$.next(sum);
  }

  private calculateStoreSum(store: Store) {
    let sum = 0;
    store.items.forEach(item => {
      sum += item.priceNumber;
    });
    return sum;
  }
}
