# Poor man’s italic/bold

This script allows you to use *italic* (actually 𝘪𝘵𝘢𝘭𝘪𝘤) and **bold** (𝗯𝗼𝗹𝗱)
inside normal `<input>` and `<textarea>` elements.

[Link on Greasyfork](https://greasyfork.org/en/scripts/453505-poor-man-s-italic-bold)

## Detailed description

The script uses characters in the Unicode block Mathematical Alphanumeric
Symbols (`U+1D400–U+1D7FF`), which is not supported by most fonts. 𝘚𝘰 𝘵𝘩𝘦 𝘵𝘦𝘹𝘵
𝘮𝘪𝘨𝘩𝘵 𝘴𝘩𝘰𝘸 𝘪𝘯 𝘢 𝘥𝘪𝘧𝘧𝘦𝘳𝘦𝘯𝘵 𝘧𝘰𝘯𝘵, 𝗼𝗿 𝗻𝗼𝘁 𝗮𝘁 𝗮𝗹𝗹.

### Usage

Just select the text inside a `<input>` or `<textarea>` and click `Ctrl+I` for italic or `Ctrl+B` for bold.

## Notes

* Only alphabetic characters are supported. Anything outside the Latin alphabet (any
non-Latin script, punctuation, symbols, numbers *&c*) won’t be changed at all.

* Accented characters will be replaced with the appropriate italic and/or bold character plus
the combining character for the diacritic.

  For example:

  ```
  é       U+00E9      LATIN SMALL LETTER E WITH ACUTE
  ```

  will be italicized as

  ```
  𝘦       U+1D626     MATHEMATICAL SANS-SERIF ITALIC SMALL E
  ◌́       U+0301    COMBINING ACUTE ACCENT
  ```

* Many web apps use normal `<div>` elements with `contenteditable="true"`, instead of
`<input>`/`<textarea>` elements. This script won’t work with those either. Also this script
won’t play nicely with controlled components in React or other similar frameworks.

## Credits

Written by André Kugland.

Inspired by [https://yaytext.com/bold-italic/](https://yaytext.com/bold-italic/).
