import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SeparationStationService {
  serverUrl = 'http://139.59.13.108:8010/';
  options = {
    responseType: 'json',
  };

  constructor(private httpClient: HttpClient) { }

  getPDDDetailBySampleId(SampleId) {
    return this.httpClient.get(this.serverUrl + 'rec/getPatientDetail?sampleId=' + SampleId);
  }

  separateSample(master){
    return this.httpClient.post(this.serverUrl+ 'segregation/separateSample', master, {responseType:'text'});
  }

}
