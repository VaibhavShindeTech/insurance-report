import { TestBed } from '@angular/core/testing';

import { InsuranceReportService } from './insurance-report.service';

describe('InsuranceReportService', () => {
  let service: InsuranceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
