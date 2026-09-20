export function cowsayBubble(message: string): string {
  const lines = message.split('\n');
  const maxLen = Math.max(...lines.map(line => line.length), 1);
  const top = ' ' + '_'.repeat(maxLen + 2);
  const bottom = ' ' + '-'.repeat(maxLen + 2);
  const body = lines.map(line => '| ' + line + ' '.repeat(Math.max(0, maxLen - line.length)) + ' |').join('\n');

  return `${top}\n${body}\n${bottom}`;
}
