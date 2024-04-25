import { TestBed } from '@angular/core/testing';

import { ModalidadService } from './modalidad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalidadService', () => {
  let service: ModalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ModalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
