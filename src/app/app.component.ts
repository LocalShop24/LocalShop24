import { Component } from '@angular/core';
import {Store, StoresService} from './stores.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'localshop24';

  stores$ = new BehaviorSubject([]);

  constructor(public storesService: StoresService) {
    storesService.getStores().subscribe(next => this.stores$.next(next));
  }
}
