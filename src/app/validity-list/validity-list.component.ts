import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ValidityListService } from '../services/validity-list.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-validity-list',
  templateUrl: './validity-list.component.html',
  styleUrls: ['./validity-list.component.css']
})
export class ValidityListComponent implements OnInit {

  validityLists;
  columnsToDisplay= [
    // "index",
    "sample.master.ulid",
    "sample.sampleId",
    "sample.master.patientDemographicDetail.uhid",
    "sample.master.patientDemographicDetail.name",
    "sample.master.patientDemographicDetail.age",
    "sample.master.patientDemographicDetail.sex",
    "sample.master.isValid",
    "sample.master.remark",
    "Test",
    "Validate"
  ];
  columnsToFilter= [
    "sample.master.ulid",
    "sample.sampleId",
    "sample.master.patientDemographicDetail.uhid",
    "sample.master.patientDemographicDetail.name",
    "sample.master.patientDemographicDetail.age",
    // "sample.master.patientDemographicDetail.sex",
    "sample.master.isValid",
    "sample.master.remark",
  ];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(
    private validityListService:ValidityListService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.populateTable();
  }

  async populateTable(){
    await this.loadData();
    this.appendFeatures();
  }

  async loadData(){
    // SERVER
    // // console.log("started loadData()");
    // let data = await this.validityListService.getValidityLists();
    // // console.log("after call");
    // console.log("validityList");
    // console.log(data);
    // this.validityLists = new MatTableDataSource(data);
    // // console.log(this.validityLists);
    // // console.log("exit loadData()");

    //STATIC
    this.validityLists = new MatTableDataSource(this.validityListService.getValidityLists());
    console.log(this.validityLists);

  }

  appendFeatures (){
    this.validityLists.sortingDataAccessor =
    (data: object, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };

    this.validityLists.filterPredicate = (data, filter) => {
      let dataStr='';
      let keys;
      for(const column of this.columnsToFilter){
        keys = column.split('.');
        dataStr+=this.nestedFilter(data,keys);
      }
      dataStr = dataStr.trim().toLowerCase();
      return dataStr.indexOf(filter) != -1; ;
    }

    this.validityLists.sort = this.sort;
    this.validityLists.paginator = this.paginator;
  }
  nestedFilter(data,keys){
    for(let key of keys){
        data = data[key]
      }
    return data || '';
  }
  applyFilter(filterString : string){
    this.validityLists.filter = filterString.trim().toLowerCase();
  }

  alertRemove(validityList:any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {
        message : "Do you want to Validate?",
        confirmTitle : "Validate",
        title : "Alert!",
        validityList : validityList},
      width:"300px",
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        alert("yes!");
        // this.validityListService.deleteValidityList(validityList.id).subscribe(retVal=>{
        //   if(retVal){
        //     this.snackBar.open("Validated successfully!","",{
        //       duration:3000,
        //     });
        //     this.loadData();
        //   }
        //   else{
        //     this.snackBar.open("Error occured!");
        //   }
        // },
        // error=>{
        //   this.snackBar.open("Contact Developer","",{
        //     duration:3000,
        //   });
        //   console.log(error.error);
        // });
      }
      else if(!result){
        console.log("Operation terminated!");
      }
    });
  }

}
