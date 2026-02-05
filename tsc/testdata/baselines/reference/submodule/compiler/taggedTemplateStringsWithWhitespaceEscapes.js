//// [tests/cases/compiler/taggedTemplateStringsWithWhitespaceEscapes.ts] ////

//// [taggedTemplateStringsWithWhitespaceEscapes.ts]
function f(...args: any[]) {
}

f `\t\n\v\f\r\\`;

//// [taggedTemplateStringsWithWhitespaceEscapes.js]
"use strict";
function f(...args) {
}
f `\t\n\v\f\r\\`;
