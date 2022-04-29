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
    var _this_1 = this;
    var _this = 5;
    (function (x) { console.log(_this_1.x); });
}
