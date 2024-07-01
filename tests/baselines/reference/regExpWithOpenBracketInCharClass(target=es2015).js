//// [tests/cases/compiler/regExpWithOpenBracketInCharClass.ts] ////

//// [regExpWithOpenBracketInCharClass.ts]
const regexes: RegExp[] = [
  /[[]/,  // Valid
  /[[]/u, // Valid
  /[[]/v, // Well-terminated regex with an incomplete character class
];


//// [regExpWithOpenBracketInCharClass.js]
const regexes = [
    /[[]/, // Valid
    /[[]/u, // Valid
    /[[]/v, // Well-terminated regex with an incomplete character class
];
