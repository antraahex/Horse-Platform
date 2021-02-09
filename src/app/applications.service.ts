import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface application {
  id:number;
  partnerName:string;
  email:string;
  phone:string;
  contactPerson:string;
  appliedOn:string;
  status:string;
  processStatus:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private http:HttpClient) { }

   getApplications(){
     return this.http.get<any>('assets/MockJson/data.json')
     .toPromise()
     .then(res => <application[]>res.data)
     .then(data => { return data; });
   }

}
