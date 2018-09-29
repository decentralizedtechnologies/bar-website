import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBarTagComponent } from './asset-bar-tag.component';

describe('AssetBarTagComponent', () => {
  let component: AssetBarTagComponent;
  let fixture: ComponentFixture<AssetBarTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetBarTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
