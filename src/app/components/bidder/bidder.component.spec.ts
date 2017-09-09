import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderComponent } from './bidder.component';

describe('BidderComponent', () => {
  let component: BidderComponent;
  let fixture: ComponentFixture<BidderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
