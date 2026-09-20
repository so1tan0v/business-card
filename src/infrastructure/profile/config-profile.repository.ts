import type { Profile, Theme, TypingSpeed } from '../../domain/entities';
import type { ProfileRepository } from '../../domain/ports';
import { asciiImage } from '../../static/ascii.image';
import { config } from '../config/app.config';

export class ConfigProfileRepository implements ProfileRepository {
  getProfile(): Profile {
    return {
      username: config.username,
      hostname: config.hostname,
      whoami: config.whoami,
      informationAboutMe: config.informationAboutMe,
      links: config.links,
      experience: config.experience,
      gitHub: config.gitHub,
      lsFiles: config.lsFiles,
      resumeTxt: config.resumeTxt,
      fortune: config.fortune,
      neofetch: config.neofetch,
      cowsayTemplate: config.cowsayTemplate,
      easterEggs: config.easterEggs
    };
  }

  getCommands(): readonly string[] {
    return config.terminalCommands;
  }

  getSpeedPresets(): Readonly<Record<TypingSpeed, number>> {
    return config.speedPresets;
  }

  getDefaultTextPrintTime(): number {
    return config.defaultTextPrintTime;
  }

  getDefaultTheme(): Theme {
    return config.defaultTheme;
  }

  getNonAlphabeticKeyCodes(): readonly number[] {
    return config.nonAlphabeticKeys;
  }

  getAsciiImage(): string {
    return asciiImage;
  }
}
