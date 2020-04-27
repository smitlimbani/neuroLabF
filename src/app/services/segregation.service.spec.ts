import { TestBed } from '@angular/core/testing';

import { SegregationService } from './segregation.service';

describe('SegregationService', () => {
  let service: SegregationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegregationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
