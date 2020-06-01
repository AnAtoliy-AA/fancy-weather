import { AppStateService, Language } from './../app.state.service';
import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, filter, switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GeolocationInfo } from './geolocation-info.model';
import { apiKeys } from '../../api-keys'

@Injectable()
export class GeolocationInfoService {

  geoLocationInfo: Observable<GeolocationInfo> =
    combineLatest(this.appStateService.searchValue, this.appStateService.language)
      .pipe(
        filter(location => !!location),
        switchMap(([location, language]) => this.getLocation(location, language)),
        filter(geoInfo => !!geoInfo),
      );

  constructor(private http: HttpClient, private appStateService: AppStateService) {
  }

  getCurrentLocation() {
    this.http.get(`https://ipinfo.io/json?token=${apiKeys.ipInfoKey}`).pipe(
      tap((response: any) => {
        const location = response.loc.split(',');
        const locationCity = response.city;
        const latitude = +location[0];
        const longitude = +location[1];
        const geoInfo = this.calculateGeoInfo(locationCity, latitude, longitude);
        this.appStateService.setSearchValue(geoInfo.locationCity);
      })
    ).subscribe();
  }

  getLocation(location: string, language: Language): Observable<GeolocationInfo> {

    return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKeys.openCageDataKey}&pretty=1&no_annotations=1&language=${language}`)
      .pipe(
        map((response: any) => {
          const latitude = response.results[0].geometry.lat;
          const longitude = response.results[0].geometry.lng;
          const loadedLocation = response.results[0].formatted;
          const geoInfo = this.calculateGeoInfo(loadedLocation, latitude, longitude);

          this.appStateService.setGeoInfo(geoInfo);

          return geoInfo;
        }),
        catchError((err: any) => {
          console.warn('Error on get https://api.opencagedata.com: ', err);

          return of(null) as Observable<GeolocationInfo>;
        })
      );
  }

  private calculateGeoInfo(location: string, latitude: number, longitude: number): GeolocationInfo {
    const latitudeGrad = Math.trunc(latitude);
    const laitudeMin = Math.abs(Math.trunc((latitude - latitudeGrad) * 100));
    const longitudeGrad = Math.trunc(longitude);
    const longitudeMin = Math.abs(Math.trunc((longitude - longitudeGrad) * 100));

    return {
      locationCity: location,
      latitude: latitude,
      longitude: longitude,
      latitudeGrad: latitudeGrad,
      laitudeMin: laitudeMin,
      longitudeGrad: longitudeGrad,
      longitudeMin: longitudeMin,
    }
  }

}
