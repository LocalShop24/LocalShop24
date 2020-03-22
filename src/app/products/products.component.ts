import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Store, StoresService} from '../stores.service';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

declare var ol: any;
declare const OpenLayers: any;
declare const Select: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  stores$ = new BehaviorSubject([]);
  formGroup: FormGroup;

  map: any;

  constructor(public storesService: StoresService,
              private router: Router) {
    storesService.getStores().subscribe(next => this.stores$.next(next));
  }

  ngOnInit(): void {
    const searchControl = new FormControl();
    this.formGroup = new FormGroup({
      search: searchControl
    });
    this.subscribeToSearch(searchControl);
    this.initMap();
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

  private initMap() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([13.391356, 52.517685]),
        zoom: 14
      }),
    });
    this.storesService.getStores().subscribe(stores => {
      stores.forEach(store => this.addStoreToMap(store));
    });
    this.map.on('singleclick', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (featureClicked, layer) => {
        return featureClicked;
      });
      if (feature) {
        const store = feature.N.store;
        this.storeClick(store);
      }
    });
  }

  private addStoreToMap(store: Store) {
    // Add vector layer with a feature and a style using an icon
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([store.coordinates.longitude,
                store.coordinates.latitude])
            ),
            store
          })
        ]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../../assets/images/marker.png'
        })
      })
    });

    this.map.addLayer(vectorLayer);
  }

  private storeClick(store: Store) {
    this.router.navigateByUrl('/store/' + store.id);
  }
}
