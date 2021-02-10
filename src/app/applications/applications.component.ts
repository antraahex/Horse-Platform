import { ApplicationsService, application } from './../applications.service';
import { Component, OnInit } from '@angular/core';

export interface MenuItem {
  label: string,
  icon: string,
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
  applicationStatus: Status;
  applicationsData: application[];
  itemsForActive: MenuItem[];
  itemsForInactive: MenuItem[];
  processStatusList: processStatus[];
  rowId: number;

  constructor(private appService: ApplicationsService) {
    this.statusList = [
      { label: "active", value: "active" },
      { label: "inactive", value: "inactive" }
    ];

    this.processStatusList = [
      { label: "inprogress", value: "inprogress" },
      { label: "hold", value: "hold" },
      { label: "declined", value: "declined" }

    ]
  }

  ngOnInit(): void {
    this.appService.getApplications().
      then(applicationsData => {
        this.applicationsData = applicationsData;
      }
      );

    this.itemsForActive = [
      {
        label: 'Move to inactive', icon: 'pi pi-external-link', command: () => {
          this.move(this.rowId);
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.delete(this.rowId);
        }
      }
    ];

    this.itemsForInactive = [
      {
        label: 'Move to active', icon: 'pi pi-external-link', command: (event) => {
          this.move(this.rowId);
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.delete(this.rowId);
        }
      }
    ];
  }

  //update the list on button clicks(inprogress,hold,declined)
  public listUpdate(status): void {
    this.appService.getApplications().
      then(applicationsData => {
        this.applicationsData = applicationsData;
        this.applicationsData = this.applicationsData.filter(application => {
          return application.processStatus === status;

        })
      }
      );
  }

  //fn to move active to inactive and vice-versa
  public move(id): void {
    console.log("id is" + id);
    for (let x of this.applicationsData) {
      if (id == x.id) {
        let presentIndex = this.applicationsData.indexOf(x);
        this.applicationsData[presentIndex].status = (this.applicationsData[presentIndex].status == 'active' ? 'inactive' : 'active');
      }
    }
  }

  //to delete the application
  public delete(id): void {
    for (let x of this.applicationsData) {
      if (id == x.id) {
        this.applicationsData.splice(this.applicationsData.indexOf(x), 1);
      }
    }
  }

  //to get the id of the application that is clicked on activity menu button
  public getCall(id): void {
    this.rowId = id;
  }

  //clear filters
  public clearFilters(): void {
    this.appService.getApplications().
      then(applicationsData => {
        this.applicationsData = applicationsData;

      }
      );
  }
}

