import { UtcToZonedTimePurePipe } from './utc-to-zoned-time-pure.pipe';
import { DateFnsTzConfigurationService } from '../services';
import { TestBed } from '@angular/core/testing';

describe('UtcToZonedTimePurePipe', () => {
  let pipe: UtcToZonedTimePurePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtcToZonedTimePurePipe,
        DateFnsTzConfigurationService,
      ]
    });

    pipe = TestBed.inject(UtcToZonedTimePurePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format utc date to zoned time', () => {
    expect(pipe.transform('2022-08-25T10:40:20.000Z', 'Australia/Sydney').toISOString()).toBe(
      '2022-08-25T18:40:20.000Z'
    );
  });

  it('should fallback to epoch on incorrect date', () => {
    expect(pipe.transform('bla', 'Australia/Sydney')).toEqual(new Date(0));
  });
});
