//// [tests/cases/compiler/noCollisionThisExpressionInFunctionAndVarInGlobal.ts] ////

//// [noCollisionThisExpressionInFunctionAndVarInGlobal.ts]
var console: {
    log(val: any);
}
var _this = 5;
function x() {
    x => { console.log(this); };
}

//// [noCollisionThisExpressionInFunctionAndVarInGlobal.js]
var console;
var _this = 5;
function x() {
    x => { console.log(this); };
}
