import { renderCommandGrid } from '../../domain/services/html';
import type { CommandHandler } from './command-handler';

export const systemHandlers: readonly CommandHandler[] = [
  {
    name: 'clear',
    execute(_args, ctx) {
      ctx.presenter.clear();
    }
  },
  {
    name: 'date',
    execute(_args, ctx) {
      ctx.presenter.appendLine(String(ctx.clock.now()));
    }
  },
  {
    name: 'echo',
    execute(args, ctx) {
      ctx.presenter.appendLine(args.join(' '));
    }
  },
  {
    name: 'help',
    execute(_args, ctx) {
      ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'help.intro'));
      ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'help.prompt'));
      ctx.presenter.appendLine(renderCommandGrid(ctx.commands));
    }
  },
  {
    name: 'uname',
    execute(_args, ctx) {
      ctx.presenter.appendLine(ctx.environment.getAppVersion());
    }
  },
  {
    name: 'whoami',
    execute(_args, ctx) {
      ctx.presenter.appendLine(ctx.profile.whoami);
    }
  },
  {
    name: 'hostname',
    execute(_args, ctx) {
      ctx.presenter.appendLine(ctx.profile.hostname);
    }
  }
];
