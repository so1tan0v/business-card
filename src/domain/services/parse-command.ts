import type { ParsedCommand } from '../entities';

export function parseCommand(raw: string): ParsedCommand | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const [name, ...args] = trimmed.split(' ');
  if (!name) {
    return null;
  }

  return {
    name: name.toLowerCase(),
    args,
    raw: trimmed
  };
}
