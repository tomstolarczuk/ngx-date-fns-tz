import { ChangeDetectorRef, effect, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isValidDate } from '../util';
import { DateFnsTzConfigurationService } from '../services';
import { fromZonedTime } from 'date-fns-tz';

@Pipe({
  name: 'dfnsZonedTimeToUtc',
  standalone: true,
  pure: false
})
export class ZonedTimeToUtcPipe implements PipeTransform, OnDestroy {
  private service = inject(DateFnsTzConfigurationService);
  private cdr = inject(ChangeDetectorRef);

  private cleanup = effect(() => {
    this.service.timeZone;
    this.cdr.markForCheck();
  });

  transform(
    date: Date | string | number,
    tz?: string | null,
  ): Date {
    if (!isValidDate(date)) return new Date(0);

    tz = tz ?? this.service.timeZone;

    return fromZonedTime(date, tz);
  }

  ngOnDestroy(): void {
    this.cleanup.destroy();
  }
}
