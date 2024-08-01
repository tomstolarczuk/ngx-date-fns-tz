import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isValidDate } from '../util/is-valid';
import { Subscription } from 'rxjs';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { FormatOptionsWithTZ, toZonedTime } from 'date-fns-tz';

@Pipe({
  name: 'dfnsZonedTimeToUtc',
  standalone: true,
  pure: false
})
export class ZonedTimeToUtcPipe implements PipeTransform, OnDestroy {
  sub?: Subscription;

  constructor(
    private dateFnsTzConfig: DateFnsTzConfigurationService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.dateFnsTzConfig.config$.subscribe(() => this.cdr.markForCheck());
  }

  transform(date: Date | string | number, tz: string, options?: FormatOptionsWithTZ): Date {
    if (!isValidDate(date)) return new Date(0);

    return toZonedTime(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
