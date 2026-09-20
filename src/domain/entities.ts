export type Lang = 'en' | 'ru';
export type Theme = 'dark' | 'light';
export type TypingSpeed = 'slow' | 'normal' | 'fast';

export const LANGS: readonly Lang[] = ['en', 'ru'];
export const THEMES: readonly Theme[] = ['dark', 'light'];
export const TYPING_SPEEDS: readonly TypingSpeed[] = ['slow', 'normal', 'fast'];

export function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'ru';
}

export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'dark' || value === 'light';
}

export function isTypingSpeed(value: string | null | undefined): value is TypingSpeed {
  return value === 'slow' || value === 'normal' || value === 'fast';
}

export interface WorkExperience {
  readonly years: number;
  readonly months: number;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

export interface LocalizedText {
  readonly en: string;
  readonly ru: string;
}

export interface LocalizedList {
  readonly en: readonly string[];
  readonly ru: readonly string[];
}

export interface ExperienceRole {
  readonly dateFrom: string;
  readonly dateTo: string | null;
  readonly title: LocalizedText;
  readonly responsibilities: LocalizedList;
  readonly achievements?: LocalizedList;
}

export interface ExperienceEntry {
  readonly dateFrom: string;
  readonly dateTo: string | null;
  readonly companyName: LocalizedText;
  readonly companySite: string;
  readonly companySiteLabel?: string;
  readonly title?: LocalizedText;
  readonly responsibilities?: LocalizedList;
  readonly achievements?: LocalizedList;
  readonly roles?: readonly ExperienceRole[];
  readonly stack: readonly string[];
}

export interface GitHubProject {
  readonly name: string;
  readonly link: string;
}

export interface ContactLink {
  readonly txt: string;
  readonly title_color?: string;
  readonly txt_color?: string;
}

export interface ProfileFile {
  readonly name: string;
  readonly cmd: string;
  readonly description: string;
}

export interface InfoNode {
  readonly txt?: string;
  readonly title_color?: string;
  readonly txt_color?: string;
  readonly show_title?: boolean;
  readonly leaves?: Readonly<Record<string, InfoNode>>;
}

export interface NeofetchInfo {
  readonly user: string;
  readonly host: string;
  readonly os: string;
  readonly theme: string;
}

export interface Profile {
  readonly username: string;
  readonly hostname: string;
  readonly whoami: string;
  readonly informationAboutMe: Readonly<Record<string, InfoNode>>;
  readonly links: Readonly<Record<string, ContactLink>>;
  readonly experience: readonly ExperienceEntry[];
  readonly gitHub: {
    readonly link: string;
    readonly projects: readonly GitHubProject[];
  };
  readonly lsFiles: readonly ProfileFile[];
  readonly resumeTxt: string;
  readonly fortune: Readonly<Record<Lang, readonly string[]>>;
  readonly neofetch: NeofetchInfo;
  readonly cowsayTemplate: string;
  readonly easterEggs: readonly string[];
}

export interface TerminalSettings {
  readonly lang: Lang;
  readonly theme: Theme;
  readonly typingSpeed: TypingSpeed;
  readonly soundOn: boolean;
}

export interface ParsedCommand {
  readonly name: string;
  readonly args: readonly string[];
  readonly raw: string;
}

export const STORAGE_KEYS = {
  lastVisit: 'LAST_VISIT_DATE',
  theme: 'terminal_theme',
  speed: 'terminal_speed',
  sound: 'terminal_sound',
  lang: 'terminal_lang'
} as const;
