import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MapSampleService } from '../services/map-sample.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-map-sample',
  templateUrl: './map-sample.component.html',
  styleUrls: ['./map-sample.component.css']
})

export class MapSampleComponent implements OnInit {

  masters:any;
  columnsToDisplay = [
    "index",
    "ulid",
    "sampleId",
    "patientDemographicDetail.uhid",
    "patientDemographicDetail.name",
    "patientDemographicDetail.age",
    "patientDemographicDetail.sex",
    "drName",
    "status",
    "reqDate",
    "sampleType",
    "Test",
    "Action"
  ];
  columnsToFilter = [
    "ulid",
    "samples",
    "patientDemographicDetail.uhid",
    "patientDemographicDetail.name",
    "patientDemographicDetail.age",
    // "patientDemographicDetail.sex",
    "patientDemographicDetail.hospitalName",
    "drName",
    "status",
    "reqDate",
    "sampleType"
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() alertLink:EventEmitter<any> = new EventEmitter();

  mergeActive=false;

  constructor(
    private mapSampleService : MapSampleService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
    ) { }

  ngOnInit(): void {
    // console.log("started onInit()");
    this.populateTable();
    // console.log("exit onInit()");
  }

  async populateTable(){
    await this.loadData();
    // this.appendFeatures();
  }

  async loadData(){
    // this.masters = new MatTableDataSource(this.mapSampleService.getMasters());
    // console.log("started loadData()");
    let data =await this.mapSampleService.getMasters();
    // console.log("after call");
    this.masters = new MatTableDataSource(data);
    console.log(this.masters);
    // console.log("exit loadData()");
  // }

  // // ngAfterViewInit (){
  // appendFeatures(){
    // console.log("ngAfterViewInit started!");
    this.masters.sortingDataAccessor =
    (data: object, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };

    this.masters.filterPredicate = (data, filter) => {
      let dataStr='';
      let keys;
      for(const column of this.columnsToFilter){
        keys = column.split('.');
        dataStr+=this.nestedFilter(data,keys);
      }
      dataStr = dataStr.trim().toLowerCase();

      return dataStr.indexOf(filter) != -1; ;
    }

    this.masters.sort = this.sort;
    this.masters.paginator = this.paginator;
    // console.log("exit ngAfterViewInit!");
  }

  nestedFilter(data,keys){
    let dataStr="";
    for(let key of keys){
        data = data[key]
    }
    dataStr = data;
    // console.log(dataStr);
    if(typeof data == "object"){
      for(let sample of data){
        dataStr += sample["sampleId"];
      }
    }
    // console.log(dataStr);
    return dataStr || '';
  }

  selection = new SelectionModel<Object>(false,[]);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.masters.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.masters.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ulid + 1}`;
  }

  rowClicked(data){
    console.log(data.selected);

  }

  applyFilter(filterString : string){
    this.masters.filter = filterString.trim().toLowerCase();
  }



  firstSelection = null;

  alertMerge(master){
    this.firstSelection = master;
    console.log("alertMerge");
    this.columnsToDisplay.unshift("select");
    this.mergeActive = !this.mergeActive;
  }

  abortMerge(){
    this.columnsToDisplay.shift();
    this.selection.clear();
    this.mergeActive = !this.mergeActive;
  }

  mergeMe(master){
    if(this.selection.selected.length != 1){
      this.snackBar.open("Select something you moron!","",{
        duration:1000,
      });
      return;
    }
    console.log("Merged : ");
    console.log(master);
    console.log(this.selection.selected[0]['id']);
    this.mapSampleService.mergeSamples(master.id,this.selection.selected[0]['id']).subscribe(
      data=>{
        this.snackBar.open("Merged SuccessFullly","",{
          duration:1000,
        });
        this.abortMerge();
        this.loadData();
      },
      error=>{
        console.error(error.error);
        this.snackBar.open("Error! Contact developer.","",{
          duration:1000,
        });
      }
    );
  }

  alertConfNR(master){
    console.log("alertConfNR"+master);
    let dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {
        message : "Mark not received?",
        confirmTitle : "Mark NR",
        title : "Warning!",
        master : master},
      width:"300px",
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        alert("yes!");
        this.mapSampleService.confirmSampleNotReceived(master.id).subscribe(
          data => {
            this.snackBar.open("Deleted Successfully!","",{
              duration : 1000,
            });
            this.loadData();
          },
          error => {
            this.snackBar.open("Error, Contact Devloper!","",{
              duration : 3000,
            });
            console.log(error.error)
          },
        );
      }
      else if(!result){
        this.snackBar.open("Operation aborted!","",{
          duration : 1000,
        });
      }
    });
  }
}
