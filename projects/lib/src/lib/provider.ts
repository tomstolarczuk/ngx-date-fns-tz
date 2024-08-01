import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DateFnsTzConfigurationService } from '../lib/services/date-fns-tz-configuration.service';

export function provideDateFnsTz(): EnvironmentProviders {
  return makeEnvironmentProviders([
    DateFnsTzConfigurationService
  ]);
}
