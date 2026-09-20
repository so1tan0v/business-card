import { memo } from 'react';
import type { Lang } from '../../domain/entities';
import { useDependencies } from '../context/dependencies.context';

interface TerminalOutputProps {
  readonly lines: readonly string[];
  readonly lang: Lang;
}

export const TerminalOutput = memo(function TerminalOutput({ lines, lang }: TerminalOutputProps) {
  const { translator } = useDependencies();

  return (
    <div id="terminal-output" role="log" aria-live="polite" aria-relevant="additions" aria-busy={false}>
      {lines.length === 0 ? (
        <p className="m-0 visually-hidden">{translator.t(lang, 'a11y.terminalEmpty')}</p>
      ) : (
        lines.map((html, idx) => <p className="m-0" key={idx} dangerouslySetInnerHTML={{ __html: html }} />)
      )}
    </div>
  );
});
