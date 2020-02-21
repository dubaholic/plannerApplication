import { TestBed } from '@angular/core/testing';

import { TimeslotsService } from './timeslots.service';

describe('TimeslotsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeslotsService = TestBed.get(TimeslotsService);
    expect(service).toBeTruthy();
  });
});
