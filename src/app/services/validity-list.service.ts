import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

const ELEMENTS = [{id: 8, sample: {id: 1, master: {id: 1, remark: 'Remark1', patientDemographicDetail: {id: 6, firstName: 'Vaibhav', lastName: 'Dodiya', age: null, sex: 'MALE', emailId: null, contactNo: null, hospitalName: null, uhid: 'UHID1'}, paymentCategory: null, externalSamples: [], payments: null, vials: null, nNo: 'n123', totalAmount: null, remainingAmount: null, isValid: 'Y', status: 'PROCESSING', sampleType: 'S', linked: '0', drName: null, reqDate: '2020-04-02', ulid: 'ULID1', active: true, ana: 'SEPARATED', anca: 'SEPARATED', mog: 'NOT_RAISED', nmda: 'NOT_RAISED', pana: 'NOT_RAISED', myu: 'NOT_RAISED', gangigg: 'NOT_RAISED', gangigm: 'NOT_RAISED'}, sampleId: 'sid1', recDate: '2020-04-02'}}, {id: 10, sample: {id: 2, master: {id: 3, remark: 'Remark2', patientDemographicDetail: {id: 8, firstName: 'Vaibhav', lastName: 'Dodiya', age: null, sex: 'MALE', emailId: null, contactNo: null, hospitalName: null, uhid: null}, paymentCategory: null, externalSamples: [], payments: null, vials: null, nNo: 'n123', totalAmount: null, remainingAmount: null, isValid: 'P', status: 'PROCESSING', sampleType: 'S', linked: '0', drName: null, reqDate: '2020-04-02', ulid: 'ULID2', active: true, ana: 'SEPARATED', anca: 'INVALID', mog: 'NOT_RAISED', nmda: 'NOT_RAISED', pana: 'NOT_RAISED', myu: 'NOT_RAISED', gangigg: 'NOT_RAISED', gangigm: 'NOT_RAISED'}, sampleId: 'sid2', recDate: '2020-04-02'}}, {id: 11, sample: {id: 3, master: {id: 3, remark: 'Remark3', patientDemographicDetail: {id: 8, firstName: 'Vaibhav', lastName: 'Dodiya', age: null, sex: 'MALE', emailId: null, contactNo: null, hospitalName: null, uhid: null}, paymentCategory: null, externalSamples: [], payments: null, vials: null, nNo: 'n123', totalAmount: null, remainingAmount: null, isValid: 'P', status: 'PROCESSING', sampleType: 'S', linked: '0', drName: null, reqDate: '2020-04-02', ulid: 'ULID2', active: true, ana: 'SEPARATED', anca: 'INVALID', mog: 'NOT_RAISED', nmda: 'NOT_RAISED', pana: 'NOT_RAISED', myu: 'NOT_RAISED', gangigg: 'NOT_RAISED', gangigm: 'NOT_RAISED'}, sampleId: 'sid3', recDate: '2020-04-02'}}];
@Injectable({
  providedIn: 'root'
})
export class ValidityListService {

  serverUrl = 'http://localhost:8010/';

  constructor( private httpClient: HttpClient) { }

  getValidityLists(){
    // return this.httpClient.get(this.serverUrl+"validityList/getAllOrderByULID");
    return ELEMENTS;
  }

  deleteValidityList(id){
    return this.httpClient.get(this.serverUrl + 'validityList/delete?id=' + id);
    // return "to : "+this.serverUrl+"validityList/delete?id="+id;
  }
}
