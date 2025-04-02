//// [tests/cases/compiler/taggedTemplateStringsWithWhitespaceEscapesES6.ts] ////

//// [taggedTemplateStringsWithWhitespaceEscapesES6.ts]
function f(...args: any[]) {
}

f `\t\n\v\f\r\\`;

//// [taggedTemplateStringsWithWhitespaceEscapesES6.js]
function f(...args) {
}
f `\t\n\v\f\r\\`;
