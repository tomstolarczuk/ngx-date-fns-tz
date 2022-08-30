import { Pipe, PipeTransform } from '@angular/core';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { OptionsWithTZ, utcToZonedTime } from 'date-fns-tz';
import { isValidDate } from '../util/is-valid';

@Pipe({
  name: 'utcToZonedTimePure'
})
export class UtcToZonedTimePurePipe implements PipeTransform {
  constructor(private dateFnsTzConfig: DateFnsTzConfigurationService) {}

  transform(date: Date | string | number, tz: string, options?: OptionsWithTZ): Date {
    if (!isValidDate(date)) return new Date(0);

    return utcToZonedTime(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }
}
