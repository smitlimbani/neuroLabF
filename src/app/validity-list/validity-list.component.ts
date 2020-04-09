import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ValidityListService } from '../services/validity-list.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-validity-list',
  templateUrl: './validity-list.component.html',
  styleUrls: ['./validity-list.component.css']
})
export class ValidityListComponent implements OnInit {

  validityLists;
  columnsToDisplay= ["UHID","ULID","SampleId","Name","Age","Sex","isValid","Remark","Test","Validate"];
  constructor(
    private validityListService:ValidityListService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    ) {}
  ngOnInit(): void {
    this.getValidityLists();
  }
  getValidityLists(){
    this.validityListService.getValidityLists().subscribe(
      data => {
        console.log(data);
        this.validityLists = data;
      },
      error => {
        console.error("Error in fetching validityLists");
      }
    );
    // this.validityLists = this.validityListService.getValidityLists();
    // console.log(this.validityLists);
    
  }

  alertRemove(validityList:any){
    let dialogRef = this.dialog.open(ConfirmationDialog,{
      data : validityList,
      width:"300px",
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.validityListService.deleteValidityList(validityList.id).subscribe(retVal=>{
          if(retVal){
            this.snackBar.open("Validated successfully!","",{
              duration:3000,
            });
            this.getValidityLists();
          }
          else{
            this.snackBar.open("Error occured!");
          }
        },
        error=>{
          this.snackBar.open("Contact Developer","",{
            duration:3000,
          });
          console.log(error.error);
        });
      }
      else if(!result){
        console.log("Operation terminated!");
      }
    });
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  // @Output() confirmRemove:EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {}
  ngOnInit(): void {
    
  }
}