import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormatInTimeZonePipe } from './pipes/format-in-time-zone.pipe';
import { FormatInTimeZonePurePipe } from './pipes/format-in-time-zone-pure.pipe';
import { ZonedTimeToUtcPipe } from './pipes/zoned-time-to-utc.pipe';
import { ZonedTimeToUtcPurePipe } from './pipes/zoned-time-to-utc-pure.pipe';
import { UtcToZonedTimePipe } from './pipes/utc-to-zoned-time.pipe';
import { UtcToZonedTimePurePipe } from './pipes/utc-to-zoned-time-pure.pipe';
import { GetTimeZoneOffsetPipe } from './pipes/get-time-zone-offset.pipe';
import { DateFnsTzConfigurationService } from '../lib/services/date-fns-tz-configuration.service';

@NgModule({
  declarations: [
    FormatInTimeZonePipe,
    FormatInTimeZonePurePipe,
    ZonedTimeToUtcPipe,
    ZonedTimeToUtcPurePipe,
    UtcToZonedTimePipe,
    UtcToZonedTimePurePipe,
    GetTimeZoneOffsetPipe
  ],
  exports: [
    FormatInTimeZonePipe,
    FormatInTimeZonePurePipe,
    ZonedTimeToUtcPipe,
    ZonedTimeToUtcPurePipe,
    UtcToZonedTimePipe,
    UtcToZonedTimePurePipe,
    GetTimeZoneOffsetPipe
  ]
})
export class DateFnsTzModule {
  static forRoot(): ModuleWithProviders<DateFnsTzModule> {
    return {
      providers: [DateFnsTzConfigurationService],
      ngModule: DateFnsTzModule
    };
  }
}
