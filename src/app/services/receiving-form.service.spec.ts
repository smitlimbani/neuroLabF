import { TestBed } from '@angular/core/testing';

import { ReceivingFormService } from './receiving-form.service';

describe('ReceivingFormService', () => {
  let service: ReceivingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
