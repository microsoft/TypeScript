//// [tests/cases/compiler/noCollisionThisExpressionAndLocalVarInFunction.ts] ////

//// [noCollisionThisExpressionAndLocalVarInFunction.ts]
var console: {
    log(val: any);
}
function x() {
    var _this = 5;
    x => { console.log(_this); };
}

//// [noCollisionThisExpressionAndLocalVarInFunction.js]
var console;
function x() {
    var _this = 5;
    (function (x) { console.log(_this); });
}
