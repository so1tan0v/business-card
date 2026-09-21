import { appsHandlers } from './apps.commands';
import type { CommandRegistry } from './command-registry';
import { funHandlers } from './fun.commands';
import { gitHandler } from './git.commands';
import { networkHandler } from './network.commands';
import { profileHandlers } from './profile.commands';
import { settingsHandlers } from './settings.commands';
import { systemHandlers } from './system.commands';

export function registerCommands(registry: CommandRegistry): void {
  const handlers = [
    ...systemHandlers,
    ...settingsHandlers,
    ...profileHandlers,
    ...funHandlers,
    ...appsHandlers,
    gitHandler,
    networkHandler
  ];

  handlers.forEach(handler => {
    registry.register(handler);
  });
}
