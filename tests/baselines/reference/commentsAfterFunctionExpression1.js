//// [tests/cases/compiler/commentsAfterFunctionExpression1.ts] ////

//// [commentsAfterFunctionExpression1.ts]
var v = {
    f: a => 0 /*t1*/,
    g: (a => 0) /*t2*/,
    h: (a => 0 /*t3*/)
}


//// [commentsAfterFunctionExpression1.js]
var v = {
    f: a => 0 /*t1*/,
    g: (a => 0) /*t2*/,
    h: (a => 0 /*t3*/)
};
