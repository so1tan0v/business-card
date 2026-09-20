import { isLang, isTheme, isTypingSpeed, STORAGE_KEYS, type TerminalSettings } from '../../domain/entities';
import type { EnvironmentPort, ProfileRepository, StoragePort } from '../../domain/ports';

export class LoadSettingsUseCase {
  constructor(
    private readonly storage: StoragePort,
    private readonly environment: EnvironmentPort,
    private readonly profileRepository: ProfileRepository
  ) {}

  execute(): TerminalSettings {
    const urlLang = this.environment.getLangFromUrl();
    const storedLang = this.storage.get(STORAGE_KEYS.lang);
    const lang = isLang(urlLang) ? urlLang : isLang(storedLang) ? storedLang : 'en';

    const storedTheme = this.storage.get(STORAGE_KEYS.theme);
    const theme = isTheme(storedTheme) ? storedTheme : this.profileRepository.getDefaultTheme();

    const storedSpeed = this.storage.get(STORAGE_KEYS.speed);
    const typingSpeed = isTypingSpeed(storedSpeed) ? storedSpeed : 'normal';

    const soundOn = this.storage.get(STORAGE_KEYS.sound) !== 'false';

    return { lang, theme, typingSpeed, soundOn };
  }
}

export class SaveSettingsUseCase {
  constructor(private readonly storage: StoragePort) {}

  execute(settings: TerminalSettings): void {
    this.storage.set(STORAGE_KEYS.lang, settings.lang);
    this.storage.set(STORAGE_KEYS.theme, settings.theme);
    this.storage.set(STORAGE_KEYS.speed, settings.typingSpeed);
    this.storage.set(STORAGE_KEYS.sound, String(settings.soundOn));
  }
}
