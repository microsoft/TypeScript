//// [tests/cases/compiler/taggedTemplateStringsWithWhitespaceEscapes.ts] ////

//// [taggedTemplateStringsWithWhitespaceEscapes.ts]
function f(...args: any[]) {
}

f `\t\n\v\f\r\\`;

//// [taggedTemplateStringsWithWhitespaceEscapes.js]
function f(...args) {
}
f `\t\n\v\f\r\\`;
