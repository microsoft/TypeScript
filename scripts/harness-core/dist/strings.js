"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padLeft(text, size, ch = " ") {
    while (text.length < size)
        text = ch + text;
    return text;
}
exports.padLeft = padLeft;
function padRight(text, size, ch = " ") {
    while (text.length < size)
        text += ch;
    return text;
}
exports.padRight = padRight;
function getByteOrderMark(text) {
    const length = getByteOrderMarkLength(text);
    return length > 0 ? text.slice(0, length) : "";
}
exports.getByteOrderMark = getByteOrderMark;
function getByteOrderMarkLength(text) {
    if (text.length >= 2) {
        const ch0 = text.charCodeAt(0);
        const ch1 = text.charCodeAt(1);
        if ((ch0 === 0xff && ch1 === 0xfe) ||
            (ch0 === 0xfe && ch1 === 0xff)) {
            return 2;
        }
        if (text.length >= 3 && ch0 === 0xef && ch1 === 0xbb && text.charCodeAt(2) === 0xbf) {
            return 3;
        }
    }
    return 0;
}
exports.getByteOrderMarkLength = getByteOrderMarkLength;
function removeByteOrderMark(text) {
    const length = getByteOrderMarkLength(text);
    return length ? text.slice(length) : text;
}
exports.removeByteOrderMark = removeByteOrderMark;
function addUTF8ByteOrderMark(text) {
    return getByteOrderMarkLength(text) === 0 ? "\u00EF\u00BB\u00BF" + text : text;
}
exports.addUTF8ByteOrderMark = addUTF8ByteOrderMark;
function splitLinesWorker(text, lineStarts, lines, removeEmptyElements) {
    let pos = 0;
    let end = 0;
    let lineStart = 0;
    let nonWhiteSpace = false;
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        end = pos;
        pos++;
        switch (ch) {
            // LineTerminator
            case 0x000d:// <CR> carriage return
                if (pos < text.length && text.charCodeAt(pos) === 0x000a) {
                    pos++;
                }
            // falls through
            case 0x000a: // <LF> line feed
            case 0x2028: // <LS> line separator
            case 0x2029:// <PS> paragraph separator
                if (lineStarts) {
                    lineStarts.push(lineStart);
                }
                if (lines && (!removeEmptyElements || nonWhiteSpace)) {
                    lines.push(text.slice(lineStart, end));
                }
                lineStart = pos;
                nonWhiteSpace = false;
                break;
            // WhiteSpace
            case 0x0009: // <TAB> tab
            case 0x000b: // <VT> vertical tab
            case 0x000c: // <FF> form feed
            case 0x0020: // <SP> space
            case 0x00a0: // <NBSP> no-break space
            case 0xfeff: // <ZWNBSP> zero width no-break space
            case 0x1680: // <USP> ogham space mark
            case 0x2000: // <USP> en quad
            case 0x2001: // <USP> em quad
            case 0x2002: // <USP> en space
            case 0x2003: // <USP> em space
            case 0x2004: // <USP> three-per-em space
            case 0x2005: // <USP> four-per-em space
            case 0x2006: // <USP> six-per-em space
            case 0x2007: // <USP> figure space
            case 0x2008: // <USP> punctuation space
            case 0x2009: // <USP> thin space
            case 0x200a: // <USP> hair space
            case 0x202f: // <USP> narrow no-break space
            case 0x205f: // <USP> medium mathematical space
            case 0x3000: // <USP> ideographic space
            case 0x0085:// next-line (not strictly per spec, but used by the compiler)
                break;
            default:
                nonWhiteSpace = true;
                break;
        }
    }
    if (lineStarts) {
        lineStarts.push(lineStart);
    }
    if (lines && (!removeEmptyElements || nonWhiteSpace)) {
        lines.push(text.slice(lineStart, text.length));
    }
}
function getLinesAndLineStarts(text) {
    const lines = [];
    const lineStarts = [];
    splitLinesWorker(text, lineStarts, lines, /*removeEmptyElements*/ false);
    return { lines, lineStarts };
}
exports.getLinesAndLineStarts = getLinesAndLineStarts;
function splitLines(text, removeEmptyElements = false) {
    const lines = [];
    splitLinesWorker(text, /*lineStarts*/ undefined, lines, removeEmptyElements);
    return lines;
}
exports.splitLines = splitLines;
function computeLineStarts(text) {
    const lineStarts = [];
    splitLinesWorker(text, lineStarts, /*lines*/ undefined, /*removeEmptyElements*/ false);
    return lineStarts;
}
exports.computeLineStarts = computeLineStarts;

//# sourceMappingURL=strings.js.map
