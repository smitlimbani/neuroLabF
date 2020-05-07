import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VialDataComponent } from './vial-data.component';

describe('VialDataComponent', () => {
  let component: VialDataComponent;
  let fixture: ComponentFixture<VialDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VialDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
