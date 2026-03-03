import { useCallback, useEffect, useRef, useState } from 'react';
import { asciiImage } from '../static/ascii.image';
import { config } from '../ts/app.config';
import { cowsayBubble, getAllInformationAboutMe, sleep } from '../ts/app.helper';
import { t, type Lang } from './i18n';

const LAST_VISIT_DATE = 'LAST_VISIT_DATE';
const STORAGE_THEME = 'terminal_theme';
const STORAGE_SPEED = 'terminal_speed';
const STORAGE_SOUND = 'terminal_sound';
const STORAGE_LANG = 'terminal_lang';

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const urlLang = new URL(window.location.href).searchParams.get('lang');
    if (urlLang === 'ru' || urlLang === 'en') {
      return urlLang;
    }

    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_LANG) : null;
    if (stored === 'ru' || stored === 'en') {
      return stored;
    }

    return 'en';
  });

  const [input, setInput] = useState<string>('');
  const [lines, setLines] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem(STORAGE_THEME) as 'dark' | 'light') || (config.defaultTheme as 'dark' | 'light')
  );
  const [typingSpeed, setTypingSpeed] = useState<'slow' | 'normal' | 'fast'>(
    () => (localStorage.getItem(STORAGE_SPEED) as 'slow' | 'normal' | 'fast') || 'normal'
  );
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem(STORAGE_SOUND) !== 'false');
  const [matrixActive, setMatrixActive] = useState(false);
  const [menuBarTime, setMenuBarTime] = useState(() => new Date());

  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);
  const historyRef = useRef<string[]>([]);
  const histPosRef = useRef<number>(0);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  const username = config.username;
  const nonAlphabeticKeys: number[] = [...config.nonAlphabeticKeys] as number[];
  const terminalCommands: string[] = [...config.terminalCommands] as string[];

  const getTypingSpeedMs = useCallback(() => {
    const presets = config.speedPresets as { slow: number; normal: number; fast: number };

    return presets[typingSpeed] ?? config.defaultTextPrintTime;
  }, [typingSpeed]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.pushState(null, '', url.toString());

    document.documentElement.lang = lang;

    window.localStorage.setItem(STORAGE_LANG, lang);
  }, [lang]);

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');

    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SPEED, typingSpeed);
  }, [typingSpeed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SOUND, String(soundOn));
  }, [soundOn]);

  const playTick = useCallback(() => {
    if (!soundOn) {
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }, [soundOn]);

  useEffect(() => {
    const last = localStorage.getItem(LAST_VISIT_DATE) ?? 'Never';

    appendLine(firstMessage(last));

    const date = new Date();
    const formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString().slice(0, 8);

    localStorage.setItem(LAST_VISIT_DATE, `${formattedDate} on ttys010`);

    const hash = window.location.hash.slice(2);
    const hashCmd = hash && terminalCommands.includes(hash) ? hash : 'aboutfetch';

    handleEnter(hashCmd);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(2);
      if (hash && terminalCommands.includes(hash)) handleEnter(hash);
    };

    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const tick = () => setMenuBarTime(new Date());
    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
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
      window.removeEventListener('keyup', onKeyUp);
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
    return t(lang, 'welcome', { lastVisit });
  }

  async function handleEnter(forceValue?: string) {
    const raw = (forceValue ?? input).trim();
    if (!raw) {
      return;
    }

    echoCommand(raw);
    setInput('');

    if (!historyRef.current.includes(raw)) {
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
      typingTimerRef.current = window.setTimeout(() => step(i + 1), getTypingSpeedMs());
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
        appendLine(t(lang, 'help.intro'));
        appendLine(t(lang, 'help.prompt'));
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
      case 'whoami':
        appendLine(config.whoami as string);
        break;
      case 'hostname':
        appendLine(config.hostname as string);
        break;
      case 'theme':
        await execTheme(args);
        break;
      case 'speed':
        await execSpeed(args);
        break;
      case 'sound':
        await execSound(args);
        break;
      case 'ls':
        await execLs(args);
        break;
      case 'cat':
        await execCat(args);
        break;
      case 'fortune':
        execFortune();
        break;
      case 'neofetch':
        execNeofetch();
        break;
      case 'cowsay':
        execCowsay(args);
        break;
      case 'ping':
        await execPing(args);
        break;
      case 'curl':
        await execCurl(args);
        break;
      case 'ssh':
        execSsh(args);
        break;
      case 'matrix':
        setMatrixActive(true);
        break;
      case 'resume':
      case 'cv':
        window.open('/cv.pdf', '_blank');
        appendLine('Opening print dialog. Use "Save as PDF" to export resume.');
        break;
      case 'easteregg':
        execEasteregg();
        break;
      case 'contact':
        appendLine(
          Object.entries(config.links as Record<string, { txt: string }>)
            .map(([k, v]) => `<span style="color:#3daac4">${k}</span>: ${v.txt}`)
            .join('<br>')
        );
        break;
      case 'aboutfetch':
      case 'me':
        appendLine(getAllInformationAboutMe(config.informationAboutMe as any, config.links as any, asciiImage));
        appendLine(
          t(lang, 'about.moreHelp')
        );
        appendLine(
          t(lang, 'about.askExperience')
        );
        break;
      case 'experience':
        {
          const experiencesByLang = config.experience as Record<Lang, readonly string[]>;
          const items = experiencesByLang[lang] ?? experiencesByLang.en;
          for (const item of items) {
            appendLine(item);
            await sleep(1000);
          }
        }
        break;
      case 'git':
        await execGit(args);
        break;
      case 'changelang':
        await execChangeLang(args);
        break;
      default:
        if (cmd) {
          const fullCmd = (cmd + ' ' + args.join(' ')).trim().toLowerCase();
          if (fullCmd.includes('sudo') && fullCmd.includes('make') && fullCmd.includes('sandwich')) {
            appendLine('Make it yourself. (xkcd 149)');
          } else {
            appendLine(`${cmd}: command not found`);
          }
        }
    }
  }

  function execTheme(args: string[]) {
    const value = args[0]?.toLowerCase();
    if (value === 'dark' || value === 'light') {
      setTheme(value);
      appendLine(t(lang, 'theme.set', { value }));
    } else {
      appendLine(t(lang, 'theme.usage', { current: theme }));
    }
  }

  function execSpeed(args: string[]) {
    const s = args[0]?.toLowerCase();
    if (s === 'slow' || s === 'normal' || s === 'fast') {
      setTypingSpeed(s);
      appendLine(t(lang, 'speed.set', { value: s }));
    } else {
      appendLine(t(lang, 'speed.usage', { current: typingSpeed }));
    }
  }

  function execSound(args: string[]) {
    const v = args[0]?.toLowerCase();
    if (v === 'on' || v === 'off') {
      setSoundOn(v === 'on');
      appendLine(v === 'on' ? t(lang, 'sound.setOn') : t(lang, 'sound.setOff'));
    } else {
      appendLine(t(lang, 'sound.usage', { current: soundOn ? 'on' : 'off' }));
    }
  }

  function execLs(_args: string[]) {
    const files = [...(config.lsFiles as readonly { name: string; cmd: string; description: string }[])];
    appendLine(files.map(f => `${f.name}  — ${f.description}`).join('<br>'));
  }

  function execCat(args: string[]) {
    const file = args[0];
    if (!file) {
      appendLine('usage: cat <filename>');

      return;
    }

    const files = [...(config.lsFiles as readonly { name: string; cmd: string }[])];
    const match = files.find(f => f.name === file);

    if (file === 'resume.txt') {
      appendLine((config.resumeTxt as string).replace(/\n/g, '<br>'));

      return;
    }

    if (file === 'contact.txt') {
      const links = config.links as Record<string, { txt: string }>;
      appendLine(
        Object.entries(links)
          .map(([k, v]) => `${k}: ${v.txt}`)
          .join('<br>')
      );

      return;
    }
    if (match) {
      appendLine(`Run command: <span class="link" data-cmd="${match.cmd}">${match.cmd}</span> for content.`);
    } else {
      appendLine(`cat: ${file}: No such file`);
    }
  }

  function execFortune() {
    const fortunesByLang = config.fortune as Record<Lang, readonly string[]>;
    const fortunes = fortunesByLang[lang] ?? fortunesByLang.en;
    if (!fortunes.length) {
      return;
    }
    const index = Math.floor(Math.random() * fortunes.length);
    appendLine(fortunes[index] ?? '');
  }

  function execNeofetch() {
    const n = config.neofetch as { user: string; host: string; os: string; theme: string };
    const uptime = `${Math.floor(performance.now() / 3600000)}h ${Math.floor((performance.now() % 3600000) / 60000)}m`;
    const resolution = `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`;
    const kernel = navigator.userAgent;

    appendLine(
      `<pre style="margin:0;color:#7ee">${n.user}@${n.host}<br>` +
        `----------------<br>` +
        `OS: ${n.os}<br>` +
        `Kernel: ${kernel}<br>` +
        `Uptime: ${uptime}<br>` +
        `Resolution: ${resolution}<br>` +
        `Theme: ${n.theme}<br>` +
        `</pre>`
    );
  }

  function execCowsay(args: string[]) {
    const msg = args.length ? args.join(' ') : 'Hello from the terminal!';
    const bubble = cowsayBubble(msg);
    const cow = (config as any).cowsayTemplate || '';

    appendLine(`<pre style="margin:0;white-space:pre-wrap">${bubble}${cow}</pre>`);
  }

  async function execPing(args: string[]) {
    const host = args[0] || 'alex.soltanov.dev';

    appendLine(`PING ${host}: 56 data bytes`);

    for (let i = 0; i < 4; i++) {
      await sleep(400);
      const ms = 10 + Math.floor(Math.random() * 30);

      appendLine(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${ms} ms`);
    }

    appendLine(`--- ${host} ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss`);
  }

  async function execCurl(args: string[]) {
    const url = args[0] || config.gitHub.link + '';
    if (url.includes('github.com')) {
      try {
        const res = await fetch(`https://api.github.com/users/so1tan0v`);
        const data = await res.json();

        appendLine('<pre style="margin:0;overflow:auto;max-height:200px">' + JSON.stringify(data, null, 2) + '</pre>');
      } catch {
        appendLine('curl: (6) Could not resolve host');
      }
    } else {
      appendLine(`curl: (6) Could not resolve host: ${url}`);
    }
  }

  function execSsh(args: string[]) {
    appendLine(
      'Connection refused. Try Telegram or email — see <span class="link" data-cmd="me">me</span> for contacts.'
    );
  }

  function execEasteregg() {
    const eggs = [...(config.easterEggs as readonly string[])];
    appendLine(eggs[Math.floor(Math.random() * eggs.length)] ?? 'Nothing here.');
  }

  async function execGit(args: string[]) {
    const sub = args[0] ?? '';
    switch (sub) {
      case '':
      case '-h':
      case '--help':
        appendLine(t(lang, 'git.help.usage'));
        appendLine(t(lang, 'git.help.projects'));
        appendLine(t(lang, 'git.help.link'));
        break;
      case 'projects':
        appendLine(t(lang, 'git.projects.header', { link: config.gitHub.link }));
        appendLine(`
          <div>
            ${[...config.gitHub.projects]
              .map((project, key) => `${key + 1}. <a href="${project.link}" target="_blank"> ${project.name}</a>`)
              .join('<br>')}
          </div>
        `);
        appendLine(t(lang, 'git.help.note'));
        break;
      case 'link':
        appendLine(`<a href="${config.gitHub.link}" target="_blank">so1tan0v</a>`);
        break;
      default:
        appendLine(t(lang, 'git.error.unknown', { sub }));
    }
  }

  async function execChangeLang(args: string[]) {
    const sub = args[0] ?? '';
    switch (sub) {
      case '':
      case '-h':
      case '--help':
        appendLine(
          `use: changelang [-h | --help]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [arg]`
        );
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

  useEffect(() => {
    if (!matrixActive || !matrixCanvasRef.current) {
      return;
    }

    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF';
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let anim: number;

    function draw() {
      ctx!.fillStyle = 'rgba(0,0,0,0.05)';
      ctx!.fillRect(0, 0, w, h);
      ctx!.fillStyle = '#0f0';
      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx!.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      anim = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMatrixActive(false);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(anim);

      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [matrixActive]);

  const menuBarDateStr = menuBarTime.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  const menuBarTimeStr = menuBarTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="model">
      <header className="mac-menu-bar" role="banner">
        <div className="mac-menu-bar-left">
          <span className="mac-menu-bar-app">
            <b>Terminal</b>
          </span>
          <button
            type="button"
            className="mac-menu-bar-theme"
            onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-label={`Theme: ${theme}. Switch to ${theme === 'dark' ? 'light' : 'dark'}`}
          >
            <span className="mac-menu-bar-theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
        <div className="mac-menu-bar-right">
          <button
            type="button"
            className="mac-menu-bar-theme"
            onClick={() => setLang(prev => (prev === 'en' ? 'ru' : 'en'))}
          >
            <span className="mac-menu-bar-theme-label"><b>{lang.toUpperCase()}</b></span>
          </button>
          <span className="mac-menu-bar-date">
            <b>{menuBarDateStr}</b>
          </span>
          <span className="mac-menu-bar-time">
            <b>{menuBarTimeStr}</b>
          </span>
        </div>
      </header>
      <div className="model-content">
        {matrixActive && (
          <div className="matrix-overlay" aria-hidden="true">
            <canvas ref={matrixCanvasRef} />
            <p className="matrix-hint">Press Escape to exit</p>
          </div>
        )}
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
                  aria-label="Terminal command input. Type a command and press Enter. Use Tab for completion, Arrow Up/Down for history."
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (!['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'Meta', 'Control', 'Alt', 'Shift'].includes(e.key)) {
                      playTick();
                    }
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
    </div>
  );
}
