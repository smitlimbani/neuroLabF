import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverUrl = 'http://localhost:8010/';
  constructor(
    private httpClient : HttpClient,
  ) { }
  
  getPendingVials(){
    return this.httpClient.get(this.serverUrl+"vial/getPendingVials");
  }

  getTestsList():Promise<any>{
    return this.httpClient.get(this.serverUrl+"test/getTestsList").toPromise();
  }

  getMastersByReqDateBetween(startDate,endDate){
    return this.httpClient.get(this.serverUrl+"master/getMastersByReqDateBetween?startDate="+startDate+"&&endDate="+endDate);
  }

}
