import {PatientDemographicDetail} from './PatientDemographicDetail';

export class Master {
  constructor(
    public id: number,
    public ULID: string,
    public nNo: string,

    public ANCA: string ,
    public MOG: string ,
    public NMDA: string ,
    public ANA: string ,
    public PANA: string ,
    public MYU: string ,
    public GANGIGG: string ,
    public GANGIGM: string ,

    public totalAmount: number,
    public remainingAmount: number,

    public isActive: boolean,
    public isValid: string,
    public status: string,
    public sampleType: string,
    public linked: string,
    public drName: string,
){}
}


