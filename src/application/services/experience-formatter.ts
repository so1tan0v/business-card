import type { ExperienceEntry, ExperienceRole, Lang, LocalizedList } from '../../domain/entities';
import { toAnchor } from '../../domain/services/html';
import { getCalendarPeriod, type CalendarPeriod } from '../../domain/services/work-experience';
import { TECH_LINKS } from './tech-links';

const DATE_COLOR = '#c4c03d';
const LABEL_COLOR = '#3daac4';

const MONTHS: Readonly<Record<Lang, readonly string[]>> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
};

const LABELS = {
  en: {
    present: 'Present',
    responsibilities: 'Responsibilities',
    achievements: 'Achievements',
    stack: 'Stack',
    rotation: 'Role rotation',
    lessThanMonth: 'less than a month'
  },
  ru: {
    present: 'настоящее время',
    responsibilities: 'Обязанности',
    achievements: 'Достижения',
    stack: 'Стек',
    rotation: 'Ротация',
    lessThanMonth: 'меньше месяца'
  }
} as const;

function formatTech(name: string): string {
  const url = TECH_LINKS[name];
  return url ? toAnchor(name, url) : name;
}

function interpolateTech(text: string): string {
  return text.replace(/\{([^}]+)\}/g, (_match, key: string) => formatTech(key));
}

function formatMonthYear(iso: string, lang: Lang): string {
  const [yearRaw, monthRaw] = iso.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const monthName = MONTHS[lang][(month ?? 1) - 1] ?? iso;

  return `${monthName} ${year}`;
}

function coloredDate(text: string): string {
  return `<span style="color: ${DATE_COLOR}">${text}</span>`;
}

function coloredLabel(text: string): string {
  return `<span style="color: ${LABEL_COLOR}">${text}</span>`;
}

function pluralEn(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

function pluralRu(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} ${one}`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} ${few}`;
  }

  return `${count} ${many}`;
}

export function formatPeriodLabel(period: CalendarPeriod, lang: Lang): string {
  const parts: string[] = [];

  if (period.years > 0) {
    parts.push(lang === 'ru' ? pluralRu(period.years, 'год', 'года', 'лет') : pluralEn(period.years, 'year', 'years'));
  }

  if (period.months > 0) {
    parts.push(
      lang === 'ru' ? pluralRu(period.months, 'месяц', 'месяца', 'месяцев') : pluralEn(period.months, 'month', 'months')
    );
  }

  if (!parts.length) {
    return LABELS[lang].lessThanMonth;
  }

  return parts.join(' ');
}

function formatDateRange(from: string, to: string | null, lang: Lang, now: Date): string {
  const fromLabel = coloredDate(formatMonthYear(from, lang));
  const toLabel = coloredDate(to ? formatMonthYear(to, lang) : LABELS[lang].present);
  const period = formatPeriodLabel(getCalendarPeriod(from, to, now), lang);

  return `${fromLabel} - ${toLabel} (${period})`;
}

function renderBullets(items: readonly string[]): string {
  return items.map(item => `&nbsp;&nbsp;• ${interpolateTech(item)}`).join('<br>');
}

function renderListSection(title: string, list: LocalizedList | undefined, lang: Lang): string {
  const items = list?.[lang] ?? [];
  if (!items.length) {
    return '';
  }

  return `${coloredLabel(title)}:<br>${renderBullets(items)}<br>`;
}

function renderRole(role: ExperienceRole, lang: Lang, now: Date): string {
  const labels = LABELS[lang];

  return `
        ${formatDateRange(role.dateFrom, role.dateTo, lang, now)} - <strong>${role.title[lang]}</strong><br>
        ${renderListSection(labels.responsibilities, role.responsibilities, lang)}
        ${renderListSection(labels.achievements, role.achievements, lang)}
  `;
}

function renderStack(stack: readonly string[], lang: Lang): string {
  if (!stack.length) {
    return '';
  }

  return `<em>${LABELS[lang].stack}: ${stack.map(formatTech).join(', ')}</em><br>`;
}

function siteLabel(entry: ExperienceEntry): string {
  if (entry.companySiteLabel) {
    return entry.companySiteLabel;
  }

  try {
    return new URL(entry.companySite).hostname.replace(/^www\./, '');
  } catch {
    return entry.companySite;
  }
}

function rotationLine(roles: readonly ExperienceRole[], lang: Lang): string {
  const chronological = [...roles].sort((left, right) => left.dateFrom.localeCompare(right.dateFrom));
  const titles = chronological.map(role => role.title[lang]);

  return `${coloredLabel(LABELS[lang].rotation)}: ${titles.join(' -> ')}<br>`;
}

export function assembleExperienceCard(entry: ExperienceEntry, lang: Lang, now = new Date()): string {
  const labels = LABELS[lang];
  const company = `<strong>${entry.companyName[lang]}</strong> (${toAnchor(siteLabel(entry), entry.companySite)})`;
  const headerRange = formatDateRange(entry.dateFrom, entry.dateTo, lang, now);
  const roles = entry.roles ?? [];

  if (roles.length > 1) {
    const displayedRoles = [...roles].sort((left, right) => right.dateFrom.localeCompare(left.dateFrom));

    return `
        <br>
        ${headerRange}<br>
        ${company}<br>
        ${rotationLine(roles, lang)}
        <br>
        ${displayedRoles.map(role => renderRole(role, lang, now)).join('<br>')}
        ${renderStack(entry.stack, lang)}
    `;
  }

  const title = entry.title?.[lang] ?? roles[0]?.title[lang];
  const titleSuffix = title ? ` - ${title}` : '';
  const responsibilities = entry.responsibilities ?? roles[0]?.responsibilities;
  const achievements = entry.achievements ?? roles[0]?.achievements;

  return `
        <br>
        ${headerRange}<br>
        ${company}${titleSuffix}<br>
        ${renderListSection(labels.responsibilities, responsibilities, lang)}
        ${renderListSection(labels.achievements, achievements, lang)}
        ${renderStack(entry.stack, lang)}
    `;
}

export function assembleExperience(entries: readonly ExperienceEntry[], lang: Lang, now = new Date()): string[] {
  return entries.map(entry => assembleExperienceCard(entry, lang, now));
}
