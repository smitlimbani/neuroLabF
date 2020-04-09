import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityListComponent } from './validity-list.component';

describe('ValidityListComponent', () => {
  let component: ValidityListComponent;
  let fixture: ComponentFixture<ValidityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
