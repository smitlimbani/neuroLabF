import { Component, OnInit } from '@angular/core';
import {IndividualSearchService} from "../services/individual-search.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ReceivingFormService} from "../services/receiving-form.service";

@Component({
  selector: 'app-individual-search',
  templateUrl: './individual-search.component.html',
  styleUrls: ['./individual-search.component.css']
})
export class IndividualSearchComponent implements OnInit {

  searchValue: string;
  searchType: string;
  pdd;
  data;
  display:boolean= false;
  labTests;

  constructor(
    private individualSearchService:IndividualSearchService,
    private snackBar: MatSnackBar,
    private receivingFormService:ReceivingFormService) {
  }

  ngOnInit(): void {
    this.getLabTestDetails();
  }

  onSubmit(){
    console.log("Getting Data");
    if(this.searchType=='UHID')
      this.individualSearchService.getCompleteDetailByUHID(this.searchValue).subscribe(
        data=> {
         this.data=data;
        },
        error=>this.displayError(error, "Error in fetching patient detail using UHID"),
        ()=> {
          if (this.data == undefined)
            this.snackBar.open("Incorrect ULID entered", "", {duration: 3000,});
          else {
            this.pdd = this.data;
            console.log(this.data);
            // console.log("pdd"+ this.pdd.name);
            this.display = true;
          }
        },
      );
    else if(this.searchType=='ULID')
      this.individualSearchService.getCompleteDetailByULID(this.searchValue).subscribe(
        data=> {
          this.data=data;
        },
      error=>this.displayError(error, "Error in fetching patient detail using ULID"),
      ()=>{
          if(this.data==undefined)
            this.snackBar.open("Incorrect ULID entered", "", {duration: 3000,});
          else{
            this.pdd=this.data['patientDemographicDetail'];
            console.log(this.data);
            // console.log("pdd"+ this.pdd.name);
            this.display=true;
          }
      },
  );
    else if(this.searchType=='VLID')
      this.individualSearchService.getCompleteDetailByVLID(this.searchValue).subscribe(
        data=>{
          this.data=data;
        },
        error=>this.displayError(error, "Error in fetching patient detail using VLID"),
        ()=>{
          if(this.data==undefined)
            this.snackBar.open("Incorrect VLID entered", "", {duration: 3000,});
          else {
            this.pdd = this.data['master']['patientDemographicDetail'];
            console.log(this.data);
            // console.log("pdd" + this.pdd.name);
            this.display = true;
          }
        },
      );
    else{
      this.individualSearchService.getCompleteDetailBySampleId(this.searchValue).subscribe(
        data=>{
          this.data=data;
        },
        error=>this.displayError(error, "Error in fetching patient detail using Sample Id"),
        ()=>{
          if(this.data==undefined)
            this.snackBar.open("Incorrect Sample Id entered", "", {duration: 3000,});
          else {
            this.pdd=this.data['master']['patientDemographicDetail'];
            console.log(this.data);
            // console.log("pdd"+ this.pdd.name);
            this.display = true;
          }
        },
      );
    }
  }

  getLabTestDetails() {
    this.receivingFormService.getLabTestDetails().subscribe(
      data => {
        this.labTests = data;
        // console.log(data);
      },
      error => {
        this.displayError(error, "Error in fetching tests")
      }
    );
  }

  reset(){
    this.searchValue=null;
    this.pdd=null;
    this.data=null;
    this.display= false;
  }

  displayError(error, message){
    if(error.status == 500){
      this.snackBar.open(message,"",{
        duration:3000,
      });
    }
    else if(error.status == 0){
      this.snackBar.open("Database server not working!","",{
        duration:3000,
      });
    }
    else{
      this.snackBar.open("Unknown Error!Contact Developer.","",{
        duration:3000,
      });
    }
  }

}
