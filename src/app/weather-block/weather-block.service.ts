import { AppStateService, Language, TemperatureScale } from '../app.state.service';
import { CurrentWeather } from './current-weather.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { apiKeys } from '../../api-keys'

const weatherDays = {
  today: 0,
  nextDay: 8,
  nextSecondDay: 16,
  nextThirdDay: 24,
}

const temperatureScale = {
  farenheit: 'farenheit',
  celsius: 'celsius'
}
@Injectable()
export class WeatherBlockService {
  constructor(private http: HttpClient, private appStateService: AppStateService) {
  }

  private loadedWeather: Observable<CurrentWeather> =
    combineLatest(this.appStateService.searchValue, this.appStateService.language)
      .pipe(
        filter(location => !!location),
        switchMap(([location, language]) => this.getCurrentWeather(location, language)),
        filter(geoInfo => !!geoInfo),
      );

  weather: Observable<CurrentWeather> =
    combineLatest(this.loadedWeather, this.appStateService.temperatureScale)
      .pipe(
        map(([weather, scale]) => this.updateTempValues(weather, scale)),
      );

  private updateTempValues(currentWeather: CurrentWeather, tempScale: TemperatureScale): CurrentWeather {
    const weather = { ...currentWeather };
    if (tempScale === temperatureScale.farenheit) {
      weather.currentTemperature = this.transformToFarenheit(weather.currentTemperature);
      weather.nextDayTemperature = this.transformToFarenheit(weather.nextDayTemperature);
      weather.nextSecondDayTemperature = this.transformToFarenheit(weather.nextSecondDayTemperature);
      weather.nextThirdDayTemperature = this.transformToFarenheit(weather.nextThirdDayTemperature);
    }

    return weather;
  }

  private getCurrentWeather(locationCity: string, language: Language): Observable<CurrentWeather> {

    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&lang=${language}&units=metric&APPID=${apiKeys.openWeatherMapApiKey}`)
      .pipe(
        map((response: any) => {
          const currentCityWeather = response.list[weatherDays.today].weather[0].main;
          const currentTemperature = Math.trunc(response.list[weatherDays.today].main.temp);
          const currentWeatherIconUrl = `http://openweathermap.org/img/w/${response.list[weatherDays.today].weather[0].icon}.png`;

          const currentWeatherDiscription = response.list[weatherDays.today].weather[0].description.toUpperCase();
          const currentTemperatureFeelsLike = Math.trunc(response.list[weatherDays.today].main.feels_like);
          const currentWind = Math.trunc(response.list[weatherDays.today].wind.speed);
          const currentHumidity = response.list[weatherDays.today].main.humidity;

          const nextDayTemperature = Math.trunc(response.list[weatherDays.nextDay].main.temp);
          const nextDayWeatherIconUrl = `http://openweathermap.org/img/w/${response.list[weatherDays.nextDay].weather[0].icon}.png`;

          const nextSecondDayTemperature = Math.trunc(response.list[weatherDays.nextSecondDay].main.temp);
          const nextSecondDayWeatherIconUrl = `http://openweathermap.org/img/w/${response.list[weatherDays.nextSecondDay].weather[0].icon}.png`;

          const nextThirdDayTemperature = Math.trunc(response.list[weatherDays.nextThirdDay].main.temp);
          const nextThirdDayWeatherIconUrl = `http://openweathermap.org/img/w/${response.list[weatherDays.nextThirdDay].weather[0].icon}.png`;

          return {
            currentCityWeather: currentCityWeather,
            currentTemperature: currentTemperature,
            currentWeatherDiscription: currentWeatherDiscription,
            currentWeatherIconUrl: currentWeatherIconUrl,
            currentTemperatureFeelsLike: currentTemperatureFeelsLike,
            currentWind: currentWind,
            currentHumidity: currentHumidity,
            nextDayTemperature: nextDayTemperature,
            nextDayWeatherIconUrl: nextDayWeatherIconUrl,
            nextSecondDayTemperature: nextSecondDayTemperature,
            nextSecondDayWeatherIconUrl: nextSecondDayWeatherIconUrl,
            nextThirdDayTemperature: nextThirdDayTemperature,
            nextThirdDayWeatherIconUrl: nextThirdDayWeatherIconUrl
          };
        }),
        catchError((err: any) => {
          console.warn('Error on get https://api.openweathermap.org: ', err);

          return of(null) as Observable<CurrentWeather>;
        })
      )
  }

  private transformToFarenheit(celsium: number): number {

    return Math.trunc((celsium * 9 / 5) + 32);
  }
}
