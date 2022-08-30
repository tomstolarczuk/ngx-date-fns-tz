import { ZonedTimeToUtcPurePipe } from './zoned-time-to-utc-pure.pipe';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

describe('ZonedTimeToUtcPurePipe', () => {
  let pipe: ZonedTimeToUtcPurePipe;

  beforeEach(() => (pipe = new ZonedTimeToUtcPurePipe(new DateFnsTzConfigurationService())));

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
