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

const careerStartDate = '2021-08-01',
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

const links = {
    'E-mail': {
        txt         : `<a href="mailto:so1tan0v@gmail.com" target="_blank"> so1tan0v@gmail.com</a>`,
        title_color : '#3daac4',
    },
    'Telegram': {
        txt         : `<a href="https://t.me/thisIsOtval" target="_blank"> @so1tan0v</a>`,
        title_color : '#3daac4',
    },
    'GitHub': {
        txt         : `<a href="https://github.com/so1tan0v" target="_blank"> @so1tan0v</a>`,
        title_color : '#3daac4',
    }
}