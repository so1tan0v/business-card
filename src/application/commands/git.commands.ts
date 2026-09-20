import type { CommandHandler } from './command-handler';

export const gitHandler: CommandHandler = {
  name: 'git',
  execute(args, ctx) {
    const sub = args[0] ?? '';

    switch (sub) {
      case '':
      case '-h':
      case '--help':
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'git.help.usage'));
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'git.help.projects'));
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'git.help.link'));
        break;
      case 'projects':
        ctx.presenter.appendLine(
          ctx.translator.t(ctx.settings.lang, 'git.projects.header', { link: ctx.profile.gitHub.link })
        );
        ctx.presenter.appendLine(`
          <div>
            ${ctx.profile.gitHub.projects
              .map(
                (project, key) =>
                  `${key + 1}. <a href="${project.link}" target="_blank" rel="noreferrer noopener"> ${project.name}</a>`
              )
              .join('<br>')}
          </div>
        `);
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'git.help.note'));
        break;
      case 'link':
        ctx.presenter.appendLine(
          `<a href="${ctx.profile.gitHub.link}" target="_blank" rel="noreferrer noopener">so1tan0v</a>`
        );
        break;
      default:
        ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'git.error.unknown', { sub }));
    }
  }
};
