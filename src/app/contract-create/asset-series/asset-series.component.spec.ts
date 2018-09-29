import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSeriesComponent } from './asset-series.component';

describe('AssetSeriesComponent', () => {
  let component: AssetSeriesComponent;
  let fixture: ComponentFixture<AssetSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
