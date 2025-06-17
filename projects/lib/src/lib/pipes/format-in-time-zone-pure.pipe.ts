import { inject, Pipe, PipeTransform } from '@angular/core';
import { formatInTimeZone } from 'date-fns-tz';
import { DateFnsTzConfigurationService } from '../services';
import { isValidDate } from '../util';

@Pipe({
  name: 'dfnsFormatInTimeZonePure',
  standalone: true,
  pure: true
})
export class FormatInTimeZonePurePipe implements PipeTransform {
  private service = inject(DateFnsTzConfigurationService);

  transform(
    date: Date | string | number,
    tz?: string | null,
    fmt?: string | null
  ): string {
    if (!isValidDate(date)) return '';

    tz = tz ?? this.service.timeZone;
    fmt = fmt ?? this.service.format;

    return formatInTimeZone(date, tz, fmt, {
      locale: this.service.locale
    });
  }
}
