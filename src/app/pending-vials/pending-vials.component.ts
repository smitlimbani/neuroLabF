import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

let wholeData = [{"id":2,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":1,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANA"},{"id":3,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":1,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":2,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANC"},{"id":4,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":3,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:ANA"},{"id":5,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":4,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MOG"},{"id":6,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":4,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:MOG"},{"id":7,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":5,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:ANA"},{"id":8,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":6,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:MOG"},{"id":9,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":6,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":8,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MYU"}];

@Component({
  selector: 'app-pending-vials',
  templateUrl: './pending-vials.component.html',
  styleUrls: ['./pending-vials.component.css']
})
export class PendingVialsComponent implements OnInit {

  dataSource;
  columnsToDisplay=[
    "index",
    "master.ulid",
    "vlid",
    "master.patientDemographicDetail.name",
    "master.patientDemographicDetail.age",
    "master.patientDemographicDetail.sex",
    "drName",
    "creationDate",
    "test.testName",
    "test.testCategory",
  ];
  columnsToFilter= [
    "master.ulid",
    "vlid",
    "master.patientDemographicDetail.name",
    "master.patientDemographicDetail.age",
    "master.drName",
    "master.patientDemographicDetail.hospitalName",
    "creationDate",
    "test.testName",
    "test.testCategory",
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private dashboardService : DashboardService,
    private snackBar :MatSnackBar,
    ) { }

  ngOnInit(): void {
    //SERVER
    // this.dashboardService.getPendingVials().subscribe(data=>{
    //   console.log(data);
    //  // this.dataSource = data;
    //   this.loadData(data);
    // },error=>{
    //   if(error.status == 500){
    //     this.snackBar.open("Name mismatch with database!","",{
    //       duration:3000,
    //     });
    //   }
    //   else if(error.status == 0){
    //     this.snackBar.open("Database server not working!","",{
    //       duration:3000,
    //     });
    //   }
    //   else{
    //     this.snackBar.open("Unknown Error!Contact Developer.","",{
    //       duration:3000,
    //     });
    //   }
    // });

    //STATIC
    // this.dataSource = wholeData;
    this.loadData(wholeData);
  }

  loadData(data){

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
