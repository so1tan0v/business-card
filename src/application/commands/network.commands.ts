import type { CommandHandler } from './command-handler';

export const networkHandler: CommandHandler = {
  name: 'curl',
  async execute(args, ctx) {
    const url = args[0] || ctx.profile.gitHub.link;
    if (!url.includes('github.com')) {
      ctx.presenter.appendLine(`curl: (6) Could not resolve host: ${url}`);
      return;
    }

    ctx.presenter.appendLine('curl: connecting...');

    try {
      const data = await ctx.network.fetchJson(`https://api.github.com/users/${ctx.profile.whoami}`);
      ctx.presenter.appendLine(
        '<pre style="margin:0;overflow:auto;max-height:200px">' + JSON.stringify(data, null, 2) + '</pre>'
      );
    } catch {
      ctx.presenter.appendLine('curl: (6) Could not resolve host');
    }
  }
};
