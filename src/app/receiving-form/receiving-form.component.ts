import { Component, OnInit } from '@angular/core';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Master} from '../pojo/Master';
import {PatientDemographicDetail} from "../pojo/PatientDemographicDetail";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ReceivingFormService} from "../services/receiving-form.service";
import {MatIconRegistry} from '@angular/material/icon';

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
  sampleId;
  dataSource;
  selection;
  postfixULID;
  isULIDVerified;
  ULIDCounter;
  linkingULIDList:string[];
  isLinkEnabled;
  uSampleId;
  uUHID;

  constructor(
    private receivingFormService: ReceivingFormService,
  ) { }


  ngOnInit(): void {
    // this.master= new Master(null,'SAU20/00020','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','S','','',);
    this.master= new Master(null,'','N0054896','','','','','','','','',null, null, null,'','','','','',);
    // this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
    this.pdd= new PatientDemographicDetail(null,null,null,null,null,null,null,null,null, null);

    if(this.master.ULID==null|| this.master.ULID==''){
      this.master.sampleType='S';
      this.getULID();
    }
    this.initializeTests();
    // console.log(this.dataSource);
    this.isULIDVerified= true;
    this.ULIDCounter=parseInt(this.master.ULID.substr(6,5),10);
    this.postfixULID= this.master.ULID.substr(6,5);
    this.isLinkEnabled=false;
  }

  autofill(){
    // if(this.uSampleId==null) {
    //   this.sampleId=this.uSampleId;
    //   this.receivingFormService.getPDDDetailByUHID(this.pdd.UHID).subscribe(
    //     data => {
    //       this.master = data.master;
    //       this.pdd = data.pdd;
    //     },
    //     error => {
    //       console.error("Error in fetching linked ULIDs counters");
    //     })
    // }
    // else {
    //   this.receivingFormService.getPDDDetailBySampleId(this.sampleId).subscribe(
    //     data => {
    //       this.pdd= data.pdd;
    //     },
    //     error => {
    //       console.error("Error in fetching linked ULIDs counters");
    //     })
    // }
    this.sampleId=this.uSampleId;
    this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
    this.master= new Master(null,'CAU20/00020','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','C','','',);
    this.ULIDCounter=parseInt(this.master.ULID.substr(6,5),10);
    this.postfixULID= this.master.ULID.substr(6,5);
    this.initializeTests();
  }

  initializeTests(){
    this.dataSource = this.testInfo[this.master.sampleType];
    let selectedTest = [];
    this.dataSource.forEach(row => {
      if(this.master[row.code] == "RAISED"){
        selectedTest.push(row);
      }
    });
    this.selection = new SelectionModel(true, selectedTest);// what is this.
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  externalSelected(){
    this.getULID();
    this.ULIDCounter=parseInt(this.master.ULID.substr(6,5),10);
    this.postfixULID= this.master.ULID.substr(6,5);
    this.sampleId= this.master.ULID+":1";
    this.master.nNo=null;
  }

  sampleTypeChanged(){
    this.dataSource = new MatTableDataSource(this.testInfo[this.master.sampleType]);
    this.clearTestSelection();
    this.getULID();
    this.ULIDCounter=parseInt(this.master.ULID.substr(6,5),10);
    this.postfixULID= this.master.ULID.substr(6,5);
  }

  verifyULID(){
    // if (parseInt(this.postfixULID,10)>=this.ULIDCounter)
    //   this.isULIDVerified=true;
    // else {
    //   this.receivingFormService.doesULIDExist(this.master.ULID.substr(0, 6) + this.postfixULID).subscribe(
    //     data => {
    //       this.isULIDVerified = !(<boolean>data);
    //     },
    //     error => {
    //       console.error("Error in fetching linked ULIDs counters");
    //     });
    // }
      // console.log(this.master.ULID.substr(0,6)+this.postfixULID);
      this.isULIDVerified=true;
  }

  enableLinking(e) { // here e is a boolean, true if checked, otherwise false
    if(e){
      this.getLinkingULIDList();
      this.isLinkEnabled=true;
    }
    else{
      this.master.linked='';
      this.isLinkEnabled=false;
    }
  }

  getLinkingULIDList(){
    // this.receivingFormService.getLinkingULIDList(this.pdd.UHID, this.master.sampleType).subscribe(
    //   data => {
    //     this.linkingULIDList = <string[]>data;
    //   },
    //
    //   error => {
    //     console.error("Error in fetching linked ULIDs counters");
    //   });
    this.linkingULIDList=['SAU20/00011', 'SAU20/00012', 'SAU20/00013'];
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

  //Crosscheck the below value assignment-------------------------------------------------------------------------
  getULID():void{
    if(this.regType==='INTERNAL') {//I/E flag)
      // this.receivingFormService.getNextIULID(this.master.sampleType).subscribe(
      //   data => {
      //     this.master.ULID = <string>data;
      //   },
      //   error => {
      //     console.error("Error in fetching IULID");
      //   })
      if(this.master.sampleType=='S')
        this.master.ULID='SAU20/00050';
      else
        this.master.ULID='CAU20/00040';
    }
    else {
      // this.receivingFormService.getNextXULID(this.master.sampleType).subscribe(
      //   data => {
      //     this.master.ULID = <string>data;
      //   },
      //   error => {
      //     console.error("Error in fetching XULID counters");
      //   })
      this.master.ULID='SXU20/00050'
    }
  }




}
