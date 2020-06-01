import { Component } from '@angular/core';
import { AppStateService, Language, TemperatureScale } from '../app.state.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';


const temperatureScale = {
  farenheit: 'farenheit',
  celsius: 'celsius'
}
@Component({
  selector: 'app-controls-block',
  templateUrl: './controls-block.component.html',
  styleUrls: ['./controls-block.component.scss']
})
export class ControlsBlockComponent {

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appStateService: AppStateService,
    private appComponent: AppComponent
  ) {
    this.searchForm = this.formBuilder.group({
      searchValue: ''
    });
  }


  search(value: any): void {
    this.appComponent.getMainBackgroundImage();
    this.appStateService.setSearchValue(value.searchValue);
  }

  changeBackgroundImage(): void {
    this.appComponent.getMainBackgroundImage();
  }

  changeTemperatureScaleFarenheit(): void {
    this.appStateService.setTemperatureScale(temperatureScale.farenheit as TemperatureScale);
  }

  changeTemperatureScaleCelsius(): void {
    this.appStateService.setTemperatureScale(temperatureScale.celsius as TemperatureScale);
  }

  changeLanguage(language: string): void {
    this.appStateService.setLanguage(language as Language);
  }
}