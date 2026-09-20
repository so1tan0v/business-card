import { CommandRegistry } from '../../application/commands/command-registry';
import { registerCommands } from '../../application/commands/register-commands';
import { BootstrapSessionUseCase } from '../../application/use-cases/bootstrap-session.use-case';
import { ExecuteCommandUseCase } from '../../application/use-cases/execute-command.use-case';
import { LoadSettingsUseCase, SaveSettingsUseCase } from '../../application/use-cases/settings.use-case';
import type {
  AudioPort,
  ClockPort,
  EnvironmentPort,
  NetworkPort,
  ProfileRepository,
  StoragePort,
  TranslatorPort
} from '../../domain/ports';
import { BrowserClockAdapter } from '../adapters/browser-clock.adapter';
import { BrowserEnvironmentAdapter } from '../adapters/browser-environment.adapter';
import { FetchNetworkAdapter } from '../adapters/fetch-network.adapter';
import { LocalStorageAdapter } from '../adapters/local-storage.adapter';
import { WebAudioAdapter } from '../adapters/web-audio.adapter';
import { I18nAdapter } from '../i18n/i18n.adapter';
import { ConfigProfileRepository } from '../profile/config-profile.repository';

export interface Dependencies {
  readonly executeCommand: ExecuteCommandUseCase;
  readonly bootstrapSession: BootstrapSessionUseCase;
  readonly loadSettings: LoadSettingsUseCase;
  readonly saveSettings: SaveSettingsUseCase;
  readonly profileRepository: ProfileRepository;
  readonly audio: AudioPort;
  readonly environment: EnvironmentPort;
  readonly translator: TranslatorPort;
  readonly storage: StoragePort;
  readonly clock: ClockPort;
  readonly network: NetworkPort;
}

export function createDependencies(): Dependencies {
  const storage = new LocalStorageAdapter();
  const environment = new BrowserEnvironmentAdapter();
  const clock = new BrowserClockAdapter();
  const translator = new I18nAdapter();
  const profileRepository = new ConfigProfileRepository();
  const network = new FetchNetworkAdapter();
  const audio = new WebAudioAdapter();

  const registry = new CommandRegistry();
  registerCommands(registry);

  return {
    executeCommand: new ExecuteCommandUseCase(registry),
    bootstrapSession: new BootstrapSessionUseCase(storage, clock, environment, translator, profileRepository),
    loadSettings: new LoadSettingsUseCase(storage, environment, profileRepository),
    saveSettings: new SaveSettingsUseCase(storage),
    profileRepository,
    audio,
    environment,
    translator,
    storage,
    clock,
    network
  };
}
