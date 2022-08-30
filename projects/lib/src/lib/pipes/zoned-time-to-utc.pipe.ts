import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { OptionsWithTZ, zonedTimeToUtc } from 'date-fns-tz';
import { isValidDate } from '../util/is-valid';
import { Subscription } from 'rxjs';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

@Pipe({
  name: 'dfnsZonedTimeToUtc',
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

  transform(date: Date | string | number, tz: string, options?: OptionsWithTZ): Date {
    if (!isValidDate(date)) return new Date(0);

    return zonedTimeToUtc(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
