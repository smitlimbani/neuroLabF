import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegregationListComponent } from './segregation-list.component';

describe('SegregationListComponent', () => {
  let component: SegregationListComponent;
  let fixture: ComponentFixture<SegregationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegregationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegregationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
