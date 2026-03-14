export type Lang = 'en' | 'ru';

export type I18nKey =
  | 'welcome'
  | 'help.intro'
  | 'help.prompt'
  | 'about.moreHelp'
  | 'about.askExperience'
  | 'theme.set'
  | 'theme.usage'
  | 'speed.set'
  | 'speed.usage'
  | 'sound.setOn'
  | 'sound.setOff'
  | 'sound.usage'
  | 'git.help.usage'
  | 'git.help.projects'
  | 'git.help.link'
  | 'git.projects.header'
  | 'git.help.note'
  | 'git.error.unknown'
  | 'theme-dark'
  | 'theme-light';

type TemplateFn = (params?: Record<string, string | number>) => string;

type Dictionary = Record<Lang, Record<I18nKey, TemplateFn>>;

const messages: Dictionary = {
  en: {
    welcome: params =>
      `Last login: ${params?.lastVisit ?? ''}<br>Welcome to Alexander Soltanov's interactive personal business card<br>Type <span class="link" data-cmd="help">help</span> for instructions on how to use my business card<br><br>`,
    'help.intro': () =>
      'This is a page about Alexander Soltanov — Backend Developer.<br>In this terminal you can find out about me and my projects.',
    'help.prompt': () => 'Write a command or click on it!',
    'about.moreHelp': () =>
      `<div>${new Date()}<br>Enter or click "<span class="link" data-cmd="help">help</span>" for more information.</div><br>`,
    'about.askExperience': () =>
      `<div>Do you want to see my experience? Enter or click "<span class="link" data-cmd="experience">experience</span>" for more information</div>`,
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
      `information about my projects<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git projects">projects</span>`,
    'git.help.link': () =>
      `link to my GitHub<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git link">link</span>`,
    'git.projects.header': params => `You can watch my <a href="${params?.link ?? '#'}" target="_blank">GitHub</a>!`,
    'git.help.note': () => 'I have few projects, soon there will be many projects!',
    'git.error.unknown': params => `git: «${params?.sub ?? ''}» is not a git command. See 'git --help'.`,
    'theme-dark': () => 'Dark',
    'theme-light': () => 'Light'
  },
  ru: {
    welcome: params =>
      `Последний вход: ${params?.lastVisit ?? ''}<br>Добро пожаловать на интерактивную визитку Александра Солтанова<br>Наберите <span class="link" data-cmd="help">help</span>, чтобы увидеть, как пользоваться визиткой<br><br>`,
    'help.intro': () =>
      'Это страница о Александре Солтанове — Backend Developer.<br>В этом терминале вы можете узнать обо мне и моих проектах.',
    'help.prompt': () => 'Введите команду или нажмите на неё!',
    'theme.set': params => `Тема переключена на ${params?.value === 'dark' ? 'тёмную' : 'светлую'}.`,
    'theme.usage': params => `использование: theme [dark|light]<br>Текущая: ${params?.current ?? ''}`,
    'speed.set': params => `Скорость печати установлена на ${params?.value ?? ''}.`,
    'speed.usage': params => `использование: speed [slow|normal|fast]<br>Текущая: ${params?.current ?? ''}`,
    'sound.setOn': () => 'Звук включён.',
    'sound.setOff': () => 'Звук выключен.',
    'sound.usage': params => `использование: sound [on|off]<br>Текущее: ${params?.current ?? ''}`,
    'about.moreHelp': () =>
      `<div>${new Date()}<br>Нажмите или введите "<span class="link" data-cmd="help">help</span>" для дополнительной информации.</div><br>`,
    'about.askExperience': () =>
      `<div>Хотите посмотреть опыт работы? Нажмите или введите "<span class="link" data-cmd="experience">experience</span>"</div>`,
    'git.help.usage': () =>
      `использование: git [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [args]`,
    'git.help.projects': () =>
      `информация о моих проектах<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git projects">projects</span>`,
    'git.help.link': () =>
      `ссылка на мой GitHub<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git link">link</span>`,
    'git.projects.header': params => `Загляните на мой <a href="${params?.link ?? '#'}" target="_blank">GitHub</a>!`,
    'git.help.note': () => 'Пока что проектов немного, скоро их будет больше!',
    'git.error.unknown': params => `git: «${params?.sub ?? ''}» не является git-командой. См. 'git --help'.`,
    'theme-dark': () => 'Тёмная',
    'theme-light': () => 'Светлая'
  }
};

export function t(lang: Lang, key: I18nKey, params?: Record<string, string | number>): string {
  const dict = messages[lang] ?? messages.en;
  const template = dict[key];
  if (!template) {
    return '';
  }
  return template(params);
}
