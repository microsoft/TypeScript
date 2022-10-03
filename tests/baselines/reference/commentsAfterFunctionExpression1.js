//// [commentsAfterFunctionExpression1.ts]
var v = {
    f: a => 0 /*t1*/,
    g: (a => 0) /*t2*/,
    h: (a => 0 /*t3*/)
}


//// [commentsAfterFunctionExpression1.js]
var v = {
    f: function (a) { return 0; } /*t1*/,
    g: (function (a) { return 0; }) /*t2*/,
    h: (function (a) { return 0; } /*t3*/)
};
