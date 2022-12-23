import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproddetailsComponent } from './showproddetails.component';

describe('ShowproddetailsComponent', () => {
  let component: ShowproddetailsComponent;
  let fixture: ComponentFixture<ShowproddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowproddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
