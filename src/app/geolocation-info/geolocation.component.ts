import { GeolocationInfo } from './geolocation-info.model';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeolocationInfoService } from './geolocation-info.service';
import mapboxgl from 'mapbox-gl';
import { tap, map } from 'rxjs/operators';
import { apiKeys } from 'src/api-keys';
import { AppStateService } from '../app.state.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})

export class GeolocationComponent implements OnInit {

  constructor(private geolocationInfoService: GeolocationInfoService, private appStateService: AppStateService) { }

  @ViewChild('mapContainer') private mapContainer: ElementRef;


  infoLanguageConfig: any = {
    en: {
      latitude: 'Latitude',
      longitude: 'Longitude'
    },
    ru: {
      latitude: 'Широта',
      longitude: 'Долгота'
    },
    be: {
      latitude: 'Шырата',
      longitude: 'Даугата'
    }
  }

  infoNames: Observable<any> = this.appStateService.language.pipe(
    map(lan => {

      const latitude = this.infoLanguageConfig[lan]['latitude'];
      const longitude = this.infoLanguageConfig[lan]['longitude'];

      return {
        latitude: latitude,
        longitude: longitude,
      }
    }
    ))


  geolocationInfo: Observable<GeolocationInfo> = this.geolocationInfoService.geoLocationInfo
    .pipe(
      tap(geoInfo => {
        this.mapContainer.nativeElement.innerHTML = '';
        this.getMap(geoInfo.latitude, geoInfo.longitude);
      })
    );

  ngOnInit() {

    this.geolocationInfoService.getCurrentLocation();
  }

  getMap(latitude: number, longitude: number): void {
    mapboxgl.accessToken = apiKeys.mapBox;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [longitude, latitude,],
      zoom: 8
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  }
}
