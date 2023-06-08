import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfWizardComponent } from './mf-wizard.component';

describe('MfWizardComponent', () => {
  let component: MfWizardComponent;
  let fixture: ComponentFixture<MfWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
