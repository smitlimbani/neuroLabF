import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualSearchComponent } from './individual-search.component';

describe('IndividualSearchComponent', () => {
  let component: IndividualSearchComponent;
  let fixture: ComponentFixture<IndividualSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
