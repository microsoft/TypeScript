//// [tests/cases/compiler/regularExpressionExtendedUnicodeEscapes.ts] ////

//// [regularExpressionExtendedUnicodeEscapes.ts]
/\u{10000}[\u{10000}]/;
/\u{10000}[\u{10000}]/u;
/\u{10000}[\u{10000}]/v;


//// [regularExpressionExtendedUnicodeEscapes.js]
"use strict";
/\u{10000}[\u{10000}]/;
/\u{10000}[\u{10000}]/u;
/\u{10000}[\u{10000}]/v;
