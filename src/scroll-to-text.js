/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.
*/

const highlight = require('./highlight-phrase').highlight;
const L = window.location;

const DEFAULTS = {
  selector: '#scroll-to-text',
  // corsProxy: 'https://corsproxy.github.io/?',
  corsProxy: 'https://cors-anywhere.herokuapp.com/',
  example: {
    url: 'https://www.gutenberg.org/files/2350/2350-h/2350-h.htm',
    text: 'May I offer you a glass'
    // text: 'EPUB (no images)' // 'We have been allies'
  },
  pageSuffix: [
    '\n<!-- Injected by: scroll-to-text.js -->',
    '<base href="{u}" target="_top" />',
    '<script src="{b}/src/scroll-to-driver.js"></script>',
    '<style> .wh-highlight { background: {c}; border-radius: 5px; padding: 4px; }</style>',
    ''
  ],
  background: 'yellow',
  baseUrl: L.origin
};

const CFG = /* extends */ DEFAULTS;
const QUERY = window.location.search;
const fetch = window.fetch;

var urlMatch = QUERY.match(/url=(https?.+?)(:?&|$)/);
var textMatch = QUERY.match(/text=(.+?)(:?&|$)/);
var colorMatch = QUERY.match(/bg=(\w+?)(:?&|$)/);

const URL = decodeURIComponent(urlMatch ? urlMatch[ 1 ] : CFG.example.url);
const TEXT = decodeURIComponent(textMatch ? textMatch[ 1 ] : CFG.example.text);
const COLOR = decodeURIComponent(colorMatch ? colorMatch[ 1 ] : CFG.background);

const HOLDER = q(CFG.selector);
const IFRAME = q('iframe', HOLDER);

const REQUEST_URL = CFG.corsProxy + URL;

console.warn('[STT] text:', TEXT, CFG);

fetch(REQUEST_URL)
  .then(resp => resp.text())
  .then(html => {
    console.warn('[STT] then page:', html);

    const SUFFIX = CFG.pageSuffix.join('\n').replace('{u}', URL).replace('{b}', CFG.baseUrl).replace('{c}', COLOR);
    const NEW_HTML = highlight(html, TEXT) + SUFFIX;

    // Fix only needed for 'file:' protocol.
    const FIX_HTML = NEW_HTML; // .replace(/src="\/\//g, 'src="https://');

    console.warn('[STT] modified page:', FIX_HTML);

    IFRAME.setAttribute('srcdoc', /* BASE + */ NEW_HTML); /* 'data:text/html,' */
  });

function q (selector, element) {
  return (element || document).querySelector(selector);
}
