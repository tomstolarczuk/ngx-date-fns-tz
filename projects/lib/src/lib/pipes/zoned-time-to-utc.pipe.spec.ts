import { ZonedTimeToUtcPipe } from './zoned-time-to-utc.pipe';
import { DateFnsTzConfigurationService } from '../services';
import { MockChangeDetectorRef } from '../util';
import { TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';

describe('ZonedTimeToUtcPipe', () => {
  let pipe: ZonedTimeToUtcPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ZonedTimeToUtcPipe,
        DateFnsTzConfigurationService,
        {
          provide: ChangeDetectorRef,
          useClass: MockChangeDetectorRef
        }
      ]
    });

    pipe = TestBed.inject(ZonedTimeToUtcPipe);
  });

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
