import { Injectable } from '@angular/core';
import { OptionsWithTZ } from 'date-fns-tz';
import { BehaviorSubject } from 'rxjs';
import { enGB } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class DateFnsTzConfigurationService {
  config$ = new BehaviorSubject<OptionsWithTZ>({
    timeZone: this.resolveBrowserTimeZone(),
    locale: enGB,
    includeSeconds: false,
    addSuffix: true
  });

  format = 'dd-MM-yyyy HH:mm:ss zzz';

  set config(config: OptionsWithTZ) {
    this.config$.next({ ...this.config$.value, ...config });
  }

  get config(): OptionsWithTZ {
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
