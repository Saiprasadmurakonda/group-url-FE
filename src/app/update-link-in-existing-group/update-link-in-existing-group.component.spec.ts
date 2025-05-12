import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinkInExistingGroupComponent } from './update-link-in-existing-group.component';

describe('UpdateLinkInExistingGroupComponent', () => {
  let component: UpdateLinkInExistingGroupComponent;
  let fixture: ComponentFixture<UpdateLinkInExistingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLinkInExistingGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLinkInExistingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
