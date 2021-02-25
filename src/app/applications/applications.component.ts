import { ApplicationsService, application } from './../applications.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements OnInit {
  applicationsData: application[];
  rowId: number;
  showDeletePopup: boolean = false;
  newForm: boolean = false;
  isFemale: boolean = false;
  isPregnant: boolean = false;
  showEditForm: boolean = false;
  isMonitoring: boolean = false;
  warning: boolean = false;
  showLoader: boolean = false;
  editHorseForm: FormGroup;

  options = [
    { name: 'Male', abbr: 'M' },
    { name: 'Female', abbr: 'F' }
  ];
   
  horseForm = new FormGroup({
    name: new FormControl(''),
    date_of_birth: new FormControl(''),
    gender: new FormControl(''),
    pregnant: new FormControl(null),
    due_date: new FormControl(null),
 
  });

  constructor(private appService: ApplicationsService, private route: Router, private fb:FormBuilder,public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.showLoader = false;
    this.isPregnant = false;
    this.isFemale = false;
    this.getData();
    setInterval(() => { this.getData() }, 5000);
    this.initializeEditForm();

  }

  public initializeEditForm(): void{
    this.editHorseForm = this.fb.group({
      name: '',
      date_of_birth: '',
      gender: '',
      pregnant: null,
      due_date: null
   
    });
  }

  public getData() {
    this.appService.getApplications().
      subscribe(applicationsData => {
        this.applicationsData = applicationsData.data;
      }
      );
  }

  //popup for delete
  public deletePopup(id): void {
    this.showDeletePopup = true;
    this.getCall(id);

  }

  //to delete the application
  public delete(id): void {
    this.showDeletePopup = false;
    this.appService.deleteHorse(id)
    .subscribe(res => {
      this.getData();
    })
  }

  //cancel button in delete popup
  public cancel() {
    this.showDeletePopup = false;
  }

  //editPopup
  public edit(details,id) {
    this.getCall(id);
    if(details.gender == 'M'){
      this.isFemale = false;

    }else{
      this.isFemale = true;
    }
    if(details.pregnant){
      this.isPregnant = true;
    }else{
      this.isPregnant = false;
    }
    this.editHorseForm = this.fb.group({
      name: details.name,
      date_of_birth: this.datepipe.transform(details.date_of_birth, 'yyyy-MM-dd'),
      gender: details.gender,
      pregnant: details.pregnant,
      due_date: this.datepipe.transform(details.due_date, 'yyyy-MM-dd')
   
    });

    this.showEditForm = true;
  }

  //update form
  public updateForm(details, id): void {
    this.isPregnant = false;
    this.isFemale = false;
    this.showEditForm = false;
    this.editHorseForm.reset();
    this.appService.updateHorse(details, id)
      .subscribe(res => {
        if(details.gender == 'M'){
          details.pregnant = null;
        }
        if(details.pregnant == false || details.pregnant == null){
          details.due_date = null;
        }
        this.getData();
      })
  }

  //to get the id of the application that is clicked on activity menu button
  public getCall(id): void {
    this.rowId = id;
  }

  //start monitoring
  public startMonitoring(id): void {
    this.getCall(id);
    this.showLoader = true;
    setTimeout(()=>{this.showLoader = false} ,4000);
    let data = { is_monitoring: true }
    this.appService.monitorHorse(id, data)
      .subscribe(res => {

        this.getData();

      })
  }

  //stop monitoring
  public stopMonitoring(id): void {
    this.getCall(id);
    this.showLoader = true;
    setTimeout(()=>{this.showLoader = false} ,4000);
    let data = { is_monitoring: false }
    this.appService.monitorHorse(id, data)
      .subscribe(res => {
        this.getData();
      })

  }

  //create new horse button
  public createNewHorse(): void {
    this.newForm = true;
    this.isPregnant = false;
    this.isFemale = false;
    this.horseForm.reset();
  }

  //submit of new horse
  public addNewHorse(details): void {
    this.editHorseForm = this.horseForm;
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

    this.isFemale = val[0] == 0 ? false : true;

  }

  //update pregnant or not checkbox
  public updatePregnancy(): void {
    this.isPregnant = this.isPregnant == true ? false : true;

  }


}



