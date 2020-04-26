import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivingStationComponent} from './receiving-station/receiving-station.component';
import { SegregationStationComponent } from './segregation-station/segregation-station.component';
import { ListGenerationComponent } from './list-generation/list-generation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";

const routes: Routes = [
  {path:"",redirectTo:"/segregation",pathMatch:"full"},
  {path:"receive",component : ReceivingStationComponent},
  {path:"segregation",component : SegregationStationComponent},
  {path:"listgeneration",component : ListGenerationComponent},
  {path:"pagenotfound",component: PageNotFoundComponent},
  {path:"welcome" , component: WelcomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
