import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubcatComponent } from './addsubcat.component';

describe('AddsubcatComponent', () => {
  let component: AddsubcatComponent;
  let fixture: ComponentFixture<AddsubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
