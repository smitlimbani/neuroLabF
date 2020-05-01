import { TestBed } from '@angular/core/testing';

import { SeparationStationService } from './separation-station.service';

describe('SeparationStationService', () => {
  let service: SeparationStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeparationStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
