let Terminal = function(cmdLineContainer, outputContainer) {
    let that = this;
    let cmdLine_ = document.querySelector(cmdLineContainer);
    let output_ = document.querySelector(outputContainer);

    let history_ = [];
    let histpos_ = 0;
    let histtemp_ = 0;

    cmdLine_.addEventListener('keydown', historyHandler_, false);
    cmdLine_.addEventListener('keydown', processNewCommand_, false);

    function historyHandler_(e) {
        if (history_.length) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                if (history_[histpos_]) {
                    history_[histpos_] = this.value;
                } else {
                    histtemp_ = this.value;
                }
            }

            if (e.keyCode === 38) { // up
                histpos_--;
                if (histpos_ < 0) {
                    histpos_ = 0;
                }
            } else if (e.keyCode === 40) { // down
                histpos_++;
                if (histpos_ > history_.length) {
                    histpos_ = history_.length;
                }
            }

            if (e.keyCode === 38 || e.keyCode === 40) {
                this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
                // this.value = this.value; // Sets cursor to end of input.
            }
        }
    }

    async function pressingEnter(value = '') {
        return new Promise(async resolve => {
            // Save shell history.
            if (this.value) {
                history_[history_.length] = this.value;
                histpos_ = history_.length;
            }

            // Duplicate current input and append to output section.
            let line = this.parentNode.parentNode.cloneNode(true);
            line.removeAttribute('id')
            line.classList.add('line');
            let input = line.querySelector('input.cmdline');
            input.autofocus = false;
            input.readOnly = true;
            $(input).addClass('used');
            output_.appendChild(line);

            let args,
                cmd;

            if (this.value && this.value.trim()) {
                args = this.value.split(' ').filter(function(val) {
                    return val;
                });
                cmd = args[0].toLowerCase();
                args = args.splice(1); // Remove cmd from arg list.
            }

            await execCMD(cmd, args);

            $(line).find('.cmdline')[0].scrollIntoView();
            this.value = value; // Clear/setup line for next input.
            resolve(true);
        });
    }
    that.pressingEnter = pressingEnter;

    async function processNewCommand_(e) {
        if (e.keyCode === 9) {
            const $input = $('.cmdline:not(.used)');
            if(!$input.val().trim()) {
                e.preventDefault();
                return;
            }
            const availableCommands = terminalCommands.filter((command) => command.indexOf($input.val()) === 0);
            switch (availableCommands.length) {
                case 0:
                    e.preventDefault();
                    break;
                case 1:
                    $input.val(availableCommands[0])
                    break;
                default:
                    let line = this.parentNode.parentNode.cloneNode(true);
                    line.removeAttribute('id')
                    line.classList.add('line');
                    let input = line.querySelector('input.cmdline');
                    input.autofocus = false;
                    input.readOnly = true;
                    $(input).addClass('used');
                    output_.appendChild(line);
                    output(`
                        <div class="ls-files row">
                            ${availableCommands.map(item => `
                                <div class="col-md-2">
                                    <span class   = "link" 
                                        onclick = "keyboardInputEmission('${item}', $('.cmdline:not(.used)'))" 
                                    >${item}</span>
                                </div>
                            `).join('<br>')}
                        </div>
                    `);
                    break;
            }
            e.preventDefault();
        } else if (e.keyCode === 13) { // enter
            await pressingEnter.call(this);
        }
    }

    async function execCMD(cmd, args){
        switch (cmd) {
            case 'cat':
                let url = args.join(' ');
                if (!url) {
                    output('Usage: ' + cmd + ' https://s.codepen.io/...');
                    output('Example: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
                    break;
                }
                $.get( url, function(data) {
                    let encodedStr = data.replace(/[\u00A0-\u9999<>&]/gim, function(i) {
                        return '&#'+i.charCodeAt(0)+';';
                    });
                    output('<pre>' + encodedStr + '</pre>');
                });
                break;
            case 'clear':
                output_.innerHTML = '';
                this.value = '';
                return;
            case 'date':
                output( new Date() );
                break;
            case 'echo':
                output( args.join(' ') );
                break;
            case 'help':
                output('This is a page about Alexander Soltanov.<br>In this terminal you can find out about me and my projects.');
                output('Write a command or click on it!');
                output(`
                    <div class="ls-files row">
                        ${terminalCommands.map(item => `
                            <div class="col-md-2">
                                <span class   = "link" 
                                    onclick = "keyboardInputEmission('${item}', $('.cmdline:not(.used)'))" 
                                >${item}</span>
                            </div>
                        `).join('<br>')}
                    </div>
                `);
                break;
            case 'uname':
                output(navigator?.appVersion);
                break;
            case 'aboutfetch':
            case 'me':
                let infoAboutMe = getAllInformationAboutMe();
                output(infoAboutMe);
                const help = `<span class   = "link" 
                                    onclick = "keyboardInputEmission('help', $('.cmdline:not(.used)'))" 
                              >help</span>`;

                output(`<div>${new Date()}<br>Enter or click "${help}" for more information.</div>`);
                break;
            case 'experience':
                let $prompt = $('.prompt');
                $prompt.hide();
                if(typeof experience === 'string')
                    output(experience);
                else
                    for (let item of experience) {
                        output(item);
                        $('.cmdline:not(.used)')[0].scrollIntoView();
                        await sleep(1000);
                    }
                $prompt.show();
                break;
            case 'git':
                if(!args[0])
                    args[0] = '';

                switch (args[0]) {
                    case '':
                    case '-h':
                    case '--help':
                        output(`use: git [-h | --help]<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [args]
                        `);
                        output(`information about my projects<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class   = "link" 
                                       onclick = "keyboardInputEmission('git projects', $('.cmdline:not(.used)'))" 
                                  >projects</span>
                        `);
                        output(`link to my GitHub<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class   = "link" 
                                       onclick = "keyboardInputEmission('git link', $('.cmdline:not(.used)'))" 
                                 >link</span>
                        `);
                        break;
                    case 'projects':
                        output(`You can watch my  <a href="${gitGub.link}" target="_blank">GitHub</a>!`);
                        output(`
                            <div>
                                ${gitGub.projects.map((project, key) => {
                                    return `${key + 1}. <a href="${project.link}" target="_blank"> ${project.name}</a>`
                                }).join(`<br>`)}
                            </div>
                        `);
                        output(`I have few projects, soon there will be many projects!`);
                        break;
                    case 'link':
                        output(`
                            <a href="${gitGub.link}" target="_blank">so1tan0v</a>
                        `);
                        break;
                    default:
                        output(`git: «${args[0] ? args[0] : ''}» is not a git command. See 'git --help'.`)
                }
                break;
            case 'easteregg':
                output(`<pre>`  +
`  (\\___/)
  (='.'=)
E[:]||||[:]3
  (")_(")                          \\|||/
                                   (o o)
+-------------------------------ooO-(_)-Ooo------------------------------+
|                      Keine Frau, nur Vaseline......                    |
|                      UNAUTHORIZED ACCESS PROHIBITED                    |
|                                 |     |                                |
|                                  \\   /                                 |
|   NOBODY CAN HACK ME !!!          | |    HACK YOURSELF A NOOSE !!!     |
|                                 ( ) ( )        BEWARE OF ACCIDENT -    |
|   DNF instead of YUM           ||     || DON'T INSTALL PODMAN HERE!!!  |
+------------------------------------------------------------------------+
                                ooO     Ooo
` + `</pre>`);
                break;
            case 'changelang':
                if(!args[0])
                    args[0] = '';

                switch (args[0]) {
                    case '':
                    case '-h':
                    case '--help':
                        output(`use: changelang [-h | --help]<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command [arg]
                        `);
                        output(`Set Russian language<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class   = "link" 
                                       onclick = "keyboardInputEmission('changelang ru', $('.cmdline:not(.used)'))" 
                                  >ru</span>
                        `);
                        output(`Set English language<br>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class   = "link" 
                                       onclick = "keyboardInputEmission('changelang en', $('.cmdline:not(.used)'))" 
                                 >en</span>
                        `);
                        break;
                    case 'ru':
                    case 'en':
                        await setLanguage(args[0]);
                        break;
                    default:
                        output(`changelang: «${args[0] ? args[0] : ''}» is not a changelang command. See 'changelang --help'.`)
                }
                break;
            default:
                if (cmd) {
                    output(cmd + ': command not found');
                }
        }
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
    }

    return {
        init: function() {
            output(navigator?.appVersion);
            output(`<div>${new Date()}</div>`);
        },
        output,
        pressingEnter,
        history_
    }
};