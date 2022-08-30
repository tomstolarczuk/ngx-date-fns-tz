import { Pipe, PipeTransform } from '@angular/core';
import { getTimezoneOffset } from 'date-fns-tz';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

@Pipe({
  name: 'dfnsGetTimeZoneOffset'
})
export class GetTimeZoneOffsetPipe implements PipeTransform {
  constructor(private dateFnsTzConfig: DateFnsTzConfigurationService) {}

  transform(tz?: string, date?: Date): number {
    return getTimezoneOffset(tz ?? this.dateFnsTzConfig.timeZone, date);
  }
}
