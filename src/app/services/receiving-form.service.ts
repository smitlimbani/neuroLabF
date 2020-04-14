import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReceivingFormService {

   serverUrl = 'http://localhost:8010/';

  constructor( private httpClient: HttpClient) { }

  getNextIULID(sampleType){
    return this.httpClient.get(this.serverUrl + 'rec/getNextIULID?sampleType=' + sampleType);
  }

  getNextXULID(sampleType){
    return this.httpClient.get(this.serverUrl + 'rec/getNextXULID?sampleType=' + sampleType);
  }

  getLinkingULIDList(UHID, sampleType){
    return this.httpClient.get(this.serverUrl + 'rec/getLinkingULIDList?UHID=' + UHID+ '&sampleType='+ sampleType);
  }

  getPDDDetailByUHID(UHID){
    return this.httpClient.get(this.serverUrl + 'rec/getPDDDetailByUHID?UHID=' + UHID);
  }

  getPDDDetailBySampleId(SampleId){
    return this.httpClient.get(this.serverUrl + 'rec/getPDDDetailByUHID?UHID=' + SampleId);
  }
  
  doesULIDExist(ULID){
    return this.httpClient.get(this.serverUrl + 'rec/doesULIDExist?ULID=' + ULID);
  }
}
