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
    'matrix',
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
  resumeTxt: `Alexander Soltanov — Golang Developer | Backend Engineer
Experience: 5+ years. Go, Node.js, TypeScript, PostgreSQL, Redis, RabbitMQ, Docker, CI/CD, observability.
Contact: sashasyltanov@gmail.com | Telegram @so1tan0v | alex.soltanov.dev`,
  fortune: {
    en: [
      'The best way to predict the future is to implement it. — David Heinemeier',
      "There are only 10 types of people: those who understand binary and those who don't.",
      'Node.js: I/O is not the bottleneck. Your code is.',
      'First solve the problem. Then write the code. — John Johnson',
      'Microservices: when you want to turn a monolith into a distributed monolith.'
    ],
    ru: [
      'Лучший способ предсказать будущее — реализовать его. — David Heinemeier',
      'Есть 10 типов людей: те, кто понимает двоичную систему, и те, кто не понимает.',
      'Node.js: узкое место не I/O, а твой код.',
      'Сначала реши задачу. Потом пиши код. — John Johnson',
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
      (__)\\       )\\/\\
          ||----w |
          ||     ||
`,
  easterEggs: [
    '🐧 sudo make me a sandwich → Make it yourself. (xkcd 149)',
    '🎹 The matrix has you. Run: matrix',
    '🥚 There is no spoon. But there is npm install.'
  ],
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
          txt: `${createAnchor('Node.js', 'https://www.ecma-international.org/')}, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}`,
          title_color: '#d7d346'
        },
        'Other languages': {
          txt: `${createAnchor('Go', 'https://go.dev/')}, ${createAnchor('PHP', 'https://www.php.net/')}`,
          title_color: '#d7d346'
        },
        'Language versions': {
          title_color: '#c4c03d',
          leaves: {
            [`${createAnchor('Go', 'https://go.dev/', ['no-color'])}`]: {
              txt: '>=1.20',
              title_color: '#c4733d'
            },
            [`${createAnchor('Node.js', 'https://nodejs.org/', ['no-color'])}`]: {
              txt: `v14–24`,
              title_color: '#c4733d'
            },
            [`${createAnchor('PHP', 'https://www.php.net/', ['no-color'])}`]: {
              txt: '>=5.6',
              title_color: '#c4733d'
            }
          }
        },
        'Frameworks & APIs': {
          title_color: '#c4c03d',
          leaves: {
            [`${createAnchor('Go', 'https://go.dev/', ['no-color'])}`]: {
              txt: `${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('urfave/cli', 'https://cli.urfave.org/')}`,
              title_color: '#c4733d'
            },
            [`${createAnchor('Node.js', 'https://nodejs.org/', ['no-color'])}`]: {
              txt: `${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}`,
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
      txt: `${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}`,
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
      {
        name: 'Business Card (React, TypeScript)',
        link: 'https://github.com/so1tan0v/business-card'
      },
      {
        name: 'Stack Research (Node.js, Python, GoLang, C#)',
        link: 'https://github.com/so1tan0v/stack-research'
      },
      {
        name: '(Contributor) NestJS Custom Injector (TypeScript)',
        link: 'https://github.com/so1tan0v/nestjs-custom-injector'
      },
      {
        name: '(Contributor) TypeORM Model Generator (TypeScript)',
        link: 'https://github.com/so1tan0v/typeorm-model-generator'
      },
      {
        name: 'Disk Usage CLI (Go)',
        link: 'https://github.com/so1tan0v/go-du-cli'
      },
      {
        name: 'Gendiff CLI (Go)',
        link: 'https://github.com/so1tan0v/go-gendiff-cli'
      },
      {
        name: 'URL Shortener (Go, PostgreSQL, Gin, Caddy)',
        link: 'https://github.com/so1tan0v/go-url-shortener'
      },
      {
        name: 'Crawler CLI (Go)',
        link: 'https://github.com/so1tan0v/go-crawler-cli'
      }
    ]
  },
  links: {
    'E-mail': { txt: `${createAnchor('@so1tan0v', 'mailto:so1tan0v@yandex.ru')}`, title_color: '#3daac4' },
    Telegram: { txt: `${createAnchor('@so1tan0v', 'https://t.me/so1tan0v')}`, title_color: '#3daac4' },
    WhatsApp: { txt: `${createAnchor('+7 (950) 030-62-46', 'https://wa.me/79500306246')}`, title_color: '#3daac4' },
    GitHub: { txt: `${createAnchor('@so1tan0v', 'https://github.com/so1tan0v')}`, title_color: '#3daac4' },
    LinkedIn: {
      txt: `${createAnchor('@so1tan0v', 'https://www.linkedin.com/in/alexander-soltanov-a50a06294')}`,
      title_color: '#3daac4'
    }
  },
  experience: {
    en: [
      `
        <br>
        <span style="color: #c4c03d">July 2024</span> — <span style="color: #c4c03d">Present</span> 
        (${workExperienceInCurrentPost.years} ${[0, 1].includes(workExperienceInCurrentPost.years) ? 'year' : 'years'} 
        ${workExperienceInCurrentPost.months} ${[0, 1].includes(workExperienceInCurrentPost.months) ? 'month' : 'months'})<br>
        <strong>K2T</strong> (${createAnchor('k2t.app', 'https://k2t.app')}) — Senior Backend Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Designing and developing microservices on ${createAnchor('Go', 'https://go.dev/')} and ${createAnchor('Node.js', 'https://nodejs.org/')}<br>
        &nbsp;&nbsp;• Developing real-time services (${createAnchor('WebRTC', 'https://webrtc.org/')}, ${createAnchor('WebSocket', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API')})<br>
        &nbsp;&nbsp;• Building message-driven architecture (${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')})<br>
        &nbsp;&nbsp;• Optimizing ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')} and ${createAnchor('Redis', 'https://redis.io/')}<br>
        &nbsp;&nbsp;• Implementing graceful shutdown, health checks, retry strategies and idempotency<br>
        &nbsp;&nbsp;• Setting up CI/CD pipelines<br>
        &nbsp;&nbsp;• Implementing monitoring, structured logging and alerting (${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')})<br>
        &nbsp;&nbsp;• Code review, technical mentoring and architecture reviews<br>
        &nbsp;&nbsp;• Making technology and engineering approach decisions<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Optimized ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')} connection pool — stable operation under load up to 5000 RPS<br>
        &nbsp;&nbsp;• Implemented task balancing service (Round Robin + health checks)<br>
        &nbsp;&nbsp;• Set up monitoring and alerting — reduced incident response time<br>
        &nbsp;&nbsp;• Implemented unit and integration testing (${createAnchor('Jest', 'https://jestjs.io/')}) for business-critical modules<br>
        &nbsp;&nbsp;• Led the design and implementation of an IAM platform for 40+ services with centralized authentication and authorization<br>
        &nbsp;&nbsp;• Replaced fragmented login flows with a unified IAM layer based on OAuth2/OIDC and SSO, cutting user onboarding time by about 60%<br>
        &nbsp;&nbsp;• Introduced CI/CD and automated testing for IAM services, reducing release risks and improving delivery predictability<br>
        <em>Stack: ${createAnchor('Go', 'https://go.dev/')}, ${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('ClickHouse', 'https://clickhouse.com/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, Docker Compose, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}, ${createAnchor('Keycloak', 'https://www.keycloak.org/')}, OAuth2/OIDC</em><br>
    `,
      `
        <br>
        <span style="color: #c4c03d">January 2023</span> — <span style="color: #c4c03d">July 2024</span> (1 year 7 months)<br>
        <strong>VISTA LLC</strong> (${createAnchor('vistamed.pro', 'https://vistamed.pro')}) — Team Lead / Backend Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Leading backend team (8 developers)<br>
        &nbsp;&nbsp;• Architectural design of services<br>
        &nbsp;&nbsp;• Transition to microservices architecture<br>
        &nbsp;&nbsp;• Performance optimization of backend systems<br>
        &nbsp;&nbsp;• Setting up and evolving CI/CD<br>
        &nbsp;&nbsp;• Customer interaction<br>
        &nbsp;&nbsp;• Introducing engineering standards and delivery processes<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Built the core engineering infrastructure for launching and scaling new projects with unified development and delivery practices<br>
        &nbsp;&nbsp;• Introduced and configured GitLab, standardized repository workflows and team processes<br>
        &nbsp;&nbsp;• Developed common standards for ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')} pipelines, making releases faster and more predictable<br>
        &nbsp;&nbsp;• Standardized ${createAnchor('Docker', 'https://www.docker.com/')} environments for local development and deployment<br>
        &nbsp;&nbsp;• Initiated the company-wide transition to microservices architecture<br>
        &nbsp;&nbsp;• Refined internal delivery flow and task routing, improving transparency and development governance<br>
        &nbsp;&nbsp;• Ran a global refactor across 20+ projects, improving maintainability and code quality<br>
        &nbsp;&nbsp;• Organized upgrades to current technology and dependency versions, reducing technical debt<br>
        &nbsp;&nbsp;• Optimized SQL queries and ${createAnchor('Redis', 'https://redis.io/')} caching — API response time from 5–6s to 0.5s<br>
        &nbsp;&nbsp;• Implemented ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')} — deploy time reduced to 2–3 minutes<br>
        &nbsp;&nbsp;• Set up system monitoring with 99.9% uptime for project with 20,000+ daily users<br>
        &nbsp;&nbsp;• Implemented code review standards and Git Flow<br>
        <em>Stack: ${createAnchor('Go', 'https://go.dev/')}, ${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('ClickHouse', 'https://clickhouse.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}, ${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}</em><br>
    `,
      `
        <br>
        <span style="color: #c4c03d">December 2020</span> — <span style="color: #c4c03d">January 2023</span> (2 years 2 months)<br>
        <strong>VISTA LLC</strong> (${createAnchor('vistamed.pro', 'https://vistamed.pro')}) — Backend Developer<br>
        <span style="color: #3daac4">Responsibilities:</span><br>
        &nbsp;&nbsp;• Supporting and developing backend services (${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Node.js', 'https://nodejs.org/')})<br>
        &nbsp;&nbsp;• Developing REST API, SOAP<br>
        &nbsp;&nbsp;• Database structure optimization<br>
        &nbsp;&nbsp;• ${createAnchor('Docker', 'https://www.docker.com/')} containerization<br>
        &nbsp;&nbsp;• Release automation<br>
        &nbsp;&nbsp;• Improving backend security<br>
        <span style="color: #3daac4">Achievements:</span><br>
        &nbsp;&nbsp;• Eliminated critical vulnerabilities (SQL injection, XSS)<br>
        &nbsp;&nbsp;• Optimized ${createAnchor('MySQL', 'https://www.mysql.com/')} queries through indexing and query tuning<br>
        &nbsp;&nbsp;• Developed and improved REST API and SOAP integrations for internal and external services<br>
        &nbsp;&nbsp;• Containerized applications with ${createAnchor('Docker', 'https://www.docker.com/')}, simplifying local development and deployment<br>
        &nbsp;&nbsp;• Implemented automated testing and CI, improving release quality<br>
        &nbsp;&nbsp;• Increased release stability and predictability through delivery automation<br>
        <em>Stack: ${createAnchor('Node.js', 'https://nodejs.org/')} (${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}), ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}</em><br>
    `
    ],
    ru: [
      `
        <br>
        <span style="color: #c4c03d">Июль 2024</span> — <span style="color: #c4c03d">настоящее время</span> 
        (${workExperienceInCurrentPost.years} ${[0, 1].includes(workExperienceInCurrentPost.years) ? 'год' : 'лет'} 
        ${workExperienceInCurrentPost.months} ${[1].includes(workExperienceInCurrentPost.months) ? 'месяц' : 'месяцев'})<br>
        <strong>ООО "K2T"</strong> (${createAnchor('k2t.app', 'https://k2t.app')}) — Senior Backend Developer<br>
        <span style="color: #3daac4">Обязанности:</span><br>
        &nbsp;&nbsp;• Проектирование и разработка микросервисов на ${createAnchor('Go', 'https://go.dev/')} и ${createAnchor('Node.js', 'https://nodejs.org/')}<br>
        &nbsp;&nbsp;• Разработка real-time сервисов (${createAnchor('WebRTC', 'https://webrtc.org/')}, ${createAnchor('WebSocket', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API')})<br>
        &nbsp;&nbsp;• Построение message-driven архитектуры (${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')})<br>
        &nbsp;&nbsp;• Оптимизация ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')} и ${createAnchor('Redis', 'https://redis.io/')}<br>
        &nbsp;&nbsp;• Реализация graceful shutdown, health checks, retry strategies и idempotency<br>
        &nbsp;&nbsp;• Настройка CI/CD пайплайнов<br>
        &nbsp;&nbsp;• Внедрение мониторинга, structured logging и алертинга (${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')})<br>
        &nbsp;&nbsp;• Code review, техническое менторство и участие в архитектурных review<br>
        &nbsp;&nbsp;• Принятие решений по выбору технологий и инженерных подходов<br>
        <span style="color: #3daac4">Достижения:</span><br>
        &nbsp;&nbsp;• Оптимизация пула соединений ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')} — стабильная работа при нагрузке до 5000 RPS<br>
        &nbsp;&nbsp;• Реализация сервиса балансировки задач (Round Robin + health checks)<br>
        &nbsp;&nbsp;• Настройка мониторинга и алертинга — снижение времени реакции на инциденты<br>
        &nbsp;&nbsp;• Внедрение unit и integration тестов (${createAnchor('Jest', 'https://jestjs.io/')}) для критичных модулей<br>
        &nbsp;&nbsp;• Руководил проектированием и реализацией IAM-платформы для 40+ сервисов с централизованной аутентификацией и авторизацией<br>
        &nbsp;&nbsp;• Заменил разрозненные механизмы входа единым IAM-слоем с поддержкой OAuth2/OIDC и SSO, сократив время подключения пользователей примерно на 60%<br>
        &nbsp;&nbsp;• Внедрил CI/CD и автоматизированное тестирование для IAM-сервисов, снизив риски релизов и повысив предсказуемость поставки изменений<br>
        <em>Стек: ${createAnchor('Go', 'https://go.dev/')}, ${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('RabbitMQ', 'https://www.rabbitmq.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('ClickHouse', 'https://clickhouse.com/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, Docker Compose, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}, ${createAnchor('Keycloak', 'https://www.keycloak.org/')}, OAuth2/OIDC</em><br>
    `,
      `
        <br>
        <span style="color: #c4c03d">Январь 2023</span> — <span style="color: #c4c03d">Июль 2024</span> (1 год 7 месяцев)<br>
        <strong>ООО "Виста"</strong> (${createAnchor('vistamed.pro', 'https://vistamed.pro')}) — Team Lead / Backend Developer<br>
        <span style="color: #3daac4">Обязанности:</span><br>
        &nbsp;&nbsp;• Руководство backend-командой (8 разработчиков)<br>
        &nbsp;&nbsp;• Архитектурное проектирование сервисов<br>
        &nbsp;&nbsp;• Переход к микросервисной архитектуре<br>
        &nbsp;&nbsp;• Оптимизация производительности backend-систем<br>
        &nbsp;&nbsp;• Настройка и развитие CI/CD<br>
        &nbsp;&nbsp;• Работа с заказчиками<br>
        &nbsp;&nbsp;• Внедрение инженерных стандартов разработки и delivery-процессов<br>
        <span style="color: #3daac4">Достижения:</span><br>
        &nbsp;&nbsp;• Выстроил базовую инженерную инфраструктуру для запуска и развития новых проектов, внедрив единые подходы к разработке и поставке изменений<br>
        &nbsp;&nbsp;• Внедрил и настроил GitLab, стандартизировал работу с репозиториями и командные процессы<br>
        &nbsp;&nbsp;• Разработал единые стандарты для ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')} pipelines, ускорив поставку продукта и сделав релизный процесс предсказуемым<br>
        &nbsp;&nbsp;• Внедрил ${createAnchor('Docker', 'https://www.docker.com/')} в процессы развертывания и стандартизировал окружения<br>
        &nbsp;&nbsp;• Инициировал переход компании к микросервисной архитектуре<br>
        &nbsp;&nbsp;• Изменил процесс взаимодействия внутри компании: выстроил иерархию и маршрут постановки задач, повысив прозрачность и управляемость разработки<br>
        &nbsp;&nbsp;• Провел глобальный рефакторинг более чем 20 проектов, повысив поддерживаемость и качество кода<br>
        &nbsp;&nbsp;• Организовал переезд сервисов на актуальные версии технологий и зависимостей, снизив технический долг<br>
        &nbsp;&nbsp;• Оптимизировал SQL-запросы и кэширование в ${createAnchor('Redis', 'https://redis.io/')} — время ответа API с 5–6с до 0.5с<br>
        &nbsp;&nbsp;• Внедрил ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')} — время деплоя 2–3 минуты<br>
        &nbsp;&nbsp;• Настроил мониторинг с uptime 99.9% для проекта с 20 000+ пользователей в день<br>
        &nbsp;&nbsp;• Ввел стандарты code review и Git Flow<br>
        <em>Стек: ${createAnchor('Go', 'https://go.dev/')}, ${createAnchor('Node.js', 'https://nodejs.org/')}, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Gin', 'https://gin-gonic.com/')}, ${createAnchor('GORM', 'https://gorm.io/')}, ${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('ClickHouse', 'https://clickhouse.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}</em><br>
    `,
      `
        <br>
        <span style="color: #c4c03d">Декабрь 2020</span> — <span style="color: #c4c03d">Январь 2023</span> (2 года 2 месяца)<br>
        <strong>ООО "Виста"</strong> (${createAnchor('vistamed.pro', 'https://vistamed.pro')}) — Backend Developer<br>
        <span style="color: #3daac4">Обязанности:</span><br>
        &nbsp;&nbsp;• Поддержка и развитие backend-сервисов (${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('Node.js', 'https://nodejs.org/')})<br>
        &nbsp;&nbsp;• Разработка REST API, SOAP<br>
        &nbsp;&nbsp;• Оптимизация структуры БД<br>
        &nbsp;&nbsp;• Контейнеризация в ${createAnchor('Docker', 'https://www.docker.com/')}<br>
        &nbsp;&nbsp;• Автоматизация релизов<br>
        &nbsp;&nbsp;• Повышение безопасности backend-решений<br>
        <span style="color: #3daac4">Достижения:</span><br>
        &nbsp;&nbsp;• Устранил критические уязвимости (SQL injection, XSS)<br>
        &nbsp;&nbsp;• Оптимизировал запросы в ${createAnchor('MySQL', 'https://www.mysql.com/')} с помощью индексов и доработки структуры запросов<br>
        &nbsp;&nbsp;• Разрабатывал и дорабатывал REST API и SOAP-интеграции для внутренних и внешних сервисов<br>
        &nbsp;&nbsp;• Контейнеризировал приложения с использованием ${createAnchor('Docker', 'https://www.docker.com/')}, упростив локальную разработку и процессы развертывания<br>
        &nbsp;&nbsp;• Внедрил автоматизированное тестирование и CI, повысив качество изменений и снизив количество ошибок при релизах<br>
        &nbsp;&nbsp;• Повысил стабильность и предсказуемость релизного процесса за счет автоматизации поставки изменений<br>
        <em>Стек: ${createAnchor('Node.js', 'https://nodejs.org/')} (${createAnchor('NestJS', 'https://nestjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}), ${createAnchor('PHP', 'https://www.php.net/')}, ${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('Redis', 'https://redis.io/')}, ${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('GitLab CI/CD', 'https://about.gitlab.com/topics/ci-cd/')}, ${createAnchor('Prometheus', 'https://prometheus.io/')}, ${createAnchor('Grafana', 'https://grafana.com/')}</em><br>
    `
    ]
  }
} as const;

function createAnchor(titleName: string, url: string, classNames: string[] = [''], target = '_blank') {
  return `<a class="${classNames.join(' ')}" href='${url}' target='${target}'>${titleName}</a>`;
}
