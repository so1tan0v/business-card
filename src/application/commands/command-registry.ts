import type { CommandHandler } from './command-handler';

export class CommandRegistry {
  private readonly handlers = new Map<string, CommandHandler>();

  register(handler: CommandHandler): void {
    this.handlers.set(handler.name, handler);
    handler.aliases?.forEach(alias => {
      this.handlers.set(alias, handler);
    });
  }

  resolve(name: string): CommandHandler | undefined {
    return this.handlers.get(name);
  }
}
