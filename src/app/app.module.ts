import { WeatherBlockService } from './weather-block/weather-block.service';
import { AppStateService } from './app.state.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeolocationComponent } from './geolocation-info/geolocation.component';
import { ControlsBlockComponent } from './controls-block/controls-block.component';
import { TimeBlockComponent } from './time-block/time-block.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import { GeolocationInfoService } from './geolocation-info/geolocation-info.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './geolocation-info/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GeolocationComponent,
    ControlsBlockComponent,
    TimeBlockComponent,
    WeatherBlockComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AppStateService, GeolocationInfoService, WeatherBlockService, TimeBlockComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
