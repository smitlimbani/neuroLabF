import {PatientDemographicDetail} from './PatientDemographicDetail';

export class Master {
  constructor(
    public id: number,
    public ulid: string,
    public nNo: string,

    public anca: string ,
    public mog: string ,
    public nmda: string ,
    public ana: string ,
    public pana: string ,
    public myu: string ,
    public gangigg: string ,
    public gangigm: string ,

    public totalAmount: number,
    public remainingAmount: number,

    // public isActive: boolean,
    public isValid: string,
    public status: string,
    public sampleType: string,
    public linked: string,
    public drName: string,
    public remark: string,
    public drContactNo: string,
    public drEmailId: string,
){}
}


