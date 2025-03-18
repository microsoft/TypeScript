//// [tests/cases/compiler/yieldExpressionInnerCommentEmit.ts] ////

//// [yieldExpressionInnerCommentEmit.ts]
function * foo2() {
    /*comment1*/ yield 1;
    yield /*comment2*/ 2;
    yield 3 /*comment3*/
    yield */*comment4*/ [4];
    yield /*comment5*/* [5];
}


//// [yieldExpressionInnerCommentEmit.js]
function* foo2() {
    yield 1;
    yield 2;
    yield 3;
    yield* [4];
    yield* [5];
}
