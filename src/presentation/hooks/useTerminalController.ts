import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { CommandContext } from '../../application/commands/command-handler';
import type { TerminalSettings } from '../../domain/entities';
import { autocomplete } from '../../domain/services/autocomplete';
import { CommandHistory } from '../../domain/services/command-history';
import { escapeHtml, renderCommandGrid } from '../../domain/services/html';
import { useDependencies } from '../context/dependencies.context';

const IGNORED_TICK_KEYS = new Set(['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'Meta', 'Control', 'Alt', 'Shift']);

export function useTerminalController() {
  const deps = useDependencies();
  const profile = useMemo(() => deps.profileRepository.getProfile(), [deps]);
  const commands = useMemo(() => deps.profileRepository.getCommands(), [deps]);
  const asciiImage = useMemo(() => deps.profileRepository.getAsciiImage(), [deps]);
  const nonAlphabeticKeys = useMemo(() => deps.profileRepository.getNonAlphabeticKeyCodes(), [deps]);

  const [settings, setSettings] = useState<TerminalSettings>(() => deps.loadSettings.execute());
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>([]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [converterUrl, setConverterUrl] = useState<string | null>(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [menuBarTime, setMenuBarTime] = useState(() => new Date());

  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const historyRef = useRef(new CommandHistory());
  const settingsRef = useRef(settings);
  const inputValueRef = useRef(input);
  const handleEnterRef = useRef<(forceValue?: string) => Promise<void>>(async () => undefined);
  const typeAndExecuteRef = useRef<(command: string) => void>(() => undefined);

  settingsRef.current = settings;
  inputValueRef.current = input;

  const applySettings = useCallback((patch: Partial<TerminalSettings>) => {
    setSettings(prev => ({ ...prev, ...patch }));
  }, []);

  const appendLine = useCallback((html: string) => {
    setLines(prev => [...prev, html]);
  }, []);

  const echoCommand = useCallback(
    (cmd: string) => {
      appendLine(`
        <span class="m-0 d-flex">
          <span class="prompt">[${profile.username}] # </span>
          <span>${escapeHtml(cmd)}</span>
        </span>
      `);
    },
    [appendLine, profile.username]
  );

  const buildContext = useCallback((): CommandContext => {
    return {
      settings: settingsRef.current,
      profile,
      commands,
      asciiImage,
      presenter: {
        appendLine,
        clear: () => setLines([]),
        activateMatrix: () => setMatrixActive(true),
        activateConverter: (url: string) => setConverterUrl(url)
      },
      translator: deps.translator,
      clock: deps.clock,
      network: deps.network,
      environment: deps.environment,
      profileRepository: deps.profileRepository,
      applySettings
    };
  }, [appendLine, applySettings, asciiImage, commands, deps, profile]);

  const handleEnter = useCallback(
    async (forceValue?: string) => {
      const raw = (forceValue ?? inputValueRef.current).trim();
      if (!raw) {
        return;
      }

      echoCommand(raw);
      setInput('');
      historyRef.current.push(raw);

      await deps.executeCommand.execute(raw, buildContext());
    },
    [buildContext, deps.executeCommand, echoCommand]
  );

  handleEnterRef.current = handleEnter;

  const getTypingSpeedMs = useCallback(() => {
    const presets = deps.profileRepository.getSpeedPresets();
    return presets[settingsRef.current.typingSpeed] ?? deps.profileRepository.getDefaultTextPrintTime();
  }, [deps.profileRepository]);

  const typeAndExecute = useCallback(
    (command: string) => {
      if (!inputRef.current) {
        return;
      }

      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      inputRef.current.disabled = true;
      setInputDisabled(true);
      setInput('');
      inputRef.current.focus();

      const chars = command.split('');
      const step = (index: number) => {
        if (index >= chars.length) {
          if (inputRef.current) {
            inputRef.current.disabled = false;
          }
          setInputDisabled(false);
          void handleEnterRef.current(command);
          return;
        }

        setInput(prev => prev + (chars[index] ?? ''));
        typingTimerRef.current = window.setTimeout(() => step(index + 1), getTypingSpeedMs());
      };

      step(0);
    },
    [getTypingSpeedMs]
  );

  typeAndExecuteRef.current = typeAndExecute;

  const showCommandSuggestions = useCallback(
    (matches: readonly string[]) => {
      appendLine(renderCommandGrid(matches));
    },
    [appendLine]
  );

  const onInputKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (!IGNORED_TICK_KEYS.has(event.key) && settingsRef.current.soundOn) {
        deps.audio.playTick();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const trimmed = inputValueRef.current.trim();
        if (trimmed) {
          void handleEnter(trimmed);
        } else {
          echoCommand('');
        }
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        const result = autocomplete(inputValueRef.current, commands);
        if (result.kind === 'single') {
          setInput(result.value);
          return;
        }
        if (result.kind === 'multiple') {
          showCommandSuggestions(result.matches);
        }
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const previous = historyRef.current.up();
        if (previous !== null) {
          setInput(previous);
        }
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = historyRef.current.down();
        if (next !== null) {
          setInput(next);
        }
      }
    },
    [commands, deps.audio, echoCommand, handleEnter, showCommandSuggestions]
  );

  useEffect(() => {
    const { welcomeLine, initialCommand } = deps.bootstrapSession.execute(settingsRef.current.lang);
    appendLine(welcomeLine);
    void handleEnterRef.current(initialCommand);
  }, [appendLine, deps.bootstrapSession]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = deps.environment.getHashCommand();
      if (hash && commands.includes(hash)) {
        void handleEnterRef.current(hash);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [commands, deps.environment]);

  useEffect(() => {
    deps.environment.syncLangToUrl(settings.lang);
    deps.environment.setDocumentLang(settings.lang);
  }, [deps.environment, settings.lang]);

  useEffect(() => {
    deps.environment.applyTheme(settings.theme);
  }, [deps.environment, settings.theme]);

  useEffect(() => {
    deps.saveSettings.execute(settings);
  }, [deps.saveSettings, settings]);

  useEffect(() => {
    const id = window.setInterval(() => setMenuBarTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (converterUrl || document.activeElement === inputRef.current) {
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        return;
      }

      const value = nonAlphabeticKeys.includes(event.keyCode) ? '' : event.key;
      inputRef.current?.focus();
      setInput(value);
    };

    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [converterUrl, nonAlphabeticKeys]);

  useEffect(() => {
    const activateCommand = (cmd: string) => {
      typeAndExecuteRef.current(cmd);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const cmd = target.closest('[data-cmd]')?.getAttribute('data-cmd');
      if (cmd) {
        event.preventDefault();
        activateCommand(cmd);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      const target = event.target;
      if (!(target instanceof HTMLElement) || target === inputRef.current) {
        return;
      }

      const cmd = target.closest('[data-cmd]')?.getAttribute('data-cmd');
      if (cmd) {
        event.preventDefault();
        activateCommand(cmd);
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    applySettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  }, [applySettings, settings.theme]);

  const toggleLang = useCallback(() => {
    applySettings({ lang: settings.lang === 'en' ? 'ru' : 'en' });
  }, [applySettings, settings.lang]);

  const closeMatrix = useCallback(() => {
    setMatrixActive(false);
    inputRef.current?.focus();
  }, []);

  const closeConverter = useCallback(() => {
    setConverterUrl(null);
    inputRef.current?.focus();
  }, []);

  return {
    profile,
    settings,
    input,
    setInput,
    lines,
    matrixActive,
    converterUrl,
    inputDisabled,
    menuBarTime,
    inputRef,
    onInputKeyDown,
    toggleTheme,
    toggleLang,
    closeMatrix,
    closeConverter,
    lang: settings.lang,
    theme: settings.theme
  };
}
