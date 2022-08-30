import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { formatInTimeZone, OptionsWithTZ } from 'date-fns-tz';
import { isValidDate } from '../util/is-valid';
import { Subscription } from 'rxjs';
import { DateFnsTzConfigurationService } from '../services/date-fns-tz-configuration.service';

@Pipe({
  name: 'dfnsFormatInTimeZone',
  pure: false
})
export class FormatInTimeZonePipe implements PipeTransform, OnDestroy {
  sub?: Subscription;

  constructor(
    private dateFnsTzConfig: DateFnsTzConfigurationService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.dateFnsTzConfig.config$.subscribe(() => this.cdr.markForCheck());
  }

  transform(
    date: Date | string | number,
    tz: string,
    fmt: string | null,
    options?: OptionsWithTZ
  ): string {
    if (!isValidDate(date)) return '';

    return formatInTimeZone(
      date,
      tz ?? options?.timeZone ?? this.dateFnsTzConfig.timeZone,
      fmt ?? this.dateFnsTzConfig.format,
      {
        ...this.dateFnsTzConfig.config,
        ...options
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
