import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationStationComponent } from './separation-station.component';

describe('SeparationStationComponent', () => {
  let component: SeparationStationComponent;
  let fixture: ComponentFixture<SeparationStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
