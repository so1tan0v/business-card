import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Theme } from '../../domain/entities';
import {
  converterEmbedOrigin,
  createConverterEmbedThemeMessage,
  isConverterEmbedExitMessage,
  isEmbedExitShortcut
} from '../../domain/services/converter-embed';

interface ConverterOverlayProps {
  readonly url: string;
  readonly theme: Theme;
  readonly label: string;
  readonly hint: string;
  readonly loadingLabel: string;
  readonly errorLabel: string;
  readonly onExit: () => void;
}

type OverlayStatus = 'loading' | 'ready' | 'error';

export function ConverterOverlay({ url, theme, label, hint, loadingLabel, errorLabel, onExit }: ConverterOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<OverlayStatus>('loading');

  const origin = converterEmbedOrigin(url);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isEmbedExitShortcut(event)) {
        return;
      }

      event.preventDefault();
      onExit();
    },
    [onExit]
  );

  useEffect(() => {
    setStatus('loading');
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    overlayRef.current?.focus();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [handleKeyDown, url]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== origin || !isConverterEmbedExitMessage(event.data)) {
        return;
      }

      onExit();
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onExit, origin]);

  useEffect(() => {
    if (status !== 'ready') {
      return;
    }

    iframeRef.current?.contentWindow?.postMessage(createConverterEmbedThemeMessage(theme), origin);
  }, [origin, status, theme]);

  const onOverlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isEmbedExitShortcut(event.nativeEvent)) {
      return;
    }

    event.preventDefault();
    onExit();
  };

  return (
    <div
      ref={overlayRef}
      className={`converter-overlay converter-overlay--${theme}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onOverlayKeyDown}
    >
      <iframe
        ref={iframeRef}
        key={url}
        className={status === 'ready' ? 'is-ready' : 'is-pending'}
        title={label}
        src={url}
        allow="clipboard-write"
        referrerPolicy="origin"
        onLoad={() => {
          setStatus('ready');
          iframeRef.current?.contentWindow?.focus();
        }}
        onError={() => setStatus('error')}
      />
      {status === 'ready' ? (
        <p className="visually-hidden">{hint}</p>
      ) : (
        <div className="converter-overlay__status" role={status === 'error' ? 'alert' : 'status'}>
          <p className="m-0">{status === 'error' ? errorLabel : loadingLabel}</p>
          <button type="button" className="converter-overlay__close" onClick={onExit}>
            {hint}
          </button>
        </div>
      )}
    </div>
  );
}
