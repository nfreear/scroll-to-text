/*!
 Injected JS.

 Source: https://unpkg.com/pure-scrollto@1.0.4/src/index.js
 https://github.com/ppzzppz/pure-scrollto
*/

((W, D, UA, selector, occurSelector) => {
  'use strict';

  const OCCUR = D.querySelector(occurSelector).dataset.sttOccurrence;
  const ELEMS = D.querySelectorAll(selector);

  const ELEM = ELEMS.length && ELEMS[ OCCUR - 1 ] ? ELEMS[ OCCUR - 1 ] : null;

  console.warn('[STT] Injected JS:', OCCUR, 'of', ELEMS.length, ELEM); // UA, UA.indexOf('Mobile'));

  if (UA.indexOf('Mobile')) {
    W.scrollTo(0, ELEM.offsetTop);
  } else {
    // W.setTimeout(() => {
    ELEM.setAttribute('tabindex', -1);
    ELEM.focus();
    ELEM.removeAttribute('tabindex');
    // }, 100);
  }

  ELEM.className += ' nth';
  ELEM.title += " ~~ 'scroll-to-text'";

  console.warn('[STT] scroll complete.');
})(window, document, navigator.userAgent, '.wh-highlight', 'script[ data-stt-occurrence ]');
