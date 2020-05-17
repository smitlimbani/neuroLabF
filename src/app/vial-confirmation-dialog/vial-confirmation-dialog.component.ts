import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-vial-confirmation-dialog',
  templateUrl: './vial-confirmation-dialog.component.html',
  styleUrls: ['./vial-confirmation-dialog.component.css']
})
export class VialConfirmationDialogComponent implements OnInit {

  vialData;
  indexNo;
  isIndexNoValid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {
    // console.log(this.data);

    this.vialData = this.data.vialData;
    this.indexNo = this.data.vialData["serialNo"];

  }

  //To disable "ADD" button from dialoge box, because it is not allowed to take number less than locked counter and
  // more than current list length. Current list length is default number which is already assigned to vial data!
  isIndexNoAvailable(){
    if(this.indexNo > this.data.vialData["serialNo"] || this.indexNo <= this.data.lockedCounter){
        this.isIndexNoValid = false;
    }
    else{
        this.isIndexNoValid = true;
    }
  }
}
