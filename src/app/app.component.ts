import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStateService, Language, TemperatureScale } from './app.state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fancy-weather';

  constructor(private http: HttpClient, private appStateService: AppStateService) {

    const language = (localStorage.getItem('fancyWeatherLanguage') || 'en') as Language;
    this.appStateService.setLanguage(language);

    const tempScale = (localStorage.getItem('tempScale') || 'celsius') as TemperatureScale;
    this.appStateService.setTemperatureScale(tempScale);
  }

  response: any;
  mainBackgroundImgUrl: any;

  ngOnInit() {
    this.getMainBackgroundImage();
  }

  getMainBackgroundImage() {
    this.http.get('https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=IRIcDKQEbwRprAUG2wFBBE-_6jjNbpKuDpClqw1mFDw')
      .subscribe((response) => {
        this.response = response;
        this.mainBackgroundImgUrl = this.response.urls.full;

        return this.mainBackgroundImgUrl;
      });

  }

}

