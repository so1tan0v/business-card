import { isLang, type Lang, type Theme } from '../../domain/entities';
import type { EnvironmentPort } from '../../domain/ports';

export class BrowserEnvironmentAdapter implements EnvironmentPort {
  getUserAgent(): string {
    return navigator.userAgent;
  }

  getAppVersion(): string {
    return navigator.appVersion ?? '';
  }

  getScreenResolution(): string {
    return `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`;
  }

  getHashCommand(): string {
    return window.location.hash.slice(2);
  }

  getLangFromUrl(): Lang | null {
    const urlLang = new URL(window.location.href).searchParams.get('lang');
    return isLang(urlLang) ? urlLang : null;
  }

  syncLangToUrl(lang: Lang): void {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState(null, '', url.toString());
  }

  setDocumentLang(lang: Lang): void {
    document.documentElement.lang = lang;
  }

  applyTheme(theme: Theme): void {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
  }

  openUrl(url: string, target = '_blank'): void {
    window.open(url, target);
  }
}
