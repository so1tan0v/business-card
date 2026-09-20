import { isSandwichEasterEgg } from '../../domain/services/html';
import { parseCommand } from '../../domain/services/parse-command';
import type { CommandContext } from '../commands/command-handler';
import type { CommandRegistry } from '../commands/command-registry';

export class ExecuteCommandUseCase {
  constructor(private readonly registry: CommandRegistry) {}

  async execute(raw: string, ctx: CommandContext): Promise<void> {
    const parsed = parseCommand(raw);
    if (!parsed) {
      return;
    }

    const handler = this.registry.resolve(parsed.name);
    if (!handler) {
      if (isSandwichEasterEgg(parsed.raw)) {
        ctx.presenter.appendLine('Make it yourself. (xkcd 149)');
        return;
      }

      ctx.presenter.appendLine(`${parsed.name}: command not found`);
      return;
    }

    try {
      await handler.execute(parsed.args, ctx);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      ctx.presenter.appendLine(`error: ${message}`);
    }
  }
}
