import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-receiving-station',
  templateUrl: './receiving-station.component.html',
  styleUrls: ['./receiving-station.component.css']
})
export class ReceivingStationComponent implements OnInit {

  selectedIndex=0;
  master;
  constructor() { }

  ngOnInit(): void {
  }

  linkMe(master:any){
    console.log("from parent!");

    console.log(master);
    this.master = master;
    this.selectedIndex = 1;
  }

}
