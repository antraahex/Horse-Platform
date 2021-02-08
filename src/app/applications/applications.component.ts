import { ApplicationsService, application } from './../applications.service';
import { Component, OnInit } from '@angular/core';

export interface MenuItem{
  label,
  icon,
  command
}

interface Status {
  label: string,
  value: string
}

interface processStatus {
  label: string,
  value: string
}

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements OnInit {
  statusList: Status[];
  applicationStatus:Status;
  applicationsData: application[];
  items: MenuItem[];
  processStatusList: processStatus[];
  
  constructor(private appService: ApplicationsService) { 
    this.statusList=[      
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" }
  ];
    
  this.processStatusList= [
    { label: "inprogress", value: "inprogress"},
    { label: "hold", value: "hold"},
    { label: "declined", value: "declined"}

  ]
  }

  ngOnInit() {
    this.appService.getApplications().
    then( applicationsData=> {
      this.applicationsData = applicationsData;
      console.log(this.applicationsData);

    }
      );
    
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

  // public inprogressListUpdate(){
  //   this.appService.getApplications().
  //   then( applicationsData=> {
  //     // this.applicationsData = applicationsData;
  //     // console.log(this.applicationsData);
  //     this.applicationsData =  applicationsData.filter( application=>{
  //       return application.inprogress ;
  //     })

  //   }
  //     );
  // }

  public listUpdate(status){
    console.log(status);
    this.appService.getApplications().
    then( applicationsData=> {
      // this.applicationsData = applicationsData;
      // console.log(this.applicationsData);
      this.applicationsData =  applicationsData.filter( application=>{
        return application.processStatus === status  ;
      })

    }
      );
  
  }

  public update(){
    console.log("update");

  }

  public save(){
    console.log("save");
  }

  public delete(){
    console.log("delete");
  }


}

