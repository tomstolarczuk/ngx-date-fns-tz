import { GetTimeZoneOffsetPipe } from './get-time-zone-offset.pipe';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

describe('GetTimeZoneOffsetPipe', () => {
  let pipe: GetTimeZoneOffsetPipe;

  beforeEach(() => (pipe = new GetTimeZoneOffsetPipe(new DateFnsTzConfigurationService())));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return correct timezone offset', () => {
    expect(pipe.transform('Europe/Warsaw')).toBe(7200000);
    expect(pipe.transform('UTC')).toBe(0);
  });
});
