import { TestBed } from '@angular/core/testing';

import { FetchCodeService } from './fetch-code.service';

describe('FetchCodeService', () => {
  let service: FetchCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
