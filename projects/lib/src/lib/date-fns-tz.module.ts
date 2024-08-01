import { ModuleWithProviders, NgModule } from '@angular/core';
import { DateFnsTzConfigurationService } from '../lib/services/date-fns-tz-configuration.service';

@NgModule({
})
export class DateFnsTzModule {
  static forRoot(): ModuleWithProviders<DateFnsTzModule> {
    return {
      providers: [DateFnsTzConfigurationService],
      ngModule: DateFnsTzModule
    };
  }
}
