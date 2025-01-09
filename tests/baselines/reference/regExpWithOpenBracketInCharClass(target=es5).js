//// [tests/cases/compiler/regExpWithOpenBracketInCharClass.ts] ////

//// [regExpWithOpenBracketInCharClass.ts]
/[[]/;  // Valid
/[[]/u; // Valid
/[[]/v; // Well-terminated regex with an incomplete character class


//// [regExpWithOpenBracketInCharClass.js]
"use strict";
/[[]/; // Valid
/[[]/u; // Valid
/[[]/v; // Well-terminated regex with an incomplete character class
