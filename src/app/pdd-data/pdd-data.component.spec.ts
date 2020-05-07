import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PddDataComponent } from './pdd-data.component';

describe('PddDataComponent', () => {
  let component: PddDataComponent;
  let fixture: ComponentFixture<PddDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PddDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
