import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginImgageComponent } from './origin-imgage.component';

describe('OriginImgageComponent', () => {
  let component: OriginImgageComponent;
  let fixture: ComponentFixture<OriginImgageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginImgageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginImgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
