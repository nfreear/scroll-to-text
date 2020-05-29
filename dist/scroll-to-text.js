(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
  highlight-phrase.js (Or word).

  © Nick Freear, 07-February-2019.
*/

module.exports = {
  highlight: highlight,
  highlightPhrase: highlightPhrase,
  highlightWord: highlightWord
};

function mark (idx) {
  return '<mark class="wh-highlight" title="# %s" id="stt-%s">'.replace(/%s/g, idx);
}

function markClose () {
  return '</mark>';
}

function highlight (text, query) {
  if (!text) throw Error('No text provided');
  if (typeof text !== 'string') throw Error('Passed paramater is not a string');
  if (!query) throw Error('No query provided');
  if (typeof query !== 'string') { throw Error('Passed paramater is not a string'); }

  // Crude, but effective ?!
  if (query.split(' ').length === 1) {
    return highlightWord(text, query);
  } else {
    return highlightPhrase(text, query);
  }
}

function highlightPhrase (text, query) {
  const q1 = query.split(' ')[ 0 ];
  const q2 = query.split(' ')[ 1 ] || null;

  console.warn(q1, q2);

  let alsoMatch = false;
  let count = 0;

  return text
    .split(' ')
    .map((word, idx, ar) => {
      const charIndex = alsoMatch ? word.indexOf(q2) : word.indexOf(q1);

      const plusOne = ar[ idx + 1 ];
      const prevMatch = alsoMatch;

      // Fixed position of brackets.
      alsoMatch = q2 ? (plusOne && plusOne.indexOf(q2) >= 0) : true;

      // console.warn(idx, word, plusOne, alsoMatch);

      if (charIndex >= 0 && (alsoMatch || prevMatch)) {
        count++;

        word = insertString(word, charIndex, mark(count));
        word = insertString(word, word.length, markClose());
      }

      return word;
    })
    .join(' ');
}

/*!
  highlight-word: Copyright (c) 2018 Dave Bitter | MIT License
*/
// Source :- https://npmjs.com/package/highlight-word
// https://github.com/DaveBitter/highlight_word/blob/05d786a1447f/index.js

function insertString (str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function highlightWord (text, query) {
  if (!text) throw Error('No text provided');
  if (typeof text !== 'string') throw Error('Passed paramater is not a string');
  if (!query) throw Error('No query provided');
  if (typeof query !== 'string') { throw Error('Passed paramater is not a string'); }

  let count = 0;

  return text
    .split(' ')
    .map(word => {
      const charIndex = word.indexOf(query);

      if (charIndex >= 0) {
        count++;

        word = insertString(word, charIndex, mark(count)); // Was: '<mark class="wh-highlight">'
        word = insertString(word, word.length, markClose());
      }

      return word;
    })
    .join(' ');
}

// End.

},{}],2:[function(require,module,exports){
/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.
*/

const highlight = require('./highlight-phrase').highlight;
const fetch = window.fetch;
const LOC = window.location;

const DEFAULTS = {
  selector: '#scroll-to-text',
  url: param('url', 'https://scrolltotext.github.io/test/if.html'), // Was: 'http://americanrhetoric.com/speeches/mlkihaveadream.htm'
  text: param('text', 'dream'), // Was: 'Its creed'
  occurrence: parseInt(param('occurrence', 1)),
  background: param('bg', 'yellow'),
  corsProxy: parseInt(param('cp', 1)) ? 'https://cors.io/?' : '',
  // corsProxy: 'https://cors-anywhere.herokuapp.com/',
  pagePrefix: [
    '<base href="{u}" target="_top" />'
  ],
  pageSuffix: [
    '\n<!-- Injected by: scroll-to-text.js -->',
    // '<base href="{u}" target="_top" />',
    '<script src="{b}/src/scroll-to-driver.js" data-stt-occurrence="{oc}"></script>',
    '<style> .wh-highlight { background: {col}; border-radius: 5px; color: #005; cursor: help; padding: 1px 3px; }',
    ' .wh-highlight.stt { border: 3px dotted darkorange; } html, body { scroll-behavior: smooth; } </style>'
  ],
  baseUrl: LOC.origin + LOC.pathname
};

const CFG = /* extends */ DEFAULTS;

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

    IFRAME.setAttribute('srcdoc', NEW_HTML); /* 'data:text/html,' */
    ORIG.href = CFG.url;
  })
  .catch(error => console.error(error));

function qs (selector, element) {
  return (element || document).querySelector(selector);
}

function param (pmName, defaultPm) {
  defaultPm = defaultPm || null;
  const RE = new RegExp('[?&]' + pmName + '=(.+?)(:?&|$)'); // (/text=(.+?)(:?&|$)/) (/url=(https?.+?)(:?&|$)/) (/bg=(\w+?)(:?&|$)/);
  const MAT = LOC.search.match(RE);
  const VALUE = decodeURIComponent(MAT ? MAT[ 1 ] : defaultPm).replace(/\+/g, ' '); // BUG fix: why '+', not '%20' ?!

  // Security.
  if (/([<>;]|javascript:)/i.test(VALUE)) {
    throw Error('[STT] Security: XSS injection attempt :~ ' + VALUE);
  }
  return VALUE;
}

},{"./highlight-phrase":1}]},{},[2]);
