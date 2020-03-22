import {Injectable} from '@angular/core';
import {of} from 'rxjs';

export interface Store {
  name: string;
  distance: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor() {
  }

  getStores() {
    const stores: Store[] = [
      {name: 'DER Bioladen Nienburg', distance: '300m'},
      {name: 'lehmanns bioladen', distance: '500m'},
      {name: 'Kornkraft um die Ecke', distance: '400m'},
      {name: 'LIENSFELDER Landhof', distance: '2km'},
    ];
    return of(stores);
  }
}
