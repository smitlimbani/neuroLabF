import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vial-data',
  templateUrl: './vial-data.component.html',
  styleUrls: ['./vial-data.component.css']
})
export class VialDataComponent implements OnInit {

  @Input() vial;
  @Input() labTests;

  constructor() { }

  ngOnInit(): void {
  }

}
