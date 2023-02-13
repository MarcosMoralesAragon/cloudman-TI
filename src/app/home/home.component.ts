import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Holiday } from '../models/holiday';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  week: any = [
    "MONDAY",
    "TUESDAY",
    "WENSDAY",
    "THUSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
  ];


  monthSelect: any[] = [];
  holidays : Holiday[] = []
  dateSelect: any;
  dateValue: any;
  actualDate = new Date()

  constructor(private dataService: DataProviderService) {

  }

  ngOnInit(): void {
    this.dataService.getHolidaysData().subscribe(
      r => {
        r.forEach((holiday : any) => {
          this.holidays.push(this.adaptToInterFace(holiday))
        });
        console.log(this.holidays)
        this.getDaysFromDate((this.actualDate.getMonth() + 1), this.actualDate.getFullYear())
      }
    )
  }


  getDaysFromDate(month: number, year: number) {

    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    this.monthSelect = this.createMonthArray(numberDays, month, year)
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }


  // **
  // Adapts the holiday response of the server to the interface used
  // @return Holiday item parsed
  // **
  adaptToInterFace(holiday: any): Holiday{
    var adaptedHoliday : Holiday = {} as Holiday
    // Splits the date in 3 parts [year, month, day]
    var splitedHolidayDate = holiday.day.split("-")
    
    // The 1 digit days comes with a 0 in front so with this part we get rid of it
    if (splitedHolidayDate[2].length > 1){
      splitedHolidayDate[2] = splitedHolidayDate[2].split('')[splitedHolidayDate[2].length - 1]
    }

    return {
      day:  splitedHolidayDate[2],
      month:  splitedHolidayDate[1],
      type: holiday.type,
      description: holiday.description,
    }
  }


  // **
  // Check if the given date is added in the holiday list
  // @return {
  //    type: The type of holiday (If its not holiday is "")
  //    description: The description of holiday (If its not holiday is "")
  // }
  // **
  checkIfHoliday(day: number, month: number) : any{
    var result = {
      type: "",
      description: ""
    }
    this.holidays.forEach(holiday => {
      if (holiday.day == day.toString() && holiday.month == month.toString()){
        result = {
          type: holiday.type,
          description: holiday.description
        }
      }
    })
    return result
  }

  
  // **
  // Given a month and a year, it will return an array containing the number of days the month has
  // @return List of days
  // **
  createMonthArray(numberDays: any, month: any, year: any){
    return Object.keys([...Array(numberDays)]).map((day: any) => {

      day = parseInt(day) + 1;
      var isToday = false

      if (day == this.actualDate.getDate() && month == (this.actualDate.getMonth() + 1)){
        isToday = true
      }

      let isHoliday : any = this.checkIfHoliday(day, month)
      const dayObject = moment(`${year}-${month}-${day}`);

      return {
        name: dayObject.format("dddd"),
        value: day,
        indexWeek: dayObject.isoWeekday(),
        today : isToday,
        type: isHoliday.type,
        description: isHoliday.description
      };
    });
  }
}
