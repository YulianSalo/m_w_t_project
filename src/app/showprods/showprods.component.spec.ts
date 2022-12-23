import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowprodsComponent } from './showprods.component';

describe('ShowprodsComponent', () => {
  let component: ShowprodsComponent;
  let fixture: ComponentFixture<ShowprodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowprodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowprodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
