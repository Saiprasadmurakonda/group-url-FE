import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualgroupComponent } from './individualgroup.component';

describe('IndividualgroupComponent', () => {
  let component: IndividualgroupComponent;
  let fixture: ComponentFixture<IndividualgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
