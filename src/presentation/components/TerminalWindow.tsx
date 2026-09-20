import { memo, useEffect, useRef, type KeyboardEvent, type RefObject } from 'react';
import type { Lang } from '../../domain/entities';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';

interface TerminalWindowProps {
  readonly username: string;
  readonly lang: Lang;
  readonly lines: readonly string[];
  readonly input: string;
  readonly inputDisabled: boolean;
  readonly inputRef: RefObject<HTMLInputElement>;
  readonly onInputChange: (value: string) => void;
  readonly onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TerminalWindow = memo(function TerminalWindow({
  username,
  lang,
  lines,
  input,
  inputDisabled,
  inputRef,
  onInputChange,
  onInputKeyDown
}: TerminalWindowProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = contentRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollTop = scroller.scrollHeight;
  }, [lines]);

  return (
    <div className="mac-window" role="application" aria-label="Interactive terminal">
      <div className="mac-titlebar">
        <div className="traffic-lights" aria-hidden="true">
          <span className="light red" />
          <span className="light yellow" />
          <span className="light green" />
        </div>
        <div className="mac-title">{username}:~</div>
      </div>
      <div className="mac-content" ref={contentRef}>
        <TerminalOutput lines={lines} lang={lang} />
        <TerminalInput
          username={username}
          lang={lang}
          value={input}
          disabled={inputDisabled}
          inputRef={inputRef}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      </div>
    </div>
  );
});
