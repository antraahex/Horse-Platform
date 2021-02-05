import { ApplicationsService, application } from './../applications.service';
import { Component, OnInit } from '@angular/core';


export interface MenuItem{
  label,
  icon,
  command
}
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})


export class ApplicationsComponent implements OnInit {
 status: string[];
  applicationStatus:string;
  applicationsData: application[];
  items: MenuItem[];
  constructor(private appService: ApplicationsService) { 
    this.status=[      
      "active","deactive"
  ];
  }

  ngOnInit() {
    this.appService.getApplications().
    then( applicationsData=> this.applicationsData = applicationsData);

    this.items = [
      {label: 'Move to inactive',icon:'pi pi-external-link', command: () => {
          this.update();
      }
    },
      {label: 'Delete', icon:'pi pi-times', command: () => {
        this.delete();
    }
  }
  ];
  }

  update(){
    console.log("update");
  }
  save(){
    console.log("save");
  }
  delete(){
    console.log("delete");
  }
}

