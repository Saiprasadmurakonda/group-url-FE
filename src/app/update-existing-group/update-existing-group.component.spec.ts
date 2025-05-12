import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExistingGroupComponent } from './update-existing-group.component';

describe('UpdateExistingGroupComponent', () => {
  let component: UpdateExistingGroupComponent;
  let fixture: ComponentFixture<UpdateExistingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateExistingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExistingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
