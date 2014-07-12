//// [collisionThisExpressionAndLocalVarInFunction.js]
var console;
function x() {
    var _this = this;
    var _this = 5;
    (function (x) {
        console.log(_this.x);
    });
}
