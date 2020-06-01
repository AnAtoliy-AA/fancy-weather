export interface CurrentWeather {
  currentCityWeather: string;
  currentTemperature: number;
  currentWeatherDiscription: string;
  currentWeatherIconUrl: string;
  currentTemperatureFeelsLike: number;
  currentWind: number;
  currentHumidity: string;
  nextDayTemperature: number;
  nextDayWeatherIconUrl: string,
  nextSecondDayTemperature: number;
  nextSecondDayWeatherIconUrl: string;
  nextThirdDayTemperature: number;
  nextThirdDayWeatherIconUrl: string;
}
