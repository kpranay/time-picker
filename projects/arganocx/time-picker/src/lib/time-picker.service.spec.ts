import { TestBed } from '@angular/core/testing';

import { TimePickerService } from './time-picker.service';

describe('TimePickerService', () => {
  let service: TimePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
