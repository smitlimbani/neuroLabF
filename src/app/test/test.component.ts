import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';


export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  dateToday;
  today = new Date();
  dataSource;
  code="ana";
  constructor() { }

  ngOnInit(): void {
    this.dateToday = this.today.getFullYear()+"-"+String(this.today.getMonth() + 1).padStart(2, '0')+"-"+String(this.today.getDate()).padStart(2, '0');
    this.dataSource = new MatTableDataSource(this.transactions);
  }
  displayedColumns: string[] = ['item', 'cost',"result"];
  transactions   = [
      {item: 'Beach ball',extra:"temp" ,cost: 4},
      {item: 'Towel',extra:"temp" ,cost: 5},
      {item: 'Frisbee',extra:"temp" ,cost: 2},
      {item: 'Sunscreen',extra:"temp" ,cost: 4},
      {item: 'Cooler',extra:"temp" ,cost: 25},
      {item: 'Swim suit',extra:"temp" ,cost: 15},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
      return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  print(){
    console.log(this.dataSource);
    // let doc = new jsPDF(); 
    // doc.autoTable({
    //   head: [['Log','', 'Amount']],
    //   body: [["log1", "$100"], ["log2", "$200"]],
    // });
    // doc.save('table.pdf')
  }

}
