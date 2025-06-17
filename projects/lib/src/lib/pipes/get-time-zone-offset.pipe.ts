import { inject, Pipe, PipeTransform } from '@angular/core';
import { getTimezoneOffset } from 'date-fns-tz';
import { DateFnsTzConfigurationService } from '../services';

@Pipe({
  name: 'dfnsGetTimeZoneOffset',
  standalone: true,
  pure: true
})
export class GetTimeZoneOffsetPipe implements PipeTransform {
  service = inject(DateFnsTzConfigurationService);

  transform(tz?: string, date?: Date): number {
    return getTimezoneOffset(tz ?? this.service.timeZone, date);
  }
}
