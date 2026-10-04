//// [tests/cases/compiler/taggedTemplateStringsHexadecimalEscapesES6.ts] ////

//// [taggedTemplateStringsHexadecimalEscapesES6.ts]
function f(...args: any[]) {
}

f `\x0D${ "Interrupted CRLF" }\x0A`;

//// [taggedTemplateStringsHexadecimalEscapesES6.js]
"use strict";
function f(...args) {
}
f `\x0D${"Interrupted CRLF"}\x0A`;
