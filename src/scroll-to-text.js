/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.

  file:///Users/ndf42/workspace/scroll-to-text/index.html?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings
*/

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
  baseUrl: L.origin // Was: 'file:///Users/ndf42/workspace/scroll-to-text'
};

const CFG = /* extends */ DEFAULTS;
const QUERY = window.location.search;
const fetch = window.fetch;

var urlMatch = QUERY.match(/url=(https?.+?)(:?&|$)/);
var textMatch = QUERY.match(/text=(.+?)(:?&|$)/);
var colorMatch = QUERY.match(/bg=(\w+?)(:?&|$)/);

const URL = decodeURIComponent(urlMatch ? urlMatch[ 1 ] : CFG.example.url);
const TEXT = decodeURIComponent(textMatch ? textMatch[ 1 ] : CFG.example.text);
const COLOR = decodeURIComponent(colorMatch ? colorMatch[ 1 ]: CFG.background);

const HOLDER = q(CFG.selector);
const IFRAME = q('iframe', HOLDER);

const BASE = /* 'data:text/html,' */ '<base href="%s" target="_top" />'.replace(/%s/, URL);
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

  IFRAME.setAttribute('srcdoc', /* BASE + */ NEW_HTML); // resp.text);
});

function q(selector, element) {
  return (element || document).querySelector(selector);
}

// --------------------------------------------------------------------
// https://npmjs.com/package/highlight-word
// https://github.com/DaveBitter/highlight_word/tree/05d786a144

function insertString(str, index, value) {
	return str.substr(0, index) + value + str.substr(index);
}

function highlight(text, query) {
	if (!text) throw Error('No text provided');
	if (typeof text !== 'string') throw Error('Passed paramater is not a string');
	if (!query) throw Error('No query provided');
	if (typeof query !== 'string')
		throw Error('Passed paramater is not a string');

	return text
		.split(' ')
		.map(word => {
			const charIndex = word.indexOf(query);
			if (charIndex >= 0) {
				word = insertString(word, charIndex, '<mark class="wh-highlight">');
				word = insertString(word, word.length, '</mark>');
			}

			return word;
		})
		.join(' ');
}
