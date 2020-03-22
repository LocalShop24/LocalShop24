import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {StoresService} from '../stores.service';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  stores$ = new BehaviorSubject([]);
  formGroup: FormGroup;

  constructor(public storesService: StoresService) {
    storesService.getStores().subscribe(next => this.stores$.next(next));
  }

  ngOnInit(): void {
    const searchControl = new FormControl();
    this.formGroup = new FormGroup({
      search: searchControl
    });
    this.subscribeToSearch(searchControl);
  }

  private subscribeToSearch(searchControl: FormControl) {
    searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap(result => {
        return this.storesService.searchForItem(result);
      }),
    ).subscribe(result => {
      this.stores$.next(result);
    });
  }
}
