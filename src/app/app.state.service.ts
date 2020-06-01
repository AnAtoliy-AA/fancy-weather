import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GeolocationInfo } from './geolocation-info/geolocation-info.model';

export type Language = 'en' | 'ru' | 'be'
export type TemperatureScale = 'celsius' | 'farenheit';

@Injectable()
export class AppStateService {

  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  searchValue: Observable<string> = this.searchValueSubject.asObservable();

  private geoInfoSubject: BehaviorSubject<GeolocationInfo> = new BehaviorSubject(null);
  geoInfo: Observable<GeolocationInfo> = this.geoInfoSubject.asObservable();

  private languageSubject: BehaviorSubject<Language> = new BehaviorSubject('en');
  language: Observable<Language> = this.languageSubject.asObservable();

  private temperatureScaleSubject: BehaviorSubject<TemperatureScale> = new BehaviorSubject('celsius');
  temperatureScale: Observable<TemperatureScale> = this.temperatureScaleSubject.asObservable();

  constructor() { }

  setSearchValue(searchValue: string): void {
    this.searchValueSubject.next(searchValue);
  }

  setGeoInfo(geoInfo: GeolocationInfo): void {
    this.geoInfoSubject.next(geoInfo);
  }

  setLanguage(language: Language): void {
    this.languageSubject.next(language);
    localStorage.setItem('fancyWeatherLanguage', language);
  }

  setTemperatureScale(scale: TemperatureScale): void {
    this.temperatureScaleSubject.next(scale);
    localStorage.setItem('tempScale', scale);
  }
}
