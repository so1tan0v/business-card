import Typed from 'typed.js';

export function getWorkExperience(date: string) {
  const currentDate = new Date().getTime();
  const secondDate = new Date(date).getTime();
  const secDiff = Math.abs(currentDate - secondDate);
  const years = Math.floor(secDiff / (1000 * 60 * 60 * 24 * 30 * 12));
  const months = Math.floor((secDiff / (1000 * 60 * 60 * 24 * 30)) % 12);
  const days = Math.floor((secDiff / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((secDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((secDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((secDiff / 1000) % 60);

  return { years, months, days, hours, minutes, seconds };
}

export function getAllInformationAboutMe(
  infoObject: Record<string, any>,
  links: Record<string, any> | undefined,
  asciiImage?: string
) {
  let html: string;
  let info = parseInformationAboutMe(infoObject);

  if (links) {
    info += '<br>';
    for (let linkCategory in links) {
      const linkCategoryData = links[linkCategory];
      const title = `
        <span ${linkCategoryData.title_color ? `style="color: ${linkCategoryData.title_color}"` : ``}
        >${linkCategory}</span>:
      `;
      const txt = `
        <span ${linkCategoryData?.txt_color ? `style="color: ${linkCategoryData.txt_color}"` : ``}
        >${linkCategoryData.txt}</span><br>
      `;
      info += title + txt;
    }
  }

  if (asciiImage) {
    html = `
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-xl-5 align-items-sm-center justify-content-center" style="display: inherit;">
            ${asciiImage}
          </div>
          <div class="col-md-12 col-xl-7 p-0 pt-2 m-0">
            ${info}
          </div>
        </div>
      </div>
    `;
  } else {
    html = info;
  }
  return html;
}

export function parseInformationAboutMe(infoObject: Record<string, any>, layer = 0): string {
  let html = '';
  for (let category in infoObject) {
    const categoryData = infoObject[category];
    let lineEdge = '';
    if (layer) for (let i = 0; i < layer; i++) lineEdge += `&nbsp;&nbsp;`;

    const title = !(categoryData?.show_title === false)
      ? `
        <span ${categoryData.title_color ? `style="color: ${categoryData.title_color}"` : ``}
        >${category}</span>: ${categoryData?.leaves ? `<br>` : ``}
      `
      : ``;

    const txt = categoryData?.leaves
      ? parseInformationAboutMe(categoryData?.leaves, layer + 1)
      : `
        <span ${categoryData.txt_color ? `style="color: ${categoryData.txt_color}"` : ``}
        >${categoryData.txt}</span><br>
      `;

    html += lineEdge + title + txt;
  }
  return html;
}

export async function asyncTyped(DOMselector: string, message: string | string[], typedParams?: any) {
  return new Promise(resolve => {
    const strings = typeof message === 'string' ? [message] : message;
    const options: any = {
      showCursor: false,
      ...(typedParams || {}),
      strings,
      onComplete: () => resolve(true)
    };
    new Typed(DOMselector, options);
  });
}

export async function sleep(time: number) {
  return new Promise(resolve => setTimeout(() => resolve(true), time));
}
