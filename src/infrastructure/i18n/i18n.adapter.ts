import type { Lang } from '../../domain/entities';
import type { I18nKey, I18nParams } from '../../domain/i18n';
import type { TranslatorPort } from '../../domain/ports';
import { messages } from './messages';

export class I18nAdapter implements TranslatorPort {
  t(lang: Lang, key: I18nKey, params?: I18nParams): string {
    const dict = messages[lang] ?? messages.en;
    const template = dict[key];
    if (!template) {
      return '';
    }

    return template(params);
  }
}
