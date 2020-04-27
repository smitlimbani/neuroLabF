import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VialConfirmationDialogComponent } from './vial-confirmation-dialog.component';

describe('VialConfirmationDialogComponent', () => {
  let component: VialConfirmationDialogComponent;
  let fixture: ComponentFixture<VialConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VialConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VialConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
