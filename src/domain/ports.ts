import type { Lang, Profile, Theme, TypingSpeed } from './entities';
import type { I18nKey, I18nParams } from './i18n';

export interface StoragePort {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

export interface TranslatorPort {
  t(lang: Lang, key: I18nKey, params?: I18nParams): string;
}

export interface ClockPort {
  now(): Date;
  sleep(ms: number): Promise<void>;
  uptimeMs(): number;
}

export interface EnvironmentPort {
  getUserAgent(): string;
  getAppVersion(): string;
  getScreenResolution(): string;
  getHashCommand(): string;
  getLangFromUrl(): Lang | null;
  syncLangToUrl(lang: Lang): void;
  setDocumentLang(lang: Lang): void;
  applyTheme(theme: Theme): void;
  openUrl(url: string, target?: string): void;
}

export interface NetworkPort {
  fetchJson(url: string): Promise<unknown>;
}

export interface AudioPort {
  playTick(): void;
}

export interface ProfileRepository {
  getProfile(): Profile;
  getCommands(): readonly string[];
  getSpeedPresets(): Readonly<Record<TypingSpeed, number>>;
  getDefaultTextPrintTime(): number;
  getDefaultTheme(): Theme;
  getNonAlphabeticKeyCodes(): readonly number[];
  getAsciiImage(): string;
}

export interface TerminalPresenter {
  appendLine(html: string): void;
  clear(): void;
  activateMatrix(): void;
}

