//// [tests/cases/compiler/extendedUnicodeEscapeSequenceIdentifiers.ts] ////

//// [extendedUnicodeEscapeSequenceIdentifiers.ts]
const \u{0061} = 12;
const a\u{0061} = 12;
const a\u{62}c\u{64}e = 12;

console.log(a + aa + abcde);


//// [extendedUnicodeEscapeSequenceIdentifiers.js]
const \u{0061} = 12;
const a\u{0061} = 12;
const a\u{62}c\u{64}e = 12;
console.log(a + aa + abcde);
