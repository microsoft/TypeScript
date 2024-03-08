//// [tests/cases/compiler/taggedTemplateStringsWithUnicodeEscapesES6.ts] ////

//// [taggedTemplateStringsWithUnicodeEscapesES6.ts]
function f(...args: any[]) {
}

f `'\u{1f4a9}'${ " should be converted to " }'\uD83D\uDCA9'`;

//// [taggedTemplateStringsWithUnicodeEscapesES6.js]
function f(...args) {
}
f `'\u{1f4a9}'${" should be converted to "}'\uD83D\uDCA9'`;
