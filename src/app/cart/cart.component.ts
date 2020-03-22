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

  constructor(private storesService: StoresService) {
    storesService.cart$.subscribe(cart => this.cart$.next(cart));
  }

  ngOnInit(): void {
  }

}
