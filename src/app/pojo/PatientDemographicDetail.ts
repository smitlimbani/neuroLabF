import {Master} from './Master';

export class PatientDemographicDetail {
constructor(
  public id: number,
  public UHID: string,
  public name: string,
  public address: string,
  public age: number,
  public sex: string,
  public emailId: string,
  public contactNo: string,
  public hospitalName: string,
  public drName: string,
){}
}
