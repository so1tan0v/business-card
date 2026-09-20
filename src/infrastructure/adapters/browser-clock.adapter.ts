import type { ClockPort } from '../../domain/ports';

export class BrowserClockAdapter implements ClockPort {
  now(): Date {
    return new Date();
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      window.setTimeout(resolve, ms);
    });
  }

  uptimeMs(): number {
    return performance.now();
  }
}
