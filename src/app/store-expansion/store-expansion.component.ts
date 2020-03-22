import {Component, Input, OnInit} from '@angular/core';
import {Item, Store, StoresService} from '../stores.service';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-store-expansion',
  templateUrl: './store-expansion.component.html',
  styleUrls: ['./store-expansion.component.scss']
})
export class StoreExpansionComponent implements OnInit {

  @Input() store: Store;

  constructor(private storeService: StoresService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  addToCard(store: Store, item: Item) {
    this.snackBar.open(item.name + ' zum Warenkorb hinzugefügt');
    this.storeService.addToCart(store, item);
  }
}
