import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EAgendaComponent } from './e-agenda.component';

describe('EAgendaComponent', () => {
  let component: EAgendaComponent;
  let fixture: ComponentFixture<EAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
