import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreReceivingComponent } from './pre-receiving.component';

describe('PreReceivingComponent', () => {
  let component: PreReceivingComponent;
  let fixture: ComponentFixture<PreReceivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreReceivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
