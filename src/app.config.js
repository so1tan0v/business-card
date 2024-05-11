const username = 'solt@about',
    defaultTextPrintTime = 60,
    careerStartDate = '2020-12-01',
    workExperience  = getWorkExperience(careerStartDate),
    startDateInCurrentPost      = '2023-01-01',
    workExperienceInCurrentPost = getWorkExperience(startDateInCurrentPost),
    nonAlphabeticKeys = [112,  113,  114,  115,  116,  117,  118,  119,  120,  121,  122,  123,  48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  27,  8,  9,  20,  16,  17,  91,  93,  18,  32,  13,  93,  44,  45,  19,  45,  36,  33,  46,  35,  34,  44,  37,  38,  40, 39],
    terminalCommands = [
        'help',
        'clear',
        'date',
        'echo',
        'uname',
        'aboutfetch',
        'experience',
        'git',
        'easteregg',
    ];

const informationAboutMe = {
    'name': {
        txt        : `<span style="color: #3daac4">Alexander</span>@<span style="color: #3daac4">Soltanov</span>`,
        show_title : false
    },
    'Position': {
        txt         : `Team lead / Middle Software Engineer`,
        title_color : '#3daac4',
    },
    'Work experience': {
        txt         : `
            ${workExperience.years} ${[0, 1].includes(workExperience.years) ? 'year' : 'years'} 
            ${workExperience.months} ${[0, 1].includes(workExperience.months) ? 'month' : 'months'}
        `,
        title_color : '#3daac4'
    },
    'Programming languages': {
        title_color : '#3daac4',
        leaves    : {
            'Main programming language': {
                txt: `${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}, ${createAnchor('JavaScript', 'https://www.ecma-international.org/')}`,
                title_color : '#d7d346',
            },
            'Second programming language': {
                txt: `${createAnchor('PHP', 'https://www.php.net/')}`,
                title_color : '#d7d346',
            },
            'Language versions': {
                title_color : '#c4c03d',
                leaves      : {
                    [`${createAnchor('JavaScript', 'https://www.ecma-international.org/', ['no-color'])}`]: {
                        txt         : `ES6, ${createAnchor('TypeScript', 'https://www.typescriptlang.org/')}`,
                        title_color : '#c4733d'
                    },
                    [`${createAnchor('PHP', 'https://www.php.net/', ['no-color'])}`]: {
                        txt         : '5.6, 7.4, 8.1',
                        title_color : '#c4733d'
                    },
                    [`${createAnchor('NodeJS', 'https://nodejs.org/', ['no-color'])}`]: {
                        txt         : `14+`,
                        title_color : '#c4733d'
                    },
                }
            },
            'Frameworks/Library' : {
                title_color : '#c4c03d',
                leaves      : {
                    [`${createAnchor('NodeJS', 'https://nodejs.org/', ['no-color'])}`]: {
                        txt         : `${createAnchor('Express', 'https://expressjs.com/')}, ${createAnchor('Fastify', 'https://www.fastify.io/')}, ${createAnchor('Sequalize', 'https://sequelize.org/')}`,
                        title_color : '#c4733d'
                    },
                    [`${createAnchor('PHP', 'https://www.php.net/', ['no-color'])}`]: {
                        txt         : `${createAnchor('Symfony', 'https://symfony.com/')}`,
                        title_color : '#c4733d'
                    },
                    [`${createAnchor('JavaScript', 'https://www.ecma-international.org/', ['no-color'])}`]: {
                        txt         : `${createAnchor('React', 'https://react.dev/')}, ${createAnchor('jQuery', 'https://jquery.com/')}, ${createAnchor('dhtmlx', 'https://dhtmlx.com/')}`,
                        title_color : '#c4733d'
                    },
                }
            },
        }
    },
    'Databases': {
        title_color : '#3daac4',
        leaves      : {
            'Row oriented' : {
                txt: `${createAnchor('MySQL', 'https://www.mysql.com/')}, ${createAnchor('PostgreSQL', 'https://www.postgresql.org/')}, ${createAnchor('SQLite', 'https://www.sqlite.org/')}`,
                title_color : '#c4c03d',
            },
            'Column oriented': {
                txt: `${createAnchor('ClickHouse', 'https://clickhouse.com/')}`,
                title_color : '#c4c03d',
            },
            'Document oriented': {
                txt: `${createAnchor('MongoDB', 'https://www.mongodb.com/')}`,
                title_color : '#c4c03d',
            }
        },
    },
    'Web servers': {
        txt         : `${createAnchor('Apache', 'https://httpd.apache.org/')}, ${createAnchor('Nginx', 'https://www.nginx.com/')}`,
        title_color : '#3daac4',
    },
    'OS-level virtualization': {
        txt: `${createAnchor('Docker', 'https://www.docker.com/')}, ${createAnchor('Podman', 'https://podman.io/')}`,
        title_color : '#3daac4',
    }
}

const gitGub = {
    link: 'https://github.com/so1tan0v',
    projects: [
        {
            name: 'business-card (jQuery)',
            link: 'https://github.com/so1tan0v/business-card'
        },
        {
            name: 'business-card-navigation-page (jQuery)',
            link: 'https://github.com/so1tan0v/business-card-navigation-page'
        },
        {
            name: 'log-checker-frontend (React, TypeScript)',
            link: 'https://github.com/so1tan0v/log-checker-frontend'
        },
        {
            name: 'log-checker-backend (NodeJS, TypeScript, Fastify)',
            link: 'https://github.com/so1tan0v/log-checker-backend'
        },
    ]
}

const links = {
    'E-mail': {
        txt         : `${createAnchor('@so1tan0v', 'mailto:so1tan0v@yandex.ru')}`,
        title_color : '#3daac4',
    },
    'Telegram': {
        txt         : `${createAnchor('@so1tan0v', 'https://t.me/so1tan0v')}`,
        title_color : '#3daac4',
    },
    'GitHub': {
        txt         : `${createAnchor('@so1tan0v', gitGub.link)}`,
        title_color : '#3daac4',
    }
}

const experience = [
    `
        Between <span style="color: #c4c03d">June 2018</span> and <span style="color: #c4c03d">December 2020</span> (work experience: 2 years 5 mouths), I worked as a technical support specialist.<br>
        <span style="color: #3daac4">My responsibilities were:</span><br>
        &nbsp;&nbsp;• Registration of applications from customers;<br>
        &nbsp;&nbsp;• Communication with customers;<br>
        &nbsp;&nbsp;• Solving problems encountered by customers;<br>
        &nbsp;&nbsp;• Setting up the workplace of the client (doctor);<br>
        &nbsp;&nbsp;• Preparation of technical specifications for the development of new functionality;<br>
        &nbsp;&nbsp;• Reporting;<br>
        &nbsp;&nbsp;• Preparation of the database for the operation of services;<br>
        &nbsp;&nbsp;• Participation in the development and implementation of services<br>
        &nbsp;&nbsp;• Development of templates of printed forms and reports;<br>
        &nbsp;&nbsp;• Preparation of software and hardware.<br>
    `,
    `
        Between <span style="color: #c4c03d">December 2020</span> and <span style="color: #c4c03d">January 2023</span> (work experience: 2 years 2 mouths), I worked as a Full-stack developer.<br>
        <span style="color: #3daac4">My responsibilities were:</span><br>
        &nbsp;&nbsp;• Design and development of new functionality according to the terms of reference;<br>
        &nbsp;&nbsp;• Full-stack support for Web-applications;<br>
        &nbsp;&nbsp;• Integration of Web-applications with external services;<br>
        &nbsp;&nbsp;• Design, development and optimization of database table structures;<br>
        &nbsp;&nbsp;• Optimization of database queries;<br>
        &nbsp;&nbsp;• Improved stability of Web-applications;<br>
        &nbsp;&nbsp;• Increase the resistance of Web-applications to loads;<br>
        &nbsp;&nbsp;• The deployment of Web-applications and the necessary environment of its work;<br>
    `,
    `
        Between 
        <span style="color: #c4c03d">January 2023</span> and <span style="color: #c4c03d">present</span> 
        (work experience: ${workExperienceInCurrentPost.years} ${[0, 1].includes(workExperienceInCurrentPost.years) ? 'year' : 'years'} 
                          ${workExperienceInCurrentPost.months} ${[0, 1].includes(workExperienceInCurrentPost.months) ? 'month' : 'months'}), 
        I work as a Team lead / Middle Software Engineer.<br>
        <span style="color: #3daac4">My responsibilities are:</span><br>
        &nbsp;&nbsp;• Refactor legacy code;<br>
        &nbsp;&nbsp;• Design and development of new functionality according to the technical specifications;<br>
        &nbsp;&nbsp;• Application architecture development;<br>
        &nbsp;&nbsp;• Writing services and microservices in NodeJS;<br>
        &nbsp;&nbsp;• Integration of Web applications with external services;<br>
        &nbsp;&nbsp;• Improving the stability of Web applications;<br>
        &nbsp;&nbsp;• Organization of the work of the WEB development department;<br>
        &nbsp;&nbsp;• Drawing up tasks and monitoring their implementation;<br>
        &nbsp;&nbsp;• Setting up CI/CD for projects;<br>
        &nbsp;&nbsp;• Coordination of customer requirements<br>

    `
];