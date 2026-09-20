import { isLang, isTheme, isTypingSpeed } from '../../domain/entities';
import type { CommandHandler } from './command-handler';

export const settingsHandlers: readonly CommandHandler[] = [
  {
    name: 'theme',
    execute(args, ctx) {
      const value = args[0]?.toLowerCase();
      if (isTheme(value)) {
        ctx.applySettings({ theme: value });
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'theme.set', { value }));
        return;
      }

      ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'theme.usage', { current: ctx.settings.theme }));
    }
  },
  {
    name: 'speed',
    execute(args, ctx) {
      const value = args[0]?.toLowerCase();
      if (isTypingSpeed(value)) {
        ctx.applySettings({ typingSpeed: value });
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'speed.set', { value }));
        return;
      }

      ctx.presenter.appendLine(
        ctx.translator.t(ctx.settings.lang, 'speed.usage', { current: ctx.settings.typingSpeed })
      );
    }
  },
  {
    name: 'sound',
    execute(args, ctx) {
      const value = args[0]?.toLowerCase();
      if (value === 'on' || value === 'off') {
        ctx.applySettings({ soundOn: value === 'on' });
        ctx.presenter.appendLine(
          value === 'on'
            ? ctx.translator.t(ctx.settings.lang, 'sound.setOn')
            : ctx.translator.t(ctx.settings.lang, 'sound.setOff')
        );
        return;
      }

      ctx.presenter.appendLine(
        ctx.translator.t(ctx.settings.lang, 'sound.usage', { current: ctx.settings.soundOn ? 'on' : 'off' })
      );
    }
  },
  {
    name: 'changelang',
    execute(args, ctx) {
      const sub = args[0] ?? '';
      switch (sub) {
        case '':
        case '-h':
        case '--help':
          ctx.presenter.appendLine(
            `use: changelang [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [arg]`
          );
          ctx.presenter.appendLine(
            `Set Russian language<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="changelang ru" role="button" tabindex="0">ru</span>`
          );
          ctx.presenter.appendLine(
            `Set English language<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="changelang en" role="button" tabindex="0">en</span>`
          );
          break;
        default:
          if (isLang(sub)) {
            ctx.applySettings({ lang: sub });
            break;
          }
          ctx.presenter.appendLine(`changelang: «${sub}» is not a changelang command. See 'changelang --help'.`);
      }
    }
  }
];
