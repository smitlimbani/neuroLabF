import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSampleComponent } from './map-sample.component';

describe('MapSampleComponent', () => {
  let component: MapSampleComponent;
  let fixture: ComponentFixture<MapSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
