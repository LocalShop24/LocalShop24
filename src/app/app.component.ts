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
  title = 'LocalShop24';


  constructor(public storesService: StoresService) {
  }

  ngOnInit(): void {
  }

}
