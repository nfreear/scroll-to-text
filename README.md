
[![Build & test status — Travis-CI][travis-icon]][travis]

# scroll-to-text #

A Javascript-based proxy to serve a web-page, and highlight and scroll to an arbitrary text.

Features:

 * Supports single or multiple words;
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

With optional highlight background [colour keywords][col]:

 * `/?url={URL}&text={MY TEXT}&bg={BACKGROUND COLOUR NAME}`

API examples:

 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings`
 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings&bg=pink`

## Examples

 * [Example 1: '_If_' by Rudyard Kipling (text: '_Kings_')][ex1-d]
 * [Example 2: '_I have a dream_' by Martin Luther King (text: '_creed_')][ex2-d]

## Limitations

 * No animation / smooth-scrolling yet;
 * Need to wire in the form;
 * _... ?_

---
© 2018-2019 Nick Freear.

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

[End]: //
