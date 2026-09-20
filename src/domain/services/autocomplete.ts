export type AutocompleteResult =
  | { readonly kind: 'empty' }
  | { readonly kind: 'none' }
  | { readonly kind: 'single'; readonly value: string }
  | { readonly kind: 'multiple'; readonly matches: readonly string[] };

export function autocomplete(input: string, commands: readonly string[]): AutocompleteResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { kind: 'empty' };
  }

  const matches = commands.filter(cmd => cmd.indexOf(trimmed) === 0);
  if (!matches.length) {
    return { kind: 'none' };
  }

  const first = matches[0];
  if (matches.length === 1 && first) {
    return { kind: 'single', value: first };
  }

  return { kind: 'multiple', matches };
}
