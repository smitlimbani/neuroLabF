
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let ELEMENTS =
[
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
          "uhid": "UHID1",
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
              "sampleId": "sid1",
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
      "ulid": "ULID1",
      "active": true,
      "ana": "RAISED",
      "anca": "SEPARATED",
      "mog": "NOT_RAISED",
      "nmda": "NOT_RAISED",
      "pana": "NOT_RAISED",
      "myu": "NOT_RAISED",
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
        "uhid": "UHID2",
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
            "sampleId": "sid1",
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
    "ulid": "ULID2",
    "active": true,
    "ana": "RAISED",
    "anca": "SEPARATED",
    "mog": "NOT_RAISED",
    "nmda": "NOT_RAISED",
    "pana": "NOT_RAISED",
    "myu": "NOT_RAISED",
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
        "uhid": "UHID2",
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
            "sampleId": "sid1",
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
    "ulid": "ULID3",
    "active": true,
    "ana": "RAISED",
    "anca": "SEPARATED",
    "mog": "NOT_RAISED",
    "nmda": "NOT_RAISED",
    "pana": "NOT_RAISED",
    "myu": "NOT_RAISED",
    "gangigg": "RAISED",
    "gangigm": "NOT_RAISED"
    }
];
@Injectable({
  providedIn: 'root'
})
export class MapSampleService {
  serverUrl = 'http://localhost:8010/';
  constructor(
    private httpClient : HttpClient,
  ) { }

//   //SERVER
//   getMasters():Promise<any>{
//     return this.httpClient.get(this.serverUrl+"rec/getUnprocessedSampleList").toPromise();
//   }

  //STATIC
  getMasters(){
    return ELEMENTS;
  }

  confirmSampleNotReceived(id:number){
    return this.httpClient.post(this.serverUrl+"rec/confirmSampleNotReceived",{mId:id});
  }

  mergeSamples(id1:number,id2:number){
    return this.httpClient.post(this.serverUrl+"test/test",{mId1 : id1,mId2 : id2});
  }
}
