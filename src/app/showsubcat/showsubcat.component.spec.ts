import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsubcatComponent } from './showsubcat.component';

describe('ShowsubcatComponent', () => {
  let component: ShowsubcatComponent;
  let fixture: ComponentFixture<ShowsubcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsubcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
