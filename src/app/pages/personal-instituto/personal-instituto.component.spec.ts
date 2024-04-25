import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInstitutoComponent } from './personal-instituto.component';

describe('ProfesoresComponent', () => {
  let component: PersonalInstitutoComponent;
  let fixture: ComponentFixture<PersonalInstitutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInstitutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalInstitutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
