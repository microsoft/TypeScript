//// [tests/cases/compiler/commentsBeforeFunctionExpression1.ts] ////

//// [commentsBeforeFunctionExpression1.ts]
var v = {
    f: /**own f*/ (a) => 0
}


//// [commentsBeforeFunctionExpression1.js]
var v = {
    f: (a) => 0
};
