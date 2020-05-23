import { Component, OnInit, Input } from '@angular/core';
import {Master} from '../pojo/Master';
import {PatientDemographicDetail} from "../pojo/PatientDemographicDetail";
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {ReceivingFormService} from "../services/receiving-form.service";
import {MatIconRegistry} from '@angular/material/icon';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Payment} from "../pojo/Payment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Doctor} from "../pojo/Doctor";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";


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

  regType = 'INTERNAL';

  displayedColumns: string[] = ['select', 'test'];
  testInfo =
    {
      "S": [
        {test: 'ANA profile(immunoblot)', code: "ana"},
        {test: 'ANCA (panca/canca)', code: "anca"},
        {test: 'MOG NMOSD', code: "mog"},
        {test: 'Autoimmune Encephalitis mosaic', code: "nmda"},
        {test: 'Paraneoplastic neural antibodies', code: "para"},
        {test: 'Myositis Profile(immunoblot)', code: "myo"},
        {test: "Anti-Ganglioside Profile (IgG)", code: "gangigg"},
        {test: "Anti-Ganglioside Profile (IgM)", code: "gangigm"},
      ],
      "C": [
        {test: 'MOG NMOSD', code: "mog"},
        {test: 'Autoimmune Encephalitis mosaic', code: "nmda"},
      ]
    };

  remarkList = ['Not sufficient volume', 'Quality not good', 'Sample damaged', 'Less volume',
    'Hemolysis', 'Lipemic', 'Clotted', 'Icteric', 'Leakage',  'Sample not labelled correctly',
    'Wrong investigation request', 'Sample already exists', 'BPL category. Testing will pe pending till payment.','Others',
  ];

  master;
  pdd;
  uSampleId;
  uUHID;
  sampleId;
  dataSource;
  selection;
  centerULID;
  isULIDVerified;
  ULIDCounter;
  isLinkEnabled;
  linkingULIDList: string[];
  isPddReadOnly;
  isMasterReadOnly;
  isPanelExpanded;
  isSampleInvalid;
  tests;
  paymentList: Payment[];
  paymentForm: FormGroup;
  transactions: FormArray = new FormArray([]);
  doctors;
  public doctorFilter: FormControl = new FormControl();
  otherRemark;
  doctorBind:Doctor;
  newForm=true;
  @Input() tmaster?: any;
  incorrectRegType:boolean=false;

  constructor(
    private receivingFormService: ReceivingFormService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog : MatDialog,
  ) {
  }


  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      transactions: this.fb.array([
        this.addTransactionGroup(null, null, null),
      ])
    });

    if (!(this.tmaster == undefined)) {
      console.log('linking and autofill');
      this.autofillAndSetupLinking();
    } else {
      console.log('new form altogether');
      this.initializeNewForm();
    }
    this.getDoctorList();
    this.getLabTestDetails();
  }


  //To initialize the form when getting redirected for linking from association page
  autofillAndSetupLinking() {
    console.log('setup linking');
    this.master = this.tmaster;
    this.pdd = this.tmaster.patientDemographicDetail;
    this.sampleId = this.tmaster.samples[0].sampleId;
    // this.master = new Master(null, 'SAU20/00020', 'N012345', 'RAISED', 'NOT_RAISED', 'NOT_RAISED', 'RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', null, null, null, '', '', 'S', null, 'Dr.Anita', null);
    // this.pdd = new PatientDemographicDetail(null, 'UHID0001', 'Gauri', 'address', 22, 'FEMALE', 'someEmail@gmail.com', '9999999999', 'NIMHANS');
    this.isPddReadOnly = true;
    this.isMasterReadOnly = true;
    this.isLinkEnabled = true;
    this.isSampleInvalid = false;
    this.initializeTests();
    this.setULIDVariables();
    this.enableLinking(true);
    this.incorrectRegType=false;
    this.newForm=false;
  }


  //to initialize form in general(not in the case of linking)
  initializeNewForm() {
    // this.master= new Master(null,'SAU20/00020','','RAISED','NOT_RAISED','NOT_RAISED','RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED','NOT_RAISED',null, null, null,'','','S','','',);
    this.master = new Master(null, null, null, 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', 'NOT_RAISED', null, null,  'Y', null, 'S', null, null, null, null, null);
    // this.pdd =  new PatientDemographicDetail(null,'UHID0001','Gauri','address',22,'FEMALE','someEmail@gmail.com','9999999999','NIMHANS', 'Dr. Anita');
    this.pdd = new PatientDemographicDetail(null, null, null, null, null, null, null, null, null);
    this.isLinkEnabled = false;
    this.isPddReadOnly = false;
    this.isMasterReadOnly = false;
    this.isSampleInvalid = false;
    this.initializeTests();
    this.setULIDVariables();
    this.isPanelExpanded = false;
    this.clearAllTransactions();
  }

  //fills up necessary fields when SampleId or UHID is scanned
  autofill() {
    this.incorrectRegType=false;
    this.newForm=false;
    if (this.uSampleId == null) {
      if(this.pdd.name!=null){
        console.log("resetting");
        this.initializeNewForm();
      }
      this.receivingFormService.getPDDDetailByUHID(this.uUHID).subscribe(
        data => {
          console.log(data);
          this.pdd = data['patientDemographicDetail'];
          this.isLinkEnabled = false;
        },
        error => {
          this.displayError(error,"Error in fetching Patient Demographic Details through UHID")
        },
        () => {
          //here we check if the sample id belongs to the correct reg type or not
          // console.log(this.pdd.uhid.charCodeAt(0));
          // console.log("is digit"+ (this.pdd.uhid.charCodeAt(0)>=48 && this.pdd.uhid.charCodeAt(0)<=57));
          if( this.pdd.uhid.charCodeAt(0)>=48 && this.pdd.uhid.charCodeAt(0)<=57) {
            if (this.regType == 'EXTERNAL') {
              this.incorrectRegType = true;
              return;
            }
          }
          else {
            if (this.regType == 'INTERNAL') {
              this.incorrectRegType = true;
              return;
            }
          }
          this.isPddReadOnly = true;
          this.isMasterReadOnly = false;
          this.initializeTests();
          this.setULIDVariables();
        }
      )
    }
    else {
      this.otherRemark=null;
      this.sampleId = this.uSampleId;
      let oldPayment;
      this.receivingFormService.getPDDDetailBySampleId(this.uSampleId).subscribe(
        data => {
          console.log(data);
          this.master = data['master'];
          this.pdd = this.master['patientDemographicDetail'];
          if (this.regType == 'EXTERNAL') {
            oldPayment = data['master']['payments'];
            // console.log(oldPayment);
            if (this.regType == 'EXTERNAL' && oldPayment.length != 0) {
              this.Transactions.removeAt(0);
              this.convertPaymentsToTransactionArray(oldPayment);
            }
          }
        },
        error => {
          this.displayError(error,"Error in fetching Patient Demographic Details through Sample Id");
        },
        () => {
          // console.log(this.pdd.uhid.charCodeAt(0));
          // console.log("is digit"+ (this.pdd.uhid.charCodeAt(0)>=48 && this.pdd.uhid.charCodeAt(0)<=57));
            if(this.pdd.uhid && this.pdd.uhid.charCodeAt(0)>=48 && this.pdd.uhid.charCodeAt(0)<=57) {
              if (this.regType == 'EXTERNAL') {
                this.incorrectRegType = true;
                return;
              }
            }
            else {
              if (this.regType == 'INTERNAL') {
                this.incorrectRegType = true;
                return;
              }
            }
          this.isPddReadOnly = true;
          this.isMasterReadOnly = true;
          this.setULIDVariables();
          this.initializeTests();
          if (this.regType == 'INTERNAL') {
            this.calcTotalAmount();
            this.Transactions.removeAt(0);
            this.addTransaction(
              {value: this.master.totalAmount, disabled: true},
              {
                  value: "E-Hospital transaction",
                  disabled: true
              },
              {value: null, disabled: true});
          }
          else{
            this.doctorBind= new Doctor(this.master.drName, this.master.drContactNo, this.master.drEmailId, this.pdd.hospitalName);
          }
          this.isLinkEnabled= !(this.master.linked == 0 || this.master.linked == null);
          this.isSampleInvalid = this.master.isValid == 'N';

          if(this.isLinkEnabled) {
            this.linkingULIDList = [this.master.linked];
          }
          if(this.isSampleInvalid && !this.remarkList.includes(this.master.remark,0)){
            this.otherRemark=this.master.remark;
            this.master.remark='Others';
          }
        }
      );
      // this.pdd = new PatientDemographicDetail(null, 'UHID0001', 'Gauri', 'address', 22, 'FEMALE', 'someEmail@gmail.com', '9999999999', 'NIMHANS');
      // this.master = new Master(null, 'S:AU-00050/20', '', 'RAISED', 'NOT_RAISED', 'NOT_RAISED', 'RAISED', 'NOT_RAISED', 'RAISED', 'NOT_RAISED', 'NOT_RAISED', null, null, null, '', '', 'S', '', 'Dr Anita', null, null, null);
      // this.sampleId = this.uSampleId;
      // this.isPddReadOnly = true;
      // this.isMasterReadOnly = true;
      // this.initializeTests();
      // this.setULIDVariables();
      // if(this.regType=='INTERNAL'){
      //   this.calcTotalAmount();
      //   console.log(this.transactions);
      //   this.Transactions.setControl(0, this.fb.group({
      //     amount: [{value: this.master.totalAmount, disabled: true},  Validators.required, ],
      //     details: [{ value: "E-Hospital transaction",disabled: true}, Validators.required],
      //     date: [{value: '',disabled: true}, Validators.required]
      //   }));
      //   console.log(this.paymentForm);
      // }
    }
  }


  //Func gets ulid from BE and resets all the associated variables. It is called every time regType changes or sampleType changes
  getULID() {
    if(this.master.status!=null && this.master.status!='NOT_RECEIVED'){
      this.ULIDCounter = parseInt(this.master.ulid.substr(5, 5), 10);
      this.centerULID = this.master.ulid.substr(5, 5);
      this.isULIDVerified = true;
      return;
    }

    if (this.regType == 'INTERNAL') {//I/E flag)
      this.receivingFormService.getNextIULID(this.master.sampleType).subscribe(
        data => {
          this.master.ulid = data;
          console.log("getting ulid:" + this.master.ulid);
        },
        error => {
          this.displayError(error,"Error in fetching IULID");
        },
        () => {
          this.ULIDCounter = parseInt(this.master.ulid.substr(5, 5), 10);
          this.centerULID = this.master.ulid.substr(5, 5);
          this.isULIDVerified = true;
        }
      )
      //-----------------------------
      // if (this.master.sampleType == 'S')
      //   this.master.ulid = 'S:AU-00050/20';
      // else
      //   this.master.ulid = 'C:AU-00040/20';
      // this.ULIDCounter = parseInt(this.master.ulid.substr(5, 5), 10);
      // this.centerULID = this.master.ulid.substr(5, 5);
      // this.isULIDVerified = true;
    } else {
      this.receivingFormService.getNextXULID(this.master.sampleType).subscribe(
        data => {
          this.master.ulid = data;
          console.log("getting ulid:" + this.master.ulid);
        },
        error => {
          this.displayError(error,"Error in fetching external AU No. ULID")
        },
        () => {
          this.ULIDCounter = parseInt(this.master.ulid.substr(5, 5), 10);
          this.centerULID = this.master.ulid.substr(5, 5);
          this.isULIDVerified = true;
          if (this.uSampleId == null) {
            this.sampleId = this.master.ulid + ":1";
            this.master.nNo = null;
          }
        }
      )
      //-----------------------------
      // this.master.ulid = 'S:XU-00050/20';
      // this.ULIDCounter = parseInt(this.master.ulid.substr(5, 5), 10);
      // this.centerULID = this.master.ulid.substr(5, 5);
      // this.isULIDVerified = true;
    }
  }


  //A simple wrapper to synchronise ulid request from BE and the associated variable assignments
  async setULIDVariables() {
    await this.getULID();
  }

  //Initialises the tests. Ie marks the already selected ones.
  initializeTests() {
    this.dataSource = this.testInfo[this.master.sampleType];
    let selectedTest = [];
    this.dataSource.forEach(row => {
      if (this.master[row.code] == "RAISED") {
        selectedTest.push(row);
      }
    });
    this.selection = new SelectionModel(true, selectedTest);// what is this. //I don't know.
    this.dataSource = new MatTableDataSource(this.dataSource);
  }


  //Fetches lab test details to enable amount calculations.
  getLabTestDetails() {
    this.receivingFormService.getLabTestDetails().subscribe(
      data => {
        this.tests = data;
        // console.log(data);
      },
      error => {
        this.displayError(error,"Error in fetching tests");
      }
    );
    // this.tests = [{name: "ANA", code: "ANA", rate: 500},
    //   {name: "ANCA", code: "ANC", rate: 500},
    //   {name: "MOG", code: "MOG", rate: 500},
    //   {name: "NMDA", code: "NMD", rate: 500},
    //   {name: "MYO", code: "MYO", rate: 500},
    //   {name: "PARA", code: "PAR", rate: 500},
    //   {name: "GANGIGG", code: "GAG", rate: 200},
    //   {name: "GANGIGM", code: "GAM", rate: 200},
    // ];
  }

  //Fetches list of doctors to enable autofilling of associated fields in case of external patients.
  getDoctorList() {
    this.receivingFormService.getDoctors().subscribe(
      data => {
        this.doctors = data;
        // console.log(data);
      },
      error => {
        this.displayError(error,"Error in fetching list of external doctors");
      }
    )
    // this.doctors = [{name: "Dr Anita", contactNo: "9999999999", emailId: "drAnita@gmail.com", hospitalName:"NIMHANS" },
    //   {name: "Dr Gauri", contactNo: "8888888888", emailId: "gauri@gmail.com", hospitalName:"IIITB_Hospital" },
    //   {name: "Dr Srikant", contactNo: "7777777777", emailId: "srikantSir@gmail.com", hospitalName:"NIMHANS" },
    //   {name: "Dr Vaibhav", contactNo: "6666666666", emailId: "vaibhav@gmail.com", hospitalName:"IIITB_Hospital" },
    // ];
  }


  //Autofills the associated doctor fields when a doctor is selected
  doctorSelected(doctor) {
    console.log("doctor selected");
    this.master.drName=doctor.name;
    this.pdd.hospitalName = doctor.hospitalName;
    this.master.drEmailId = doctor.emailId;
    this.master.drContactNo = doctor.contactNo;
  }


  //Func is called when the sample type is changed. Resets the dataSource of the available tests according to the sample type(different sets for
  // SERUM and CSF). Clears the current test selection. Resets the ulid. PanelExpanded is put to false since amount calculation happens at the time of
  // panel expansion and we do not wish to display incorrect details from tests selected from previous sampleType.
  sampleTypeChanged() {
    this.dataSource = new MatTableDataSource(this.testInfo[this.master.sampleType]);
    this.clearTestSelection();
    this.setULIDVariables();
    this.isPanelExpanded = false;
    this.isLinkEnabled=false;
  }

  verifyULID() {
    if (parseInt(this.centerULID, 10) >= this.ULIDCounter)
      this.isULIDVerified = true;
    else {
      this.receivingFormService.doesULIDExist(this.master.ulid.substr(0, 5) + this.centerULID + this.master.ulid.substr(-3)).subscribe(
        data => {
          this.isULIDVerified = !(<boolean>data);
        },
        error => {
          this.displayError(error,"Error in verifying Ulid");
        },
      ()=>{
        if (this.isULIDVerified == true && this.regType == 'EXTERNAL' && this.uSampleId == null)
          this.sampleId = this.master.ulid.substr(0, 5) + this.centerULID + this.master.ulid.substr(-3) + ":1";
      });
    }
    // this.isULIDVerified = true;
  }


  //Enables linking of ulid
  enableLinking(e) {
    if (e) {
      this.getLinkingULIDList();
      this.isLinkEnabled = true;
    } else {
      this.master.linked = '';
      this.isLinkEnabled = false;
    }
  }


  //hits the BE to get the list of ulid that can be linked to the sample
  getLinkingULIDList() {
    this.receivingFormService.getLinkingULIDList(this.pdd.uhid, this.master.sampleType).subscribe(
      data => {
        // console.log(data);
        this.linkingULIDList = data['ulids'];
        let ctr=0;
        //we delete the current ulid for the case where the user scans the item for the second time.
        for(let ulid of this.linkingULIDList) {
          console.log(ulid)
          console.log(this.master.ulid)
          if (ulid == this.master.ulid)
            break;
          ctr++;
        }
        console.log(ctr);
        this.linkingULIDList.splice(ctr,1);
        console.log(this.linkingULIDList);

      },
      error => {
        this.displayError(error,"Error in fetching ULID for linking the sample");
      });
    // this.linkingULIDList = ['S:AU-00001/20', 'S:AU-00002/20', 'S:AU-00003/20'];
  }


  //resets test selection
  clearTestSelection() {
    this.selection.clear();
    Object.keys(this.testInfo).forEach(key => {
      this.testInfo[key].forEach(row => {
        this.master[row.code] = 'NOT_RAISED';
      });
    });
  }


  //for test checkbox functioning
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


  checkboxLabel(row?: Test): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.test}`;
  }


  //Calculates total. Func is called only at the time of panel expansion.
  calcTotalAmount() {
    let sum: number = 0;
    for (let test of this.tests) {
      if (this.master[test.name.toLowerCase()] == 'RAISED') {
        sum = sum + test.rate;
      }
    }
    this.master.totalAmount = sum;
    this.calcRemainingAmount();
  }


  //Calculates remaining amount. Func is called every time when panel is expanded and also when transactions are added or deleted.
  calcRemainingAmount() {
    let paid: number = 0;
    let array = <FormArray>this.paymentForm.get('transactions');
    for (let element of array.controls) {
      paid += element.value['amount'];
    }
    this.master.remainingAmount = this.master.totalAmount - paid;
  }


  //reactive form's internal functioning
  get Transactions(): FormArray {
    return this.paymentForm.get('transactions') as FormArray;
  }


  //FormArray 'transactions' internal functioning.
  addTransactionGroup(_amount, _details, _date): FormGroup {
    return this.fb.group({
      amount: [_amount, Validators.required],
      details: [_details, Validators.required],
      date: [_date, Validators.required]
    });
  }


  addTransaction(_amount, _details, _date) {
    (<FormArray>this.paymentForm.get('transactions')).push(this.addTransactionGroup(_amount, _details, _date));
  }


  clearAllTransactions() {
    (<FormArray>this.paymentForm.get('transactions')).clear();
    this.addTransaction(null, null, null);
  }


  deleteTransaction(i) {
    let array = this.paymentForm.get('transactions') as FormArray;
    (<FormArray>this.paymentForm.get('transactions')).removeAt(i);
    if (array.length == 0) {
      this.snackBar.open("You have cleared all transactions now", "", {duration: 3000,});
      this.addTransaction(null, null, null);
    }
    this.calcRemainingAmount();
  }


  convertPaymentsToTransactionArray(oldPayment) {
    console.log("Old transactions added");
    (<FormArray>this.paymentForm.get('transactions')).clear();
    for (let payment of oldPayment) {
      // console.log(payment);
      this.addTransaction(payment.amount, payment.details, payment.transactionDate);
    }
  }


  //creating paymentList to send to BE at the time of submit
  convertTransactionArrayToPayments() {
    this.paymentList = [];
    let array = <FormArray>this.paymentForm.get('transactions');
    //sending empty paymentList for no transactions
    if (array.controls[0].value['amount'] == null)
      this.paymentList = [];
    else {
      for (let element of array.controls) {
        let payment = new Payment(element.value['amount'], element.value['details'], element.value['date']);
        this.paymentList.push(payment);
      }
    }
  }


  invalidateSample(e) {
    // here e is a boolean, true if checked, otherwise false
    if (e) {
      this.getLinkingULIDList();
      this.isSampleInvalid = true;
    } else {
      this.master.remark = '';
      this.isSampleInvalid = false;
    }
  }


  submit() {
    if(this.master.remark=='Others'){
      console.log('change remark');
      this.master.remark=this.otherRemark;
    }
    this.master.ulid = this.master.ulid.substr(0, 5) + this.centerULID + this.master.ulid.substr(-3);
    if (this.regType == 'INTERNAL') {
      this.receivingFormService.receiving(this.sampleId, this.master.ulid, this.isSampleInvalid ? this.master.remark : null, this.isLinkEnabled ? this.master.linked : null, this.master.remainingAmount, []).subscribe(
        data => {
          console.log(data);
          this.snackBar.open("Sample received", "", {duration: 3000,})
        },
        error => this.displayError(error,"Error in adding sample"),
      )
    }
    else {
      this.convertTransactionArrayToPayments();
      console.log(this.paymentList);
      if (this.uSampleId == null) {
        // this.master.isActive = true;
        this.master.isValid = this.isSampleInvalid==true?'N':'Y';
        this.master.status = 'RECEIVED';
        this.receivingFormService.storeXPatientDetail(this.master, this.pdd, this.sampleId, this.paymentList).subscribe(
          data => this.snackBar.open("Sample received", "", {duration: 3000,}),
          error => this.displayError(error,"Error in adding sample"),
        )//when its a new entry or using uhid. Sample id is generated
      } else
        this.receivingFormService.receiving(this.sampleId, this.master.ulid, this.isSampleInvalid ? this.master.remark : null, this.isLinkEnabled ? this.master.linked : null, this.master.remainingAmount, this.paymentList).subscribe(
          data => this.snackBar.open("Sample received", "", {duration: 3000,}),
          error => this.displayError(error,"Error in adding sample"),
        )
      //when it is redirected for linking or using sId.
    }
    this.reset();
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

  reset(){
    this.master=null;
    this.pdd=null;
    this.uSampleId=null;
    this.uUHID=null;
    this.sampleId=null;
    this.dataSource=null;
    this.selection=null;
    this.centerULID=null;
    this.isULIDVerified=null;
    this.ULIDCounter=null;
    this.linkingULIDList=null;
    this.paymentList=null;
    this.transactions= new FormArray([]);
    this.doctorFilter= new FormControl();
    this.otherRemark=null;
    this.doctorBind=null;
    this.tmaster=null;
    this.incorrectRegType=false;

    this.paymentForm = this.fb.group({
      transactions: this.fb.array([
        this.addTransactionGroup(null, null, null),
      ])
    });

    this.initializeNewForm();
  }

  confirmSubmit(){
    let a=false;
    let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {
        message : "Do you want to submit the form?",
        confirmTitle : "Submit",
        title : "Alert!",
        },
      width:"300px",
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.newForm=true;
        this.submit();
      }
      else if(!result){
        ;
      }
    });
  }
}

//unresolved issues-
// DONE---SampleId appearing as null for external instead of auto generating. Synch issue
// DONE---submit for external not working.
// DONE---autogenerated SampleId not getting updated after verifying ulid
// DONE---payments getting added in BE. old ones are not getting removed
// DONE---form is getting submitted with no external transactions. Do we allow that?
// DONE---transaction row is not responsive to screen size
// DONE---no different color to CSF and SERUM.
// DONE---Wrong date format id being received in BE.

// After we are doing internal receiving and shifting to external form field are turning red because of class.touched property.
