import { CurrentWeather } from './current-weather.model';
import { Component, Input } from '@angular/core';
import { WeatherBlockService } from './weather-block.service';
import { Observable } from 'rxjs';
import { AppStateService } from '../app.state.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.scss']
})
export class WeatherBlockComponent {

  @Input() days: string[] = [];

  weatherInfo: Observable<any> = this.appStateService.language
    .pipe(
      map(lan => {
        return {
          feelsLike: this.weatherInfoLanguageConfig[lan]['feelsLike'],
          wind: this.weatherInfoLanguageConfig[lan]['wind'],
          windUnits: this.weatherInfoLanguageConfig[lan]['windUnits'],
          humidity: this.weatherInfoLanguageConfig[lan]['humidity']
        }
      })
    );

  weatherInfoLanguageConfig: any = {
    en: {
      humidity: 'Humidity',
      feelsLike: 'Feels Like',
      wind: 'Wind',
      windUnits: 'm/s'
    },
    ru: {
      humidity: 'Влажность',
      feelsLike: 'Чувствуется как',
      wind: 'Ветер',
      windUnits: 'м/с'
    },
    be: {
      humidity: 'Вільготнасць',
      feelsLike: 'Адчуваецца як',
      wind: 'Паветра',
      windUnits: 'м/с'
    }
  }

  currentWeather: Observable<CurrentWeather> = this.weatherBlockService.weather;

  constructor(private weatherBlockService: WeatherBlockService, private appStateService: AppStateService) { }

}

