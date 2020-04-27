import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { VialConfirmationDialogComponent } from '../vial-confirmation-dialog/vial-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SegregationService } from '../services/segregation.service';

let wholeData = [{"id":2,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANA"},{"id":3,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":1,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANC"},{"id":4,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:ANA"},{"id":5,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MOG"},{"id":6,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:MOG"},{"id":7,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:ANA"},{"id":8,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:MOG"},{"id":9,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":6,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MYU"}];

@Component({
  selector: 'app-list-generation',
  templateUrl: './list-generation.component.html',
  styleUrls: ['./list-generation.component.css']
})
export class ListGenerationComponent implements OnInit {
  state: any;
  testCategory:String;
  testList:any;
  listData:{[key:string]: any} = {};

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
  columnsToFilter= [
    "serialNo",
    "vlid",
    "master.patientDemographicDetail.name",
    "master.patientDemographicDetail.name",
    "master.patientDemographicDetail.age",
    // "sample.master.patientDemographicDetail.sex",
    "master.drName",
    "master.patientDemographicDetail.hospitalName",
  ];

  dataSource;
  selectedIndex = 0;
  testTabMap={};
  inputVLID="";

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<Element>;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router :Router,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    private segregationService: SegregationService,
  ) { }

  ngOnInit(): void {

    // if (typeof history.state.data == "undefined" || !history.state.data) {
    //   this.router.navigateByUrl("/pagenotfound");
    // }
    // this.testCategory = history.state.data.category

    this.activatedRoute.queryParams.subscribe(params => {
        this.testCategory = params['testCategory'];
        console.log(this.testCategory);
      });
    // this.testCategory = "BLOT"

    this.generateNav();

}

async generateNav(){
    this.testList = [
      {"id":1,"vials":null,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},
      {"id":2,"vials":null,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},
      {"id":3,"vials":null,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true},
      {"id":6,"vials":null,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":5,"lockedCounter":0,"active":true}];

    // this.testList = await this.segregationService.getActiveTests(this.testCategory);

    for (let index = 0; index < this.testList.length; index++) {
      const test = this.testList[index];
      this.testTabMap[test.code] = index;
      this.listData[test.code] = [];
      //   for (let i = 0; i < 4*index+1; i++) {
    //     this.vialData["serialNo"] = i;
    //     this.listData[test.code].push(this.vialData);
    //   }
    }
    // this.listData = await this.segregationService.getCurrentTestListByCategory(this.testCategory);
    // console.log(this.listData);

    this.dataSource = new MatTableDataSource(this.listData[this.testList[this.selectedIndex].code]);
    this.dataSource.paginator = this.paginator;
    console.log(this.testTabMap);

  }

//   getTestList(testCategory){
//     this.segregationService.getActiveTests(testCategory).subscribe(data=>{
//       console.log(data);
//       this.testList = data;
//       return data;
//     },
//     error=>{
//       if(error.status == 500){
//         this.snackBar.open("Name mismatch with database!","",{
//           duration:3000,
//         });
//       }
//       else if(error.status == 0){
//         this.snackBar.open("Database server not working!","",{
//           duration:3000,
//         });
//       }
//       else{
//         this.snackBar.open("Unknown Error!Contact Devloper.","",{
//           duration:3000,
//         });
//       }
//     });
//   }

  generateChipNo(index,groupSize){
    return Math.ceil(index/groupSize)
  }

  tabChanged(event?){
    // this.dataSource = this.listData[this.testList[this.selectedIndex]["code"]];
    this.dataSource = new MatTableDataSource(this.listData[this.testList[this.selectedIndex]["code"]]);
    this.dataSource.paginator = this.paginator;
  }

  doesVialExist(vials,vlid):boolean{
    for (let index = 0; index < vials.length; index++) {
      const vial = vials[index];
      if(vial.vlid == vlid){
        return true;
      }
    }
    return false;
  }

  unsolidify(){
    // this.segregationService.updateLockedCounter(this.testList[this.selectedIndex]["code"],0)
    // .subscribe(data=>{
    //   console.log(data);
    //   this.testList[this.selectedIndex]["lockedCounter"] = data["lockedCounter"];
    //   this.snackBar.open("Unsolidified successfully","",{
    //     duration : 1000,
    //   });
    // },
    // error => {
    //   if(error.status == 500){
    //     this.snackBar.open("Constrain issue in database!","",{
    //       duration:3000,
    //     });
    //   }
    //   else if(error.status == 0){
    //     this.snackBar.open("Database server not working!","",{
    //       duration:3000,
    //     });
    //   }
    //   else{
    //     this.snackBar.open("Unknown Error!Contact Devloper.","",{
    //       duration:3000,
    //     });
    //   }
    // });
    if (this.segregationService.updateLockedCounter(this.testList[this.selectedIndex]["code"],this.listData[this.testList[this.selectedIndex]["code"]].length)){
      this.testList[this.selectedIndex]["lockedCounter"] = 0;

      this.snackBar.open("Solidified successfully","",{
        duration : 1000,
      });
    }
    else{
      this.snackBar.open("Unknown Error!Contact Devloper.","",{
        duration:3000,
      });
    }

  }

  solidify(){
    // this.segregationService.updateLockedCounter(this.testList[this.selectedIndex]["code"],this.listData[this.testList[this.selectedIndex]["code"]].length)
    // .subscribe(data=>{
    //   console.log(data);
    //   this.testList[this.selectedIndex]["lockedCounter"] = data["lockedCounter"];
    //   this.snackBar.open("Solidified successfully","",{
    //     duration : 1000,
    //   });
    // },
    // error => {
    //   if(error.status == 500){
    //     this.snackBar.open("Vial doesn't exist!","",{
    //       duration:3000,
    //     });
    //   }
    //   else if(error.status == 0){
    //     this.snackBar.open("Database server not working!","",{
    //       duration:3000,
    //     });
    //   }
    //   else{
    //     this.snackBar.open("Unknown Error!Contact Devloper.","",{
    //       duration:3000,
    //     });
    //   }
    // });
    if (this.segregationService.updateLockedCounter(this.testList[this.selectedIndex]["code"],this.listData[this.testList[this.selectedIndex]["code"]].length)){
      this.testList[this.selectedIndex]["lockedCounter"] = this.listData[this.testList[this.selectedIndex]["code"]].length;

      this.snackBar.open("Solidified successfully","",{
        duration : 1000,
      });
    }
    else{
      this.snackBar.open("Unknown Error!Contact Devloper.","",{
        duration:3000,
      });
    }
  }

  taddVial(){
    this.inputVLID = this.inputVLID.toUpperCase();

    if(!this.inputVLID || this.inputVLID.length == 0 || !this.listData.hasOwnProperty(this.inputVLID.split(":")[1])) {
      this.snackBar.open("Enter Valid VLID!","",{
        duration:1000,
      });
      return;
    }

    if(this.doesVialExist(this.listData[this.inputVLID.split(":")[1]],this.inputVLID)){
      //because vlid = ulid:testcode & ulid = CAU20/00001
      this.snackBar.open("Vial already in list!","",{
        duration:1000,
      });
      return;
    }

    let vialData;
    this.segregationService.getPatientDetailByVLID(this.inputVLID).subscribe(
      data=>{
        vialData = data;
        if(vialData["serialNo"] != null || vialData["testingDate"] != null)
        {
            this.snackBar.open("already tested on "+vialData.testingDate,"",{
                duration : 3000,
            });
            return;
        }
        vialData["serialNo"] = this.listData[vialData["test"]["code"]].length+1;
        console.log(vialData);
        this.inputVLID="";
        const dialogRef = this.dialog.open(VialConfirmationDialogComponent,{
          data : {
            vialData : vialData,
            lockedCounter : this.testList[this.testTabMap[vialData["test"]["code"]]]["lockedCounter"],
          },
          width : "50%",
        });
        dialogRef.afterClosed().subscribe(newSerialNo=>{
          if(newSerialNo){
            console.log("newSerialNo : "+newSerialNo);
            let today = new Date();
            vialData.testingDate = today.getFullYear()+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+String(today.getDate()).padStart(2, '0');

            this.segregationService.updateVial(vialData).subscribe(data=>{
              console.log(data);
              console.log("vial Updated in DB");

              this.selectedIndex = this.testTabMap[vialData["test"]["code"]];

              if(vialData["serialNo"] != newSerialNo){

                let oldSerialNo = vialData["serialNo"];

                this.listData[vialData["test"]["code"]].push(vialData);

                console.log(this.listData[vialData["test"]["code"]][0]);

                let tVialData = this.listData[vialData["test"]["code"]][newSerialNo-1];
                this.listData[vialData["test"]["code"]][newSerialNo-1] = this.listData[vialData["test"]["code"]][oldSerialNo-1];
                this.listData[vialData["test"]["code"]][oldSerialNo-1] = tVialData;

                this.listData[vialData["test"]["code"]][newSerialNo-1]["serialNo"] = newSerialNo;
                this.listData[vialData["test"]["code"]][oldSerialNo-1]["serialNo"] = oldSerialNo;

                console.log("after change!");
                console.log(this.listData[vialData["test"]["code"]]);
                this.tabChanged();
                // console.log("oldSerialNo : "+oldSerialNo);
                // vialData["serialNo"] = newSerialNo;
                // this.listData[vialData["test"]["code"]][newSerialNo-1]["serialNo"] = oldSerialNo;
              }
              else{
                this.listData[vialData["test"]["code"]].push(vialData);
                this.tabChanged();
              }

            },
            error=>{
              console.error("Error vial updating DB for serialNo or Testing Date!");
              //handle error here!
              // if (error.status == 500) {

              // }
            });
          }
          else{
            this.snackBar.open("Operation aborted!","",{
              duration : 1000,
            });
          }
        });
      },
      error=>{
        console.error(error);
        if(error.status == 500){
          this.snackBar.open("Vial doesn't exist!","",{
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
      }
    );
  }

  vialI = 0;
  addVial(){
    console.log(this.listData);

    //checck for synchronus behaviour with backend
    let vialData = wholeData[this.vialI];
    vialData["serialNo"] = this.listData[vialData["test"]["code"]].length+1;
    console.log(vialData);
    const dialogRef = this.dialog.open(VialConfirmationDialogComponent,{
      data : {
        vialData : vialData,
        indexNo : this.listData[vialData["test"]["code"]].length+1,
        lockedCounter : this.testList[this.testTabMap[vialData["test"]["code"]]]["lockedCounter"],
      },
      width : "50%",
    });
    dialogRef.afterClosed().subscribe(newSerialNo=>{
      if(newSerialNo){
        console.log("newSerialNo : "+newSerialNo);
        this.selectedIndex = this.testTabMap[wholeData[this.vialI]["test"]["code"]];

        if(vialData["serialNo"] != newSerialNo){

          let oldSerialNo = vialData["serialNo"];

          this.listData[vialData["test"]["code"]].push(vialData);

          console.log(this.listData[vialData["test"]["code"]][0]);

          let tVialData = this.listData[vialData["test"]["code"]][newSerialNo-1];
          this.listData[vialData["test"]["code"]][newSerialNo-1] = this.listData[vialData["test"]["code"]][oldSerialNo-1];
          this.listData[vialData["test"]["code"]][oldSerialNo-1] = tVialData;

          this.listData[vialData["test"]["code"]][newSerialNo-1]["serialNo"] = newSerialNo;
          this.listData[vialData["test"]["code"]][oldSerialNo-1]["serialNo"] = oldSerialNo;

          console.log("after change!");
          console.log(this.listData[vialData["test"]["code"]]);
          this.tabChanged();
          // console.log("oldSerialNo : "+oldSerialNo);
          // vialData["serialNo"] = newSerialNo;
          // this.listData[vialData["test"]["code"]][newSerialNo-1]["serialNo"] = oldSerialNo;
        }
        else{
          this.listData[vialData["test"]["code"]].push(vialData);
          this.tabChanged();
        }
      }
      else{
        this.snackBar.open("Operation aborted!","",{
          duration : 1000,
        });
      }
      this.vialI+=1;

    });

  }
}