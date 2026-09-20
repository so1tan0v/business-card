import { STORAGE_KEYS, type Lang } from '../../domain/entities';
import type { ClockPort, EnvironmentPort, ProfileRepository, StoragePort, TranslatorPort } from '../../domain/ports';

export interface BootstrapSessionResult {
  readonly welcomeLine: string;
  readonly initialCommand: string;
}

export class BootstrapSessionUseCase {
  constructor(
    private readonly storage: StoragePort,
    private readonly clock: ClockPort,
    private readonly environment: EnvironmentPort,
    private readonly translator: TranslatorPort,
    private readonly profileRepository: ProfileRepository
  ) {}

  execute(lang: Lang): BootstrapSessionResult {
    const lastVisit = this.storage.get(STORAGE_KEYS.lastVisit) ?? 'Never';
    const welcomeLine = this.translator.t(lang, 'welcome', { lastVisit });

    const date = this.clock.now();
    const formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString().slice(0, 8);
    this.storage.set(STORAGE_KEYS.lastVisit, `${formattedDate} on ttys010`);

    const hash = this.environment.getHashCommand();
    const commands = this.profileRepository.getCommands();
    const initialCommand = hash && commands.includes(hash) ? hash : 'aboutfetch';

    return { welcomeLine, initialCommand };
  }
}
