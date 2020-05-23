import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

let ELEMENTS = [{"id":8,"sample":{"id":1,"master":{"id":1,"remark":"Remark1","patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":25,"sex":"MALE","emailId":null,"contactNo":null,"hospitalName":null,"uhid":"201234567891"},"paymentCategory":null,"externalSamples":[],"payments":null,"vials":null,"nNo":"n123","totalAmount":null,"remainingAmount":null,"isValid":"Y","status":"PROCESSING","sampleType":"S","linked":"0","drName":null,"reqDate":"2020-04-02","ulid":"C:AU-00001/20","active":true,"ana":"SEPARATED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"sampleId":"NMA-123456","recDate":"2020-04-02"}},{"id":10,"sample":{"id":2,"master":{"id":3,"remark":"Remark2","patientDemographicDetail":{"id":8,"name":"Vaibhav Dodiya","age":22,"sex":"MALE","emailId":null,"contactNo":null,"hospitalName":null,"uhid":"123456789"},"paymentCategory":null,"externalSample":{"externalSampleId":"NMA-654987"},"payments":null,"vials":null,"nNo":"n123","totalAmount":null,"remainingAmount":null,"isValid":"P","status":"PROCESSING","sampleType":"S","linked":"0","drName":null,"reqDate":"2020-04-02","ulid":"C:XU-00001/20","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"sampleId":"C:XU-00001/20:1","recDate":"2020-04-02"}},{"id":11,"sample":{"id":3,"master":{"id":3,"remark":"Remark3","patientDemographicDetail":{"id":8,"name":"Vaibhav Dodiya","age":21,"sex":"MALE","emailId":null,"contactNo":null,"hospitalName":null,"uhid":"987654321021"},"paymentCategory":null,"externalSamples":[],"payments":null,"vials":null,"nNo":"n123","totalAmount":null,"remainingAmount":null,"isValid":"N","status":"PROCESSING","sampleType":"S","linked":"0","drName":null,"reqDate":"2020-04-02","ulid":"S-AU:00002/20","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","para":"NOT_RAISED","myo":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"sampleId":"NMA-987654","recDate":"2020-04-02"}}];
@Injectable({
  providedIn: 'root'
})
export class ValidityListService {

  serverUrl= "http://139.59.13.108:8010/";

  constructor( private httpClient : HttpClient) { }

  //SERVER
  // getValidityLists():Promise<any>{
  //   return this.httpClient.get(this.serverUrl+"validityList/getAllOrderByULID").toPromise();
  // }
  getValidityLists(){
    return this.httpClient.get(this.serverUrl+"validityList/getAllOrderByULID");
  }

  // STATIC
  // getValidityLists(){
  //   return ELEMENTS;
  // }

  deleteValidityList(id){
    return this.httpClient.get(this.serverUrl+"validityList/delete?id="+id);
    // return "to : "+this.serverUrl+"validityList/delete?id="+id;
  }
}
