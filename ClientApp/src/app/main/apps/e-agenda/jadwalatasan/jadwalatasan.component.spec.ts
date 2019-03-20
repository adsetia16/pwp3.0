import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalatasanComponent } from './jadwalatasan.component';

describe('JadwalatasanComponent', () => {
  let component: JadwalatasanComponent;
  let fixture: ComponentFixture<JadwalatasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JadwalatasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JadwalatasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
