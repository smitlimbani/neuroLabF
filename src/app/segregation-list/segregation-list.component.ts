import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { SegregationService } from '../services/segregation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatDateFormats, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DashboardService } from '../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

let wholeData = [{"id":2,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":1,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANA"},{"id":3,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":1,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":2,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANC"},{"id":4,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":3,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:ANA"},{"id":5,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":4,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MOG"},{"id":6,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":4,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:MOG"},{"id":7,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":5,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:ANA"},{"id":8,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":6,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:MOG"},{"id":9,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":6,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":8,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MYU"}];
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};


@Component({
  selector: 'app-segregation-list',
  templateUrl: './segregation-list.component.html',
  styleUrls: ['./segregation-list.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class SegregationListComponent implements OnInit {
  selectedDate = new FormControl(new Date());
  selectedTest;
  testList=[];
  dataSource;
  strDate;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  columnsToDisplay= [
    "chipNo",
    "serialNo",
    "vlid",
    "master.patientDemographicDetail.name",
    "master.patientDemographicDetail.age",
    "master.patientDemographicDetail.sex",
    "drName",
    "result",
  ];

  constructor(
    private segregationService : SegregationService,
    private snackBar : MatSnackBar,
    private dashboardService : DashboardService,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    //STATIC
    // this.testList = [
    //   {"id":1,"vials":null,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},
    //   {"id":2,"vials":null,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},
    //   {"id":3,"vials":null,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},
    //   {"id":6,"vials":null,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true}];

    //SERVER
    this.loadTestList();
  }

  loadTestList(){
    this.dashboardService.getTestsList()
    .then(data=>{
      // this.testList = data;
      for (const code in data) {
        if (data.hasOwnProperty(code)) {
          const test = data[code];
          // console.log(test);
          this.testList.push(test);
        }
      }
    })
    .catch(error=>{
      console.error(error.message);
      let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
        data : {
          message : "Server is not working at : "+error.url,
          confirmTitle : "",
          cancelTitle : "Cancle",
          title : "Error!",
        },
        width:"400px",
      });
    });
  }

  generateChipNo(index,groupSize){
    return Math.ceil(index/groupSize)
  }

  loadData(data){
    console.log(data);
    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
    
  }

  export(exporter){
    console.log(this.selectedTest);
    console.log(this.selectedDate.value);
    let strDate = String(this.selectedDate.value.getDate()).padStart(2, '0')+"-"+String(this.selectedDate.value.getMonth() + 1).padStart(2, '0')+"-"+this.selectedDate.value.getFullYear();
    console.log(strDate);

    exporter.exportTable('xlsx', {fileName:this.selectedTest.testCategory+'_'+this.selectedTest.code+'_'+strDate, sheet: this.selectedTest.code})
  }
  
  onGenerateList(picker){
    if(!this.selectedTest || !this.selectedDate)
    {
      this.snackBar.open("Select Test and Date!","",{
        duration:3000,
      });
      return
    }
    else{

      // this.loadData(wholeData);
      // console.log(this.selectedDate.value);
      this.strDate = this.selectedDate.value.getFullYear()+"-"+String(this.selectedDate.value.getMonth() + 1).padStart(2, '0')+"-"+String(this.selectedDate.value.getDate()).padStart(2, '0');
      this.segregationService.getTestListByCodeAndDate(this.selectedTest.code,this.strDate).subscribe(data=>{
        console.log(data);
        if(data == ""){
          this.snackBar.open("No data available","",{
            duration:3000,
          });
        }
        this.loadData(data);      
      },
      error=>{
        if(error.status == 500){
          this.snackBar.open("Invalid input given!","",{
            duration:3000,
          });
        }
        else if(error.status == 0){
          this.snackBar.open("Database server not working!","",{
            duration:3000,
          });
        }
        else{
          this.snackBar.open("Unknown Error!Contact Devloper.","",{
            duration:3000,
          });
        }
      });
    }
  }

}
