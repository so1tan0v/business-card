export function toAnchor(titleName: string, url: string, classNames: string[] = [''], target = '_blank'): string {
  return `<a class="${classNames.join(' ')}" href='${url}' target='${target}' rel="noreferrer noopener">${titleName}</a>`;
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderCommandGrid(items: readonly string[]): string {
  return `
      <div class="ls-files row">
        ${items
          .map(
            item => `
              <div class="col-md-2">
                <span class="link" data-cmd="${escapeHtml(item)}" role="button" tabindex="0">${escapeHtml(item)}</span>
              </div>
            `
          )
          .join('<br>')}
      </div>
    `;
}

export function isSandwichEasterEgg(raw: string): boolean {
  const fullCmd = raw.trim().toLowerCase();
  return fullCmd.includes('sudo') && fullCmd.includes('make') && fullCmd.includes('sandwich');
}
