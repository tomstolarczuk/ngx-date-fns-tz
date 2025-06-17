import { ChangeDetectorRef, effect, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isValidDate } from '../util';
import { DateFnsTzConfigurationService } from '../services';
import { formatInTimeZone } from 'date-fns-tz';

@Pipe({
  name: 'dfnsFormatInTimeZone',
  standalone: true,
  pure: false
})
export class FormatInTimeZonePipe implements PipeTransform, OnDestroy {
  private service = inject(DateFnsTzConfigurationService);
  private cdr = inject(ChangeDetectorRef);

  private cleanup = effect(() => {
    this.service.timeZone;
    this.service.format;
    this.service.locale;
    this.cdr.markForCheck();
  });

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

  ngOnDestroy(): void {
    this.cleanup.destroy();
  }
}
