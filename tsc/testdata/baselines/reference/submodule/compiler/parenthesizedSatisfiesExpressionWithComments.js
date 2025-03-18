//// [tests/cases/compiler/parenthesizedSatisfiesExpressionWithComments.ts] ////

//// [parenthesizedSatisfiesExpressionWithComments.ts]
"use strict";
const a = (/*comm*/ 10 satisfies number);
const b = ((/*comm*/ 10 satisfies number));

//// [parenthesizedSatisfiesExpressionWithComments.js]
"use strict";
const a = 10;
const b = 10;
