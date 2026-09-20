import { cowsayBubble } from '../../domain/services/cowsay';
import type { CommandHandler } from './command-handler';

export const funHandlers: readonly CommandHandler[] = [
  {
    name: 'fortune',
    execute(_args, ctx) {
      const fortunes = ctx.profile.fortune[ctx.settings.lang] ?? ctx.profile.fortune.en;
      if (!fortunes.length) {
        ctx.presenter.appendLine('fortune: no fortunes available');
        return;
      }

      const index = Math.floor(Math.random() * fortunes.length);
      ctx.presenter.appendLine(fortunes[index] ?? '');
    }
  },
  {
    name: 'neofetch',
    execute(_args, ctx) {
      const info = ctx.profile.neofetch;
      const uptimeMs = ctx.clock.uptimeMs();
      const uptime = `${Math.floor(uptimeMs / 3600000)}h ${Math.floor((uptimeMs % 3600000) / 60000)}m`;
      const resolution = ctx.environment.getScreenResolution();
      const kernel = ctx.environment.getUserAgent();

      ctx.presenter.appendLine(
        `<pre style="margin:0;color:#7ee">${info.user}@${info.host}<br>` +
          `----------------<br>` +
          `OS: ${info.os}<br>` +
          `Kernel: ${kernel}<br>` +
          `Uptime: ${uptime}<br>` +
          `Resolution: ${resolution}<br>` +
          `Theme: ${info.theme}<br>` +
          `</pre>`
      );
    }
  },
  {
    name: 'cowsay',
    execute(args, ctx) {
      const msg = args.length ? args.join(' ') : 'Hello from the terminal!';
      const bubble = cowsayBubble(msg);
      ctx.presenter.appendLine(
        `<pre style="margin:0;white-space:pre-wrap">${bubble}${ctx.profile.cowsayTemplate}</pre>`
      );
    }
  },
  {
    name: 'ping',
    async execute(args, ctx) {
      const host = args[0] || ctx.profile.hostname;
      ctx.presenter.appendLine(`PING ${host}: 56 data bytes`);

      for (let i = 0; i < 4; i++) {
        await ctx.clock.sleep(400);
        const ms = 10 + Math.floor(Math.random() * 30);
        ctx.presenter.appendLine(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${ms} ms`);
      }

      ctx.presenter.appendLine(`--- ${host} ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss`);
    }
  },
  {
    name: 'ssh',
    execute(_args, ctx) {
      ctx.presenter.appendLine(
        'Connection refused. Try Telegram or email - see <span class="link" data-cmd="me" role="button" tabindex="0">me</span> for contacts.'
      );
    }
  },
  {
    name: 'matrix',
    execute(_args, ctx) {
      ctx.presenter.activateMatrix();
    }
  },
  {
    name: 'easteregg',
    execute(_args, ctx) {
      const eggs = ctx.profile.easterEggs;
      ctx.presenter.appendLine(eggs[Math.floor(Math.random() * eggs.length)] ?? 'Nothing here.');
    }
  }
];
