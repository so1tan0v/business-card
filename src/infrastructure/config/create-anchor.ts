import { toAnchor } from '../../domain/services/html';

export function createAnchor(titleName: string, url: string, classNames: string[] = [''], target = '_blank'): string {
  return toAnchor(titleName, url, classNames, target);
}
