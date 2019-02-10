/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.
*/

const highlight = require('./highlight-phrase').highlight;
const fetch = window.fetch;
const LOC = window.location;

const DEFAULTS = {
  selector: '#scroll-to-text',
  url: param('url', 'https://americanrhetoric.com/speeches/mlkihaveadream.htm'),
  text: param('text', 'its creed'),
  background: param('bg', 'yellow'),
  // corsProxy: 'https://corsproxy.github.io/?',
  corsProxy: 'https://cors-anywhere.herokuapp.com/',
  example: {
    url: 'https://www.gutenberg.org/files/2350/2350-h/2350-h.htm',
    text: 'May I offer you a glass'
    // text: 'EPUB (no images)' // 'We have been allies'
  },
  pagePrefix: [
    '<base href="{u}" target="_top" />'
  ],
  pageSuffix: [
    '\n<!-- Injected by: scroll-to-text.js -->',
    // '<base href="{u}" target="_top" />',
    '<script src="{b}/src/scroll-to-driver.js"></script>',
    '<style> .wh-highlight { background: {c}; border-radius: 5px; padding: 4px; }</style>',
    ''
  ],
  baseUrl: LOC.origin
};

const CFG = /* extends */ DEFAULTS;

const HOLDER = qs(CFG.selector);
const IFRAME = qs('iframe', HOLDER);

const REQUEST_URL = CFG.corsProxy + CFG.url;

console.warn('[STT] config:', CFG);

fetch(REQUEST_URL)
  .then(resp => resp.text())
  .then(html => {
    console.warn('[STT] then page:', html);

    const SUFFIX = CFG.pageSuffix.join('\n').replace('{u}', CFG.url).replace('{b}', CFG.baseUrl).replace('{c}', CFG.background);
    const PREFIX = CFG.pagePrefix.join('\n').replace('{u}', CFG.url);

    const NEW_HTML = PREFIX + highlight(html, CFG.text) + SUFFIX;

    // Fix only needed for 'file:' protocol.
    const FIX_HTML = NEW_HTML; // .replace(/src="\/\//g, 'src="https://');

    console.warn('[STT] modified page:', FIX_HTML);

    IFRAME.setAttribute('srcdoc', NEW_HTML); /* 'data:text/html,' */
  })
  .catch(error => console.error(error));

function qs (selector, element) {
  return (element || document).querySelector(selector);
}

function param (pmName, defaultPm) {
  defaultPm = defaultPm || null;
  const RE = new RegExp('[?&]' + pmName + '=(.+?)(:?&|$)'); // (/text=(.+?)(:?&|$)/) (/url=(https?.+?)(:?&|$)/) (/bg=(\w+?)(:?&|$)/);
  const MAT = LOC.search.match(RE);
  const VALUE = decodeURIComponent(MAT ? MAT[ 1 ] : defaultPm);

  // Security.
  if (/([<>;]|javascript:)/i.test(VALUE)) {
    throw Error('[STT] Security: XSS injection attempt :~ ' + VALUE);
  }
  return VALUE;
}
