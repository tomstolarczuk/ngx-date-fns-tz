import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';
import { OptionsWithTZ, utcToZonedTime } from 'date-fns-tz';
import { isValidDate } from '../util/is-valid';

@Pipe({
  name: 'utcToZonedTime',
  pure: false
})
export class UtcToZonedTimePipe implements PipeTransform, OnDestroy {
  sub?: Subscription;

  constructor(
    private dateFnsTzConfig: DateFnsTzConfigurationService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.dateFnsTzConfig.config$.subscribe(() => this.cdr.markForCheck());
  }

  transform(date: Date | string | number, tz: string, options?: OptionsWithTZ): Date {
    if (!isValidDate(date)) return new Date(0);

    return utcToZonedTime(date, tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone, {
      ...this.dateFnsTzConfig.config,
      ...options
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
