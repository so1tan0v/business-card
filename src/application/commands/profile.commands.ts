import { assembleExperience } from '../services/experience-formatter';
import { formatProfileCard } from '../services/profile-formatter';
import type { CommandHandler } from './command-handler';

export const profileHandlers: readonly CommandHandler[] = [
  {
    name: 'ls',
    execute(_args, ctx) {
      ctx.presenter.appendLine(ctx.profile.lsFiles.map(file => `${file.name}  - ${file.description}`).join('<br>'));
    }
  },
  {
    name: 'cat',
    execute(args, ctx) {
      const file = args[0];
      if (!file) {
        ctx.presenter.appendLine('usage: cat <filename>');
        return;
      }

      if (file === 'resume.txt') {
        ctx.presenter.appendLine(ctx.profile.resumeTxt.replace(/\n/g, '<br>'));
        return;
      }

      if (file === 'contact.txt') {
        ctx.presenter.appendLine(
          Object.entries(ctx.profile.links)
            .map(([key, value]) => `${key}: ${value.txt}`)
            .join('<br>')
        );
        return;
      }

      const match = ctx.profile.lsFiles.find(item => item.name === file);
      if (match) {
        ctx.presenter.appendLine(
          `Run command: <span class="link" data-cmd="${match.cmd}" role="button" tabindex="0">${match.cmd}</span> for content.`
        );
        return;
      }

      ctx.presenter.appendLine(`cat: ${file}: No such file`);
    }
  },
  {
    name: 'contact',
    execute(_args, ctx) {
      ctx.presenter.appendLine(
        Object.entries(ctx.profile.links)
          .map(([key, value]) => `<span style="color:#3daac4">${key}</span>: ${value.txt}`)
          .join('<br>')
      );
    }
  },
  {
    name: 'aboutfetch',
    aliases: ['me'],
    execute(_args, ctx) {
      ctx.presenter.appendLine(formatProfileCard(ctx.profile.informationAboutMe, ctx.profile.links, ctx.asciiImage));
      ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'about.moreHelp'));
      ctx.presenter.appendLine(ctx.translator.t(ctx.settings.lang, 'about.askExperience'));
    }
  },
  {
    name: 'experience',
    async execute(_args, ctx) {
      const cards = assembleExperience(ctx.profile.experience, ctx.settings.lang);
      if (!cards.length) {
        ctx.presenter.appendLine('experience: no records');
        return;
      }

      for (const card of cards) {
        ctx.presenter.appendLine(card);
        await ctx.clock.sleep(1000);
      }
    }
  },
  {
    name: 'resume',
    aliases: ['cv'],
    execute(_args, ctx) {
      ctx.environment.openUrl('/cv.pdf');
      ctx.presenter.appendLine('Opening print dialog. Use "Save as PDF" to export resume.');
    }
  }
];
