import { Component, OnInit, ViewChild } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../segregation-list/segregation-list.component';
import { DashboardService } from '../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

let masters = [{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UL123456789"},"paymentCategory":{"id":2,"code":"ABP50","discountPercentage":50.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"vials":[{"id":2,"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":2,"lastActivDate":"2020-05-06","active":true},"serialNo":1,"fileName":null,"reportingDate":null,"creationDate":"2020-04-21","testingDate":"2020-05-06","remark":null,"result":null,"vlid":"ULID1:ANA"},{"id":3,"test":{"id":1,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"lastActivDate":"2020-05-06","active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANC"},{"id":5,"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"lastActivDate":"2020-05-06","active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MOG"},{"id":9,"test":{"id":6,"code":"myo","name":"myo","rate":1550.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"lastActivDate":"2020-05-06","active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:myo"}],"nNo":"n123321","totalAmount":8000,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","drEmailId":null,"drContactNo":null,"reqDate":"2020-04-03","ulid":"S:AU-00001/20","ana":"RAISED","active":true,"anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XM123456789"},"paymentCategory":{"id":3,"code":"BPL","discountPercentage":25.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"vials":[{"id":4,"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":2,"lastActivDate":"2020-05-06","active":true},"serialNo":2,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":"2020-05-06","remark":null,"result":null,"vlid":"ULID2:ANA"},{"id":6,"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"lastActivDate":"2020-05-06","active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:MOG"}],"nNo":"n123789","totalAmount":9000,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","drEmailId":null,"drContactNo":null,"reqDate":"2020-04-02","ulid":"S:XU-00002/20","ana":"SEPARATED","active":true,"anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UL123456789"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"vials":[{"id":7,"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":2,"lastActivDate":"2020-05-06","active":true},"serialNo":3,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":"2020-05-06","remark":null,"result":null,"vlid":"ULID3:ANA"},{"id":8,"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"lastActivDate":"2020-05-06","active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:MOG"}],"nNo":"n123456","totalAmount":11000,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","drEmailId":null,"drContactNo":null,"reqDate":"2020-04-13","ulid":"S:AU-00002/20","ana":"RAISED","active":true,"anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"}];
let TESTLIST = { "PARA" : { "id" : 5, "vials" : null, "code" : "PAR", "name" : "para", "rate" : 1550.0, "testCategory" : "IF", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : "2020-05-06", "active" : false }, "ANA" : { "id" : 2, "vials" : null, "code" : "ANA", "name" : "ANA", "rate" : 100.0, "testCategory" : "BLOT", "groupSize" : 2, "lockedCounter" : 2, "lastActivDate" : "2020-05-06", "active" : true }, "MOG" : { "id" : 3, "vials" : null, "code" : "MOG", "name" : "MOG", "rate" : 150.0, "testCategory" : "BLOT", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : "2020-05-06", "active" : true }, "ANCA" : { "id" : 1, "vials" : null, "code" : "ANC", "name" : "ANCA", "rate" : 1000.0, "testCategory" : "BLOT", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : "2020-05-06", "active" : true }, "GANGIGG" : { "id" : 7, "vials" : null, "code" : "GAG", "name" : "GANGIGG", "rate" : 1550.0, "testCategory" : "OTHER", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : null, "active" : false }, "NMDA" : { "id" : 4, "vials" : null, "code" : "NMD", "name" : "NMDA", "rate" : 1500.0, "testCategory" : "IF", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : "2020-05-06", "active" : false }, "MYO" : { "id" : 6, "vials" : null, "code" : "myo", "name" : "myo", "rate" : 1550.0, "testCategory" : "BLOT", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : "2020-05-06", "active" : true }, "GANGIGM" : { "id" : 8, "vials" : null, "code" : "GAM", "name" : "GANGIGM", "rate" : 1550.0, "testCategory" : "OTHER", "groupSize" : 2, "lockedCounter" : 0, "lastActivDate" : null, "active" : false } };

@Component({
  selector: 'app-explore-data',
  templateUrl: './explore-data.component.html',
  styleUrls: ['./explore-data.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ExploreDataComponent implements OnInit {

  columnsToDisplay = [
    "index",
    "ulid",
    "patientDemographicDetail.uhid",
    "patientDemographicDetail.name",
    "patientDemographicDetail.age",
    "patientDemographicDetail.sex",
    "nNo",
    "drName",
    "reqDate",
    "status",
    "sampleType",
    "ana",
    "anca",
    "mog",
    "nmda",
    "para",
    "myo",
    "gangigg",
    "gangigm",
    "paymentCategory.code",
    "totalAmount"
  ];
  columnsToFilter = [
    "ulid",
    "patientDemographicDetail.uhid",
    "patientDemographicDetail.name",
    "patientDemographicDetail.age",
    "patientDemographicDetail.sex",
    "nNo",
    "drName",
    "patientDemographicDetail.hospitalName",
    "reqDate",
    "status",
    "sampleType",
    "ana",
    "anca",
    "mog",
    "nmda",
    "para",
    "myo",
    "gangigg",
    "gangigm",
    "paymentCategory.code",
    "totalAmount"
  ];
  startDate;
  startDateStr;
  endDate;
  endDateStr;
  dataSource;
  FilterArry={
    selectedTest:"",
    // masterStatus:"",
    // sampleType:"",
  };
  testList;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.startDate = new FormControl(new Date());
    this.startDate.value.setDate(this.startDate.value.getDate()-7);
    this.startDateStr = String(this.startDate.value.getDate()).padStart(2, '0')+"-"+String(this.startDate.value.getMonth() + 1).padStart(2, '0')+"-"+this.startDate.value.getFullYear();
    this.endDate = new FormControl(new Date());
    this.endDateStr = String(this.endDate.value.getDate()).padStart(2, '0')+"-"+String(this.endDate.value.getMonth() + 1).padStart(2, '0')+"-"+this.endDate.value.getFullYear();
    // this.loadData();
    this.loadTestList();
  }

  loadTestList(){
    // this.testList = await this.dashboardService.getTestsList();
    this.dashboardService.getTestsList()
    .then(data=>{
      this.testList = data;
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

  populateTable(){
    let sDate = this.startDate.value.getFullYear()+"-"+String(this.startDate.value.getMonth() + 1).padStart(2, '0')+"-"+String(this.startDate.value.getDate()).padStart(2, '0');
    let eDate = this.endDate.value.getFullYear()+"-"+String(this.endDate.value.getMonth() + 1).padStart(2, '0')+"-"+String(this.endDate.value.getDate()).padStart(2, '0');
    this.dashboardService.getMastersByReqDateBetween(sDate,eDate).subscribe(data=>{
      console.log(data);
      this.loadData(data);
    },
    error => {
      if(error.status == 500){
        this.snackBar.open("Server couldn't perform operation!","",{
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
    });
  }

  loadData(data){
    for (const key in this.FilterArry) {
      if (this.FilterArry.hasOwnProperty(key) && this.FilterArry[key]) {
        this.FilterArry[key] = "";
      }
    }
    this.startDateStr = String(this.startDate.value.getDate()).padStart(2, '0')+"-"+String(this.startDate.value.getMonth() + 1).padStart(2, '0')+"-"+this.startDate.value.getFullYear();
    this.endDateStr = String(this.endDate.value.getDate()).padStart(2, '0')+"-"+String(this.endDate.value.getMonth() + 1).padStart(2, '0')+"-"+this.endDate.value.getFullYear();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor =
    (data: object, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr='';
      let keys;
      let keywords = filter.split(',');
      for (const keyword of keywords) {

        for(const column of this.columnsToFilter){
          keys = column.split('.');
          dataStr+=this.nestedFilter(data,keys);
        }
        dataStr = dataStr.trim().toLowerCase();
        if(dataStr.indexOf(keyword) == -1){
          return false;
        }
      }
      return true
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  filterData(){
    let filterStr="";
    for (const key in this.FilterArry) {
      if (this.FilterArry.hasOwnProperty(key) && this.FilterArry[key]) {
        filterStr+=this.FilterArry[key]+",";
      }
    }
    console.log(filterStr.trim().toLowerCase());

    this.dataSource.filter = filterStr.trim().toLowerCase();
  }

  // calculateAmount()

  nestedFilter(data,keys){
    for(let key of keys){
        data = data[key]
      }
    return data || '';
  }

  applyFilter(filterString : string){
    this.dataSource.filter = filterString.trim().toLowerCase();
  }
}
