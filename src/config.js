
import { param } from './util.js';

const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';
// const CORS_PROXY = 'https://cors-proxy.htmldriven.com/?url='; // Was: 'https://cors.io/?'

const LOC = window.location;

const DEFAULTS = {
  selector: '#scroll-to-text',
  url: param('url', 'https://scrolltotext.github.io/test/if.html'), // Was: 'http://americanrhetoric.com/speeches/mlkihaveadream.htm'
  text: param('text', 'dream'), // Was: 'Its creed'
  occurrence: parseInt(param('occurrence', 1)),
  background: param('bg', 'yellow'),
  corsProxy: parseInt(param('cp', 1)) ? CORS_PROXY : '',
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

export default DEFAULTS;
