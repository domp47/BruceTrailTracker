import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHikeComponent } from './plan-hike.component';

describe('PlanHikeComponent', () => {
  let component: PlanHikeComponent;
  let fixture: ComponentFixture<PlanHikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanHikeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanHikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
