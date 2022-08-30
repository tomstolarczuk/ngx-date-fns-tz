import { FormatInTimeZonePurePipe } from './format-in-time-zone-pure.pipe';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

describe('FormatInTimeZonePurePipe', () => {
  let pipe: FormatInTimeZonePurePipe;

  beforeEach(() => (pipe = new FormatInTimeZonePurePipe(new DateFnsTzConfigurationService())));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format in time zone', () => {
    expect(pipe.transform('2022-08-25T10:40:20Z', 'UTC', 'EEE MMM d yyyy HH:mm:ss zzz')).toBe(
      'Thu Aug 25 2022 10:40:20 UTC'
    );
  });

  it('should return empty string on incorrect date', () => {
    expect(pipe.transform('blabla', 'UTC', 'EEE MMM d yyyy HH:mm:ss zzz')).toBe('');
  });
});
