const url = new URL(window.location);

const LAST_VISIT_DATE = 'LAST_VISIT_DATE';

let term;
let langPage = url.searchParams.get('lang') ?? 'en';
$('html').attr('lang', langPage);

if (langPage !== 'en') {
  setSearchParams({
    lang: langPage
  });
}

$(async function () {
  const $dialog = $('.dialog');
  let heightPage = $(window).height() * 0.9;
  let widthPage = $(window).width() * 0.9;

  $dialog.dialog({
    title: `${username}:~`,
    width: widthPage < 1200 ? widthPage : 1200,
    height: heightPage < 800 ? heightPage : 800,
    resizable: false,
    open: function () {
      $(this).css('overflow-x', 'hidden');
    }
  });

  const starterWord = 'aboutfetch';
  const $input = $('.cmdline');
  const $prompt = $('.prompt');

  $prompt.html(`[${username}] # `);

  term = new Terminal('#input-line .cmdline', '#wrapper output');
  term.init(localStorage.getItem(LAST_VISIT_DATE) ?? 'Never');

  await keyboardInputEmission(starterWord, $input);
  $(window).resize(function () {
    let heightPage = $(window).height() * 0.9;
    let widthPage = $(window).width() * 0.9;

    $dialog.dialog('option', 'width', widthPage < 1100 ? widthPage : 1100);
    $dialog.dialog('option', 'height', heightPage < 700 ? heightPage : 900);
  });

  $(document).keyup(function (e) {
    if ($input.is(':focus')) return;

    const value = nonAlphabeticKeys.includes(e.keyCode) ? `` : e.key;

    $input.focus().val(value);
  });
  $dialog.on('dialogclose', function () {
    showBlackWindow();
  });

  const date = new Date();
  const formattedDate = date.toDateString() + ' ' + date.toLocaleTimeString().slice(0, 8);

  localStorage.setItem(LAST_VISIT_DATE, `${formattedDate} on ttys010`);
});
