//// [commentsBeforeFunctionExpression1.ts]
var v = {
    f: /**own f*/ (a) => 0
}


//// [commentsBeforeFunctionExpression1.js]
var v = {
    f: /**own f*/ function (a) { return 0; }
};
