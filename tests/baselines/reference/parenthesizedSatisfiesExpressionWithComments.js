//// [tests/cases/compiler/parenthesizedSatisfiesExpressionWithComments.ts] ////

//// [parenthesizedSatisfiesExpressionWithComments.ts]
"use strict";
const a = (/*comm*/ 10 satisfies number);
const b = ((/*comm*/ 10 satisfies number));

//// [parenthesizedSatisfiesExpressionWithComments.js]
"use strict";
var a = /*comm*/ 10;
var b = /*comm*/ 10;
