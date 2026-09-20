import type { WorkExperience } from '../entities';

export interface CalendarPeriod {
  readonly years: number;
  readonly months: number;
}

export function parseISODate(iso: string): Date {
  const [yearRaw, monthRaw, dayRaw] = iso.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new Error(`Invalid ISO date: ${iso}`);
  }

  return new Date(year, month - 1, day);
}

export function getCalendarPeriod(from: string, to: string | null, now = new Date()): CalendarPeriod {
  const start = parseISODate(from);
  const end = to ? parseISODate(to) : new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months)
  };
}

export function getWorkExperience(date: string, now = new Date()): WorkExperience {
  const period = getCalendarPeriod(date, null, now);

  return {
    years: period.years,
    months: period.months,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
}
