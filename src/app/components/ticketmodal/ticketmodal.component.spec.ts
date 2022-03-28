import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketmodalComponent } from './ticketmodal.component';

describe('TicketmodalComponent', () => {
  let component: TicketmodalComponent;
  let fixture: ComponentFixture<TicketmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
