import { Pipe, PipeTransform } from '@angular/core';
import { formatInTimeZone, FormatOptionsWithTZ } from 'date-fns-tz';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { isValidDate } from '../util/is-valid';

@Pipe({
  name: 'dfnsFormatInTimeZonePure',
  standalone: true
})
export class FormatInTimeZonePurePipe implements PipeTransform {
  constructor(private dateFnsTzConfig: DateFnsTzConfigurationService) {}

  transform(
    date: Date | string | number,
    tz: string,
    fmt: string,
    options?: FormatOptionsWithTZ
  ): string {
    if (!isValidDate(date)) return '';

    return formatInTimeZone(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, fmt, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }
}
