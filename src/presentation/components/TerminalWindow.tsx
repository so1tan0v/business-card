import { memo, useEffect, useRef, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
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
  readonly overlay?: ReactNode;
  readonly onOverlayClose?: () => void;
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
  overlay,
  onOverlayClose,
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
        <div className="traffic-lights">
          <button
            type="button"
            className={`light red${onOverlayClose ? ' is-action' : ''}`}
            aria-label="Close"
            onClick={onOverlayClose}
          />
          <button type="button" className="light yellow" aria-label="Minimize" tabIndex={-1} />
          <button type="button" className="light green" aria-label="Zoom" tabIndex={-1} />
        </div>
        <div className="mac-title">{username}:~</div>
      </div>
      <div className="mac-content" ref={contentRef} aria-hidden={overlay ? true : undefined}>
        <TerminalOutput lines={lines} lang={lang} />
        <TerminalInput
          username={username}
          lang={lang}
          value={input}
          disabled={inputDisabled || Boolean(overlay)}
          inputRef={inputRef}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      </div>
      {overlay}
    </div>
  );
});
