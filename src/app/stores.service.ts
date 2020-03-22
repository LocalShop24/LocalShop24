import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';

export interface Store {
  id: number;
  name: string;
  distance: string;
  items: Item[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Item {
  name: string;
  price: string;
  priceNumber: number;
}

function cloneStoreWithoutItems(store: Store): Store {
  return {
    id: store.id,
    items: [],
    distance: store.distance,
    name: store.name,
    coordinates: store.coordinates,
  };
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  cart: { [key: number]: Store } = {};

  items: { [key: number]: Item[] } = {
    1: [
      {name: 'Apfel', price: '1,00€', priceNumber: 1},
      {name: 'Birne', price: '2,00€', priceNumber: 2},
    ],
    2: [
      {name: 'Honig', price: '9,00€', priceNumber: 9},
      {name: 'Brokkoli', price: '5,00€', priceNumber: 5},
    ],
    3: [
      {name: 'Brot', price: '2,00€', priceNumber: 2},
      {name: 'Brötchen', price: '1,00€', priceNumber: 1},
    ],
    4: [
      {name: 'Eier', price: '3,00€', priceNumber: 3},
      {name: 'Kartoffeln', price: '4,00€', priceNumber: 4},
    ]
  };
  stores: Store[] = [
    {
      id: 1, name: 'DER Bioladen Nienburg', distance: '300m',
      items: this.items[1], coordinates: {
        latitude: 52.513760,
        longitude: 13.381515
      }
    },
    {
      id: 2, name: 'Lehmanns bioladen', distance: '500m',
      items: this.items[2], coordinates: {
        latitude: 52.519871,
        longitude: 13.393252
      }
    },
    {
      id: 3, name: 'Kornkraft um die Ecke', distance: '400m',
      items: this.items[3], coordinates: {
        latitude: 52.517729,
        longitude: 13.391149,
      }
    },
    {
      id: 4, name: 'LIENSFELDER Landhof', distance: '2km',
      items: this.items[4], coordinates: {
        latitude: 52.513120,
        longitude: 13.386536,
      }
    },
  ];

  cart$ = new BehaviorSubject([]);
  cartCount$ = new BehaviorSubject(0);

  constructor() {
  }

  getStores() {
    return of(this.stores);
  }

  searchForItem(query: string) {
    query = query.toLowerCase();
    const result: Store[] = [];
    this.stores.forEach(store => {
      const filteredItems = store.items.filter(item => item.name.toLowerCase().indexOf(query) !== -1);
      if (filteredItems.length > 0) {
        result.push({
          id: store.id,
          name: store.name,
          distance: store.distance,
          items: filteredItems,
          coordinates: store.coordinates
        });
      }
    });
    return of(result);
  }

  addToCart(store: Store, item: Item) {
    if (!this.cart[store.id]) {
      this.cart[store.id] = cloneStoreWithoutItems(store);
    }
    this.cart[store.id].items.push(item);
    this.cartCount$.next(this.cartCount$.getValue() + 1);
    this.cart$.next(Object.values(this.cart));
  }

  getStore(id: number) {
    return of(this.stores.find(store => store.id === id));
  }
}
