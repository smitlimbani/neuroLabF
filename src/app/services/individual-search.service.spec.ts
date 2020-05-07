import { TestBed } from '@angular/core/testing';

import { IndividualSearchService } from './individual-search.service';

describe('IndividualSearchService', () => {
  let service: IndividualSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
