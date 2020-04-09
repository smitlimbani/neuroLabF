import { TestBed } from '@angular/core/testing';

import { ValidityListService } from './validity-list.service';

describe('ValidityListService', () => {
  let service: ValidityListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidityListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
