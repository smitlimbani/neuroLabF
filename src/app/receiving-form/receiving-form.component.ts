import { Component, OnInit, Input } from '@angular/core';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Master} from '../pojo/Master';
import {PatientDemographicDetail} from "../pojo/PatientDemographicDetail";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ReceivingFormService} from "../services/receiving-form.service";

import {MatIconRegistry} from '@angular/material/icon';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

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
      {test:'ANA profile(immunoblot)', code:"ana"},
      {test:'ANCA (panca/canca)', code:"anca"},
      {test: 'MOG NMOSD',  code:"mog"},
      {test:'Autoimmune Encephalitis mosaic', code: "nmda"},
      {test:'Paraneoplastic neural antibodies',  code:"pana"},
      {test: 'Myositis Profile(immunoblot)', code: "myu"},
      {test:"Anti-Ganglioside Profile (IgG)",  code:"gangigg"},
      {test: "Anti-Ganglioside Profile (IgM)",  code:"gangigm"},
  ],
  "C":[
      {test: 'MOG NMOSD',  code:"mog"},
      {test:'Autoimmune Encephalitis mosaic', code: "nmda"},
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
  isLinkEnabled;
  linkingULIDList:string[];
  uSampleId;
  uUHID;
  isPddReadOnly;
  isMasterReadOnly;
  isPanelExpanded;
  tests;

  @Input() tmaster?:any;

  constructor(
    private receivingFormService: ReceivingFormService,
  ) { }


  ngOnInit(): void {
    // this.tmaster='11251';
    console.log(this.tmaster);
    console.log(this.tmaster==undefined && this.tmaster==null);
    if(!(this.tmaster==undefined && this.tmaster==null)) {
     console.log('linking and autofill');
      this.autofillAndSetupLinking();
    }
    else {
      console.log('new form altogether');
      this.initializeNewForm();
    }
  }

  autofillAndSetupLinking(){
    // this.master= this.tmaster;
    // this.pdd= this.tmaster.patientDemographicDetail;
    this.master= new Master(null,'SAU20/00020','N012345','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','S',null,'Dr.Anita');
    this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS');
    this.isPddReadOnly= true;
    this.isMasterReadOnly=true;
    this.isLinkEnabled=true;
    this.initializeTests();
    this.setULIDVariables()
    this.enableLinking(true);
  }

  initializeNewForm(){
    // this.master= new Master(null,'SAU20/00020','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','S','','',);
    this.master= new Master(null,null,null,'NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, true,'Y','RECEIVED','S',null,null);
    // this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
    this.pdd= new PatientDemographicDetail(null,null,null,null,null,null,null,null,null);
    // this.getULID();
    this.isLinkEnabled=false;
    this.isPddReadOnly= false;
    this.isMasterReadOnly=false;
    this.initializeTests();
    this.getULID();
    this.setULIDVariables();
  }

  autofill(){
    if(this.uSampleId==null) {
      console.log("UHID selected");
      this.receivingFormService.getPDDDetailByUHID(this.uUHID).subscribe(
        data => {
          console.log(data);
          this.pdd= data['pdd'];
          console.log(this.pdd);
        },
        error => {
          console.error("Error in fetching Patient Demographic Details through UHID");
        }
      )
      this.isPddReadOnly= true;
      this.isMasterReadOnly=false;
      // this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
    }
    else {
      console.log("SampleId selected");
      this.receivingFormService.getPDDDetailBySampleId(this.uSampleId).subscribe(
        data => {
          console.log(data);
          this.master= data['master'];
          this.pdd = this.master['patientDemographicDetail'];
          console.log(this.master);
          console.log(this.pdd);
          console.log(this.pdd.name);
        },
        error => {
          console.error("Error in fetching Patient Demographic Details through sampleId");
        })
      this.sampleId=this.uSampleId;
      this.isPddReadOnly= true;
      this.isMasterReadOnly=true;
      // this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
      // this.master= new Master(null,'CAU20/00020','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','C','','',);
    }
    this.isLinkEnabled=false;
    this.initializeTests();
    // this.getULID();
    this.setULIDVariables();
  }

  getULID(){
    console.log('Getting ulid');
    if(this.regType=='INTERNAL') {//I/E flag)
      // console.log(this.regType);
      // console.log(this.master.sampleType);
      // this.receivingFormService.getNextIULID(this.master.sampleType).subscribe(
      //   data => {
      //     // console.log(data);
      //     this.master.ulid = data;
      //     console.log(this.master.ulid);
      //   },
      //   error => {
      //     console.log(error);
      //     console.error("Error in fetching IULID");
      //   })
      if(this.master.sampleType=='S')
        this.master.ulid='SAU20/00050';
      else
        this.master.ulid='CAU20/00040';
    }
    else {
      // this.receivingFormService.getNextXULID(this.master.sampleType).subscribe(
      //   data => {
      //     // console.log(data);
      //     this.master.ulid = data;
      //     console.log(this.master.ulid);
      //   },
      //   error => {
      //     console.error("Error in fetching XULID counters");
      //   })
      this.master.ulid='SXU20/00050'
    }
  }

  setULIDVariables(){
    this.getULID();
    this.ULIDCounter=parseInt(this.master.ulid.substr(6,5),10);
    this.postfixULID= this.master.ulid.substr(6,5);
    this.isULIDVerified= true;
  }

  initializeTests(){
    this.dataSource = this.testInfo[this.master.sampleType];
    let selectedTest = [];
    this.dataSource.forEach(row => {
      if(this.master[row.code] == "RAISED"){
        selectedTest.push(row);
      }
    });
    this.selection = new SelectionModel(true, selectedTest);// what is this. //I don't know.
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  externalSelected(){
    this.setULIDVariables();
    this.sampleId= this.master.ulid+":1";
    this.master.nNo=null;
    // this.receivingFormService.getAllTest().subscribe(
    //   data => {
    //     this.tests= data;
    //     console.log(data);
    //   },
    //   error => {
    //     console.error("Error in getting tests");
    //   }
    // )
  }

  sampleTypeChanged(){
    this.dataSource = new MatTableDataSource(this.testInfo[this.master.sampleType]);
    this.clearTestSelection();
    this.setULIDVariables();
  }

  verifyULID(){
    // if (parseInt(this.postfixULID,10)>=this.ULIDCounter)
    //   this.isULIDVerified=true;
    // else {
    //   console.log("uhid:"+this.master.ulid.substr(0, 6) + this.postfixULID);
    //   this.receivingFormService.doesULIDExist(this.master.ulid.substr(0, 6) + this.postfixULID).subscribe(
    //     data => {
    //       console.log(data)
    //       this.isULIDVerified = !(<boolean>data);
    //       console.log(this.isULIDVerified);
    //     },
    //     error => {
    //       console.error("Error in verifying Ulid");
    //     });
    // }
      console.log(this.master.ulid.substr(0,6)+this.postfixULID);
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

  calcTotalAmount(){
    let sum :number=0;
    for (let test of this.tests){
      if (this.master[test.name.toLowerCase()]=='RAISED'){
        sum=sum + test.rate;
        console.log(this.master[test.name.toLowerCase()]);
      }
    }
    this.master.totalAmount=sum;
  }

  invalidateSample(){
    if(this.regType=='INTERNAL')
      this.receivingFormService.confirmInvalidReceiving(this.sampleId,"",this.master.ulid);//proper ulid has to be sent
    else
      this.receivingFormService.confirmInvalidReceivingX(this.master, this.pdd,this.sampleId,"");
  }

  submit(){

  }

}
