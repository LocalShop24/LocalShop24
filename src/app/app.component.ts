import {Component, OnInit} from '@angular/core';
import {Store, StoresService} from './stores.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {concatMap, debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'localshop24';

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
