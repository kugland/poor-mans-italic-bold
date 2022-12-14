# Poor manโs italic/bold

This script allows you to use *italic* (actually ๐ช๐ต๐ข๐ญ๐ช๐ค) and **bold** (๐ฏ๐ผ๐น๐ฑ)
inside normal `<input>` and `<textarea>` elements.

[Link on Greasyfork](https://greasyfork.org/en/scripts/453505-poor-man-s-italic-bold)

## Detailed description

The script uses characters in the Unicode block Mathematical Alphanumeric
Symbols (`U+1D400โU+1D7FF`), which is not supported by most fonts. ๐๐ฐ ๐ต๐ฉ๐ฆ ๐ต๐ฆ๐น๐ต
๐ฎ๐ช๐จ๐ฉ๐ต ๐ด๐ฉ๐ฐ๐ธ ๐ช๐ฏ ๐ข ๐ฅ๐ช๐ง๐ง๐ฆ๐ณ๐ฆ๐ฏ๐ต ๐ง๐ฐ๐ฏ๐ต, ๐ผ๐ฟ ๐ป๐ผ๐ ๐ฎ๐ ๐ฎ๐น๐น.

### Usage

Just select the text inside a `<input>` or `<textarea>` and click `Ctrl+I` for italic or `Ctrl+B` for bold.

## Notes

* Only alphabetic characters are supported. Anything outside the Latin alphabet (any
non-Latin script, punctuation, symbols, numbers *&c*) wonโt be changed at all.

* Accented characters will be replaced with the appropriate italic and/or bold character plus
the combining character for the diacritic.

  For example:

  ```
  รฉ       U+00E9      LATIN SMALL LETTER E WITH ACUTE
  ```

  will be italicized as

  ```
  ๐ฆ       U+1D626     MATHEMATICAL SANS-SERIF ITALIC SMALL E
  โฬ       U+0301    COMBINING ACUTE ACCENT
  ```

* Many web apps use normal `<div>` elements with `contenteditable="true"`, instead of
`<input>`/`<textarea>` elements. This script wonโt work with those either. Also this script
wonโt play nicely with controlled components in React or other similar frameworks.

## Credits

Written by Andrรฉ Kugland.

Inspired by [https://yaytext.com/bold-italic/](https://yaytext.com/bold-italic/) and other similar sites.