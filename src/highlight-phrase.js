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
