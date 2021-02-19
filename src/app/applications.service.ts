import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface application {
  id: number;
  name: string;
  date_of_birth: string;
  due_date: string;
  gender: string;
  heart_rate: number;
  is_monitoring: boolean;
  pregnant: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http: HttpClient, private route: Router) { }

  getApplications(): Observable<any> {
    return this.http.get<any>('http://73492cd29205.ngrok.io/horses')

  }

  addNewHorse(details): Observable<any> {
    return this.http.post<any>('http://73492cd29205.ngrok.io/horses', details)

  }

  updateHorse(details, id): Observable<any> {
    return this.http.put<any>('http://73492cd29205.ngrok.io/horses/' + id, details)
  }

  deleteHorse(id): Observable<any> {
    return this.http.delete<any>('http://73492cd29205.ngrok.io/horses/' + id);
  }

  monitorHorse(id, data): Observable<any> {
    return this.http.put<any>('http://73492cd29205.ngrok.io/horses/monitor/' + id, data)
  }




}
