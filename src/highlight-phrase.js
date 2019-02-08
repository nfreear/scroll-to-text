/*!
  © Nick Freear, 07-February-2019.
*/

module.exports = {
	highlightPhrase: highlightPhrase,
	highlightWord: highlightWord
}

function highlightPhrase(text, query) {
	if (!text) throw Error('No text provided');
	if (typeof text !== 'string') throw Error('Passed paramater is not a string');
	if (!query) throw Error('No query provided');
	if (typeof query !== 'string')
		throw Error('Passed paramater is not a string');

  const q1 = query.split(' ')[ 0 ];
	const q2 = query.split(' ')[ 1 ] || null;

	console.warn(q1, q2);

	let alsoMatch = false;

	return text
		.split(' ')
		.map((word, idx, ar) => {
			const charIndex = alsoMatch ? word.indexOf(q2) : word.indexOf(q1);

			const plusOne = ar[ idx + 1 ];
		  const prevMatch = alsoMatch;

			alsoMatch = q2 ? (plusOne && plusOne.indexOf(q2)) >= 0 ? true : false : true;

			// console.warn(idx, word, plusOne, alsoMatch);

			if (charIndex >= 0 && (alsoMatch || prevMatch)) {
				word = insertString(word, charIndex, '<mark class="wh-highlight">');
				word = insertString(word, word.length, '</mark>');
			}

			return word;
		})
		.join(' ');
}

// Source :- https://npmjs.com/package/highlight-word
// https://github.com/DaveBitter/highlight_word/tree/05d786a144

function insertString(str, index, value) {
	return str.substr(0, index) + value + str.substr(index);
}

function highlightWord(text, query) {
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

// End.
