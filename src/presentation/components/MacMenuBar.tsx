import { memo, useMemo } from 'react';
import type { Lang, Theme } from '../../domain/entities';
import { useDependencies } from '../context/dependencies.context';

interface MacMenuBarProps {
  readonly lang: Lang;
  readonly theme: Theme;
  readonly now: Date;
  readonly onToggleTheme: () => void;
  readonly onToggleLang: () => void;
}

export const MacMenuBar = memo(function MacMenuBar({ lang, theme, now, onToggleTheme, onToggleLang }: MacMenuBarProps) {
  const { translator } = useDependencies();

  const menuBarDateStr = useMemo(
    () =>
      now
        .toLocaleDateString(lang, {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
        .replace(',', '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    [lang, now]
  );

  const menuBarTimeStr = useMemo(
    () =>
      now.toLocaleTimeString(lang, {
        hour: '2-digit',
        minute: '2-digit'
      }),
    [lang, now]
  );

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className="mac-menu-bar" role="banner">
      <div className="mac-menu-bar-left">
        <span className="mac-menu-bar-app">
          <b>Terminal</b>
        </span>
        <button
          type="button"
          className="mac-menu-bar-theme"
          onClick={onToggleTheme}
          title={`Switch to ${nextTheme} theme`}
          aria-label={translator.t(lang, 'a11y.switchTheme', {
            current: translator.t(lang, theme === 'dark' ? 'theme-dark' : 'theme-light'),
            next: translator.t(lang, nextTheme === 'dark' ? 'theme-dark' : 'theme-light')
          })}
        >
          <span className="mac-menu-bar-theme-label">{translator.t(lang, `theme-${theme}`)}</span>
        </button>
      </div>
      <div className="mac-menu-bar-right">
        <button
          type="button"
          className="mac-menu-bar-theme"
          onClick={onToggleLang}
          aria-label={translator.t(lang, 'a11y.switchLang', { current: lang.toUpperCase() })}
        >
          <span className="mac-menu-bar-theme-label">
            <b>{lang.toUpperCase()}</b>
          </span>
        </button>
        <time className="mac-menu-bar-date" dateTime={now.toISOString()}>
          <b>{menuBarDateStr}</b>
        </time>
        <time className="mac-menu-bar-time" dateTime={now.toISOString()}>
          <b>{menuBarTimeStr}</b>
        </time>
      </div>
    </header>
  );
});
