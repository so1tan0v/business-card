import type { Theme } from '../entities';

export const CONVERTER_EMBED_SOURCE = 'so1-converter' as const;

export type ConverterColorScheme = Theme;

export interface ConverterEmbedExitMessage {
  readonly source: typeof CONVERTER_EMBED_SOURCE;
  readonly type: 'exit';
}

export interface ConverterEmbedThemeMessage {
  readonly source: typeof CONVERTER_EMBED_SOURCE;
  readonly type: 'set-theme';
  readonly theme: ConverterColorScheme;
}

export function isConverterEmbedExitMessage(value: unknown): value is ConverterEmbedExitMessage {
  return isEmbedRecord(value) && value.type === 'exit';
}

export function isEmbedExitShortcut(event: {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
}): boolean {
  return event.key.toLowerCase() === 'c' && (event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey;
}

export function createConverterEmbedThemeMessage(theme: ConverterColorScheme): ConverterEmbedThemeMessage {
  return { source: CONVERTER_EMBED_SOURCE, type: 'set-theme', theme };
}

export function normalizeConverterBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim();
  if (!trimmed) {
    throw new Error('converter URL is empty');
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function buildConverterEmbedUrl(baseUrl: string, theme: Theme): string {
  const url = new URL(normalizeConverterBaseUrl(baseUrl));
  url.searchParams.set('embed', '1');
  url.searchParams.set('theme', theme);
  return url.toString();
}

export function converterEmbedOrigin(embedUrl: string): string {
  return new URL(embedUrl).origin;
}

function isEmbedRecord(value: unknown): value is Record<string, unknown> & { source: typeof CONVERTER_EMBED_SOURCE } {
  return (
    typeof value === 'object' && value !== null && (value as { source?: unknown }).source === CONVERTER_EMBED_SOURCE
  );
}
