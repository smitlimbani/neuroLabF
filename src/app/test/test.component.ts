import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Master} from '../pojo/Master';
import {PatientDemographicDetail} from "../pojo/PatientDemographicDetail";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ReceivingFormService} from "../services/receiving-form.service";


export interface Test {
  test: string;
  code: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  regType='INTERNAL';

  displayedColumns:string[]=['select','test'];
  testInfo=
  {"S" :[
    {test:'ANA profile(immunoblot)', code:"ANA"},
    {test:'ANCA (panca/canca)', code:"ANCA"},
    {test: 'MOG NMOSD',  code:"MOG"},
    {test:'Autoimmune Encephalitis mosaic', code: "NMDA"},
  ],
  "C":[
    {test:'Paraneoplastic neural antibodies',  code:"PANA"},
    {test: 'Myositis Profile(immunoblot)', code: "MYU"},
    {test:"Anti-Ganglioside Profile (IgG)",  code:"GANGIGG"},
    {test: "Anti-Ganglioside Profile (IgM)",  code:"GANGIGM"},
  ]}; 
  
  master;
  pdd;
  pdd1;
  dataSource;
  selection;
  
  constructor(
    private receivingFormService: ReceivingFormService,
  ) { }

  ngOnInit(): void {
    this.master= new Master(null,'','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','S','','',);
    // this.master= new Master(null,'','','','','','','','','','',null, null, null,'','','S','','',);
    this.pdd =  new PatientDemographicDetail(null,'1233 ','gauri','add',22,'FEMALE','ksncksck@ddjcnj','1000000000','jhbascjbca', 'skjvkn');
    this.pdd1= new PatientDemographicDetail(0,'','','',null,'','','','','');
    this.dataSource = this.testInfo[this.master.sampleType];
    let selectedTest = []
    this.dataSource.forEach(row => {
      if(this.master[row.code] == "RAISED"){
        selectedTest.push(row);
      }
    });
    this.selection = new SelectionModel(true, selectedTest);// what is this.
    this.dataSource = new MatTableDataSource(this.dataSource);
    console.log(this.dataSource);
  }

  sampleTypeChanged(){
    this.dataSource = new MatTableDataSource(this.testInfo[this.master.sampleType]);
    this.clearTestSelection();
  }

  clearTestSelection(){
    this.selection.clear();
    Object.keys(this.testInfo).forEach(key => {
      this.testInfo[key].forEach(row => {
        this.master[row.code] = 'NOT_RAISED';
      });      
    });
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  //earlier it was written (row?: PeriodicElement)
  checkboxLabel(row?: Test): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.test}`;
  }

  isVerified= true;
  verifyULID(){
    return
  }

  //Crosscheck the below value assignment-------------------------------------------------------------------------
  getULID():void{
    if(this.regType==='INTERNAL') {//I/E flag)
      this.receivingFormService.getNextIULID(this.master.sampleType).subscribe(
        data => {
          this.master.ULID = <string>data;
        },
        error => {
          console.error("Error in fetching IULID");
        })
    }
    else {
      this.receivingFormService.getNextXULID(this.master.sampleType).subscribe(
        data => {
          this.master.ULID = <string>data;
        },
        error => {
          console.error("Error in fetching XULID counters");
        })
    }
  }
}
