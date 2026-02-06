//// [tests/cases/compiler/taggedTemplateStringsHexadecimalEscapes.ts] ////

//// [taggedTemplateStringsHexadecimalEscapes.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapes.js]
"use strict";
function f(...args) {
}
f `\x0D${"Interrupted CRLF"}\x0A`;
