import {Component, OnInit} from '@angular/core';
import {Store, StoresService} from '../stores.service';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {mergeMap, skipWhile} from 'rxjs/operators';
import {ChatAdapter} from 'ng-chat';
import {DemoAdapter} from '../chat-demo-adapter';

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.scss']
})
export class StoreViewComponent implements OnInit {

  store$: BehaviorSubject<Store> = new BehaviorSubject<Store>(undefined);

  public adapter: ChatAdapter = new DemoAdapter();


  constructor(private storesService: StoresService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      skipWhile(map => !map.has('id')),
      mergeMap(map => this.storesService.getStore(parseInt(map.get('id'), 0))),
      skipWhile(store => store === undefined)
    ).subscribe(store => {
      this.store$.next(store);
    });
  }

  public messageSeen(event: any)
  {
    console.log(event);
  }
}
