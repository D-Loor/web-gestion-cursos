import { TestBed } from '@angular/core/testing';

import { PersonalInstitutoService } from './personal-instituto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonalInstitutoService', () => {
  let service: PersonalInstitutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(PersonalInstitutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
