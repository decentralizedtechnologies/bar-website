import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialAssetComponent } from './serial-asset.component';

describe('SerialAssetComponent', () => {
  let component: SerialAssetComponent;
  let fixture: ComponentFixture<SerialAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
