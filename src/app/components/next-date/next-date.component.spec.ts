import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDateComponent } from './next-date.component';

describe('NextDateComponent', () => {
  let component: NextDateComponent;
  let fixture: ComponentFixture<NextDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
