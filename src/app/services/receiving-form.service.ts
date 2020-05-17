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

  //working
  getLinkingULIDList(uhid, sampleType) {
    return this.httpClient.get(this.serverUrl + 'rec/getLinkingULIDList?uhid=' + uhid + '&sampleType=' + sampleType);
  }

  // working
  getPDDDetailByUHID(uhid) {
    return this.httpClient.get(this.serverUrl + 'rec/getPatientDetailByUHID?uhid='+ uhid);
  }

 //working
  getPDDDetailBySampleId(SampleId) {
    return this.httpClient.get(this.serverUrl + 'rec/getPatientDetail?sampleId=' + SampleId);
  }

  //working
  doesULIDExist(ulid) {
    return this.httpClient.get(this.serverUrl + 'master/doesULIDExistBoolean?ulid=' + ulid);
  }

  //working
  getLabTestDetails(){
    return this.httpClient.get(this.serverUrl+ 'test/getAll');
  }

  //working
  getDoctors(){
    return this.httpClient.get(this.serverUrl+ 'doctor/getAll');
  }

  //working
  storeXPatientDetail(master, pdd, sampleId, payments){
    let sample={sampleId: sampleId};
    return this.httpClient.post(this.serverUrl+ 'rec/storeXPatientDetail',{master: master, patientDemographicDetail:pdd, sample: sample,payments: payments, paymentCategoryCode:'XP100'}, {responseType:'text'});
  }

  //working
  receiving(sampleId, ulid, remark, linked, remainingAmount, payments){
    console.log(this.serverUrl+ 'rec/receiving', {sampleId:sampleId, payments:payments, ulid:ulid, remark:remark, linked:linked, remainingAmount:remainingAmount});
    return this.httpClient.post(this.serverUrl+ 'rec/receiving', {sampleId:sampleId, payments:payments, ulid:ulid, remark:remark, linked:linked, remainingAmount:remainingAmount}, {responseType:'text'});
  }

}
