import { buildConverterEmbedUrl } from '../../domain/services/converter-embed';
import type { CommandHandler } from './command-handler';

export const appsHandlers: readonly CommandHandler[] = [
  {
    name: 'converter',
    execute(_args, ctx) {
      try {
        const url = buildConverterEmbedUrl(ctx.profileRepository.getConverterUrl(), ctx.settings.theme);
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'converter.launching'));
        ctx.presenter.activateConverter(url);
      } catch {
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'converter.error'));
      }
    }
  }
];
