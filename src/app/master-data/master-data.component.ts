import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent implements OnInit {

  @Input() master;
  @Input() hospitalName:string;
  @Input() displaySamples:boolean;
  @Input() labTests;
  @Input() displayVials:boolean;
  isExternal:boolean=false;

  constructor() { }

  ngOnInit(): void {
    if(this.master.ulid?.charAt(2)=='X')
      this.isExternal=true;
  }

  public getTest(vlid:string){
    for(let test of this.labTests)
      if(vlid.substr(14,3)==test.code)
        return test.name;
  }


}
