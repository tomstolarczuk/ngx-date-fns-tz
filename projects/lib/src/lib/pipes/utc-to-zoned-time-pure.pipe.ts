import { inject, Pipe, PipeTransform } from '@angular/core';
import { DateFnsTzConfigurationService } from '../services';
import { isValidDate } from '../util';
import { toZonedTime } from 'date-fns-tz';

@Pipe({
  name: 'utcToZonedTimePure',
  standalone: true,
  pure: true
})
export class UtcToZonedTimePurePipe implements PipeTransform {
  private service = inject(DateFnsTzConfigurationService);

  transform(
    date: Date | string | number,
    tz?: string | null
  ): Date {
    if (!isValidDate(date)) return new Date(0);

    tz = tz ?? this.service.timeZone;

    return toZonedTime(date, tz);
  }
}
