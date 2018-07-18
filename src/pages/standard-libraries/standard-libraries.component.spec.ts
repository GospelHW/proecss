import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardLibrariesComponent } from './standard-libraries.component';

describe('StandardLibrariesComponent', () => {
  let component: StandardLibrariesComponent;
  let fixture: ComponentFixture<StandardLibrariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardLibrariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
