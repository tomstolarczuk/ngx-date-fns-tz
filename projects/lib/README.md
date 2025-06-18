# ngx-date-fns-tz

Angular pipes for date-fns-tz, providing timezone support for Angular applications.

[![npm version](https://badge.fury.io/js/ngx-date-fns-tz.svg?branch=master&kill_cache=1)](https://badge.fury.io/js/ngx-date-fns-tz)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install ngx-date-fns-tz date-fns date-fns-tz
```

## Features

- Convert between UTC and timezone-specific dates
- Format dates in specific timezones
- Get timezone offsets
- Both pure and impure pipes for different use cases
- Standalone components compatible with Angular 18+

## Setup

Import the provider in your app module or standalone component:

```typescript
import { provideDateFnsTz } from 'ngx-date-fns-tz';

// In your app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideDateFnsTz(),
    // other providers...
  ]
};
```

## Available Pipes

### UTC to Zoned Time

Convert UTC dates to a specific timezone:

```html
<!-- Impure pipe (updates on timezone changes) -->
<p>{{ utcDate | utcToZonedTime:'America/New_York' }}</p>

<!-- Pure pipe (only updates when inputs change) -->
<p>{{ utcDate | utcToZonedTimePure:'America/New_York' }}</p>
```

### Zoned Time to UTC

Convert timezone-specific dates to UTC:

```html
<!-- Impure pipe -->
<p>{{ zonedDate | dfnsZonedTimeToUtc:'America/New_York' }}</p>

<!-- Pure pipe -->
<p>{{ zonedDate | dfnsZonedTimeToUtcPure:'America/New_York' }}</p>
```

### Format in Time Zone

Format dates in a specific timezone:

```html
<!-- Impure pipe -->
<p>{{ date | dfnsFormatInTimeZone:'America/New_York':'yyyy-MM-dd HH:mm:ss zzz' }}</p>

<!-- Pure pipe -->
<p>{{ date | dfnsFormatInTimeZonePure:'America/New_York':'yyyy-MM-dd HH:mm:ss zzz' }}</p>
```

### Get Time Zone Offset

Get the offset for a specific timezone:

```html
<p>Offset: {{ 'America/New_York' | dfnsGetTimeZoneOffset }}</p>
```

## Configuration

You can configure default timezone, format, and locale using the `DateFnsTzConfigurationService`:

```typescript
import { DateFnsTzConfigurationService } from 'ngx-date-fns-tz';
import { fr } from 'date-fns/locale';

@Component({...})
export class AppComponent {
  constructor(private dateFnsTzConfig: DateFnsTzConfigurationService) {
    // Set default timezone
    this.dateFnsTzConfig.timeZone = 'Europe/Paris';
    
    // Set default format
    this.dateFnsTzConfig.format = 'dd/MM/yyyy HH:mm:ss zzz';
    
    // Set default locale
    this.dateFnsTzConfig.locale = fr;
  }
}
```

## Pure vs Impure Pipes

- **Impure pipes** (`utcToZonedTime`, `dfnsZonedTimeToUtc`, `dfnsFormatInTimeZone`): Update automatically when the configuration service changes.
- **Pure pipes** (`utcToZonedTimePure`, `dfnsZonedTimeToUtcPure`, `dfnsFormatInTimeZonePure`): Only update when their inputs change, more efficient for performance.

## Browser Support

This library works in all browsers supported by Angular and date-fns-tz.

## License

MIT
