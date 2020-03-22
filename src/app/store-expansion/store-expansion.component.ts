import {Component, Input, OnInit} from '@angular/core';
import {Item, Store, StoresService} from '../stores.service';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-store-expansion',
  templateUrl: './store-expansion.component.html',
  styleUrls: ['./store-expansion.component.scss']
})
export class StoreExpansionComponent implements OnInit {

  @Input() store: Store;

  constructor() { }

  ngOnInit(): void {
  }


}
