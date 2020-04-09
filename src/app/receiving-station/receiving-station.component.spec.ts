import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingStationComponent } from './receiving-station.component';

describe('ReceivingStationComponent', () => {
  let component: ReceivingStationComponent;
  let fixture: ComponentFixture<ReceivingStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
