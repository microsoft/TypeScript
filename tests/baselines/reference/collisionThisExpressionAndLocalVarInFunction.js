//// [tests/cases/compiler/collisionThisExpressionAndLocalVarInFunction.ts] ////

//// [collisionThisExpressionAndLocalVarInFunction.ts]
var console: {
    log(val: any);
}
function x() {
    var _this = 5;
    x => { console.log(this.x); };
}

//// [collisionThisExpressionAndLocalVarInFunction.js]
var console;
function x() {
    var _this = 5;
    x => { console.log(this.x); };
}
