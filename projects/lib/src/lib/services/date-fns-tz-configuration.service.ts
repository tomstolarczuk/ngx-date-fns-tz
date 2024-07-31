import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enGB } from 'date-fns/locale';
import type { FormatOptionsWithTZ, ToDateOptionsWithTZ } from 'date-fns-tz';

@Injectable({
  providedIn: 'root'
})
export class DateFnsTzConfigurationService {
  config$ = new BehaviorSubject<ToDateOptionsWithTZ | FormatOptionsWithTZ>({
    timeZone: this.resolveBrowserTimeZone(),
    locale: enGB,
  });

  format = 'dd-MM-yyyy HH:mm:ss zzz';

  set config(config: ToDateOptionsWithTZ | FormatOptionsWithTZ) {
    this.config$.next({ ...this.config$.value, ...config });
  }

  get config(): ToDateOptionsWithTZ | FormatOptionsWithTZ {
    return this.config$.value;
  }

  set timeZone(tz: string) {
    this.config$.next({ ...this.config$.value, timeZone: tz });
  }

  get timeZone(): string {
    return this.config$.value.timeZone ?? 'UTC';
  }

  resolveBrowserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
