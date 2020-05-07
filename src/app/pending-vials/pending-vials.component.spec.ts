import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingVialsComponent } from './pending-vials.component';

describe('PendingVialsComponent', () => {
  let component: PendingVialsComponent;
  let fixture: ComponentFixture<PendingVialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingVialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingVialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
