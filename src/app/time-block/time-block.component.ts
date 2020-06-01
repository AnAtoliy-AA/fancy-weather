import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app.state.service';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-time-block',
  templateUrl: './time-block.component.html',
  styleUrls: ['./time-block.component.scss']
})
export class TimeBlockComponent implements OnInit {

  private date = new Date();

  daysLanguageConfig: any = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ru: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    be: ['Нядзеля', 'Панядзелак', 'Ауторак', 'Серада', 'Чацвер', 'Пятнiца', 'Субота']
  }

  monthLanguageConfig: any = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    be: ['Студзеня', 'Лютага', 'Сакавика', 'Красавика', 'Мая', 'Чэрвеня', 'Ліпеня', 'Жниуня', 'Верасня', 'Кастрычника', 'Лiстапада', 'Снежня']
  }

  timeOptionsNames: Observable<any> = this.appStateService.language.pipe(
    map(lan => {
      const currentDayNumber = this.date.getDay();
      const currentMonthNumber = this.date.getMonth();

      const weekDay = this.daysLanguageConfig[lan][currentDayNumber];
      const nextWeekDay = this.daysLanguageConfig[lan][currentDayNumber + 1];
      const secondWeekDay = this.daysLanguageConfig[lan][currentDayNumber + 2];
      const thirdWeekDay = this.daysLanguageConfig[lan][currentDayNumber + 3];

      const monthName = this.monthLanguageConfig[lan][currentMonthNumber];

      return {
        weekDay: weekDay,
        nextWeekDay: nextWeekDay,
        secondWeekDay: secondWeekDay,
        thirdWeekDay: thirdWeekDay,
        monthName: monthName
      }
    }
    ))

  public hour: any;
  public minute: string;
  public second: string;
  public day: number;
  public year: number;

  constructor(private appStateService: AppStateService) {

  }

  location: Observable<string> = this.appStateService.geoInfo
    .pipe(
      filter(info => !!info),
      map(info => info.locationCity || '')
    );

  ngOnInit(): void {
    this.getCurrentTime();
  }

  private getCurrentTime() {
    setInterval(() => {
      const date = new Date();

      this.updateDate(date);
    }, 1000);

    this.day = this.date.getDate();
    this.year = this.date.getFullYear();
  }

  private updateDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    this.hour = hours < 10 ? '0' + hours : hours.toString();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }
}
