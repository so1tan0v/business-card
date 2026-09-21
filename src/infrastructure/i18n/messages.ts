import type { Lang } from '../../domain/entities';
import type { I18nKey, I18nParams } from '../../domain/i18n';

type TemplateFn = (params?: I18nParams) => string;
type Dictionary = Record<Lang, Record<I18nKey, TemplateFn>>;

export const messages: Dictionary = {
  en: {
    welcome: params =>
      `Last login: ${params?.lastVisit ?? ''}<br>Welcome to Alexander Soltanov's interactive personal business card<br>Type <span class="link" data-cmd="help" role="button" tabindex="0">help</span> for instructions on how to use my business card<br><br>`,
    'help.intro': () =>
      'This is a page about Alexander Soltanov - Backend Developer.<br>In this terminal you can find out about me and my projects.',
    'help.prompt': () => 'Write a command or click on it!',
    'about.moreHelp': () =>
      `<div>${new Date()}<br>Enter or click "<span class="link" data-cmd="help" role="button" tabindex="0">help</span>" for more information.</div><br>`,
    'about.askExperience': () =>
      `<div>Do you want to see my experience? Enter or click "<span class="link" data-cmd="experience" role="button" tabindex="0">experience</span>" for more information</div>`,
    'theme.set': params => `Theme set to ${params?.value ?? ''}.`,
    'theme.usage': params => `usage: theme [dark|light]<br>Current: ${params?.current ?? ''}`,
    'speed.set': params => `Typing speed set to ${params?.value ?? ''}.`,
    'speed.usage': params => `usage: speed [slow|normal|fast]<br>Current: ${params?.current ?? ''}`,
    'sound.setOn': () => 'Sound on.',
    'sound.setOff': () => 'Sound off.',
    'sound.usage': params => `usage: sound [on|off]<br>Current: ${params?.current ?? ''}`,
    'git.help.usage': () =>
      `use: git [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [args]`,
    'git.help.projects': () =>
      `information about my projects<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git projects" role="button" tabindex="0">projects</span>`,
    'git.help.link': () =>
      `link to my GitHub<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git link" role="button" tabindex="0">link</span>`,
    'git.projects.header': params =>
      `You can watch my <a href="${params?.link ?? '#'}" target="_blank" rel="noreferrer noopener">GitHub</a>!`,
    'git.help.note': () => 'I have few projects, soon there will be many projects!',
    'git.error.unknown': params => `git: «${params?.sub ?? ''}» is not a git command. See 'git --help'.`,
    'theme-dark': () => 'Dark',
    'theme-light': () => 'Light',
    'a11y.switchTheme': params => `Theme: ${params?.current ?? ''}. Switch to ${params?.next ?? ''}`,
    'a11y.switchLang': params => `Language: ${params?.current ?? ''}. Switch language`,
    'a11y.terminalInput': () =>
      'Terminal command input. Type a command and press Enter. Use Tab for completion, Arrow Up/Down for history.',
    'a11y.terminalEmpty': () => 'Terminal is empty. Type help to get started.',
    'a11y.skipToInput': () => 'Skip to command input',
    'error.generic': () => 'Something went wrong. Reload the page or type help.',
    'converter.launching': () => 'Launching converter. Press Ctrl+C or Command+C to return.',
    'converter.error': () => 'converter: invalid URL in config',
    'a11y.converterLabel': () => 'Formatter and converter',
    'a11y.converterHint': () => 'Press Ctrl+C or Command+C to exit',
    'a11y.converterLoading': () => 'Starting converter...',
    'a11y.converterLoadError': () => 'Converter failed to load. Press Ctrl+C or Command+C to return.'
  },
  ru: {
    welcome: params =>
      `Последний вход: ${params?.lastVisit ?? ''}<br>Добро пожаловать на интерактивную визитку Александра Солтанова<br>Наберите <span class="link" data-cmd="help" role="button" tabindex="0">help</span>, чтобы увидеть, как пользоваться визиткой<br><br>`,
    'help.intro': () =>
      'Это страница о Александре Солтанове - Backend Developer.<br>В этом терминале вы можете узнать обо мне и моих проектах.',
    'help.prompt': () => 'Введите команду или нажмите на неё!',
    'theme.set': params => `Тема переключена на ${params?.value === 'dark' ? 'тёмную' : 'светлую'}.`,
    'theme.usage': params => `использование: theme [dark|light]<br>Текущая: ${params?.current ?? ''}`,
    'speed.set': params => `Скорость печати установлена на ${params?.value ?? ''}.`,
    'speed.usage': params => `использование: speed [slow|normal|fast]<br>Текущая: ${params?.current ?? ''}`,
    'sound.setOn': () => 'Звук включён.',
    'sound.setOff': () => 'Звук выключен.',
    'sound.usage': params => `использование: sound [on|off]<br>Текущее: ${params?.current ?? ''}`,
    'about.moreHelp': () =>
      `<div>${new Date()}<br>Нажмите или введите "<span class="link" data-cmd="help" role="button" tabindex="0">help</span>" для дополнительной информации.</div><br>`,
    'about.askExperience': () =>
      `<div>Хотите посмотреть опыт работы? Нажмите или введите "<span class="link" data-cmd="experience" role="button" tabindex="0">experience</span>"</div>`,
    'git.help.usage': () =>
      `использование: git [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [args]`,
    'git.help.projects': () =>
      `информация о моих проектах<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git projects" role="button" tabindex="0">projects</span>`,
    'git.help.link': () =>
      `ссылка на мой GitHub<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git link" role="button" tabindex="0">link</span>`,
    'git.projects.header': params =>
      `Загляните на мой <a href="${params?.link ?? '#'}" target="_blank" rel="noreferrer noopener">GitHub</a>!`,
    'git.help.note': () => 'Пока что проектов немного, скоро их будет больше!',
    'git.error.unknown': params => `git: «${params?.sub ?? ''}» не является git-командой. См. 'git --help'.`,
    'theme-dark': () => 'Тёмная',
    'theme-light': () => 'Светлая',
    'a11y.switchTheme': params => `Тема: ${params?.current ?? ''}. Переключить на ${params?.next ?? ''}`,
    'a11y.switchLang': params => `Язык: ${params?.current ?? ''}. Сменить язык`,
    'a11y.terminalInput': () =>
      'Поле ввода команды. Введите команду и нажмите Enter. Tab - автодополнение, стрелки вверх/вниз - история.',
    'a11y.terminalEmpty': () => 'Терминал пуст. Введите help, чтобы начать.',
    'a11y.skipToInput': () => 'Перейти к полю ввода команды',
    'error.generic': () => 'Что-то пошло не так. Перезагрузите страницу или введите help.',
    'converter.launching': () => 'Запускаю конвертер. Нажмите Ctrl+C или Command+C, чтобы вернуться.',
    'converter.error': () => 'converter: некорректный URL в конфиге',
    'a11y.converterLabel': () => 'Форматтер и конвертер',
    'a11y.converterHint': () => 'Нажмите Ctrl+C или Command+C, чтобы выйти',
    'a11y.converterLoading': () => 'Запускаю конвертер...',
    'a11y.converterLoadError': () => 'Не удалось загрузить конвертер. Нажмите Ctrl+C или Command+C, чтобы вернуться.'
  }
};
