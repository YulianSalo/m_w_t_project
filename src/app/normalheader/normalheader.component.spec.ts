import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalheaderComponent } from './normalheader.component';

describe('NormalheaderComponent', () => {
  let component: NormalheaderComponent;
  let fixture: ComponentFixture<NormalheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
