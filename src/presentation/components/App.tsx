import { useDependencies } from '../context/dependencies.context';
import { useTerminalController } from '../hooks/useTerminalController';
import { ConverterOverlay } from './ConverterOverlay';
import { ErrorBoundary } from './ErrorBoundary';
import { MacMenuBar } from './MacMenuBar';
import { TerminalWindow } from './TerminalWindow';

function AppShell() {
  const { translator } = useDependencies();
  const {
    profile,
    lang,
    theme,
    input,
    setInput,
    lines,
    converterUrl,
    inputDisabled,
    menuBarTime,
    inputRef,
    onInputKeyDown,
    toggleTheme,
    toggleLang,
    closeConverter
  } = useTerminalController();

  return (
    <div className="model">
      <a className="visually-hidden-focusable" href="#terminal-input">
        {translator.t(lang, 'a11y.skipToInput')}
      </a>
      <MacMenuBar lang={lang} theme={theme} now={menuBarTime} onToggleTheme={toggleTheme} onToggleLang={toggleLang} />
      <div className="model-content">
        <TerminalWindow
          username={profile.username}
          lang={lang}
          lines={lines}
          input={input}
          inputDisabled={inputDisabled}
          inputRef={inputRef}
          onInputChange={setInput}
          onInputKeyDown={onInputKeyDown}
          overlay={
            converterUrl ? (
              <ConverterOverlay
                url={converterUrl}
                theme={theme}
                label={translator.t(lang, 'a11y.converterLabel')}
                hint={translator.t(lang, 'a11y.converterHint')}
                loadingLabel={translator.t(lang, 'a11y.converterLoading')}
                errorLabel={translator.t(lang, 'a11y.converterLoadError')}
                onExit={closeConverter}
              />
            ) : null
          }
          onOverlayClose={converterUrl ? closeConverter : undefined}
        />
      </div>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary
      fallback={
        <div className="model" role="alert">
          <p className="m-0" style={{ padding: 24 }}>
            Something went wrong. Reload the page or type help.
          </p>
        </div>
      }
    >
      <AppShell />
    </ErrorBoundary>
  );
}
