import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface application {
  partnerName;
  email;
  phone;
  contactPerson;
  appliedOn;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http:HttpClient) { }

   getApplications(){
     return this.http.get<any>('assets/data.json')
     .toPromise()
     .then(res => <application[]>res.data)
     .then(data => { return data; });
   }

}
