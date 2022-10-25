// ==UserScript==
// @name        Poor man’s italic/bold
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0.4
// @author      André Kugland
// @description Bold/italic in normal <input>/<textarea> elements
// @license     MIT
// @supportURL  https://github.com/kugland/poor-mans-italic-bold/issues
// ==/UserScript==

const regularAlphabet = 'A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z';
const boldAlphabet = '𝗔|𝗕|𝗖|𝗗|𝗘|𝗙|𝗚|𝗛|𝗜|𝗝|𝗞|𝗟|𝗠|𝗡|𝗢|𝗣|𝗤|𝗥|𝗦|𝗧|𝗨|𝗩|𝗪|𝗫|𝗬|𝗭|𝗮|𝗯|𝗰|𝗱|𝗲|𝗳|𝗴|𝗵|𝗶|𝗷|𝗸|𝗹|𝗺|𝗻|𝗼|𝗽|𝗾|𝗿|𝘀|𝘁|𝘂|𝘃|𝘄|𝘅|𝘆|𝘇';
const italicAlphabet = '𝘈|𝘉|𝘊|𝘋|𝘌|𝘍|𝘎|𝘏|𝘐|𝘑|𝘒|𝘓|𝘔|𝘕|𝘖|𝘗|𝘘|𝘙|𝘚|𝘛|𝘜|𝘝|𝘞|𝘟|𝘠|𝘡|𝘢|𝘣|𝘤|𝘥|𝘦|𝘧|𝘨|𝘩|𝘪|𝘫|𝘬|𝘭|𝘮|𝘯|𝘰|𝘱|𝘲|𝘳|𝘴|𝘵|𝘶|𝘷|𝘸|𝘹|𝘺|𝘻';
const boldItalicAlphabet = '𝘼|𝘽|𝘾|𝘿|𝙀|𝙁|𝙂|𝙃|𝙄|𝙅|𝙆|𝙇|𝙈|𝙉|𝙊|𝙋|𝙌|𝙍|𝙎|𝙏|𝙐|𝙑|𝙒|𝙓|𝙔|𝙕|𝙖|𝙗|𝙘|𝙙|𝙚|𝙛|𝙜|𝙝|𝙞|𝙟|𝙠|𝙡|𝙢|𝙣|𝙤|𝙥|𝙦|𝙧|𝙨|𝙩|𝙪|𝙫|𝙬|𝙭|𝙮|𝙯';

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

