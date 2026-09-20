import type { Profile, TerminalSettings } from '../../domain/entities';
import type {
  ClockPort,
  EnvironmentPort,
  NetworkPort,
  ProfileRepository,
  TerminalPresenter,
  TranslatorPort
} from '../../domain/ports';

export interface CommandContext {
  readonly settings: TerminalSettings;
  readonly profile: Profile;
  readonly commands: readonly string[];
  readonly asciiImage: string;
  readonly presenter: TerminalPresenter;
  readonly translator: TranslatorPort;
  readonly clock: ClockPort;
  readonly network: NetworkPort;
  readonly environment: EnvironmentPort;
  readonly profileRepository: ProfileRepository;
  applySettings(patch: Partial<TerminalSettings>): void;
}

export interface CommandHandler {
  readonly name: string;
  readonly aliases?: readonly string[];
  execute(args: readonly string[], ctx: CommandContext): Promise<void> | void;
}
