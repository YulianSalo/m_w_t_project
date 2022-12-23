import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofordersComponent } from './listoforders.component';

describe('ListofordersComponent', () => {
  let component: ListofordersComponent;
  let fixture: ComponentFixture<ListofordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
