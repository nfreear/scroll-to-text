/*!

 Source: https://unpkg.com/pure-scrollto@1.0.4/src/index.js
 https://github.com/ppzzppz/pure-scrollto
*/

((W, D, UA, selector) => {
  'use strict';

  const ELEM = D.querySelector(selector);

  console.warn('[STT]', ELEM, UA, UA.indexOf('Mobile'));

  if (UA.indexOf('Mobile')) {
    W.scrollTo(0, ELEM.offsetTop);
  } else {
    ELEM.setAttribute('tabindex', -1);
    ELEM.focus();
    ELEM.removeAttribute('tabindex');
  }

  console.warn('[STT] scroll complete.');
})(window, document, navigator.userAgent, '.wh-highlight');
