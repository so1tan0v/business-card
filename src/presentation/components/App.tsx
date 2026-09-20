import { useDependencies } from '../context/dependencies.context';
import { useTerminalController } from '../hooks/useTerminalController';
import { ErrorBoundary } from './ErrorBoundary';
import { MacMenuBar } from './MacMenuBar';
import { MatrixOverlay } from './MatrixOverlay';
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
    matrixActive,
    inputDisabled,
    menuBarTime,
    inputRef,
    onInputKeyDown,
    toggleTheme,
    toggleLang,
    closeMatrix
  } = useTerminalController();

  return (
    <div className="model">
      <a className="visually-hidden-focusable" href="#terminal-input">
        {translator.t(lang, 'a11y.skipToInput')}
      </a>
      <MacMenuBar lang={lang} theme={theme} now={menuBarTime} onToggleTheme={toggleTheme} onToggleLang={toggleLang} />
      <div className="model-content">
        <MatrixOverlay
          active={matrixActive}
          label={translator.t(lang, 'a11y.matrixLabel')}
          hint={translator.t(lang, 'a11y.matrixHint')}
          onExit={closeMatrix}
        />
        <TerminalWindow
          username={profile.username}
          lang={lang}
          lines={lines}
          input={input}
          inputDisabled={inputDisabled}
          inputRef={inputRef}
          onInputChange={setInput}
          onInputKeyDown={onInputKeyDown}
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
