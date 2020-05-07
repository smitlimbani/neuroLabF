import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pdd-data',
  templateUrl: './pdd-data.component.html',
  styleUrls: ['./pdd-data.component.css']
})
export class PddDataComponent implements OnInit {

  @Input() pdd;
  constructor() { }

  ngOnInit(): void {
  }

}
