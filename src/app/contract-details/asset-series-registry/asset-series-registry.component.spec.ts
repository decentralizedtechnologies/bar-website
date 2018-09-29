import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSeriesRegistryComponent } from './asset-series-registry.component';

describe('AssetSeriesRegistryComponent', () => {
  let component: AssetSeriesRegistryComponent;
  let fixture: ComponentFixture<AssetSeriesRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSeriesRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSeriesRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
