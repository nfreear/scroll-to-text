
# scroll-to-text #

A Javascript-based proxy to serve a web-page, and highlight and scroll to an arbitrary text.

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

With optional highlight colour:

 * `/?url={URL}&text={MY TEXT}&bg={BACKGROUND COLOUR NAME}`

API examples:

 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings`
 * `/?url=http://kiplingsociety.co.uk/poems_if.htm&text=Kings&bg=pink`

## Examples

 * [Example 1: '_If_' by Rudyard Kipling (text: '_Kings_')][ex1-d]
 * [Example 2: '_I have a dream_' by Martin Luther King (text: '_creed_')][ex2-d]

## Limitations

 * Currently only supports multiple words (_uses first two_) (_Was: only supports single words!_)
 * No animation / smooth-scrolling;
 * Wire in the form;
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

[End]: //
