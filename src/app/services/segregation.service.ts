import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let ELEMENTS = [{"id":2,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANA"},{"id":3,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":1,"code":"ANC","name":"ANCA","rate":1000.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:ANC"},{"id":4,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:ANA"},{"id":5,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-02","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MOG"},{"id":6,"master":{"id":3,"patientDemographicDetail":{"id":8,"name":"Gauri Rawat","age":50,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Kiran","uhid":"XHID2"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":2,"validityList":{"id":10},"sampleId":"sid2","recDate":"2020-04-02"},{"id":3,"validityList":{"id":11},"sampleId":"sid3","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":3,"amount":1000.0,"details":"from ULID2","transactionDate":null}],"nNo":"n123789","totalAmount":null,"remainingAmount":null,"isValid":"P","remark":null,"status":"RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Dodiya","reqDate":"2020-04-02","ulid":"ULID2","active":true,"ana":"SEPARATED","anca":"INVALID","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID2:MOG"},{"id":7,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":2,"code":"ANA","name":"ANA","rate":100.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:ANA"},{"id":8,"master":{"id":4,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":4,"validityList":{"id":12},"sampleId":"sid4","recDate":"2020-04-13"}],"externalSample":null,"payments":[],"nNo":"n123456","totalAmount":null,"remainingAmount":null,"isValid":"N","remark":"Not Received","status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Gauri","reqDate":"2020-04-13","ulid":"ULID3","active":true,"ana":"RAISED","anca":"RAISED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":3,"code":"MOG","name":"MOG","rate":150.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID3:MOG"},{"id":9,"master":{"id":1,"patientDemographicDetail":{"id":6,"name":"Vaibhav Dodiya","age":23,"sex":"MALE","emailId":null,"contactNo":null,"address":null,"hospitalName":"Nimhans","uhid":"UHID1"},"paymentCategory":{"id":1,"code":"ABP100","discountPercentage":100.0},"samples":[{"id":1,"validityList":{"id":8},"sampleId":"sid1","recDate":"2020-04-02"}],"externalSample":null,"payments":[{"id":1,"amount":1000.0,"details":"abc","transactionDate":null},{"id":2,"amount":200.0,"details":"from ULID1","transactionDate":null}],"nNo":"n123321","totalAmount":null,"remainingAmount":null,"isValid":"Y","remark":null,"status":"NOT_RECEIVED","sampleType":"S","linked":"0","drName":"Dr. Vaibhav","reqDate":"2020-04-02","ulid":"ULID1","active":true,"ana":"RAISED","anca":"SEPARATED","mog":"NOT_RAISED","nmda":"NOT_RAISED","pana":"NOT_RAISED","myu":"NOT_RAISED","gangigg":"NOT_RAISED","gangigm":"NOT_RAISED"},"test":{"id":6,"code":"MYU","name":"MYU","rate":1550.0,"testCategory":"BLOT","groupSize":2,"lockedCounter":0,"active":true},"serialNo":null,"fileName":null,"reportingDate":null,"creationDate":"2020-04-20","testingDate":null,"remark":null,"result":null,"vlid":"ULID1:MYU"}];

@Injectable({
  providedIn: 'root'
})
export class SegregationService {

  serverUrl = 'http://localhost:8010/';
  constructor(
    private httpClient : HttpClient,
  ) { }

  getPatientDetailByVLID(inputVLID){
    return this.httpClient.get(this.serverUrl+"segregation/getPatientDetailByVLID?vlid="+inputVLID);
  }

  updateVial(vial){
    return this.httpClient.post(this.serverUrl+"/vial/updateVial",vial);
  }

  updateLockedCounter(testCode,counter){
    console.log(testCode,counter);
    return this.httpClient.get(this.serverUrl+"segregation/updateLockedCounter?code="+testCode+"&lockedCounter="+counter);
    // return true;
}

  updateLockedCounterWithVials(testCode,counter,listVialsToUpdate){
    console.log(testCode,counter)
    console.log(listVialsToUpdate);
    // return true;
    return this.httpClient.post(this.serverUrl+"segregation/updateLockedCounterWithVials?code="+testCode+"&lockedCounter="+counter,listVialsToUpdate);
  }

  getActiveTests(testCategory):Promise<any>{
    return this.httpClient.get(this.serverUrl+"test/getActiveTests?testCategoryEnum="+testCategory).toPromise();
  }

  getTestListByCategoryAndDate(testCategory):Promise<any>{
    let today :Date = new Date();
    let strDate = today.getFullYear()+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+String(today.getDate()).padStart(2, '0');
    console.log(this.serverUrl+"segregation/getTestListByCategoryAndDate?testCategory="+testCategory+"&date="+strDate);
    return this.httpClient.get(this.serverUrl+"segregation/getTestListByCategoryAndDate?testCategory="+testCategory+"&date="+strDate).toPromise();
  }

  getTestListByCodeAndDate(testCode,testDate){
    return this.httpClient.get(this.serverUrl+"segregation/getTestListByCodeAndDate?testCode="+testCode+"&date="+testDate);
  }
}

let VIALDATA =
{
  "id":2,
  "master":{
    "id":1,
    "patientDemographicDetail":{
      "id":6,
      "name":"Vaibhav Dodiya",
      "age":23,
      "sex":"MALE",
      "emailId":null,
      "contactNo":null,
      "address":null,
      "hospitalName":"Nimhans",
      "uhid":"UHID1"
    },
    "paymentCategory":null,
    "samples":null,
    "externalSample":null,
    "payments":null,
    "nNo":"n123321",
    "totalAmount":null,
    "remainingAmount":null,
    "isValid":"Y",
    "remark":null,
    "status":"NOT_RECEIVED",
    "sampleType":"S",
    "linked":"0",
    "drName":"Dr. Vaibhav",
    "reqDate":"2020-04-02",
    "ulid":"ULID1",
    "active":true,
    "ana":"RAISED",
    "anca":"SEPARATED",
    "mog":"NOT_RAISED",
    "nmda":"NOT_RAISED",
    "pana":"NOT_RAISED",
    "myu":"NOT_RAISED",
    "gangigg":"NOT_RAISED",
    "gangigm":"NOT_RAISED"
  },
  "test":{
    "id":2,
    "code":"ANA",
    "name":"ANA",
    "rate":100.0,
    "testCategory":"BLOT",
    "groupSize":5,
    "lockedCounter":0,
    "active":true
  },
  "serialNo":null,
  "fileName":null,
  "reportingDate":null,
  "creationDate":"2020-04-02",
  "testingDate":null,
  "remark":null,
  "result":null,
  "vlid":"ULID1:ANA"
};
