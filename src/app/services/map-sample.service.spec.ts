import { TestBed } from '@angular/core/testing';

import { MapSampleService } from './map-sample.service';

describe('MapSampleService', () => {
  let service: MapSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
