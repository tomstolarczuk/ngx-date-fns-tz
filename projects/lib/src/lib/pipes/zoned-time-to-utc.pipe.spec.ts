import { ZonedTimeToUtcPipe } from './zoned-time-to-utc.pipe';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { MockChangeDetectorRef } from '../util/mock-change-detector-ref';

describe('ZonedTimeToUtcPipe', () => {
  let pipe: ZonedTimeToUtcPipe;

  beforeEach(
    () =>
      (pipe = new ZonedTimeToUtcPipe(
        new DateFnsTzConfigurationService(),
        new MockChangeDetectorRef()
      ))
  );

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format utc date to zoned time', () => {
    expect(pipe.transform('2022-08-25T18:40:20.000Z', 'Australia/Sydney').toISOString()).toBe(
      '2022-08-25T10:40:20.000Z'
    );
  });

  it('should fallback to epoch on incorrect date', () => {
    expect(pipe.transform('bla', 'Australia/Sydney')).toEqual(new Date(0));
  });
});
