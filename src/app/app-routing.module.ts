import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceivingStationComponent} from './receiving-station/receiving-station.component';
import { SegregationStationComponent } from './segregation-station/segregation-station.component';
import { ListGenerationComponent } from './list-generation/list-generation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import { TestComponent } from './test/test.component';
import {SeparationStationComponent} from "./separation-station/separation-station.component";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"",redirectTo:"/dashboard",pathMatch:"full"},
  {path:"receive",component : ReceivingStationComponent},
  {path:"segregation",component : SegregationStationComponent},
  {path:"listgeneration",component : ListGenerationComponent},
  {path:"pagenotfound",component: PageNotFoundComponent},
  {path:"welcome" , component: WelcomePageComponent},
  {path:"test" , component: TestComponent},
  {path:"welcome" , component: WelcomePageComponent},
  {path:"separation", component: SeparationStationComponent},
  {path:"dashboard", component: DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
