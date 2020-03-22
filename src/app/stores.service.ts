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

export interface CartItem {
  storeItem: Item;
  qty: number;
}

export interface CartStore {
  id: number;
  name: string;
  items: { [key: string]: CartItem };
}

export interface Item {
  name: string;
  price: string;
  priceNumber: number;
}

function cloneStoreForCart(store: Store): CartStore {
  return {
    id: store.id,
    items: {},
    name: store.name,
  };
}

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  cart: { [key: number]: CartStore } = {};

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
    const cartStore = this.getCartStore(store);
    const cartItem = this.getCartItem(cartStore, item);
    cartItem.qty += 1;
    if (cartItem.qty === 1) {
      this.cartCount$.next(this.cartCount$.getValue() + 1);
    }
    this.cart$.next(Object.values(this.cart));
  }

  private getCartItem(cartStore: CartStore, item: Item) {
    let cartItem: CartItem = cartStore.items[item.name];
    if (!cartItem) {
      cartItem = {
        storeItem: item,
        qty: 0
      };
      cartStore.items[item.name] = cartItem;
    }
    return cartItem;
  }

  private getCartStore(store: Store) {
    let cartStore = this.cart[store.id];
    if (!cartStore) {
      cartStore = cloneStoreForCart(store);
      this.cart[store.id] = cartStore;
    }
    return cartStore;
  }

  getStore(id: number) {
    return of(this.stores.find(store => store.id === id));
  }

  removeFromCart(store: CartStore, itemToRemove: CartItem) {
    if (!this.cart[store.id]) {
      return;
    }
    const cartStore = this.cart[store.id];
    if (cartStore.items[itemToRemove.storeItem.name]) {
      this.removeItemFromCartStore(cartStore, itemToRemove);
    }
  }

  private removeItemFromCartStore(cartStore: CartStore, itemToRemove: CartItem) {
    delete cartStore.items[itemToRemove.storeItem.name];
    if (Object.keys(cartStore.items).length === 0) {
      delete this.cart[cartStore.id];
    }
    this.emitCart();
    this.cartCount$.next(this.cartCount$.getValue() - 1);
  }

  removeQty(store: CartStore, item: CartItem) {
    this.changeCartItem(store, item, cartItem => {
      cartItem.qty -= 1;
      if (cartItem.qty === 0) {
        this.removeItemFromCartStore(store, item);
      } else {
        this.emitCart();
      }
    });
  }

  private changeCartItem(store: CartStore, item: CartItem,
                         callback: (cartItem: CartItem) => void) {
    if (!this.cart[store.id]) {
      return;
    }
    const cartStore = this.cart[store.id];
    if (cartStore.items[item.storeItem.name]) {
      const cartItem = cartStore.items[item.storeItem.name];
      callback(cartItem);
    }
  }

  private emitCart() {
    this.cart$.next(Object.values(this.cart));
  }

  addQty(store: CartStore, item: CartItem) {
    this.changeCartItem(store, item, cartItem => {
      cartItem.qty += 1;
      this.emitCart();
    });
  }
}
