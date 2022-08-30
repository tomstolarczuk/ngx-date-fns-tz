import { FormatInTimeZonePipe } from './format-in-time-zone.pipe';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { MockChangeDetectorRef } from '../util/mock-change-detector-ref';

describe('FormatInTimeZonePipe', () => {
  let pipe: FormatInTimeZonePipe;

  beforeEach(
    () =>
      (pipe = new FormatInTimeZonePipe(
        new DateFnsTzConfigurationService(),
        new MockChangeDetectorRef()
      ))
  );

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
