import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegregationStationComponent } from './segregation-station.component';

describe('SegregationStationComponent', () => {
  let component: SegregationStationComponent;
  let fixture: ComponentFixture<SegregationStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregationStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegregationStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
