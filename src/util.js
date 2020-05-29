
export { qs, param };

const LOC = window.location;

function qs (selector, element) {
  return (element || document).querySelector(selector);
}

function param (pmName, defaultPm) {
  defaultPm = defaultPm || null;
  const RE = new RegExp('[?&]' + pmName + '=(.+?)(:?&|$)'); // (/text=(.+?)(:?&|$)/) (/url=(https?.+?)(:?&|$)/) (/bg=(\w+?)(:?&|$)/);
  const MAT = LOC.search.match(RE);
  const VALUE = decodeURIComponent(MAT ? MAT[1] : defaultPm).replace(/\+/g, ' '); // BUG fix: why '+', not '%20' ?!

  // Security.
  if (/([<>;]|javascript:)/i.test(VALUE)) {
    throw Error('[STT] Security: XSS injection attempt :~ ' + VALUE);
  }
  return VALUE;
}
