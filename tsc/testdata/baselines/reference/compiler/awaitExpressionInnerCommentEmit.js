//// [tests/cases/compiler/awaitExpressionInnerCommentEmit.ts] ////

//// [awaitExpressionInnerCommentEmit.ts]
async function foo() {
    /*comment1*/ await 1;
    await /*comment2*/ 2;
    await 3 /*comment3*/
}

//// [awaitExpressionInnerCommentEmit.js]
"use strict";
async function foo() {
    /*comment1*/ await 1;
    await /*comment2*/ 2;
    await 3; /*comment3*/
}
