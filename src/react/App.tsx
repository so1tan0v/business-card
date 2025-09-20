import { useEffect, useRef, useState } from 'react';
import { asciiImage } from '../static/ascii.image';
import { getAllInformationAboutMe, sleep } from '../ts/app.helper';
import { config } from '../ts/appConfig';

const LAST_VISIT_DATE = 'LAST_VISIT_DATE';

export function App() {
  const [lang, setLang] = useState<string | null>(() => new URL(window.location.href).searchParams.get('lang'));
  const [input, setInput] = useState<string>('');
  const [lines, setLines] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const historyRef = useRef<string[]>([]);
  const histPosRef = useRef<number>(0);

  const username = config.username;
  const nonAlphabeticKeys: number[] = [...config.nonAlphabeticKeys] as number[];
  const terminalCommands: string[] = [...config.terminalCommands] as string[];

  useEffect(() => {
    const url = new URL(window.location.href);
    if (lang) {
      url.searchParams.set('lang', lang);
    } else {
      url.searchParams.delete('lang');
    }

    window.history.pushState(null, '', url.toString());
    document.documentElement.lang = lang ?? 'en';
  }, [lang]);

  useEffect(() => {
    const last = localStorage.getItem(LAST_VISIT_DATE) ?? 'Never';

    appendLine(firstMessage(last));

    const date = new Date();
    const formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString().slice(0, 8);

    localStorage.setItem(LAST_VISIT_DATE, `${formattedDate} on ttys010`);
    handleEnter('aboutfetch');
  }, []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) {
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        return;
      }

      const value = nonAlphabeticKeys.includes(e.keyCode) ? '' : (e as any).key;
      inputRef.current?.focus();

      setInput(value);
    };
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keyup', onKeyUp)
    };
  }, [nonAlphabeticKeys]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, []);

  function appendLine(html: string) {
    setLines(prev => [...prev, html]);
    requestAnimationFrame(() => {
      const el = document.querySelector('#terminal-output p:last-child') as HTMLElement | null;
      el?.scrollIntoView();
    });
  }

  function escapeHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function echoCommand(cmd: string) {
    appendLine(`
        <span class="m-0 d-flex">
          <span class="prompt">[${username}] # </span>
          <span>${escapeHtml(cmd)}</span>
        </span>
      `);
  }

  function firstMessage(lastVisit: string) {
    return `
      Last login: ${lastVisit}<br>
      Welcome to so1tan0v, the friendly interactive personal business card<br>
      Type <span class="link" data-cmd="help">help</span> for instructions on how to use my business card
    `;
  }

  async function handleEnter(forceValue?: string) {
    const raw = (forceValue ?? input).trim();
    if (!raw) {
      return;
    }

    echoCommand(raw);
    setInput('');

    if(!historyRef.current.includes(raw)) {
      historyRef.current.push(raw);
      histPosRef.current = historyRef.current.length;
    }

    const [cmd, ...args] = raw.split(' ');

    await execCMD(cmd.toLowerCase(), args);
  }

  function typeAndExecute(command: string) {
    if (!inputRef.current) {
      return;
    }

    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    inputRef.current.disabled = true;
    setInput('');
    inputRef.current.focus();

    const chars = command.split('');
    const step = (i: number) => {
      if (i >= chars.length) {
        if (inputRef.current) {
          inputRef.current.disabled = false;
        }

        handleEnter(command);

        return;
      }
      setInput(prev => prev + chars[i]);
      typingTimerRef.current = window.setTimeout(() => step(i + 1), config.defaultTextPrintTime);
    };
    step(0);
  }

  function showCommandSuggestions(matches: string[]) {
    appendLine(`
      <div class="ls-files row">
        ${matches
          .map(
            (item: string) => `
              <div class="col-md-2">
                <span class="link" data-cmd="${item}">${item}</span>
              </div>
            `
          )
          .join('<br>')}
      </div>
    `);
  }

  async function execCMD(cmd: string, args: string[]) {
    switch (cmd) {
      case 'clear':
        setLines([]);
        return;
      case 'date':
        appendLine(String(new Date()));
        break;
      case 'echo':
        appendLine(args.join(' '));
        break;
      case 'help':
        appendLine(
          'This is a page about Alexander Soltanov.<br>In this terminal you can find out about me and my projects.'
        );
        appendLine('Write a command or click on it!');
        appendLine(`
          <div class="ls-files row">
            ${terminalCommands
              .map(
                (item: string) => `
                <div class="col-md-2">
                  <span class="link" data-cmd="${item}">${item}</span>
                </div>
              `
              )
              .join('<br>')}
          </div>
        `);
        break;
      case 'uname':
        appendLine(navigator.appVersion ?? '');
        break;
      case 'aboutfetch':
      case 'me':
        appendLine(getAllInformationAboutMe(config.informationAboutMe as any, config.links as any, asciiImage));
        appendLine(
          `<div>${new Date()}<br>Enter or click "<span class="link" data-cmd="help">help</span>" for more information.</div>`
        );
        appendLine(
          `<div>Do you want to see my experience? Enter or click "<span class="link" data-cmd="experience">experience</span>" for more information</div>`
        );
        break;
      case 'experience':
        if (typeof config.experience === 'string') appendLine(config.experience as unknown as string);
        else
          for (const item of (config.experience as unknown as string[])) {
            appendLine(item);
            await sleep(1000);
          }
        break;
      case 'git':
        await execGit(args);
        break;
      case 'changelang':
        await execChangeLang(args);
        break;
      default:
        if (cmd) appendLine(`${cmd}: command not found`);
    }
  }

  async function execGit(args: string[]) {
    const sub = args[0] ?? '';
    switch (sub) {
      case '':
      case '-h':
      case '--help':
        appendLine(`use: git [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [args]`);
        appendLine(
          `information about my projects<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git projects">projects</span>`
        );
        appendLine(
          `link to my GitHub<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="git link">link</span>`
        );
        break;
      case 'projects':
        appendLine(`You can watch my <a href="${config.gitHub.link}" target="_blank">GitHub</a>!`);
        appendLine(`
          <div>
            ${[...config.gitHub.projects]
              .map((project, key) => `${key + 1}. <a href="${project.link}" target="_blank"> ${project.name}</a>`)
              .join('<br>')}
          </div>
        `);
        appendLine('I have few projects, soon there will be many projects!');
        break;
      case 'link':
        appendLine(`<a href="${config.gitHub.link}" target="_blank">so1tan0v</a>`);
        break;
      default:
        appendLine(`git: «${sub}» is not a git command. See 'git --help'.`);
    }
  }

  async function execChangeLang(args: string[]) {
    const sub = args[0] ?? '';
    switch (sub) {
      case '':
      case '-h':
      case '--help':
        appendLine(`use: changelang [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [arg]`);
        appendLine(
          `Set Russian language<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="changelang ru">ru</span>`
        );
        appendLine(
          `Set English language<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="link" data-cmd="changelang en">en</span>`
        );
        break;
      case 'ru':
      case 'en':
        setLang(sub);
        break;
      default:
        appendLine(`changelang: «${sub}» is not a changelang command. See 'changelang --help'.`);
    }
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cmd = target.closest('[data-cmd]')?.getAttribute('data-cmd');
      if (cmd) {
        e.preventDefault();
        typeAndExecute(cmd);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="model">
      <div className="mac-window">
        <div className="mac-titlebar">
          <div className="traffic-lights">
            <span className="light red" />
            <span className="light yellow" />
            <span className="light green" />
          </div>
          <div className="mac-title">{username}:~</div>
        </div>
        <div className="mac-content">
          <div id="terminal-output">
            {lines.map((html, idx) => (
              <p className="m-0" key={idx} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
          <div id="input-line" className="input-line">
            <div className="prompt">[{username}] # </div>
            <div>
              <input
                id="terminal-input"
                ref={inputRef}
                className="cmdline"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const trimmed = input.trim();
                    if (trimmed) {
                      handleEnter(trimmed);
                    } else {
                      echoCommand('');
                    }
                    return;
                  }
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const trimmed = input.trim();
                    if (!trimmed) {
                      return;
                    }

                    const matches = terminalCommands.filter(cmd => cmd.indexOf(trimmed) === 0);
                    if (!matches.length) {
                      return;
                    }

                    if (matches.length === 1) {
                      setInput(matches[0]);

                      return;
                    }

                    showCommandSuggestions(matches);

                    return;
                  }

                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (!historyRef.current.length) {
                      return;
                    }

                    if (histPosRef.current === undefined) {
                      histPosRef.current = historyRef.current.length;
                    }

                    histPosRef.current = Math.max(0, (histPosRef.current ?? historyRef.current.length) - 1);
                    setInput(historyRef.current[histPosRef.current] ?? '');

                    return;
                  }

                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (!historyRef.current.length) {
                      return;
                    }

                    histPosRef.current = Math.min(
                      historyRef.current.length,
                      (histPosRef.current ?? historyRef.current.length) + 1
                    );

                    const val =
                      histPosRef.current === historyRef.current.length
                        ? ''
                        : (historyRef.current[histPosRef.current] ?? '');

                    setInput(val);

                    return;
                  }
                }}
                autoFocus
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
