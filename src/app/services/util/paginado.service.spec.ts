import { TestBed } from '@angular/core/testing';

import { PaginadoService } from './paginado.service';

describe('PaginadoService', () => {
  let service: PaginadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
