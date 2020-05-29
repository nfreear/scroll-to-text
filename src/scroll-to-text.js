/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.
*/

import CFG from './config.js';
import { qs /* , param */ } from './util.js';
import { highlight } from './highlight-phrase.js';
// const highlight = require('./highlight-phrase').highlight;

const fetch = window.fetch;

const HOLDER = qs(CFG.selector);
const IFRAME = qs('iframe', HOLDER);
const ORIG = qs('.orig', HOLDER);

const REQUEST_URL = CFG.corsProxy + CFG.url;

console.warn('[STT] config:', CFG);

fetch(REQUEST_URL)
  .then(resp => resp.text())
  .then(html => {
    console.warn('[STT] fetch:', REQUEST_URL); // html)

    const SUFFIX = CFG.pageSuffix.join('\n').replace('{b}', CFG.baseUrl).replace('{col}', CFG.background).replace('{oc}', CFG.occurrence);
    const PREFIX = CFG.pagePrefix.join('\n').replace('{u}', CFG.url);

    const NEW_HTML = PREFIX + highlight(html, CFG.text) + SUFFIX;

    // Fix only needed for 'file:' protocol.
    const FIX_HTML = NEW_HTML; // .replace(/src="\/\//g, 'src="https://');

    console.warn('[STT] modified page:', FIX_HTML);

    IFRAME.setAttribute('srcdoc', FIX_HTML); /* 'data:text/html,' */

    ORIG.href = CFG.url;
  })
  .catch(error => console.error(error));

// End.
