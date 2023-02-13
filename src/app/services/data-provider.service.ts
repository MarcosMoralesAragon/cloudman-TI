import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = "https://cloudmanlabs.api.stdlib.com/challenge";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http:HttpClient) { }

  // **
  // Call to the api provided to extract the user data
  // @return Observable with the result of the call
  // **
  getUserData() : Observable<any>{
    return this.http.get(url + "/user/")
  }

  getHolidaysData() : Observable<any>{
    return this.http.get(url + "/holidays/")
  }
}
