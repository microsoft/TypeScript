//// [tests/cases/compiler/awaitExpressionInnerCommentEmit.ts] ////

//// [awaitExpressionInnerCommentEmit.ts]
async function foo() {
    /*comment1*/ await 1;
    await /*comment2*/ 2;
    await 3 /*comment3*/
}

//// [awaitExpressionInnerCommentEmit.js]
async function foo() {
    /*comment1*/ await 1;
    await /*comment2*/ 2;
    await 3; /*comment3*/
}
