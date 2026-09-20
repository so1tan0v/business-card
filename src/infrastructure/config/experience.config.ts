import type { ExperienceEntry } from '../../domain/entities';

export const experienceEntries: readonly ExperienceEntry[] = [
  {
    dateFrom: '2026-05-08',
    dateTo: null,
    companyName: { en: 'Ozon Tech', ru: 'Ozon Tech' },
    companySite: 'https://ozon.tech',
    companySiteLabel: 'Ozon Tech',
    title: { en: 'Backend Developer', ru: 'Backend Developer' },
    responsibilities: {
      en: ['Not yet...'],
      ru: ['Не время...']
    },
    stack: []
  },
  {
    dateFrom: '2024-07-01',
    dateTo: '2026-05-08',
    companyName: { en: 'K2T', ru: 'ООО "K2T"' },
    companySite: 'https://k2t.app',
    title: { en: 'Senior Backend Developer', ru: 'Senior Backend Developer' },
    responsibilities: {
      en: [
        'Designing and developing microservices on {Go} and {Node.js}',
        'Developing real-time services ({WebRTC}, {WebSocket})',
        'Building message-driven architecture ({RabbitMQ})',
        'Optimizing {PostgreSQL} and {Redis}',
        'Implementing graceful shutdown, health checks, retry strategies and idempotency',
        'Setting up CI/CD pipelines',
        'Implementing monitoring, structured logging and alerting ({Prometheus}, {Grafana})',
        'Code review, technical mentoring and architecture reviews',
        'Making technology and engineering approach decisions'
      ],
      ru: [
        'Проектирование и разработка микросервисов на {Go} и {Node.js}',
        'Разработка real-time сервисов ({WebRTC}, {WebSocket})',
        'Построение message-driven архитектуры ({RabbitMQ})',
        'Оптимизация {PostgreSQL} и {Redis}',
        'Реализация graceful shutdown, health checks, retry strategies и idempotency',
        'Настройка CI/CD пайплайнов',
        'Внедрение мониторинга, structured logging и алертинга ({Prometheus}, {Grafana})',
        'Code review, техническое менторство и участие в архитектурных review',
        'Принятие решений по выбору технологий и инженерных подходов'
      ]
    },
    achievements: {
      en: [
        'Optimized {PostgreSQL} connection pool - stable operation under load up to 5000 RPS',
        'Implemented task balancing service (Round Robin + health checks)',
        'Set up monitoring and alerting - reduced incident response time',
        'Implemented unit and integration testing for business-critical modules',
        'Led the design and implementation of an IAM platform for 40+ services with centralized authentication and authorization',
        'Replaced fragmented login flows with a unified IAM layer based on OAuth2/OIDC and SSO, cutting user onboarding time by about 60%',
        'Introduced CI/CD and automated testing for IAM services, reducing release risks and improving delivery predictability'
      ],
      ru: [
        'Оптимизация пула соединений {PostgreSQL} - стабильная работа при нагрузке до 5000 RPS',
        'Реализация сервиса балансировки задач (Round Robin + health checks)',
        'Настройка мониторинга и алертинга - снижение времени реакции на инциденты',
        'Внедрение unit и integration тестов для критичных модулей',
        'Руководил проектированием и реализацией IAM-платформы для 40+ сервисов с централизованной аутентификацией и авторизацией',
        'Заменил разрозненные механизмы входа единым IAM-слоем с поддержкой OAuth2/OIDC и SSO, сократив время подключения пользователей примерно на 60%',
        'Внедрил CI/CD и автоматизированное тестирование для IAM-сервисов, снизив риски релизов и повысив предсказуемость поставки изменений'
      ]
    },
    stack: [
      'Go',
      'Node.js',
      'TypeScript',
      'PHP',
      'Gin',
      'GORM',
      'NestJS',
      'Fastify',
      'RabbitMQ',
      'Redis',
      'PostgreSQL',
      'MySQL',
      'ClickHouse',
      'Docker',
      'Docker Compose',
      'GitLab CI/CD',
      'Prometheus',
      'Grafana',
      'Keycloak',
      'OAuth2/OIDC'
    ]
  },
  {
    dateFrom: '2020-12-01',
    dateTo: '2024-07-01',
    companyName: { en: 'VISTA LLC', ru: 'ООО "Виста"' },
    companySite: 'https://vistamed.pro',
    roles: [
      {
        dateFrom: '2023-01-01',
        dateTo: '2024-07-01',
        title: { en: 'Team Lead / Backend Developer', ru: 'Team Lead / Backend Developer' },
        responsibilities: {
          en: [
            'Leading backend team (8 developers)',
            'Architectural design of services',
            'Transition to microservices architecture',
            'Performance optimization of backend systems',
            'Setting up and evolving CI/CD',
            'Customer interaction',
            'Introducing engineering standards and delivery processes'
          ],
          ru: [
            'Руководство backend-командой (8 разработчиков)',
            'Архитектурное проектирование сервисов',
            'Переход к микросервисной архитектуре',
            'Оптимизация производительности backend-систем',
            'Настройка и развитие CI/CD',
            'Работа с заказчиками',
            'Внедрение инженерных стандартов разработки и delivery-процессов'
          ]
        },
        achievements: {
          en: [
            'Built the core engineering infrastructure for launching and scaling new projects with unified development and delivery practices',
            'Introduced and configured GitLab, standardized repository workflows and team processes',
            'Developed common standards for {GitLab CI/CD} pipelines, making releases faster and more predictable',
            'Standardized {Docker} environments for local development and deployment',
            'Initiated the company-wide transition to microservices architecture',
            'Refined internal delivery flow and task routing, improving transparency and development governance',
            'Ran a global refactor across 20+ projects, improving maintainability and code quality',
            'Organized upgrades to current technology and dependency versions, reducing technical debt',
            'Optimized SQL queries and {Redis} caching - API response time from 5–6s to 0.5s',
            'Implemented {GitLab CI/CD} - deploy time reduced to 2–3 minutes',
            'Set up system monitoring with 99.9% uptime for project with 20,000+ daily users',
            'Implemented code review standards and Git Flow'
          ],
          ru: [
            'Выстроил базовую инженерную инфраструктуру для запуска и развития новых проектов, внедрив единые подходы к разработке и поставке изменений',
            'Внедрил и настроил GitLab, стандартизировал работу с репозиториями и командные процессы',
            'Разработал единые стандарты для {GitLab CI/CD} pipelines, ускорив поставку продукта и сделав релизный процесс предсказуемым',
            'Внедрил {Docker} в процессы развертывания и стандартизировал окружения',
            'Инициировал переход компании к микросервисной архитектуре',
            'Изменил процесс взаимодействия внутри компании: выстроил иерархию и маршрут постановки задач, повысив прозрачность и управляемость разработки',
            'Провел глобальный рефакторинг более чем 20 проектов, повысив поддерживаемость и качество кода',
            'Организовал переезд сервисов на актуальные версии технологий и зависимостей, снизив технический долг',
            'Оптимизировал SQL-запросы и кэширование в {Redis} - время ответа API с 5–6с до 0.5с',
            'Внедрил {GitLab CI/CD} - время деплоя 2–3 минуты',
            'Настроил мониторинг с uptime 99.9% для проекта с 20 000+ пользователей в день',
            'Ввел стандарты code review и Git Flow'
          ]
        }
      },
      {
        dateFrom: '2020-12-01',
        dateTo: '2023-01-01',
        title: { en: 'Backend Developer', ru: 'Backend Developer' },
        responsibilities: {
          en: [
            'Supporting and developing backend services ({PHP}, {Node.js})',
            'Developing REST API, SOAP',
            'Database structure optimization',
            '{Docker} containerization',
            'Release automation',
            'Improving backend security'
          ],
          ru: [
            'Поддержка и развитие backend-сервисов ({PHP}, {Node.js})',
            'Разработка REST API, SOAP',
            'Оптимизация структуры БД',
            'Контейнеризация в {Docker}',
            'Автоматизация релизов',
            'Повышение безопасности backend-решений'
          ]
        },
        achievements: {
          en: [
            'Eliminated critical vulnerabilities (SQL injection, XSS)',
            'Optimized {MySQL} queries through indexing and query tuning',
            'Developed and improved REST API and SOAP integrations for internal and external services',
            'Containerized applications with {Docker}, simplifying local development and deployment',
            'Implemented automated testing and CI, improving release quality',
            'Increased release stability and predictability through delivery automation'
          ],
          ru: [
            'Устранил критические уязвимости (SQL injection, XSS)',
            'Оптимизировал запросы в {MySQL} с помощью индексов и доработки структуры запросов',
            'Разрабатывал и дорабатывал REST API и SOAP-интеграции для внутренних и внешних сервисов',
            'Контейнеризировал приложения с использованием {Docker}, упростив локальную разработку и процессы развертывания',
            'Внедрил автоматизированное тестирование и CI, повысив качество изменений и снизив количество ошибок при релизах',
            'Повысил стабильность и предсказуемость релизного процесса за счет автоматизации поставки изменений'
          ]
        }
      }
    ],
    stack: [
      'Go',
      'Node.js',
      'TypeScript',
      'PHP',
      'Gin',
      'GORM',
      'NestJS',
      'Fastify',
      'PostgreSQL',
      'MySQL',
      'ClickHouse',
      'Redis',
      'Docker',
      'GitLab CI/CD',
      'Prometheus',
      'Grafana',
      'RabbitMQ'
    ]
  }
];
