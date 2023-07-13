//// [tests/cases/compiler/commaOperator1.ts] ////

//// [commaOperator1.ts]
var v1 = ((1, 2, 3), 4, 5, (6, 7));
function f1() {
    var a = 1;
    return a, v1, a;
}


//// [commaOperator1.js]
var v1 = ((1, 2, 3), 4, 5, (6, 7));
function f1() {
    var a = 1;
    return a, v1, a;
}
