import type { ContactLink, InfoNode } from '../../domain/entities';

export function formatInfoTree(infoObject: Readonly<Record<string, InfoNode>>, layer = 0): string {
  let html = '';

  for (const category of Object.keys(infoObject)) {
    const categoryData = infoObject[category];
    if (!categoryData) {
      continue;
    }

    let lineEdge = '';
    if (layer) {
      for (let i = 0; i < layer; i++) {
        lineEdge += `&nbsp;&nbsp;`;
      }
    }

    const title =
      categoryData.show_title === false
        ? ''
        : `
        <span ${categoryData.title_color ? `style="color: ${categoryData.title_color}"` : ``}
        >${category}</span>: ${categoryData.leaves ? `<br>` : ``}
      `;

    const txt = categoryData.leaves
      ? formatInfoTree(categoryData.leaves, layer + 1)
      : `
        <span ${categoryData.txt_color ? `style="color: ${categoryData.txt_color}"` : ``}
        >${categoryData.txt ?? ''}</span><br>
      `;

    html += lineEdge + title + txt;
  }

  return html;
}

export function formatLinks(links: Readonly<Record<string, ContactLink>>): string {
  let info = '';

  for (const linkCategory of Object.keys(links)) {
    const linkCategoryData = links[linkCategory];
    if (!linkCategoryData) {
      continue;
    }

    const title = `
        <span ${linkCategoryData.title_color ? `style="color: ${linkCategoryData.title_color}"` : ``}
        >${linkCategory}</span>:
      `;
    const txt = `
        <span ${linkCategoryData.txt_color ? `style="color: ${linkCategoryData.txt_color}"` : ``}
        >${linkCategoryData.txt}</span><br>
      `;
    info += title + txt;
  }

  return info;
}

export function formatProfileCard(
  infoObject: Readonly<Record<string, InfoNode>>,
  links: Readonly<Record<string, ContactLink>> | undefined,
  asciiImage?: string
): string {
  let info = formatInfoTree(infoObject);

  if (links) {
    info += '<br>' + formatLinks(links);
  }

  if (!asciiImage) {
    return info;
  }

  return `
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-xl-5 align-items-sm-center justify-content-center ascii-block" style="display: inherit;">
            ${asciiImage}
          </div>
          <div class="col-md-12 col-xl-7 p-0 pt-2 m-0">
            ${info}
          </div>
        </div>
      </div>
    `;
}
