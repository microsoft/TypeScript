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
    var _this = this;
    var _this = 5;
    (function (x) { console.log(_this.x); });
}
