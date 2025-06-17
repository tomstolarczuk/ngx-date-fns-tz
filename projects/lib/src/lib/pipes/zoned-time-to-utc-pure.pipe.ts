import { Pipe, PipeTransform } from '@angular/core';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { isValidDate } from '../util/is-valid';
import { FormatOptionsWithTZ, toZonedTime } from 'date-fns-tz';

@Pipe({
  name: 'dfnsZonedTimeToUtcPure',
  standalone: true
})
export class ZonedTimeToUtcPurePipe implements PipeTransform {
  constructor(private dateFnsTzConfig: DateFnsTzConfigurationService) {}

  transform(date: Date | string | number, tz: string | null, options?: FormatOptionsWithTZ): Date {
    if (!isValidDate(date)) return new Date(0);

    return toZonedTime(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }
}
