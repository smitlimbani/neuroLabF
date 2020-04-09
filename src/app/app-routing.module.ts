import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivingStationComponent} from './receiving-station/receiving-station.component';

const routes: Routes = [
  {path:"",redirectTo:"/receive",pathMatch:"full"},
  {path:"receive",component : ReceivingStationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
