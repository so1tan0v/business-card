import { getWorkExperience } from './app.helper';

const username = 'so1tan0v@about';
const defaultTextPrintTime = 60;
const careerStartDate = '2020-12-01';
const workExperience = getWorkExperience(careerStartDate);
const startDateInCurrentPost = '2024-07-01';
const workExperienceInCurrentPost = getWorkExperience(startDateInCurrentPost);

export const config = {
  username,
  defaultTextPrintTime,
  nonAlphabeticKeys: [
    112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 27, 8, 9, 20,
    16, 17, 91, 93, 18, 32, 13, 93, 44, 45, 19, 45, 36, 33, 46, 35, 34, 44, 37, 38, 40, 39
  ],
  terminalCommands: ['help', 'clear', 'date', 'echo', 'uname', 'aboutfetch', 'experience', 'git', 'easteregg'],
  informationAboutMe: {
    name: {
      txt: `<span style="color: #3daac4">Alexander</span>@<span style="color: #3daac4">Soltanov</span>`,
      show_title: false
    },
    Position: {
      txt: `Senior Node.js Developer`,
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
          txt: `${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('JavaScript', 'https://www.ecma-international.org/')}`,
          title_color: '#d7d346'
        },
        'Second programming language': {
          txt: `${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Go', 'https://go.dev/')}`,
          title_color: '#d7d346'
        },
        'Language versions': {
          title_color: '#c4c03d',
          leaves: {
            [`${createAnchor('Node.js', 'https://nodejs.org/', ['no-color'])}`]: {
              txt: `>=14`,
              title_color: '#c4733d'
            },
            [`${createAnchor('JavaScript', 'https://www.ecma-international.org/', ['no-color'])}`]: {
              txt: `ES2022, ES6`,
              title_color: '#c4733d'
            },
            [`${createAnchor('PHP', 'https://www.php.net/', ['no-color'])}`]: {
              txt: '>=5.6',
              title_color: '#c4733d'
            },
            [`${createAnchor('Go', 'https://go.dev/', ['no-color'])}`]: {
              txt: '>=1.20',
              title_color: '#c4733d'
            }
          }
        },
        'Frameworks/Library': {
          title_color: '#c4c03d',
          leaves: {
            [`${createAnchor('Node.js', 'https://nodejs.org/', ['no-color'])}`]: {
              txt: `${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Express', 'https://expressjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('Sequelize', 'https://sequelize.org/')}, ${createAnchor('TypeORM', 'https://typeorm.io/')}, ${createAnchor('WebSocket', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API')}, ${createAnchor('WebRTC', 'https://webrtc.org/')}, ${createAnchor('RxJS', 'https://rxjs.dev/')}`,
              title_color: '#c4733d'
            },
            [`${createAnchor('Frontend', 'https://www.ecma-international.org/', ['no-color'])}`]: {
              txt: `${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('React', 'https://react.dev/')}, ${createAnchor('jQuery', 'https://jquery.com/')}`,
              title_color: '#c4733d'
            },
            [`${createAnchor('PHP', 'https://www.php.net/', ['no-color'])}`]: {
              txt: `${createAnchor('Symfony', 'https://symfony.com/')}, ${createAnchor('Laravel', 'https://laravel.com/')}`,
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
          txt: `${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('SQLite', 'https://www.sqlite.org/')}`,
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
          txt: `${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('Memcached', 'https://memcached.org/')}`,
          title_color: '#c4c03d'
        }
      }
    },
    'Event/message brokers': {
      txt: `${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}`,
      title_color: '#3daac4'
    },
    'DevOps/Monitoring': {
      txt: `${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('Podman', 'https://podman.io/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}`,
      title_color: '#3daac4'
    },
    Tools: {
      txt: `${createAnchor('i18next', 'https://www.i18next.com/')}, ${createAnchor('Postman', 'https://www.postman.com/')}, ${createAnchor('Insomnia', 'https://insomnia.rest/')}, ${createAnchor('Yandex Tracker', 'https://tracker.yandex.com/')}`,
      title_color: '#3daac4'
    },
    'Operating Systems': {
      txt: `Linux (Ubuntu), macOS, Windows`,
      title_color: '#3daac4'
    }
  },
  gitHub: {
    link: 'https://github.com/so1tan0v',
    projects: [
      { name: 'business-card (jQuery)', link: 'https://github.com/so1tan0v/business-card' },
      {
        name: 'business-card-navigation-page (jQuery)',
        link: 'https://github.com/so1tan0v/business-card-navigation-page'
      },
      { name: 'log-checker-frontend (React, TypeScript)', link: 'https://github.com/so1tan0v/log-checker-frontend' },
      {
        name: 'log-checker-backend (Node.js, TypeScript, Fastify)',
        link: 'https://github.com/so1tan0v/log-checker-backend'
      }
    ]
  },
  links: {
    'E-mail': { txt: `${createAnchor('@so1tan0v', 'mailto:so1tan0v@yandex.ru')}`, title_color: '#3daac4' },
    Telegram: { txt: `${createAnchor('@so1tan0v', 'https://t.me/so1tan0v')}`, title_color: '#3daac4' },
    GitHub: { txt: `${createAnchor('@so1tan0v', 'https://github.com/so1tan0v')}`, title_color: '#3daac4' }
  },
  experience: [
    `
        <br>
        Between 
        <span style="color: #c4c03d">July 2024</span> and <span style="color: #c4c03d">present</span> 
        (work experience: ${workExperienceInCurrentPost.years} ${[0, 1].includes(workExperienceInCurrentPost.years) ? 'year' : 'years'} 
                          ${workExperienceInCurrentPost.months} ${[0, 1].includes(workExperienceInCurrentPost.months) ? 'month' : 'months'}), 
        K2T LLC: Senior Node.js Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Developing microservices for the product:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– Organization management panel (${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('NestJS', 'https://nestjs.com/')})<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– Media service for MCU (WebRTC, ICE, SDP)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– SFU service for video conferences (WebRTC, TURN/STUN)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– Push/email notifications (APNs, Firebase, WebPush)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– BrokerBalancer — load distributor for task brokers<br>
        &nbsp;&nbsp;&nbsp;&nbsp;– Starter-kit for rapid microservice bootstrapping (logging, core constructs, monitoring, tests)<br>
        &nbsp;&nbsp;• Maintaining the main application core (PHP)<br>
        &nbsp;&nbsp;• System architecture design with focus on scalability and fault tolerance<br>
        &nbsp;&nbsp;• Refactoring legacy code and optimizing existing microservices<br>
        &nbsp;&nbsp;• Implementing localization (${createAnchor('i18next', 'https://www.i18next.com/')})<br>
        &nbsp;&nbsp;• Leading a 5-person team (BE/FE/QA/BA): Agile rituals (daily, sprint planning), code reviews (GitLab MRs)<br>
        &nbsp;&nbsp;• Setting up CI/CD: automated deploys to prod/staging, CI-based testing<br>
        &nbsp;&nbsp;• Enforcing Git hooks (pre-commit, pre-push) with ESLint and Prettier checks<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Performance: introduced Redis caching and optimized complex PostgreSQL queries — reduced API latency from 420ms to 250ms<br>
        &nbsp;&nbsp;• Microservices: built a starter-kit — reduced project bootstrap time by 60% (from 3 days to 1.5 days)<br>
        &nbsp;&nbsp;• Load distribution: created BrokerBalancer (Round Robin) — +25% throughput, −15% latency<br>
        &nbsp;&nbsp;• Testing/quality: introduced unit tests with 95–100% coverage — −30% production bugs, +20% release velocity<br>
    `,
    `
        <br>
        Between 
        <span style="color: #c4c03d">January 2023</span> and <span style="color: #c4c03d">July 2024</span> 
        (work experience: 1 year 7 months),
        VISTA LLC: Team Lead / Backend Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Development and maintenance of 30+ projects<br>
        &nbsp;&nbsp;• Leading an 8-developer team: planning, retrospectives, task management (YouTrack)<br>
        &nbsp;&nbsp;• Code refactoring (PHP/Node.js), introducing ESLint/Prettier, code reviews, API documentation (Swagger)<br>
        &nbsp;&nbsp;• Designing and developing new functionality: RESTful API, SOAP, microservices (NestJS/Fastify)<br>
        &nbsp;&nbsp;• Application architecture: transition to microservices with Docker<br>
        &nbsp;&nbsp;• Performance: Redis caching, SQL optimization, CDN<br>
        &nbsp;&nbsp;• CI/CD: GitLab CI for automated testing and deploy; monitoring via Grafana<br>
        &nbsp;&nbsp;• Customer collaboration: requirements, technical documentation, demos<br>
        &nbsp;&nbsp;• Infrastructure: firewalls (iptables), backups (Bash + rsync), uptime monitoring (99.9% for 20K+ DAU system)<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Reduced page load time by 60% (4.2s → 1.5s) via Redis caching, SQL tuning, and CDN<br>
        &nbsp;&nbsp;• Built Node.js microservices — throughput from 1K to 5K RPS; uptime to 99.9%<br>
        &nbsp;&nbsp;• GitLab CI/CD pipelines — deploy time from 30 min to 2–3 min; release errors −70%<br>
        &nbsp;&nbsp;• Internal tools — automated testing for support, −50% manual QA<br>
        &nbsp;&nbsp;• Team management — shipped a project 2 weeks early, within budget; introduced Git Flow reducing merge conflicts by 70%<br>
    `,
    `
        <br>
        Between 
        <span style="color: #c4c03d">December 2020</span> and <span style="color: #c4c03d">January 2023</span> 
        (work experience: 2 years 2 months),
        VISTA LLC: Backend Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Maintaining and optimizing 30+ PHP services for reporting; −30% critical bugs via code review and automated tests<br>
        &nbsp;&nbsp;• Developing RESTful APIs and microservices in Node.js (NestJS, Fastify)<br>
        &nbsp;&nbsp;• DB design and optimization (MySQL): indexes, normalization, query performance<br>
        &nbsp;&nbsp;• Infrastructure: Docker, Apache, firewalls (iptables), backups via Bash scripts<br>
        &nbsp;&nbsp;• CI/CD in GitLab: automated testing and deploy; release management in YouTrack<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Security and patching: eliminated 15+ critical issues (SQLi, XSS) via automation and code fixes — fewer incidents<br>
        &nbsp;&nbsp;• Support process: built an internal incident reporting tool (PHP) and 5+ internal products for support — significant manual effort reduction<br>
    `
  ]
} as const;

function createAnchor(titleName: string, url: string, classNames: string[] = [''], target = '_blank') {
  return `<a class="${classNames.join(' ')}" href='${url}' target='${target}'>${titleName}</a>`;
}
