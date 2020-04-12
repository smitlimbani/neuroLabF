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
  selector: 'app-receiving-form',
  templateUrl: './receiving-form.component.html',
  styleUrls: ['./receiving-form.component.css']
})
export class ReceivingFormComponent implements OnInit {
  regType='INTERNAL';

  master= new Master(null,'','','REQUESTED','','','REQUESTED','','','','',null, null, null,'','','SERUM','','',);
  pdd =  new PatientDemographicDetail(null,'1233 ','gauri','add',22,'FEMALE','ksncksck@ddjcnj','1000000000','jhbascjbca', 'skjvkn');
  pdd1= new PatientDemographicDetail(0,'','','',null,'','','','','');


  displayedColumns:string[]=['select','test'];
  serumArray:Test[]=[
    {test:'ANA profile(immunoblot)', code:"ANA"},
    {test:'ANCA (panca/canca)', code:"ANCA"},
    {test: 'MOG NMOSD',  code:"MOG"},
    {test:'Autoimmune Encephalitis mosaic', code: "ANA"},
    ];

  csfArray:Test[]=[
    {test:'Paraneoplastic neural antibodies',  code:"PANA"},
    {test: 'Myositis Profile(immunoblot)', code: "MYU"},
    {test:"Anti-Ganglioside Profile (IgG)",  code:"GANGIGG"},
    {test: "Anti-Ganglioside Profile (IgM)",  code:"GANGIGM"},
  ];


  serumDataSource= new MatTableDataSource(this.serumArray);
  csfDataSource = new MatTableDataSource(this.csfArray);
  dataSource = this.master.sampleType=='SERUM'?this.serumDataSource: this.csfDataSource;
  selection = new SelectionModel(true, []);// what is this.


  fun(){
    console.log(this.selection.selected);
    console.log(this.master);
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


  constructor(
    private receivingFormService: ReceivingFormService,
  ) { }


  ngOnInit(): void {
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
