
[![Build & test status — Travis-CI][travis-icon]][travis]

# scroll-to-text #

A Javascript-based proxy to serve a web-page, and highlight and scroll to an arbitrary text.

Features:

 * Supports single or multiple words;
 * Scrolls to the _Nth_ occurrence of the word/phrase;
 * URL parameter to modify the highlight background colour;

## Install .. build .. test .. serve

```sh
npm install
npm build
npm test
npm start
```

## Web API

With minimal parameters in the request URL:

 * `/?url={URL}&text={MY TEXT}`

With optional occurrence number:

 * `/?url={URL}&text={MY TEXT}&occurrence={N}`

With optional highlight background [colour keywords][col]:

 * `/?url={URL}&text={MY TEXT}&bg={BACKGROUND COLOUR NAME}`

API examples:

 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings`
 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings&bg=pink`

## Examples

 * [Example 1: '_If_' by Rudyard Kipling (text: '_Kings_')][ex1-r]
 * [Example 2: '_I have a dream_' by Martin Luther King (text: '_creed_')][ex2-r]

## Limitations

<!-- * Scrolls to the first occurrence of the `text`; -->
 * No animation / smooth-scrolling yet;
 * Need to wire in the form;
 * _... ?_

## Included

The following are included and extended as part of `scroll-to-text`:

 * [pure-scrollto][] ([js][])
 * [highlight-word][]

## Disclaimer

I claim no ownership over the web-content presented below via the '_scroll-to-text_' proxy service,
and accept no responsibility for it.
Images and other resources may be missing from proxied content (_browser security restrictions?_)
This is prototype software which may contain bugs!

---
© 2018-2019 [Nick Freear][n] | License: [MIT][].

[n]: https://twitter.com/nfreear
[mit]: https://nfreear.mit-license.org/#!-2019-scroll-to-text "© Nick Freear | MIT License"
[ex1-d]: http://127.0.0.1:9001/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings&bg=pink
  "Dev/ Localhost"
[ex1-r]: https://nfreear.github.io/scroll-to-text/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings&bg=pink
  "Github.io"
[ex1b]: https://nfreear.github.io/scroll-to-text/?url=https://poetryfoundation.org/poems/46473/if---&text=Kings
[ex2-d]: http://127.0.0.1:9001/?url=https://americanrhetoric.com/speeches/mlkihaveadream.htm&text=its%20creed
  "Dev/ Localhost"
[ex2-r]: https://nfreear.github.io/scroll-to-text/?url=https://americanrhetoric.com/speeches/mlkihaveadream.htm&text=its%20creed
  "GitHub.io"
[ex3]: https://nfreear.github.io/scroll-to-text/?url=https://example.org&text=More
[col]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords
[travis]: https://travis-ci.org/nfreear/scroll-to-text
[travis-icon]: https://travis-ci.org/nfreear/scroll-to-text.svg?branch=master
[pure-scrollto]: https://npmjs.com/package/pure-scrollto/v/1.0.4
  "Author: diqye <262666212@qq.com> | MIT License"
[js]: https://unpkg.com/pure-scrollto@1.0.4/src/index.js "Javascript: 'index.js'"
[highlight-word]: https://github.com/DaveBitter/highlight_word/tree/1.0.0
  "Copyright (c) 2018 Dave Bitter | MIT License"

[End]: //
