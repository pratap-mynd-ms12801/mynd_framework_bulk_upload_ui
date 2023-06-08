import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmanagerComponent } from './formmanager.component';

describe('FormmanagerComponent', () => {
  let component: FormmanagerComponent;
  let fixture: ComponentFixture<FormmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


