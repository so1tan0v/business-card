let term;
var util = util || {};
util.toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
};

var Terminal = Terminal || function(cmdLineContainer, outputContainer) {
    window.URL = window.URL || window.webkitURL;
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

    let that = this;
    let cmdLine_ = document.querySelector(cmdLineContainer);
    let output_ = document.querySelector(outputContainer);

    const terminal_commands = [
        'clear', 'date', 'echo', 'help', 'uname', 'aboutfetch', 'easteregg', 'git projects'
    ];

    let history_ = [];
    let histpos_ = 0;
    let histtemp_ = 0;

    window.addEventListener('click', function() {
        cmdLine_.focus();
    }, false);

    cmdLine_.addEventListener('click', inputTextClick_, false);
    cmdLine_.addEventListener('keydown', historyHandler_, false);
    cmdLine_.addEventListener('keydown', processNewCommand_, false);

    //
    function inputTextClick_() {
        // this.value = this.value;
    }

    //
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

    function pressingEnter() {
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

        execCMD(cmd, args);

        $(line).find('.cmdline')[0].scrollIntoView();
        this.value = ''; // Clear/setup line for next input.
    }
    that.pressingEnter = pressingEnter;
    //
    function processNewCommand_(e) {
        if (e.keyCode === 9) { // tab
            e.preventDefault();
            // Implement tab suggest.
        } else if (e.keyCode === 13) { // enter
            pressingEnter.call(this);
        }
    }

    //
    /*function formatColumns_(entries) {
        let maxName = entries[0].name;
        util.toArray(entries).forEach(function(entry) {
            if (entry.name.length > maxName.length) {
                maxName = entry.name;
            }
        });

        let height = entries.length <= 3 ?
            'height: ' + (entries.length * 15) + 'px;' : '';

        // 12px monospace font yields ~7px screen width.
        let colWidth = maxName.length * 7;

        return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'];
    }*/

    //
    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
    }

    // Cross-browser impl to get document's height.
    function getDocHeight_() {
        let d = document;
        return Math.max(
            Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
            Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
            Math.max(d.body.clientHeight, d.documentElement.clientHeight)
        );
    }

    function execCMD(cmd, args){
        switch (cmd) {
            case 'cat':
                let url = args.join(' ');
                if (!url) {
                    output('Usage: ' + cmd + ' https://s.codepen.io/...');
                    output('Example: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
                    break;
                }
                $.get( url, function(data) {
                    let encodedStr = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
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
                    <div class="ls-files">
                        ${terminalCommands.map(item => `<span class   = "link" 
                                                   onclick = "keyboardInputEmission('${item}', $('.cmdline:not(.used)'))" 
                                             >${item}</span>`).join('<br>')}
                    </div>
                `);
                break;
            case 'uname':
                output(navigator.appVersion);
                break;
            case 'whoami':
                /*
                let result = "<img src=\"" + codehelper_ip["Flag"]+ "\"><br><br>";
                for (let prop in codehelper_ip)
                    result += prop + ": " + codehelper_ip[prop] + "<br>";
                output(result);
                 */
                break;
            case 'aboutfetch':
            case 'me':
                // https://manytools.org/hacker-tools/convert-images-to-ascii-art/go/
                output(`
                    <table style="width: 100%">
                        <tr>
                            <td style="width: 370px">
                                ${myPhoto}
                            </td>
                            <td style="font-size: 10pt">
                                <span style="color: #3daac4">Alex</span>@<span style="color: #3daac4">Soltanov</span><br>
                                <span style="color: #3daac4">Position:</span> TeamLead / Full-stack Engineer <br>
                                <span style="color: #3daac4">Work experience:</span> 1 year 9 mouths <br>
                                <span style="color: #3daac4">Programming languages:</span> JavaScript, PHP <br>
                                &nbsp;&nbsp;<span style="color: #c4c03d">Frameworks:</span> <br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c4733d">JavaScript:</span> jQuery;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c4733d">NodeJS:</span> Express, Nodemon, Sequelize<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c4733d">PHP:</span> Symfony;<br>
                                &nbsp;&nbsp;<span style="color: #c4c03d">Language versions:</span><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c4733d">JavaScript:</span> ES6;<br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c4733d">PHP:</span> 5.6, 7.4, 8.1;<br>
                                <span style="color: #3daac4">Databases:</span> MySQL, PostgreSQL<br>
                                <span style="color: #3daac4">Web servers:</span> Apache, Nginx <br>
                                <br>
                                <span style="color: #3daac4">E-mail:</span><a href="mailto:so1tan0v@gmail.com" target="_blank"> so1tan0v@gmail.com</a><br>
                                <span style="color: #3daac4">Telegram:</span><a href="https://t.me/thisIsOtval" target="_blank"> @so1tan0v</a><br>
                                <span style="color: #3daac4">GitHub:</span><a href="https://github.com/so1tan0v" target="_blank"> @so1tan0v</a><br>
                            </td>
                        </tr>
                    </table>
                `)
                // output("<br><strong>Rafael Casachi</strong>");
                // output('<em>sashasyltanov@gmail.com | <a href="https://www.rafaelcasachi.dev" target="blank" style="color:#c36d3c!important">https://www.rafaelcasachi.dev</a></em>');
                break;
            case 'experience':
                let $prompt = $('.prompt');
                $prompt.hide();
                output(`
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
                `);
                setTimeout(() => {
                    output(`
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
                    `)
                    $('.cmdline:not(.used)')[0].scrollIntoView();
                }, 1000)
                setTimeout(() => {
                    output(`
                        Between <span style="color: #c4c03d">August 2021</span> and <span style="color: #c4c03d">present</span> (work experience: 3 mouths), I work as a TeamLead / Full-stack Engineer.<br>
                        <span style="color: #3daac4">My responsibilities is:</span><br>
                        &nbsp;&nbsp;• Organization of the work of the WEB development department;<br>
                        &nbsp;&nbsp;• Design and development of new functionality according to the terms of reference;<br>
                        &nbsp;&nbsp;• Coordination of customer requirements;<br>
                        &nbsp;&nbsp;• Application architecture development;<br>
                        &nbsp;&nbsp;• Preparation of tasks and control of their implementation;<br>
                        &nbsp;&nbsp;• Integration of Web-applications with external services;<br>
                        &nbsp;&nbsp;• Improved stability of Web-applications;<br>
                        &nbsp;&nbsp;• Legacy code refactoring;<br>
                    `);
                    $('.cmdline:not(.used)')[0].scrollIntoView();
                    $prompt.show();
                }, 2000);
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
                        output(`You can watch my  <a href="https://github.com/so1tan0v" target="_blank">GitHub</a>!`);
                        output(`
                            <div>
                                1. <a href="https://github.com/so1tan0v/coffie-shop-bot" target="_blank">coffie-shop-bot</a>;<br>
                                2. <a href="https://github.com/so1tan0v/no-link" target="_blank">about-me-info</a>.
                            </div>
                        `);
                        output(`I have few projects, soon there will be many projects!`);
                        break;
                    case 'link':
                        output(`
                            <a href="https://github.com/so1tan0v" target="_blank">so1tan0v</a>
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
            default:
                if (cmd) {
                    output(cmd + ': command not found');
                }
        }
    }


    return {
        init: function() {
            output(navigator.appVersion);
            output('<div>' + new Date() + '<br>Enter "help" for more information.</div>');
            // output('<div>Enter "help" for more information.</div>');
        },
        output,
        pressingEnter: pressingEnter
    }
};

function keyboardInputEmission(text, $input) {
    $input.prop('disabled', true);
    return new Promise(resolve => {
        let text_arr = text.split('');
        let i = 0;
        let _timer = null;

        function _showLetter() {
            if (i >= text_arr.length) {
                clearInterval(_timer);
                $input.prop('disabled', false);
                term.pressingEnter.call($input[0])
                resolve(true);
                return;
            }

            $input.val($input.val() + text_arr[i++]);
        }

        _timer = setInterval(_showLetter, 170);
    })
}

$(function() {
    $('.dialog').dialog({
        title  : `${username}:~`,
        width  : 1100,
        height : 700
    });

    $('.prompt').html(`[${username}] # `);

    term = new Terminal('#input-line .cmdline', '#wrapper output');
    term.init();

    const starterWord = 'aboutfetch';
    let $input = $('.cmdline');

    keyboardInputEmission(starterWord, $input).then(async () => {
        setTimeout(async () => {
            await keyboardInputEmission('help', $input);
        }, 200);
    })
});