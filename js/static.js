const username = 'solt@about';

const terminalCommands = [
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

const defaultTextPrintTime = 15;

const careerStartDate = '2021-07-01',
      workExperience  = getWorkExperience(careerStartDate);

const informationAboutMe = {
    'name': {
        txt        : `<span style="color: #3daac4">Alex</span>@<span style="color: #3daac4">Soltanov</span>`,
        // txt_color  : '#3daac4',
        show_title : false
    },
    'Position': {
        txt         : `TeamLead / Full-stack Engineer`,
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
        txt         : 'JavaScript, PHP',
        title_color : '#3daac4',
        leaves    : {
            'Frameworks' : {
                title_color : '#c4c03d',
                leaves      : {
                    'JavaScript': {
                        txt         : 'jQuery',
                        title_color : '#c4733d'
                    },
                    'NodeJS': {
                        txt         : 'Express, Sequelize',
                        title_color : '#c4733d'
                    },
                    'PHP': {
                        txt         : 'Symfony',
                        title_color : '#c4733d'
                    },
                }
            },
            'Language versions': {
                title_color : '#c4c03d',
                leaves      : {
                    'JavaScript': {
                        txt         : 'ES6',
                        title_color : '#c4733d'
                    },
                    'PHP': {
                        txt         : '5.6, 7.4, 8.1',
                        title_color : '#c4733d'
                    },
                }
            }
        }
    },
    'Databases': {
        txt         : `MySQL, PostgreSQL`,
        title_color : '#3daac4',
    },
    'Web servers': {
        txt         : `Apache, Nginx`,
        title_color : '#3daac4',
    }
}

const gitGub = {
    link: 'https://github.com/so1tan0v',
    projects: [
        {
            name: 'coffee-shop-bot',
            link: 'https://github.com/so1tan0v/coffee-shop-bot'
        },
        {
            name: 'business-card',
            link: 'https://github.com/so1tan0v/business-card'
        },
        {
            name: 'business-card-navigation-page',
            link: 'https://github.com/so1tan0v/business-card-navigation-page'
        },
    ]
}

const links = {
    'E-mail': {
        txt         : `<a href="mailto:so1tan0v@gmail.com" target="_blank"> so1tan0v@gmail.com</a>`,
        title_color : '#3daac4',
    },
    'Telegram': {
        txt         : `<a href="https://t.me/so1tan0v" target="_blank"> @so1tan0v</a>`,
        title_color : '#3daac4',
    },
    'GitHub': {
        txt         : `<a href="${gitGub.link}" target="_blank"> @so1tan0v</a>`,
        title_color : '#3daac4',
    }
}

const startDateInCurrentPost      = '2022-12-31',
      workExperienceInCurrentPost = getWorkExperience(startDateInCurrentPost);

const experience = [
    `
        Between <span style="color: #c4c03d">June 2018</span> and <span style="color: #c4c03d">July 2021</span> (work experience: 3 years 9 mouths), I worked as a technical support specialist.<br>
        <span style="color: #3daac4">My responsibilities was:</span><br>
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
        Between <span style="color: #c4c03d">August 2021</span> and <span style="color: #c4c03d">January 2023</span> (work experience: 1 years 6 mouths), I worked as a Full-stack developer.<br>
        <span style="color: #3daac4">My responsibilities was:</span><br>
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
        I work as a TeamLead / Full-stack Engineer.<br>
        <span style="color: #3daac4">My responsibilities is:</span><br>
        &nbsp;&nbsp;• Organization of the work of the WEB development department;<br>
        &nbsp;&nbsp;• Design and development of new functionality according to the terms of reference;<br>
        &nbsp;&nbsp;• Coordination of customer requirements;<br>
        &nbsp;&nbsp;• Application architecture development;<br>
        &nbsp;&nbsp;• Preparation of tasks and control of their implementation;<br>
        &nbsp;&nbsp;• Integration of Web-applications with external services;<br>
        &nbsp;&nbsp;• Improved stability of Web-applications;<br>
        &nbsp;&nbsp;• Legacy code refactoring;<br>
    `
];