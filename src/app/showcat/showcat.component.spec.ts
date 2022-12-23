import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcatComponent } from './showcat.component';

describe('ShowcatComponent', () => {
  let component: ShowcatComponent;
  let fixture: ComponentFixture<ShowcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
