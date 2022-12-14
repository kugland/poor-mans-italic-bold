// ==UserScript==
// @name        Poor manโs italic/bold
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0.4
// @author      Andrรฉ Kugland
// @description Bold/italic in normal <input>/<textarea> elements
// @license     MIT
// @supportURL  https://github.com/kugland/poor-mans-italic-bold/issues
// ==/UserScript==

const regularAlphabet = 'A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z';
const boldAlphabet = '๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐ |๐ก|๐ข|๐ฃ|๐ค|๐ฅ|๐ฆ|๐ง|๐จ|๐ฉ|๐ช|๐ซ|๐ฌ|๐ญ|๐ฎ|๐ฏ|๐ฐ|๐ฑ|๐ฒ|๐ณ|๐ด|๐ต|๐ถ|๐ท|๐ธ|๐น|๐บ|๐ป|๐ผ|๐ฝ|๐พ|๐ฟ|๐|๐|๐|๐|๐|๐|๐|๐';
const italicAlphabet = '๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐ |๐ก|๐ข|๐ฃ|๐ค|๐ฅ|๐ฆ|๐ง|๐จ|๐ฉ|๐ช|๐ซ|๐ฌ|๐ญ|๐ฎ|๐ฏ|๐ฐ|๐ฑ|๐ฒ|๐ณ|๐ด|๐ต|๐ถ|๐ท|๐ธ|๐น|๐บ|๐ป';
const boldItalicAlphabet = '๐ผ|๐ฝ|๐พ|๐ฟ|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐|๐ |๐ก|๐ข|๐ฃ|๐ค|๐ฅ|๐ฆ|๐ง|๐จ|๐ฉ|๐ช|๐ซ|๐ฌ|๐ญ|๐ฎ|๐ฏ';

function translate(str, alphabet1, alphabet2) {
  const regex1 = new RegExp(`(${alphabet1})`, 'g');
  const regex2 = new RegExp(`(${alphabet2})`, 'g');
  const [fromRegex, from, to] = str.match(regex1) ? [regex1, alphabet1, alphabet2] : [regex2, alphabet2, alphabet1];
  const toAlphabet = to.split('|');
  const map = from.split('|').reduce((a, b, c) => ({ ...a, [b]: toAlphabet[c] }), {});
  return str.replaceAll(fromRegex, (c) => map[c]);
}

document.body.addEventListener('keyup', (e) => {
  const target = e.target;

  if (!target.matches('input, textarea'))
    return;

  if (e.ctrlKey && (e.key == 'i' || e.key == 'b')) {
    const start = target.selectionStart;
    const end = target.selectionEnd;

    const before = target.value.substr(0, start);
    let selection = target.value.substr(start, end - start);
    const after = target.value.substr(end);

    selection = selection.normalize('NFD');
    if (e.key == 'i') {
      selection = translate(selection, `${regularAlphabet}|${boldAlphabet}`, `${italicAlphabet}|${boldItalicAlphabet}`);
    } else if (e.key == 'b') {
      selection = translate(selection, `${regularAlphabet}|${italicAlphabet}`, `${boldAlphabet}|${boldItalicAlphabet}`);
    }
    selection = selection.normalize('NFC');

    target.value = `${before}${selection}${after}`;
    target.selectionStart = start;
    target.selectionEnd = start + selection.length;

    e.preventDefault();
    e.stopPropagation();
  }
});

document.body.addEventListener('keydown', (e) => {
  const target = e.target;

  if (!target.matches('input, textarea'))
    return;

  if (e.ctrlKey && (e.key == 'i' || e.key == 'b')) {
    e.preventDefault();
    e.stopPropagation();
  }
});

