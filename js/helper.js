function getWorkExperience(date) {
    let currentDate = new Date().getTime(),
        secondDate  = new Date(date).getTime(),
        dateDiff    = (currentDate - secondDate) / 1000,
        yearDiff    = Math.abs(Math.round(dateDiff/365)),
        monthDiff   = Math.abs(Math.round((yearDiff * 365 - dateDiff) / 30));

    return {
        years  : yearDiff,
        months : monthDiff
    };
}

function getAllInformationAboutMe() {
    let html = '',
        info = parseInformationAboutMe(informationAboutMe);

    if(links) {
        info += '<br>';
        for(let linkCategory in links) {
            let linkCategoryData = links[linkCategory];

            let title = `
                <span ${linkCategoryData.title_color
                         ? `style="color: ${linkCategoryData.title_color}"`
                         : ``}
                >${linkCategory}</span>:
            `;

            let txt = `
                <span ${linkCategoryData.txt_color
                          ? `style="color: ${linkCategoryData.txt_color}"`
                          : ``}"
                >${linkCategoryData.txt}</span><br>
            `;

            info += title + txt;
        }
    }

    if(myPhoto) {
        html = `
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-xl-5 align-items-sm-center justify-content-center" style="display: inherit;">
                        ${myPhoto}
                    </div>
                    <div class="col-md-12 col-xl-7 p-0 pt-2 m-0">
                        ${info}
                    </div>
                </div>
            </div>
        `;
    } else {
        html = info
    }
    return html;
}
function parseInformationAboutMe(infoObject, layer = 0) {
    let html = '';

    for(let category in infoObject) {
        let categoryData = infoObject[category];

        let lineEdge = '';
        if(layer)
            for(let i = 0; i < layer; i++)
                lineEdge += `&nbsp;&nbsp;`;

        let title = !(categoryData?.show_title === false)
            ? `
                <span ${categoryData.title_color
                         ? `style="color: ${categoryData.title_color}"`
                         : ``}
                >${category}</span>: ${categoryData?.leaves ? `<br>` : ``}
            `
            : ``;

        let txt = categoryData?.leaves
            ? parseInformationAboutMe(categoryData?.leaves, layer + 1)
            : `
                <span ${categoryData.txt_color
                          ? `style="color: ${categoryData.txt_color}"`
                          : ``}"
                >${categoryData.txt}</span><br>
            `;

        html += lineEdge + title + txt;
    }

    return html;
}

async function asyncTyped(DOMselector, message, typedParams = {
    typeSpeed  : defaultTextPrintTime,
    showCursor : false
}) {
    return new Promise(resolve => {
        if(typeof message === 'string')
           message = [message];

        typedParams.strings = message;
        typedParams.onComplete = () => {
            resolve(true)
        }

        new Typed(DOMselector, typedParams);
    })
}

async function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(true), time)
    })
}

async function onCloseDialog() {
    $('.model').hide();
    $('.black-screen').show();

    $('#system-info').text(navigator.appVersion);
    await asyncTyped('#typed', `You can't close the terminal. Permission denied.`, {
        typeSpeed  : 20,
        showCursor : false
    })

    $('#timer-div').show();
    await asyncTyped('#timer', ['3', '2', '1', '0'], {
        typeSpeed  : 100,
        showCursor : false
    });
    location.reload();
}