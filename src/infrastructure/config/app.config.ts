import type {
  ContactLink,
  ExperienceEntry,
  GitHubProject,
  InfoNode,
  Lang,
  NeofetchInfo,
  ProfileFile,
  Theme,
  TypingSpeed
} from '../../domain/entities';
import { getWorkExperience } from '../../domain/services/work-experience';
import { createAnchor } from './create-anchor';
import { experienceEntries } from './experience.config';

export interface AppConfig {
  readonly username: string;
  readonly defaultTextPrintTime: number;
  readonly nonAlphabeticKeys: readonly number[];
  readonly terminalCommands: readonly string[];
  readonly defaultTheme: Theme;
  readonly speedPresets: Readonly<Record<TypingSpeed, number>>;
  readonly hostname: string;
  readonly whoami: string;
  readonly lsFiles: readonly ProfileFile[];
  readonly resumeTxt: string;
  readonly fortune: Readonly<Record<Lang, readonly string[]>>;
  readonly neofetch: NeofetchInfo;
  readonly cowsayTemplate: string;
  readonly easterEggs: readonly string[];
  readonly converterUrl: string;
  readonly informationAboutMe: Readonly<Record<string, InfoNode>>;
  readonly gitHub: {
    readonly link: string;
    readonly projects: readonly GitHubProject[];
  };
  readonly links: Readonly<Record<string, ContactLink>>;
  readonly experience: readonly ExperienceEntry[];
}

const username = 'so1tan0v@about';
const defaultTextPrintTime = 60;
const careerStartDate = '2020-12-01';
const workExperience = getWorkExperience(careerStartDate);

export const config: AppConfig = {
  username,
  defaultTextPrintTime,
  nonAlphabeticKeys: [
    112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 27, 8, 9, 20,
    16, 17, 91, 93, 18, 32, 13, 93, 44, 45, 19, 45, 36, 33, 46, 35, 34, 44, 37, 38, 40, 39
  ],
  terminalCommands: [
    'help',
    'clear',
    'date',
    'echo',
    'uname',
    'whoami',
    'hostname',
    'aboutfetch',
    'me',
    'experience',
    'git',
    'changelang',
    'theme',
    'speed',
    'sound',
    'ls',
    'cat',
    'fortune',
    'neofetch',
    'cowsay',
    'ping',
    'curl',
    'ssh',
    'converter',
    'resume',
    'cv',
    'contact',
    'easteregg'
  ],
  defaultTheme: 'dark',
  speedPresets: { slow: 120, normal: 60, fast: 20 },
  hostname: 'alex.soltanov.dev',
  whoami: 'so1tan0v',
  lsFiles: [
    { name: 'experience.txt', cmd: 'experience', description: 'work history' },
    { name: 'skills.txt', cmd: 'aboutfetch', description: 'tech stack & info' },
    { name: 'contact.txt', cmd: 'contact', description: 'links and contacts' },
    { name: 'resume.txt', cmd: 'cat resume.txt', description: 'short resume' }
  ],
  resumeTxt: `Alexander Soltanov - Golang Developer | Backend Engineer
Experience: 5+ years. Go, Node.js, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, CI/CD, observability.
Contact: sashasyltanov@gmail.com | Telegram @so1tan0v | alex.soltanov.dev`,
  fortune: {
    en: [
      'The best way to predict the future is to implement it. - David Heinemeier',
      "There are only 10 types of people: those who understand binary and those who don't.",
      'Node.js: I/O is not the bottleneck. Your code is.',
      'First solve the problem. Then write the code. - John Johnson',
      'Microservices: when you want to turn a monolith into a distributed monolith.'
    ],
    ru: [
      'Лучший способ предсказать будущее - реализовать его. - David Heinemeier',
      'Есть 10 типов людей: те, кто понимает двоичную систему, и те, кто не понимает.',
      'Node.js: узкое место не I/O, а твой код.',
      'Сначала реши задачу. Потом пиши код. - John Johnson',
      'Микросервисы: когда превращаешь монолит в распределённый монолит.'
    ]
  },
  neofetch: {
    user: 'so1tan0v',
    host: 'alex.soltanov.dev',
    os: 'Browser OS',
    theme: 'Terminal Dark'
  },
  cowsayTemplate: `
  \\   ^__^
   \\  (oo)\\_______
      (__)\\       )\\/\\/\\
          ||---ww |
          ||     ||
`,
  easterEggs: [
    '🐧 sudo make me a sandwich -> Make it yourself. (xkcd 149)',
    '🥚 There is no spoon. But there is npm install.'
  ],
  converterUrl: readConverterUrl(),
  informationAboutMe: {
    name: {
      txt: `<span style="color: #3daac4">Alexander</span>@<span style="color: #3daac4">Soltanov</span>`,
      show_title: false
    },
    Position: {
      txt: `Backend Developer`,
      title_color: '#3daac4'
    },
    'Work experience': {
      txt: `
        ${workExperience.years} ${[0, 1].includes(workExperience.years) ? 'year' : 'years'} 
        ${workExperience.months} ${[0, 1].includes(workExperience.months) ? 'month' : 'months'}
      `,
      title_color: '#3daac4'
    },
    'Programming languages': {
      title_color: '#3daac4',
      leaves: {
        'Main programming language': {
          txt: `${createAnchor('Go', 'https://go.dev/')}`,
          title_color: '#d7d346'
        },
        'Other languages': {
          txt: `JavaScript (Runtime: ${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('Bun', 'https://bun.sh/')}, ${createAnchor('Browser', 'https://developer.mozilla.org/en-US/docs/Web/API')}), ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('PHP', 'https://www.php.net/')}`,
          title_color: '#d7d346'
        },
        'Frameworks & APIs': {
          title_color: '#c4c03d',
          leaves: {
            [`${createAnchor('Go', 'https://go.dev/', ['no-color'])}`]: {
              txt: `${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('urfave/cli', 'https://cli.urfave.org/')}, ${createAnchor('Fiber', 'https://gofiber.io/')}`,
              title_color: '#c4733d'
            },
            [`${createAnchor('Node.js', 'https://nodejs.org/', ['no-color'])}`]: {
              txt: `${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('Express', 'https://expressjs.com/')}`,
              title_color: '#c4733d'
            },
            Protocols: {
              txt: `${createAnchor('WebRTC', 'https://webrtc.org/')}, ${createAnchor('WebSocket', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API')}, REST, SOAP`,
              title_color: '#c4733d'
            },
            Architecture: {
              txt: `Microservices, Message-driven (${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}), Idempotency, Retry strategies, Graceful shutdown`,
              title_color: '#c4733d'
            }
          }
        }
      }
    },
    Databases: {
      title_color: '#3daac4',
      leaves: {
        'Row oriented': {
          txt: `${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}`,
          title_color: '#c4c03d'
        },
        'Column oriented': {
          txt: `${createAnchor('ClickHouse', 'https://clickhouse.com/')}`,
          title_color: '#c4c03d'
        },
        'Document oriented': {
          txt: `${createAnchor('MongoDB', 'https://www.mongodb.com/')}`,
          title_color: '#c4c03d'
        },
        'In-memory': {
          txt: `${createAnchor('Redis', 'https://redis.io/')} (TTL, cache invalidation, connection pooling)`,
          title_color: '#c4c03d'
        }
      }
    },
    'Event/message brokers': {
      txt: `${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}, ${createAnchor('Kafka', 'https://kafka.apache.org/')}`,
      title_color: '#3daac4'
    },
    'DevOps & Monitoring': {
      txt: `${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('Podman', 'https://podman.io/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}, ${createAnchor('Nginx', 'https://nginx.org/')}, Linux (Ubuntu, Debian), Bash`,
      title_color: '#3daac4'
    }
  },
  gitHub: {
    link: 'https://github.com/so1tan0v',
    projects: [
      // {
      //   name: 'Business Card (React, TypeScript)',
      //   link: 'https://github.com/so1tan0v/business-card'
      // },
      // {
      //   name: 'Stack Research (Node.js, Python, GoLang, C#)',
      //   link: 'https://github.com/so1tan0v/stack-research'
      // },
      // {
      //   name: '(Contributor) NestJS Custom Injector (TypeScript)',
      //   link: 'https://github.com/so1tan0v/nestjs-custom-injector'
      // },
      // {
      //   name: '(Contributor) TypeORM Model Generator (TypeScript)',
      //   link: 'https://github.com/so1tan0v/typeorm-model-generator'
      // },
      // {
      //   name: 'Disk Usage CLI (Go)',
      //   link: 'https://github.com/so1tan0v/go-du-cli'
      // },
      // {
      //   name: 'Gendiff CLI (Go)',
      //   link: 'https://github.com/so1tan0v/go-gendiff-cli'
      // },
      // {
      //   name: 'URL Shortener (Go, PostgreSQL, Gin, Caddy)',
      //   link: 'https://github.com/so1tan0v/go-url-shortener'
      // },
      // {
      //   name: 'Crawler CLI (Go)',
      //   link: 'https://github.com/so1tan0v/go-crawler-cli'
      // },
      // {
      //   name: 'Formatter & Converter (React, TypeScript, Go)',
      //   link: 'https://github.com/so1tan0v/so1-formatter-converter'
      // }
    ]
  },
  links: {
    'E-mail': { txt: `${createAnchor('so1tan0v@yandex.ru', 'mailto:so1tan0v@yandex.ru')}`, title_color: '#3daac4' },
    'Additional E-mail': {
      txt: `${createAnchor('sashasyltanov@gmail.com', 'mailto:sashasyltanov@gmail.com')}`,
      title_color: '#3daac4'
    },
    Telegram: { txt: `${createAnchor('@so1tan0v', 'https://t.me/so1tan0v')}`, title_color: '#3daac4' },
    GitHub: { txt: `${createAnchor('@so1tan0v', 'https://github.com/so1tan0v')}`, title_color: '#3daac4' },
    LinkedIn: {
      txt: `${createAnchor('@so1tan0v', 'https://www.linkedin.com/in/alexander-soltanov-a50a06294')}`,
      title_color: '#3daac4'
    }
  },
  experience: experienceEntries
};

function readConverterUrl(): string {
  const fromEnv = import.meta.env.VITE_CONVERTER_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.trim();
  }

  return 'https://conv.soltanov.dev';
}
