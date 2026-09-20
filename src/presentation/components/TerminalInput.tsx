import { memo, type KeyboardEvent, type RefObject } from 'react';
import type { Lang } from '../../domain/entities';
import { useDependencies } from '../context/dependencies.context';

interface TerminalInputProps {
  readonly username: string;
  readonly lang: Lang;
  readonly value: string;
  readonly disabled: boolean;
  readonly inputRef: RefObject<HTMLInputElement>;
  readonly onChange: (value: string) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TerminalInput = memo(function TerminalInput({
  username,
  lang,
  value,
  disabled,
  inputRef,
  onChange,
  onKeyDown
}: TerminalInputProps) {
  const { translator } = useDependencies();

  return (
    <div id="input-line" className="input-line">
      <div className="prompt" aria-hidden="true">
        [{username}] #{' '}
      </div>
      <div>
        <input
          id="terminal-input"
          ref={inputRef}
          className="cmdline"
          value={value}
          disabled={disabled}
          aria-label={translator.t(lang, 'a11y.terminalInput')}
          onChange={event => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
});
