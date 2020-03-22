import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../stores.service';

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
