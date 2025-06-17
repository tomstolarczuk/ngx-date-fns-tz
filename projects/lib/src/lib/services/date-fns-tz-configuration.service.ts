import { Injectable, signal } from '@angular/core';
import { enGB, Locale } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class DateFnsTzConfigurationService {
  _timezone = signal<string>(this.resolveBrowserTimeZone());
  _locale = signal<Locale>(enGB);
  _format = signal<string>('dd-MM-yyyy HH:mm:ss zzz');

  set timeZone(tz: string) {
    this._timezone.set(tz);
  }

  get timeZone(): string {
    return this._timezone();
  }

  set locale(locale: Locale) {
    this._locale.set(locale);
  }

  get locale(): Locale {
    return this._locale();
  }

  set format(fmt: string) {
    this._format.set(fmt);
  }

  get format(): string {
    return this._format();
  }

  resolveBrowserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
