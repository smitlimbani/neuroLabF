import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class IndividualSearchService {

  element=[
    {
      "id": 1,
      "drName" : "Dr.Anita Here",
      "patientDemographicDetail": {
        "id": 6,
        "name": "Vaibhav Dodiya",
        "age": 25,
        "sex": "MALE",
        "emailId": null,
        "contactNo": null,
        "hospitalName": "NIMHANS",
        "uhid": "123456789987",
      },
      "paymentCategory": {
        "id": 1,
        "code": "ABP100",
        "discountPercentage": 100.0
      },
      "samples": [
        {
          "id": 1,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-123456",
          "recDate": "2020-04-02"
        },
        {
          "id": 2,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-123465",
          "recDate": "2020-04-02"
        },
        {
          "id": 3,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-987654",
          "recDate": "2020-04-02"
        }
      ],
      "externalSample": null,
      "payments": [
        {
          "id": 1,
          "amount": 1000.0,
          "details": "abc",
          "transactionDate": null
        },
        {
          "id": 2,
          "amount": 200.0,
          "details": "from ULID1",
          "transactionDate": null
        }
      ],
      "vials": [
        {
          "id": 2,
          "test": {
            "id": 2,
            "code": "ANA",
            "name": "ANA",
            "rate": 100.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANA"
        },
        {
          "id": 3,
          "test": {
            "id": 1,
            "code": "ANC",
            "name": "ANCA",
            "rate": 1000.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANC"
        }
      ],
      "nNo": "N123456",
      "totalAmount": null,
      "remainingAmount": null,
      "isValid": "Y",
      "remark": null,
      "status": "NOT_RECEIVED",
      "sampleType": "S",
      "linked": "0",
      "reqDate": "2020-04-02",
      "ulid": "C:AU-00002/20",
      "active": true,
      "ana": "RAISED",
      "anca": "SEPARATED",
      "mog": "NOT_RAISED",
      "nmda": "NOT_RAISED",
      "para": "NOT_RAISED",
      "myo": "NOT_RAISED",
      "gangigg": "NOT_RAISED",
      "gangigm": "NOT_RAISED"
    },
    {
      "id": 1,
      "drName" : "Dr.Anita Here",
      "patientDemographicDetail": {
        "id": 6,
        "name": "Vaibhav Dodiya",
        "age": 25,
        "sex": "MALE",
        "emailId": null,
        "contactNo": null,
        "hospitalName": "NIMHANS",
        "uhid": "123456789987",
      },
      "paymentCategory": {
        "id": 1,
        "code": "ABP100",
        "discountPercentage": 100.0
      },
      "samples": [
        {
          "id": 1,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-999787",
          "recDate": "2020-04-02"
        },
      ],
      "externalSample": null,
      "payments": [
        {
          "id": 1,
          "amount": 1000.0,
          "details": "abc",
          "transactionDate": null
        },
        {
          "id": 2,
          "amount": 200.0,
          "details": "from ULID1",
          "transactionDate": null
        }
      ],
      "vials": [
        {
          "id": 2,
          "test": {
            "id": 2,
            "code": "ANA",
            "name": "ANA",
            "rate": 100.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANA"
        },
        {
          "id": 3,
          "test": {
            "id": 1,
            "code": "ANC",
            "name": "ANCA",
            "rate": 1000.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANC"
        }
      ],
      "nNo": "N123456",
      "totalAmount": null,
      "remainingAmount": null,
      "isValid": "Y",
      "remark": null,
      "status": "NOT_RECEIVED",
      "sampleType": "S",
      "linked": "0",
      "reqDate": "2020-04-02",
      "ulid": "C:AU-00004/20",
      "active": true,
      "ana": "NOT_RAISED",
      "anca": "NOT_RAISED",
      "mog": "NOT_RAISED",
      "nmda": "SEPARATED",
      "para": "SEPARATED",
      "myo": "NOT_RAISED",
      "gangigg": "NOT_RAISED",
      "gangigm": "NOT_RAISED"
    },
    {
      "id": 2,
      "drName" : "Dr.Anita There",
      "patientDemographicDetail": {
        "id": 6,
        "name": "Gauri Rawat",
        "age": 21,
        "sex": "FEMALE",
        "emailId": null,
        "contactNo": null,
        "hospitalName": "KIRAN",
        "uhid": "123456789988",
      },
      "paymentCategory": {
        "id": 1,
        "code": "ABP100",
        "discountPercentage": 100.0
      },
      "samples": [
        {
          "id": 1,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-654789",
          "recDate": "2020-04-02"
        }
      ],
      "externalSample": null,
      "payments": [
        {
          "id": 1,
          "amount": 1000.0,
          "details": "abc",
          "transactionDate": null
        },
        {
          "id": 2,
          "amount": 200.0,
          "details": "from ULID1",
          "transactionDate": null
        }
      ],
      "vials": [
        {
          "id": 2,
          "test": {
            "id": 2,
            "code": "ANA",
            "name": "ANA",
            "rate": 100.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANA"
        },
        {
          "id": 3,
          "test": {
            "id": 1,
            "code": "ANC",
            "name": "ANCA",
            "rate": 1000.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANC"
        }
      ],
      "nNo": "N123456",
      "totalAmount": null,
      "remainingAmount": null,
      "isValid": "P",
      "remark": null,
      "status": "RECEIVED",
      "sampleType": "C",
      "linked": "0",
      "reqDate": "2020-04-02",
      "ulid": "C:AU-00001/20",
      "active": true,
      "ana": "RAISED",
      "anca": "SEPARATED",
      "mog": "NOT_RAISED",
      "nmda": "NOT_RAISED",
      "para": "NOT_RAISED",
      "myo": "NOT_RAISED",
      "gangigg": "RAISED",
      "gangigm": "NOT_RAISED"
    },
    {
      "id": 3,
      "drName" : "Dr.Anita There",
      "patientDemographicDetail": {
        "id": 6,
        "name": "Jhanvi Chanababa",
        "age": 22,
        "sex": "FEMALE",
        "emailId": null,
        "contactNo": null,
        "hospitalName": "Rajkot",
        "uhid": "987654321123",
      },
      "paymentCategory": {
        "id": 1,
        "code": "ABP100",
        "discountPercentage": 100.0
      },
      "samples": [
        {
          "id": 1,
          "validityList": {
            "id": 8
          },
          "sampleId": "NMA-654789",
          "recDate": "2020-04-02"
        }
      ],
      "externalSample": null,
      "payments": [
        {
          "id": 1,
          "amount": 1000.0,
          "details": "abc",
          "transactionDate": null
        },
        {
          "id": 2,
          "amount": 200.0,
          "details": "from ULID1",
          "transactionDate": null
        }
      ],
      "vials": [
        {
          "id": 2,
          "test": {
            "id": 2,
            "code": "ANA",
            "name": "ANA",
            "rate": 100.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANA"
        },
        {
          "id": 3,
          "test": {
            "id": 1,
            "code": "ANC",
            "name": "ANCA",
            "rate": 1000.0,
            "testCategory": "IF",
            "groupSize": 5,
            "lockedCounter": 0,
            "active": true
          },
          "serialNo": null,
          "fileName": null,
          "reportingDate": null,
          "creationDate": "2020-04-02",
          "testingDate": null,
          "remark": null,
          "result": null,
          "vlid": "ULID1:ANC"
        }
      ],
      "nNo": "N123456",
      "totalAmount": null,
      "remainingAmount": null,
      "isValid": "P",
      "remark": null,
      "status": "RECEIVED",
      "sampleType": "C",
      "linked": "0",
      "reqDate": "2020-04-02",
      "ulid": "C:AU-00003/20",
      "active": true,
      "ana": "RAISED",
      "anca": "SEPARATED",
      "mog": "NOT_RAISED",
      "nmda": "NOT_RAISED",
      "para": "NOT_RAISED",
      "myo": "NOT_RAISED",
      "gangigg": "RAISED",
      "gangigm": "NOT_RAISED"
    }
  ];
  serverUrl = 'http://68.183.95.58:8010/';
  options = {responseType: 'json'};


  constructor(private httpClient : HttpClient,
  ) { }

  public getCompleteDetailByUHID(uhid){
    return this.httpClient.get(this.serverUrl+"dashboard/getCompleteDetailByUHID?uhid="+ uhid);
  }

  public getCompleteDetailByULID(ulid){
    return this.httpClient.get(this.serverUrl+"dashboard/getCompleteDetailByULID?ulid="+ ulid);
  }

  public getCompleteDetailBySampleId(sampleId){
    return this.httpClient.get(this.serverUrl+"dashboard/getCompleteDetailBySampleId?sampleId="+ sampleId);
  }

  public getCompleteDetailByVLID(vlid){
    return this.httpClient.get(this.serverUrl+"dashboard/getCompleteDetailByVLID?vlid="+ vlid);
  }

  public getDummy(x){
    return this.element;
  }
}
