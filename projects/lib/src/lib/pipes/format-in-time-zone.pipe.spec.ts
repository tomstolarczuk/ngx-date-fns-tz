import { TestBed } from '@angular/core/testing';
import { FormatInTimeZonePipe } from './format-in-time-zone.pipe';
import { DateFnsTzConfigurationService } from '../services';
import { MockChangeDetectorRef } from '../util';
import { ChangeDetectorRef } from '@angular/core';

describe('FormatInTimeZonePipe', () => {
  let pipe: FormatInTimeZonePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormatInTimeZonePipe,
        DateFnsTzConfigurationService,
        {
          provide: ChangeDetectorRef,
          useClass: MockChangeDetectorRef
        }
      ]
    });

    pipe = TestBed.inject(FormatInTimeZonePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
