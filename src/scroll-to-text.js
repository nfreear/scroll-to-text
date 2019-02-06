/*!
  scroll-to-text.js

  © Nick Freear, 29-June-2018.

  file:///Users/ndf42/workspace/scroll-to-text/index.html?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings
*/

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
    '<base href="%s" target="_top" />',
    // '<script src="https://unpkg.com/html-highlighter@0.4.2/dist/htmlhighlighter.min.js"></script>',
    // '<script src="https://unpkg.com/highlight-word@1.0.0/bundle.js"></script>',
    // '<script src="https://unpkg.com/scroll-js@2.2.0/dist/scroll.js"></script>',
    //>> '<script src="https://unpkg.com/pure-scrollto@1.0.4/src/index.js"></script>',
    '<script>',
    // "import { scrollIntoView } from 'scroll-js';",
    '(function (W, D, UA, selector) {',
    '  const EL = D.querySelector(selector);',
    '  console.warn("STT:", EL, UA, UA.indexOf("Mobile") );',
     '  if (UA.indexOf("Mobile")) {',
    '    W.scrollTo(0, EL.offsetTop);',
    '  } else {',
    '    EL.setAttribute("tabindex", -1)',
    '    EL.focus()',
    '    EL.removeAttribute("tabindex")',
    '  }',
    '  console.warn("STT: scroll complete?")',
    '})(window, document, navigator.userAgent, ".wh-highlight")',
    // 'scrollTo(STT_ELEM);',
    /* 'scrollIntoView(STT_ELEM, document.body, { behavior: "smooth" }).then(() => {',
    '    console.warn("STT: scroll complete.");',
    '});', */
    '</script>',
    '<style> .wh-highlight { background: yellow; }</style>',
    ''
  ],
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
};

const CFG = /* extends */ DEFAULTS;
const QUERY = window.location.search;
const fetch = window.fetch;
// const highlight = window.highlight; // Word;
// const REQUEST = window.superagent;

var urlMatch = QUERY.match(/url=(https?.+?)(:?&|$)/);
var textMatch = QUERY.match(/text=(.+?)(:?&|$)/);

const URL = decodeURIComponent(urlMatch ? urlMatch[ 1 ] : CFG.example.url);
const TEXT = decodeURIComponent(textMatch ? textMatch[ 1 ] : CFG.example.text);

const HOLDER = q(CFG.selector);
const IFRAME = q('iframe', HOLDER);

const BASE = /* 'data:text/html,' */ '<base href="%s" target="_top" />'.replace(/%s/, URL);
const REQUEST_URL = CFG.corsProxy + URL;

console.warn('STT: text:', TEXT, CFG);

fetch(REQUEST_URL)
  // .get(REQUEST_URL)
  // .set('X-Requested-With', 'XMLHttpRequest')
  // .set('Origin', 'http://localhost')
  // .set('User-Agent', CFG.ua)
  .then(resp => resp.text())
  .then(html => {

  console.warn('then:', html);

  const SUFFIX = CFG.pageSuffix.join('\n').replace(/%s/, URL);
  const NEW_HTML = highlight(html, TEXT) + SUFFIX;

  // Fix only needed for 'file:' protocol.
  const FIX_HTML = NEW_HTML.replace(/src="\/\//g, 'src="https://');

  console.warn('modified:', FIX_HTML);

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

/*
function insertString(str, index, value) {
	return str.substr(0, index) + value + str.substr(index);
}

function highlight(text, query) {
	if (!text) throw Error('No text provided');
	if (typeof text !== 'string') throw Error('Passed paramater is not a string');
	if (!query) throw Error('No query provided');
	if (typeof query !== 'string') throw Error('Passed paramater is not a string');

	return text.split(' ').map(function (word) {
		var charIndex = word.indexOf(query);
		if (charIndex >= 0) {
			word = insertString(word, charIndex, '<mark class="wh-highlight">');
			word = insertString(word, word.length, '</mark>');
		}

		return word;
	}).join(' ');
}
*/
