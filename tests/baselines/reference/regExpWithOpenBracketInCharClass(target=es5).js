//// [tests/cases/compiler/regExpWithOpenBracketInCharClass.ts] ////

//// [regExpWithOpenBracketInCharClass.ts]
const regexes: RegExp[] = [
  /[[]/,  // Valid
  /[[]/u, // Valid
  /[[]/v, // Well-terminated regex with an incomplete character class
];


//// [regExpWithOpenBracketInCharClass.js]
"use strict";
var regexes = [
    /[[]/, // Valid
    /[[]/u, // Valid
    /[[]/v, // Well-terminated regex with an incomplete character class
];
