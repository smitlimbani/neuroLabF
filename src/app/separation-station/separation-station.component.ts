import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {SeparationStationService} from "../services/separation-station.service";
import {error} from "@angular/compiler/src/util";
import {ReceivingFormComponent, Test} from "../receiving-form/receiving-form.component";
import {ReceivingFormService} from "../services/receiving-form.service";
import {Vial} from "../pojo/Vial";
import {MatTableDataSource,MatTable } from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import * as xlsx from 'xlsx';

export interface Sticker {
  vlid: string;
  name: string;
  'age/sex': string;
  testName: string;
}

@Component({
  selector: 'app-separation-station',
  templateUrl: './separation-station.component.html',
  styleUrls: ['./separation-station.component.css']
})
export class SeparationStationComponent implements OnInit {

  stickers:Sticker[]=[];
  sampleId: string="8";
  master;
  isHidden: boolean=true;
  raisedTests=[];
  labTests;
  otherRemark;
  noOfInvalidTests:number=+0;
  dataSource;
  selection;
  isOkEnabled=true;
  isListCreated=false;
  remarkList = ['Ok','Not sufficient volume', 'Quality not good', 'Sample damaged', 'Less volume', 'Hemolysis', 'Lipemic',
    'Clotted', 'Icteric', 'Leakage', 'Sample not labelled correctly', 'Wrong investigation request', 'Sample already exists',
    'BPL category. Testing will pe pending till payment.', 'Others'
  ];
  displayedColumns: string[] = ['select', 'VLID', 'Test Name', ' '];

  constructor(private separationStationService: SeparationStationService,
              private snackBar: MatSnackBar,
              private receivingFormService:ReceivingFormService) { }

  ngOnInit(): void {
   this.getLabTestDetails();
  }


  submitSampleId(number){
    console.log(number);
    this.sampleId=number;
    if(this.master!=null) {
     let temp =this.sampleId;
      this.next();
      this.sampleId=temp;
    }
    this.separationStationService.getPDDDetailBySampleId(this.sampleId).subscribe(
      data =>{
        console.log(data);
        this.master = data['master'];
      },
      error =>{
        this.displayError(error,"Error in fetching patient details");
      },
      ()=>{
        if(this.master.status!='NOT_RECEIVED'&& this.master.status!='REPORTED' && this.master.isValid!='N'){
          this.isHidden=false;
          this.getRaisedTests();
        }
      }
    );
  }


  getRaisedTests(){
    for(let test of this.labTests){
      let testStatus= this.master[test.name.toLowerCase()];
      let flag: boolean= true;
      if(testStatus!='NOT_RAISED') {
        this.raisedTests.push( {name:test.name, checked: testStatus!='INVALID', code: test.code, status: testStatus, print: testStatus=='RAISED'|| testStatus=='SEPARATED'});
        if(testStatus == 'INVALID'){
          this.noOfInvalidTests++;
        }
      }
    }
    // console.log(this.noOfInvalidTests);
    if(this.noOfInvalidTests== 0)
      this.master.remark="Ok";
    // console.log(this.raisedTests);
  }


  getLabTestDetails() {
    this.receivingFormService.getLabTestDetails().subscribe(
      data => {
        this.labTests = data;
        // console.log(data);
      },
      error => {
        this.displayError(error,"Error in fetching test details");
      }
    );
  }


  changeTestStatus(test){
    console.log("change");
    // this.dataSource=null;
    if(test.checked==false) {
      test.print=false;
      this.noOfInvalidTests++;
      if (this.master.remark == 'Ok')
        this.master.remark=null;
    }
    else {
      this.noOfInvalidTests--;
      test.print=true;
      if (this.noOfInvalidTests == 0) {
        this.master.remark = "Ok";
        this.otherRemark = null;
      }
    }
  }


 checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.test}`;
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggle(row){
    if(row.status!='REPORTED'){
      row.print= row.print!=true;
      this.selection.toggle(row);
    }
  }


  createVials(){
    this.isListCreated=true;
    this.dataSource = new MatTableDataSource(this.raisedTests);
    this.selection = new SelectionModel(true, []);

    for(let test of this.raisedTests){
        if(test.checked==false)
          this.master[test.name.toLowerCase()]='INVALID';
        else if(test.status!='REPORTED')
          this.master[test.name.toLowerCase()]='SEPARATED';
        }
    this.master.status='PROCESSING';
    if(this.otherRemark!=null)
      this.master.remark= this.otherRemark;

    if(this.noOfInvalidTests==0)
      this.master.isValid='Y';
    else if(this.noOfInvalidTests==this.raisedTests.length)
      this.master.isValid='N';
    else
      this.master.isValid='P';

    console.log(this.master);

    this.separationStationService.separateSample(this.master).subscribe(
      data=>  this.snackBar.open("Data successfully submitted", "", {duration: 3000,}),
      error=> this.displayError(error,"Error in creating vials"),
     );
    }


  next(){
    this.sampleId=null;
    this.master=null;
    this.isHidden=true;
    this.raisedTests=[];
    this.otherRemark=null;
    this.noOfInvalidTests=0;
    this.dataSource=null;
    this.selection=null;
    this.isOkEnabled=true;
    this.isListCreated=false;
    this.stickers=[];
  }


  export(){
    console.log(this.master);
    for(let test of this.raisedTests){
      if(test.print==true){
        let sticker:Sticker={vlid: (this.master.ulid+':'+test.code), name:this.master.patientDemographicDetail.name, 'age/sex':this.master.patientDemographicDetail.age+"/"+this.master.patientDemographicDetail.sex.charAt(0), testName:test.name}
        this.stickers.push(sticker);
      }
    }
    console.log(this.stickers);
    const ws: xlsx.WorkSheet =xlsx.utils.json_to_sheet(this.stickers);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, this.master.ulid+'.xlsx');
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

/*Currently if the sample is marked invalid then we are not allowing the user to even select tests. Because of this, if there ia a sample that
  is not marked invalid at receiving but at separation if the user marks all tests as invalid then its status changes to invalid. Hence when we
  rescan it there is no option to select/deselect tests. Should we alter this flow and allow user to select/deselect tests even if sample is invalid?*/
