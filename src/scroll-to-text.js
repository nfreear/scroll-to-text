/*!

  © Nick Freear, 29-June-2018.
*/

const DEFAULTS = {
  selector: '#scroll-to-text',
  cors_proxy: 'https://cors-anywhere.herokuapp.com/',
  example: {
    url: 'https://www.gutenberg.org/files/2350/2350-h/2350-h.htm',
    text: 'EPUB (no images)' // 'We have been allies'
  },
  ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
};

const CFG = /* extends */ DEFAULTS;
const QUERY = window.location.search;
const REQUEST = window.superagent;

var urlMatch = QUERY.match(/url=(https?.+)(:?&|$)/);
var textMatch = QUERY.match(/text=(.+)(:?&|$)/);

const URL = urlMatch ? urlMatch[ 1 ] : CFG.example.url;
var text = textMatch ? textMatch[ 1 ] : CFG.example.text;

const HOLDER = q(CFG.selector);
const IFRAME = q('iframe', HOLDER);

const BASE = /* 'data:text/html,' */ '<base href="%s" target="_top" />'.replace(/%s/, URL);
const REQUEST_URL = CFG.cors_proxy + URL;

REQUEST
  .get(REQUEST_URL)
  .set('X-Requested-With', 'XMLHttpRequest')
  // .set('Origin', 'http://localhost')
  // .set('User-Agent', CFG.ua)
  .then(function (resp) {

  console.warn('then:', resp);

  IFRAME.setAttribute('srcdoc', BASE + resp.text);

});

function q(selector, element) {
  return (element || document).querySelector(selector);
}
