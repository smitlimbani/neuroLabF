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
    console.log(this.data);

    this.vialData = this.data.vialData;
    this.indexNo = this.data.vialData["serialNo"];

  }

  isIndexNoAvailable(){
    if(this.indexNo > this.data.indexNo){
      this.isIndexNoValid = false;
    }
  }
}
