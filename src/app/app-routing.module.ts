import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivingStationComponent} from './receiving-station/receiving-station.component';
import { SegregationStationComponent } from './segregation-station/segregation-station.component';

const routes: Routes = [
  {path:"",redirectTo:"/segregation",pathMatch:"full"},
  {path:"receive",component : ReceivingStationComponent},
  {path:"segregation",component : SegregationStationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
