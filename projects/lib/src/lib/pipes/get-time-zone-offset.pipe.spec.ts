import { DateFnsTzConfigurationService } from '../services';
import { TestBed } from '@angular/core/testing';
import { GetTimeZoneOffsetPipe } from './get-time-zone-offset.pipe';

describe('GetTimeZoneOffsetPipe', () => {
  let pipe: GetTimeZoneOffsetPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetTimeZoneOffsetPipe,
        DateFnsTzConfigurationService
      ]
    });

    pipe = TestBed.inject(GetTimeZoneOffsetPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return correct timezone offset', () => {
    expect(pipe.transform('Europe/Warsaw')).toBe(7200000);
    expect(pipe.transform('UTC')).toBe(0);
  });
});
