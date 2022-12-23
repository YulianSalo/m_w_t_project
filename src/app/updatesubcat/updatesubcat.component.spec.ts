import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesubcatComponent } from './updatesubcat.component';

describe('UpdatesubcatComponent', () => {
  let component: UpdatesubcatComponent;
  let fixture: ComponentFixture<UpdatesubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesubcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
