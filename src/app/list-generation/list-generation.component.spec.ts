import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenerationComponent } from './list-generation.component';

describe('ListGenerationComponent', () => {
  let component: ListGenerationComponent;
  let fixture: ComponentFixture<ListGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
