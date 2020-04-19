import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PatientDemographicDetail} from "../pojo/PatientDemographicDetail";


@Injectable({
  providedIn: 'root'
})
export class ReceivingFormService {

  serverUrl = 'http://localhost:8010/';
  options = {
    responseType: 'json',
  };

  constructor(private httpClient: HttpClient) {
  }

  //working
  getNextIULID(sampleType){
    return this.httpClient.get((this.serverUrl + 'rec/getNextIULID?sampleType=' + sampleType), {responseType:'text'});
  }

  //working
  getNextXULID(sampleType) {
    return this.httpClient.get(this.serverUrl + 'rec/getNextXULID?sampleType=' + sampleType, {responseType:'text'});
  }


  getLinkingULIDList(uhid, sampleType) {
    return this.httpClient.get(this.serverUrl + 'rec/getLinkingULIDList?uhid=' + uhid + '&sampleType=' + sampleType);
  }

  // working
  getPDDDetailByUHID(uhid) {
    return this.httpClient.get(this.serverUrl + 'rec/getPatientDetailByUHID?uhid='+ uhid);
  }

  getPDDDetailBySampleId(SampleId) {
    return this.httpClient.get(this.serverUrl + 'rec/getPatientDetail?sampleId=' + SampleId);
  }

  //working
  doesULIDExist(ulid) {
    return this.httpClient.get(this.serverUrl + 'master/doesULIDExistBoolean?ulid=' + ulid);
  }

  //working
  getAllTest(){
    return this.httpClient.get(this.serverUrl+ 'test/getAll');
  }



  confirmInvalidReceiving(sampleId, remark, ulid ) {
    // return this.httpClient.post(this.serverUrl + 'rec/confirmInvalidReceiving' );
    //  correct calling request:        "sampleId":scanned sampleId of invalid sample
  //                     "remark" : remark why it is marked inValid
  //                     "ulid":ulid that to be set for the sample
  }

  confirmInvalidReceivingX(master,pdd, sampleId, remark ) {

  }

}
