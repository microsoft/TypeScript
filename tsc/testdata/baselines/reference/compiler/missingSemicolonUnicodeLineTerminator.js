//// [tests/cases/compiler/missingSemicolonUnicodeLineTerminator.ts] ////

//// [missingSemicolonUnicodeLineTerminator.ts]
// U+2028 LINE SEPARATOR
const a = (x: number) => x (1);

// U+2029 PARAGRAPH SEPARATOR
const b = (x: number) => x (1);

// Standard newline for comparison
const c = (x: number) => x
(1);


//// [missingSemicolonUnicodeLineTerminator.js]
"use strict";
// U+2028 LINE SEPARATOR
const a = (x) => x(1);
// U+2029 PARAGRAPH SEPARATOR
const b = (x) => x(1);
// Standard newline for comparison
const c = (x) => x(1);
