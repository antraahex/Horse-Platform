import { ApplicationsService, application } from './../applications.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements OnInit {
  applicationsData: application[];
  rowId: number;
  display: boolean = false;
  newForm: boolean = false;
  isFemale: boolean = false;
  isPregnant: boolean = false;
  showEditForm: boolean = false;
  isMonitoring: boolean = false;

  options = [
    { name: "Male", abbr: 'M' },
    { name: 'Female', abbr: 'F' }
  ];

  horseForm = new FormGroup({
    name: new FormControl(''),
    date_of_birth: new FormControl(''),
    gender: new FormControl(this.options[3]),
    pregnant: new FormControl(null),
    due_date: new FormControl(null),
 
  });
  constructor(private appService: ApplicationsService, private route: Router) {
  }

  ngOnInit(): void {
    this.isPregnant = false;
    this.isFemale = false;
    this.getData();
    setInterval(() => { this.getData() }, 5000);
  }
  public getData() {
    this.appService.getApplications().
      subscribe(applicationsData => {
        this.applicationsData = applicationsData.data;
      }
      );
  }
  //popup for delete
  public deletePopup(): void {
    this.display = true;
  }

  //to delete the application
  public delete(id): void {
    this.display = false;
    this.appService.deleteHorse(id)
      .subscribe(res => {
        this.getData();
      })
  }

  //cancel button in delete popup
  public cancel() {
    this.display = false;
  }

  //editPopup
  public edit() {
    this.showEditForm = true;
  }

  //update form
  public updateForm(details, id): void {
    console.log(details);
    this.isPregnant = false;
    this.isFemale = false;
    this.showEditForm = false;
    this.horseForm.reset();
    this.appService.updateHorse(details, id)
      .subscribe(res => {
        this.getData();
      })
  }

  //to get the id of the application that is clicked on activity menu button
  public getCall(id): void {
    this.rowId = id;
  }

  //start monitoring
  public startMonitoring(id): void {
    let data = { is_monitoring: true }
    this.appService.monitorHorse(id, data)
      .subscribe(res => {
        this.getData();

      })
  }

  //stop monitoring
  public stopMonitoring(id): void {
    let data = { is_monitoring: false }
    this.appService.monitorHorse(id, data)
      .subscribe(res => {
        this.getData();
      })

  }

  //create new horse button
  public createNewHorse(): void {
    this.newForm = true;
  }

  //submit of new horse
  public addNewHorse(details): void {
    this.isPregnant = false;
    this.isFemale = false;
    this.newForm = false;
    this.horseForm.reset();
    this.appService.addNewHorse(details)
      .subscribe(res => {
        this.getData();
      })
  }

  // toggling the gender 
  public updateGender(val): void {

    if (val[0] == 0) {
      this.isFemale = false;

    } else {
      this.isFemale = true;

    }

  }

  //update pregnant or not checkbox
  public updatePregnancy(): void {
    this.isPregnant = this.isPregnant ? false : true;
  }


}



